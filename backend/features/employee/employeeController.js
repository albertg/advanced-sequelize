class EmployeeController{
    constructor(database){
        this.db = database;
    } 
    
    getPracticeHeadDetails(phId){
        return new Promise(resolve => {
            this.db.User.find({
                where:{
                    id: phId
                },
                attributes:{
                    exclude:['PracticeId','locationId','createdAt','updatedAt','PracticeId',
                             'LocationId']
                },
                include:[{
                    model: this.db.Practice,
                    as: 'Practice',
                    attributes:{
                        exclude: ['businessUnitId','practiceHeadId','createdAt','updatedAt',
                                  'BusinessUnitId','PracticeHeadId']
                    },
                    include:[{
                        model: this.db.User,
                        as: 'PracticeManagers'
                    }]
                }]
            }).then(practiceHead => {
                resolve(practiceHead);
            });
        });
    }

    getPracticeManagerDetails(pmId){
        return new Promise(resolve => {
            this.db.User.find({
                where: {
                    id: pmId
                },
                include: [{
                    model: this.db.User,
                    as: "PracticeManagerReportees"
                }]
            }).then(practiceManager => {
                resolve(practiceManager);
            });
        });
    }

    getMentorDetails(mentorId){
        return new Promise(resolve => {
            this.db.User.find({
                where: {
                    id: mentorId
                },
                include: [{
                    model: this.db.User,
                    as: "Mentees"
                }]
            }).then(mentor => {
                resolve(mentor);
            });
        });
    }

    getMenteeDetails(menteeId){
        return new Promise(resolve => {
            this.db.User.find({
                where: {
                    id: menteeId
                },
                attributes:{
                    exclude: ['mentorId','practiceManagerId','locationId','practiceId','createdAt',
                              'updatedAt','PracticeId','LocationId']
                },
                include: [{
                    model: this.db.Role,
                    as: 'Roles',
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    },
                    through:{
                        model: this.db.EmployeeRoles,
                        attributes: []
                    }
                },{
                    model: this.db.User,
                    as: "Mentor",
                    attributes:{
                        exclude: ['mentorId','practiceManagerId','competency','locationId','title','gender','practiceId','createdAt',
                                  'updatedAt','PracticeId','LocationId']
                    },
                    include:[{
                        model: this.db.Role,
                        as: 'Roles',
                        attributes:{
                            exclude: ['createdAt','updatedAt']
                        },
                        through:{
                            model: this.db.EmployeeRoles,
                            attributes: []
                        }
                    }]
                },{
                    model: this.db.User,
                    as: "PracticeManager",
                    attributes:{
                        exclude: ['mentorId','practiceManagerId','competency','locationId','title','gender','practiceId','createdAt',
                                  'updatedAt','PracticeId','LocationId']
                    },
                    include:[{
                        model: this.db.Role,
                        as: 'Roles',
                        attributes:{
                            exclude: ['createdAt','updatedAt']
                        },
                        through:{
                            model: this.db.EmployeeRoles,
                            attributes: []
                        }
                    },{
                        model: this.db.Practice,
                        as: 'ManagersPractice',
                        attributes:{
                            exclude: ['businessUnitId','practiceHeadId','createdAt','updatedAt','BusinessUnitId','PracticeHeadId']
                        },
                        include:[{
                            model: this.db.User,
                            as: 'PracticeHead',
                            attributes:{
                                exclude: ['mentorId','practiceManagerId','competency','locationId','title','gender','practiceId','createdAt',
                                          'updatedAt','PracticeId','LocationId']
                            },
                        },{
                            model: this.db.BusinessUnit,
                            as: 'BusinessUnit',
                            attributes:{
                                exclude: ['createdAt','updatedAt']
                            }
                        }]
                    }]
                }]
            }).then(mentor => {
                resolve(mentor);
            });
        });
    }

    addUser(user){
        return new Promise((resolve, reject) => {
            this.db.User.find({
                where:{
                    employeeId: user.empId,
                    email: user.email
                }
            }).then(found => {
                if(!found){
                    this.db.User.create({
                        employeeId: user.empId,
                        firstName: user.first,
                        lastName: user.last,
                        email: user.email,
                        mentorId: user.mentor,
                        profileImage: user.profileImage,
                        practiceManagerId: user.practiceManager,
                        designation: user.designation,
                        competency: user.competency,
                        locationId: user.locationId,
                        title: user.title,
                        gender: user.gender
                    }).then(newUser => {
                        this.db.Role.find({
                            where:{
                                name: "mentee"
                            }
                        }).then(role => {
                            newUser.addRole(role.id).then(() => {
                                resolve(newUser);
                            });
                        });
                    });
                }else{
                    reject({
                        status: "failed",
                        message: "A user exists with the same empId and email"
                    });
                }
            });
        });
    }
}

module.exports = EmployeeController;
