class PracticeController{
    constructor(database){
        this.db = database;
    }

    insertPractice(practice){
        return new Promise((resolve, reject) => {
            this.db.Practice.find({
                where:{
                    name: practice.name,
                    businessUnitId: practice.buId
                }
            }).then(found => {
                if(!found){
                    this.db.Practice.create({
                        name: practice.name,
                        businessUnitId: practice.buId
                    }).then(newPractice => {
                        resolve(newPractice);
                    }).catch(err => {
                        reject(err);
                    });
                }else{
                    resolve({
                        status: "failure",
                        message: "A practice with the specified name exists."
                    });
                }
            });
        });
    }

    assignPracticeHead(practiceId, userId){
        return new Promise((resolve) => {
            this.db.Practice.findById(practiceId).then(practice => {
                practice.setPracticeHead(userId).then(() => {
                    resolve({"status":"success"});
                });
            });
        });
    }

    assignPracticeManager(practiceId, userId){
        return new Promise((resolve) => {
            this.db.Practice.findById(practiceId).then(practice => {
                practice.addPracticeManager(userId).then(() => {
                    resolve({"status":"success"});
                });
            });
        });
    }

    getPractice(id){
        return new Promise((resolve) => {
            this.db.Practice.find({
                where:{
                    id: id
                },
                attributes:{
                    exclude: ['updatedAt','createdAt','PracticeHeadId','practiceHeadId','businessUnitId',
                              'BusinessUnitId']
                },
                include:[{
                    model: this.db.User,
                    as: 'PracticeHead',
                    attributes:{
                        exclude:['updatedAt','createdAt','mentorId','practiceManagerId','competency',
                                'locationId','LocationId']
                    }
                },{
                    model: this.db.BusinessUnit,
                    as: 'BusinessUnit',
                    attributes:{
                        exclude:['createdAt','updatedAt']
                    }
                },{
                    model: this.db.User,
                    as: 'PracticeManagers',
                    attributes:{
                        exclude:['updatedAt','createdAt','mentorId','practiceManagerId','competency',
                                'locationId','LocationId']
                    }
                }]
            }).then(practice => {
                resolve(practice);
            });
        });
    }
}

module.exports = PracticeController;
