const Student = require('../../schema/models/Student/Student')
const Teacher = require('../../schema/models/Teacher/Teacher')
const Manager = require('../../schema/models/Admin/Manager')
const DoubtSession = require('../../schema/models/Doubt/DoubtSession')
const Course = require('../../schema/models/Studies/Course')
const Request = require('../../schema/models/Doubt/Request')
const Quiz = require('../../schema/models/Quiz/Quiz')
const QuizSession = require('../../schema/models/Quiz/QuizSession')
const QuizQuestion = require('../../schema/models/Quiz/QuizQuestion')
const Group = require('../../schema/models/Student/Group')

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
    requests: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const requests = await Request.find()
            return requests
        }
        catch (err) {
            throw new Error('Error getting all requests')
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
            const request = await Request.findOne({isOpen: true, teacher: req.userId, validated: false, rejected: false}).populate('student')
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
            const doubtSession = await DoubtSession.findById(args.doubtSessionId)
            return doubtSession
        }
        catch (err) {
            console.log('Error getting the raw data for this session: ', err)
            return err
        }
    },
    quizzes: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const quizzes = await Quiz.find()
            return quizzes
        }
        catch (err) {
            console.log('Error getting all the Quizzes: ', err)
            return err
        }
    },
    quizQuestions: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const questions = await QuizQuestion.find({quiz: args.quizId})
            return questions
        }
        catch (err) {
            console.log('Error getting the Quiz questions for this session: ', err)
            return err
        }
    },
    quizSessions: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const questions = await QuizSession.find({quiz: args.quizId})
            return questions
        }
        catch (err) {
            console.log('Error getting the Quiz sessions for this Quiz: ', err)
            return err
        }
    },
    courses: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            return await Course.find()
        }
        catch (err) {
            console.log('Error getting all the courses')
            return err
        }
    },
    groups: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            return await Group.find()
        }
        catch (err) {
            console.log('Error retrieving all the groups: ', err)
            return err
        }
    },
    studentGroup: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const processStudent = await Student.findById(req.userId)
            if (processStudent.group == null) throw new Error('Student is not a part of any group')
            return await Group.findOne({students: {$in : req.userId}})
        }
        catch (err) {
            console.log('Error getting the student group: ', err)
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
    loginManager: async (args, req) => {
        try {
            const manager = await Manager.findOne({ email: args.method })
            if(!manager) {
                console.log('User does not Exist')
                throw new Error('User does not exist')
            }
            const isEqual = await bcrypt.compare(args.password, manager.password)
            if(!isEqual) throw new Error('Invalid Password')
            const token = jwt.sign({userId: manager.id}, 'ninenine', {
                expiresIn: '8760h'
            })
            return { userId: manager.id, token: token, typeUser: 'Manager', tokenExpiration: 8760 }
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
                dateJoined: new Date().toDateString(),
                dateLastLogin: new Date().toDateString()
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
                dateJoined: new Date().toDateString(),
                dateLastLogin: new Date().toDateString(),
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
    createManager: async (args) => {
        try {
            const manager = await Manager.findOne({ email: args.managerInput.email })
            if(manager) {
                throw new Error('User exists already')
            }
            const hashedPassword = await bcrypt.hash(args.managerInput.password, 12)
            const newManager = new Manager({
                name: args.managerInput.name,
                email: args.managerInput.email,
                password: hashedPassword,
                dateJoined: new Date().toDateString(),
                dateLastLogin: new Date().toDateString(),
                isAvailable: true,
                isOnline: true
            })
            savedManager = await newManager.save()
            const token = jwt.sign({userId: savedManager.id}, 'ninenine', {
                expiresIn: '8760h'
            })
            return { userId: savedManager.id, token: token, typeUser: 'Manager', tokenExpiration: 8760 }
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
                doubtImage: args.doubtImage,
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
                    dateCreated: new Date().toDateString(),
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
    },
    makeQuiz: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const isAlreadyDefined = await Quiz.findOne({name: args.name})
            if(isAlreadyDefined) {
                throw new Error('A Quiz by this name already exists')
            }
            const quiz = new Quiz({
                name: args.name,
                courses: args.courses,
                dateMade: new Date().toDateString(),
                timesAttempted: 0
            })
            const savedQuiz = await quiz.save()
            return savedQuiz
        }
        catch (err) {
            console.log('Error Defining the Quiz: ', err)
            return err
        }
    },
    addQuizQuestion: async(args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const isAlreadyInQuiz = await QuizQuestion.findOne({questionText: args.quizQuestionInput.questionText, quiz: args.quizQuestionInput.quizId})
            if(isAlreadyInQuiz) {
                throw new Error('A Question by this name already exists in the Quiz')
            }
            console.log('here')
            const quizQuestion = new QuizQuestion({
                quiz: args.quizQuestionInput.quizId,
                questionText: args.quizQuestionInput.questionText,
                difficulty: args.quizQuestionInput.difficulty,
                answer: args.quizQuestionInput.answer,
                options: args.quizQuestionInput.options
            })
            const savedQuizQuestion = await quizQuestion.save()
            await Quiz.findByIdAndUpdate(args.quizQuestionInput.quizId, {$push: {questions: savedQuizQuestion}})
            return savedQuizQuestion
        }
        catch (err) {
            console.log('Error Adding the Question to the Quiz: ', err)
            return err
        }
    },
    removeQuizQuestion: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            await Quiz.findByIdAndUpdate(args.quizId, { $pull: { questions: args.questionId } })
            await QuizQuestion.findByIdAndDelete(args.questionId)
            return 'Done'
        }
        catch (err) {
            console.log('Error Removing the Question from the Quiz: ', err)
            return err
        }
    },
    updateQuizQuestion: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const newQuestion = await QuizQuestion.findByIdAndUpdate(args.quizQuestionInput.questionId, {questionText: args.quizQuestionInput.questionText, options: args.quizQuestionInput.options, answer: args.quizQuestionInput.answer, difficulty: args.quizQuestionInput.difficulty}, {new: true})
            return newQuestion
        }
        catch (err) {
            console.log('Error Updateing the Quiz Question: ', err)
            return err
        }
    },
    startQuizSession: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const quizSession = new QuizSession({
                quiz: args.quizId,
                student: req.userId,
                score: 0,
                answers: [],
                dateAttempted: new Date().toDateString()
            })
            const savedQuizSession = await quizSession.save()
            return savedQuizSession
        }
        catch (err) {
            console.log('Error joining a new QuizSession: ', err)
            return err
        }
    },
    answerQuizQuestion: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            isCorrect = false;
            const quizQuestion = await QuizQuestion.findById(args.answerQuestionInput.questionId)
            if(args.answerQuestionInput.answer == quizQuestion.answer) isCorrect = true
            if(isCorrect) {
                await QuizSession.findByIdAndUpdate(args.answerQuestionInput.quizSessionId, {$push: {answers: '[' + args.answerQuestionInput.questionId + ']: ' + args.answerQuestionInput.answer}, $inc: {score: 1}})
                return 'Correct'
            }
            else {
                await QuizSession.findByIdAndUpdate(args.answerQuestionInput.quizSessionId, {$push: {answers: '[' + args.answerQuestionInput.questionId + ']: ' + args.answerQuestionInput.answer}})
                return 'Wrong'
            }
        }
        catch (err) {
            console.log('Unable to record the answer of the quiz: ', err)
            return err
        }
    },
    createCourse: async (args, req) => {
        if(!req.isAuth) {
            throw new Error(Unauthenticated)
        }
        const course = new Course({
            name: args.courseInput.name,
            code: args.courseInput.code,
            targetGroup: argds.courseInput.targetGroup,
            dateMade: new Date().toDateString(),
            isOpen: true
        })
        return await course.save()
    },
    createGroup: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const group = new Group({
                name: args.name,
                kind: args.kind,
                students: [req.userId],
                dateMade: new Date().toDateString(),
                strength: 1
            })
            return await group.save()
        }
        catch (err) {
            console.log('Error Creating the Group: ', err)
            return err
        }
    },
    addStudentToGroup: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const groupToJoin = await Group.findById(args.groupId)
            if(!groupToJoin) throw new Error('No Such Group!')
            if(groupToJoin.strength == 4) throw new Error('Group reached its maximum capacity')
            await Group.findByIdAndUpdate(args.groupId, {$push: {students: req.userId}, $inc: {strength: 1}}, {new: true})
            return 'Done Successfully'
        }
        catch (err) {
            console.log('Error adding student to the group: ', err)
        }
    },
    removeStudentFromGroup: async (args, req) => {
        try {
            if(!req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const processStudent = await Student.findById(req.userId)
            const groupToLeave = await Group.findById(processStudent.group)
            if(!groupToLeave) throw new Error('Student is not a part of any group')
            await Student.findByIdAndUpdate(req.userId, {group: null}, {new: true})
            if(groupToLeave.strength == 1) {
                // Group must be deleted
                await Group.findByIdAndDelete(groupToLeave._id)
            }
            else {
                // Group can strive
                await Group.findByIdAndUpdate(groupToLeave._id, {$pull: {students: req.userId}, $inc: {strength: -1}}, {new: true})
            }
            return 'Done Successfully'
        }
        catch (err) {
            console.log('Error leaving the group: ', err)
            return err
        }
    }
}