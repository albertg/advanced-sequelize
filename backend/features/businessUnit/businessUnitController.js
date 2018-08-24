class BusinessUnitController{
    constructor(database){
        this.db = database;
    }

    insertBusinessUnit(bu){
        return new Promise((resolve, reject) => {
            this.db.BusinessUnit.find({
                where:{
                    name: bu.name
                }
            }).then(found => {
                if(!found){
                    this.db.BusinessUnit.create({
                        name: bu.name
                    }).then(newBu => {
                        resolve(newBu);
                    }).catch(err => {
                        reject(err);
                    });
                }else{
                    resolve({
                        status: "failure",
                        message: "A business unit with the specified name exists."
                    });
                }
            });
        });
    }

    getBUDetails(buId){
        return new Promise((resolve) => {
            this.db.BusinessUnit.find({
                where:{
                    id: buId
                },
                attributes:{
                    exclude: ['createdAt','updatedAt']
                },
                include:[{
                    model: this.db.Practice,
                    as: 'Practices',
                    attributes:{
                        exclude: ['businessUnitId','createdAt','updatedAt','BusinessUnitId','PracticeHeadId','practiceHeadId']
                    },
                    include:[{
                        model: this.db.User,
                        as: 'PracticeHead',
                        attributes:{
                            exclude: ['mentorId','practiceManagerId','updatedAt','locationId','createdAt','LocationId']
                        },
                        include:[{
                            model: this.db.Location,
                            as: 'Location',
                            attributes:{
                                exclude: ['updatedAt','createdAt']
                            }
                        }]
                    }]
                }]                            
            }).then(bu => {
                resolve(bu);
            });
        });
    }
}

module.exports = BusinessUnitController;
