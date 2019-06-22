const Student = require('../../schema/models/Student/Student')
const Teacher = require('../../schema/models/Teacher/Teacher')
const DoubtSession = require('../../schema/models/Doubt/DoubtSession')
const Course = require('../../schema/models/Studies/Course')
const Request = require('../../schema/models/Doubt/Request')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    student: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const student = await Student.findById(req.userId)
            return student
        }
        catch (err) {
            console.log('Error getting the Student: ', err)
            return err
        }
    },
    students: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const students = await Student.find()
            return students
        }
        catch (err) {
            console.log('Error getting the Students: ', err)
            return err
        }
    },
    studentById: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const student = await Student.findById(args.studentId)
            return student
        }
        catch (err) {
            console.log('Error getting the Student by Id: ', err)
            return err
        }
    },
    //// Password Protected for both the Student and the Admin
    //// MODES: [Student, Admin]
    // updateStudent: async (args, req) => {
    //     try {
    //         if(!req.isAuth) {
    //             throw new Error('Unauthenticated')
    //         }
    //     }
    //     catch (err) {
    //         console.log('Error updateing the Student: ', err)
    //         return err    
    //     }
    // },
    teacher: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const teacher = await Teacher.findById(req.userId)
            return teacher
        }
        catch (err) {
            console.log('Error getting the Teacher: ', err)
            return err
        }
    },
    teachers: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const teachers = await Teacher.find()
            return teachers
        }
        catch (err) {
            console.log('Error getting the Teachers: ', err)
            return err
        }
    },
    teacherById: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const teacher = await Teacher.findById(args.teacherId)
            return teacher
        }
        catch (err) {
            console.log('Error getting the Teacher by Id: ', err)
            return err    
        }
    },
    doubtsessions: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const sessions = await DoubtSession.find()
            return sessions
        }
        catch (err) {
            console.log('Error getting the DoubtSessions: ', err)
            return err
        }
    },
    //// Password Protected fot both the teacher and the Admin
    //// MODES: [Teacher, Admin]
    // updateTeacher: async (args, req) => {
    //     try {
    //         if(!req.isAuth) {
    //             throw new Error('Unauthenticated')
    //         }
    //         const teacher = await Teacher.findByIdAndUpdate(req.userId, {name: args.updateTeacherInput.name, age: args.updateTeacherInput.age, email:  args.updateTeacherInput.email, })
    //         return teacher
    //     }
    //     catch (err) {
    //         console.log('Error updateing the Teacher: ', err)
    //         return err    
    //     }
    // },
    studentDoubtSessions: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const sessions = await DoubtSession.find({student: req.userId })
            return sessions
        }
        catch (err) {
            return err
        }
    },
    teacherDoubtSessions: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const sessions = await DoubtSession.find({teacher: req.userId })
            return sessions
        }
        catch (err) {
            return err
        }
    },
    //// TESTING START
    // FOR TESTING 25 to 1 in 8th class App
    // courseSessions: async (args, req) => {
    //     try {
    //         if(!req.isAuth) {
    //             throw new Error('Unauthenticated')
    //         }
    //         const course = await Course.findOne({teacher: req.userId, code: args.courseCode})
    //         const sessions = await DoubtSession.find({teacher: req.userId,  course: course._id})
    //         return sessions
    //     }
    //     catch (err) {
    //         return err
    //     }
    // },
    // sessionStudents: async (args, req) => {
    //     try {
    //         if(!req.isAuth) {
    //             throw new Error('Unauthenticated')
    //         }
    //         console.log('Getting')
    //         const students = await Student.find({sessions: {$in: args.sessionId}})
    //         console.log(students)
    //         return students
    //     }
    //     catch (err) {
    //         return err
    //     }
    // },
    //// TESTING END
    // courseStudents: async (args, req) => {
    //     try {
    //         if(!req.isAuth) {
    //             throw new Error('Unauthenticated')
    //         }
    //         const students = await Student.find({courses: {$in: args.courseId}})
    //         return students
    //     }
    //     catch (err) {
    //         return err
    //     }
    // },
    // teacherDoubtSession: async (args, req) => {
    //     try {
    //         if(!req.isAuth) {
    //             throw new Error('Unauthenticated')
    //         }
    //         console.log("Finding: ", args.name, req.userId)
    //         const session = await Session.findOne({teacher: req.userId, name: args.name})
    //         return session
    //     }
    //     catch (err) {
    //         console.log('Error getting the Session: ', err)
            
    //     }
    // },
    // Courses Details of the Student
    studentCourses: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const courses = await Course.find({students: req.userId })
            return courses
        }
        catch (err) {
            return err
        }
    },
    // Defines what courses the Teacher is fluent in
    teacherCourses: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const courses = await Course.find({teacher: req.userId })
            return courses
        }
        catch (err) {
            return err
        }
    },
    checkMyRequest: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const request = await Request.findById(args.requestId)
            return request
        }
        catch (err) {
            console.log('Error checking for student pending request: ', err)
            return err
        }
    },
    askForRequest: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const request = Request.findOne({isOpen: true, teacher: req.userId, validated: false, rejected: false}).populate('student')
            if(!request) {
                throw new Error('No Request Recieved')
            }
            return request
        }
        catch (err) {
            console.log('Error asking for requests: ', err)
            return err
        }
    },
    getRawData: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const doubtSession = DoubtSession.findById(args.doubtSessionId)
            return doubtSession
        }
        catch (err) {
            console.log('Error getting the raw data for this session: ', err)
            return err
        }
    },
    loginStudent: async (args, req) => {
        try {
            const student = await Student.findOne({ email: args.method })
            if(!student) {
                console.log('User does not Exist')
                throw new Error('User does not exist')
            }
            const isEqual = await bcrypt.compare(args.password, student.password)
            if(!isEqual) throw new Error('Invalid Password')
            const token = jwt.sign({userId: student.id}, 'ninenine', {
                expiresIn: '8760h'
            })
            return { userId: student.id, token: token, typeUser: 'Student', tokenExpiration: 8760 }
        }
        catch (err) {
            return err
        }
    },
    loginTeacher: async (args, req) => {
        try {
            const teacher = await Teacher.findOne({ email: args.method })
            if(!teacher) {
                console.log('User does not Exist')
                throw new Error('User does not exist')
            }
            const isEqual = await bcrypt.compare(args.password, teacher.password)
            if(!isEqual) throw new Error('Invalid Password')
            const token = jwt.sign({userId: teacher.id}, 'ninenine', {
                expiresIn: '8760h'
            })
            return { userId: teacher.id, token: token, typeUser: 'Teacher', tokenExpiration: 8760 }
        }
        catch (err) {
            return err
        }
    },
    // AAA Nullify the password
    createStudent: async (args) => {
        try {
            const student = await Student.findOne({ email: args.studentInput.email })
            if(student) {
                throw new Error('User exists already')
            }
            const hashedPassword = await bcrypt.hash(args.studentInput.password, 12)
            const newStudent = new Student({
                name: args.studentInput.name,
                email: args.studentInput.email,
                password: hashedPassword,
                address: args.studentInput.address,
                phoneNumber: args.studentInput.phoneNumber,
                dateJoined: new Date().toString(),
                dateLastLogin: new Date().toString()
            })
            savedStudent = await newStudent.save()
            const token = jwt.sign({userId: savedStudent.id}, 'ninenine', {
                expiresIn: '8760h'
            })
            return { userId: savedStudent.id, token: token, typeUser: 'Student', tokenExpiration: 8760 }
        }
        catch (err) {
            return err
        }
    },
    // AAA Nullify the password
    createTeacher: async (args) => {
        try {
            const teacher = await Teacher.findOne({ email: args.teacherInput.email })
            if(teacher) {
                throw new Error('User exists already')
            }
            const hashedPassword = await bcrypt.hash(args.teacherInput.password, 12)
            const newTeacher = new Teacher({
                name: args.teacherInput.name,
                email: args.teacherInput.email,
                password: hashedPassword,
                age: args.teacherInput.age,
                dateJoined: new Date().toString(),
                dateLastLogin: new Date().toString(),
                isAvailable: true,
                isOnline: true
            })
            savedTeacher = await newTeacher.save()
            const token = jwt.sign({userId: savedTeacher.id}, 'ninenine', {
                expiresIn: '8760h'
            })
            return { userId: savedTeacher.id, token: token, typeUser: 'Teacher', tokenExpiration: 8760 }
        }
        catch (err) {
            return err
        }
    },
    askDoubt: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthorized')
            }
            //  Find an able teacher first
            const teachers = await Teacher.find({isOnline: true, isAvailable: true})
            if(teachers.length == 0) {
                throw new Error('No Teachers available')
            }
            console.log(teachers)
            console.log(Math.floor((Math.random() * teachers.length)));
            const teacher = teachers[Math.floor((Math.random() * teachers.length))]
            await Teacher.findByIdAndUpdate(teacher._id, {isAvailable: false})
            console.log('This doubt: ', args.doubtText,  ' had been assign to the teacher: ', teacher._id)
            const request = new Request({
                student: req.userId,
                teacher: teacher._id,
                doubtText: args.doubtText,
                doubtImage: false,
                bounceRate: 0,
                validated: false,
                rejected: false,
                isOpen: true
            })
            return await request.save()
        }
        catch (err) {
            console.log('Error asking the Doubt: ', err)
            return err
        }
    },
    completeDoubtSession: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const currentSession = await DoubtSession.findByIdAndUpdate(args.DoubtSessionId, {isComplete: true}, {new: true})
            return currentSession
        }
        catch (err) {
            return err
        }
    },
    //// TO IMPLEMENT
    // Suspend Doubt Session
    teacherIsAvailable: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const teacher = await Teacher.findByIdAndUpdate(req.userId, {isAvailable: true}, {new: true})
            console.log('Teacher: ', teacher.name, ' marked available')
            return 'Marked Available'
        }
        catch (err) {
            console.log('Error marking the teacher available: ', err)
            return err
        }
    },
    teacherIsUnavailable: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const teacher = await Teacher.findByIdAndUpdate(req.userId, {isAvailable: false}, {new: true})
            console.log('Teacher: ', teacher.name, ' marked unavailable')
            return 'Marked Unavailable'
        }
        catch (err) {
            console.log('Error marking the teacher unavailable: ', err)
            return err
        }
    },
    acceptRequest: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const request = await Request.findById(args.requestId)
            if(request) {
                token = ''
                var randomPossibilites = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                for (var i = 0; i < 6; i++) token += randomPossibilites.charAt(Math.floor(Math.random() * randomPossibilites.length))
                const doubtSession = new DoubtSession({
                    questionText: request.doubtText,
                    questionImage: request.doubtImage,
                    student: request.student,
                    teacher: request.teacher,
                    token: token,
                    dateCreated: new Date().toString(),
                    isBroken: false,
                    isComplete: false
                })
                const savedDoubtSession = await doubtSession.save()
                await Request.findByIdAndUpdate(args.requestId, {validated: true, doubtSession: savedDoubtSession}, {new: true})
                return savedDoubtSession
            }
        }
        catch (err) {
            console.log('Error accepting the request: ', err)
            return err
        }
    },
    rejectRequest: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const teachers = await Teacher.find({isOnline: true, isAvailable: true})
            if (teachers.length == 0) {
                await Request.findByIdAndUpdate(args.requestId, {rejected: true, teacher: null}, {new: true})
                await Teacher.findByIdAndUpdate(req.userId, {isAvailable: true}, {new: true})
                return 'Rejected'
            }
            const teacher = teachers[Math.floor(Math.random() * teachers.length)]
            await Request.findByIdAndUpdate(args.requestId, {teacher: teacher._id, $inc: {bounceRate: 1}}, {new: true})
            return 'Rejected'
        }
        catch (err) {
            console.log('Error rejecting the request: ', err)
            return err
        }
    },
    sendRawData: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            doubtSession = await DoubtSession.findByIdAndUpdate(args.doubtSessionId, {rawDataPoints: args.rawDataPoints, rawDataColors: args.rawDataColors})
            return 'Updated'
        }
        catch (err) {
            console.log('Error sending the Raw Data to the DoubtSession: ', err)
            return err
        }
    }
}