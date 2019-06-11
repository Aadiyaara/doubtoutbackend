const Student = require('../../schema/models/Student')
const Teacher = require('../../schema/models/Tutor')
const Session = require('../../schema/models/Session')
const Course = require('../../schema/models/Course')

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
            return err
        }
    },
    teacher: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const teacher = await Teacher.findById(req.userId)
            return teacher
        }
        catch (err) {
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
            return err
        }
    },
    studentDoubtSessions: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const sessions = await Session.find({students: { $in: req.userId }})
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
            const sessions = await Session.find({teacher: req.userId })
            return sessions
        }
        catch (err) {
            return err
        }
    },
    //// TESTING START
    // FOR TESTING 25 to 1 in 8th class App
    courseSessions: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const course = await Course.findOne({teacher: req.userId, code: args.courseCode})
            const sessions = await Session.find({teacher: req.userId,  course: course._id})
            return sessions
        }
        catch (err) {
            return err
        }
    },
    sessionStudents: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            console.log('Getting')
            const students = await Student.find({sessions: {$in: args.sessionId}})
            console.log(students)
            return students
        }
        catch (err) {
            return err
        }
    },
    //// TESTING END
    courseStudents: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const students = await Student.find({courses: {$in: args.courseId}})
            return students
        }
        catch (err) {
            return err
        }
    },
    teacherDoubtSession: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            console.log("Finding: ", args.name, req.userId)
            const session = await Session.findOne({teacher: req.userId, name: args.name})
            return session
        }
        catch (err) {
            console.log('Error getting the Session: ', err)
            
        }
    },
    // Courses Details of the Student
    studentCourses: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const courses = await Course.find({students: { $in: req.userId }})
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
                phone: args.studentInput.phoneNumber,
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
                dateJoined: new Date().toString(),
                dateLastLogin: new Date().toString()
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
    createDoubtSession: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            token = ''
            const course = await Course.findOne({token: args.courseToken, teacher: req.userId})
            console.log(course)
            var randomPossibilites = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            for (var i = 0; i < 10; i++) token += randomPossibilites.charAt(Math.floor(Math.random() * randomPossibilites.length))
            const session = new Session({
                name: args.name,
                teacher: req.userId,
                sessionToken: token,
                attendance: 0,
                course: course,
                dateCreated: new Date().toString(),
                isComplete: false
            })
            console.log("COURSE ID", course._id)
            console.log(await Course.findByIdAndUpdate(course._id, {$push: {sessions: session}}, {new: true}))
            return await session.save()
        }
        catch (err) {
            console.log(err)
            return err
        }
    },
    createCourse: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const course = await Course.findOne({ teacher: req.userId, name: args.name })
            if(course) {
                throw new Error('A course by this name exists already, try another name')
            }
            const teacher = await Teacher.findById(req.userId)
            var token = teacher.name.slice(0, 3)
            token = token.toUpperCase()
            var randomPossibilites = '01234456789'
            for (var i = 0; i < 5; i++) token += randomPossibilites.charAt(Math.floor(Math.random() * randomPossibilites.length))
            const newCourse = new Course({
                name: args.name,
                code: args.code,
                token: token,
                teacher: req.userId,
                strength: 0,
                dateMade: Date.toString(),
                isOpen: true,
            })
            return newCourse.save()
        }
        catch (err) {
            return err
        }
    },
    availableCourses: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const courses = await Course.find({year: args.availableCoursesInput.year, branch: args.availableCoursesInput.branch, group: args.availableCoursesInput.group}).populate({
                path: 'sessions',
                populate: { path: 'sessions' }
            })
            return courses
        }
        catch (err) {
            console.log('Error fetching the available courses: ', err)
            return err
        }
    },
    joinCourse: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const course = await Course.findOneAndUpdate({token: args.token}, {$push: {students: req.userId}, $inc: {strength: 1}}, {new: true})
            if(!course) {
                throw new Error('No Such Course')
            }
            await Student.findByIdAndUpdate(req.userId, {$push: {courses: course._id}}, {new: true})
            return course
        }
        catch (err) {
            console.log(err)
            return err
        }
    },
    //// TESTING START
    // FOR TESTING 25 to 1 in 8th class App
    markAttendance: async (args, req) => {
        try {
            // if(!req.isAuth) {
            //     throw new Error('Unauthenticated')
            // }
            const session = await Session.find({sessionToken: args.token})
            if(session) {
                try {
                    const saveSession = await Session.findOneAndUpdate({
                        SessionToken: args.token
                    }, {
                        // $push: { student: req.userId },
                        $inc: {attendance: 1} 
                    }, {
                        new: true
                    })
                    // const saveStudent = await Student.findByIdAndUpdate(
                    //     req.userId,
                    //     {
                    //         $push: { sessions: saveSession }
                    //     },
                    //     {
                    //         new: true
                    //     }
                    // )
                }
                catch (err) {
                    return err
                }
                finally {
                    return 'Marked Present'
                }
            }
            else {
                return 'No Such Session Exists'
            }
        }
        catch (err) {
            return err
        }
    },
    //// TESTING END
    completeDoubtSession: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const currentSession = await Session.findOneAndUpdate({sessionToken: args.sessionToken}, {isComplete: true}, {new: true})
            return currentSession
        }
        catch (err) {
            return err
        }
    },
    //// TO IMPLEMENT
    // Suspend Doubt Session
    closeCourse: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const currentCourse = await Course.findOneAndUpdate({name: args.name, teacher: args.userId}, {isOpen: false}, {new: true})
            return currentCourse
        }
        catch (err) {
            console.log('Unable to close the course: ', err)
            return err
        }
    },
    // Save into history object Later *#*AAA*#*
    completeCourse: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const byeByeCourse = await Course.deleteOne({name: args.name, teacher: args.userId})
            return byeByeCourse
            // Add Login to save to Past
        }
        catch (err) {
            console.log('Error complete and deleting the course', err)
            return err            
        }
    },
    doubtsessions: async (args, req) => {
        const sessions = await Session.find()
        return sessions
    },
    courses: async (args, req) => {
        const courses = await Course.find()
        return courses
    },
    course: async (args, req) => {
        const course = await Course.findById(args.courseId)
        return course
    }
}