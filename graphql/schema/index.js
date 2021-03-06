const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type Student {
        _id: ID!
        name: String!
        email: String!
        address: String!
        phoneNumber: String!
        password: String
        dateJoined: String
        courses: [Course!]
        group: Group
        dateLastLogin: String
        lastDoubtSession: DoubtSession
        lastQuizSession: QuizSession
        doubtSessions: [DoubtSession!]
        quizSessions: [QuizSession!]
    }
    
    type Teacher {
        _id: ID!
        name: String!
        email: String!
        password: String
        age: Int!
        courses: [Course!]
        dateJoined: String
        dateLastLogin: String
        isAvailable: Boolean!
        isOnline: Boolean!
        lastSession: DoubtSession
        sessions: [DoubtSession!]
        rating: TeacherRating
    }

    type DoubtSession {
        _id: ID!
        questionText: String!
        questionImage: String
        teacher: Teacher!
        course: Course
        student: Student!
        token: String!
        duration: Int
        rating: DoubtSessionRating
        dateCreated: String!
        isBroken: Boolean!
        isComplete: Boolean!
        rawDataPoints: [String!]
        rawDataColors: [String!]
    }

    type Request {
        _id: ID!
        student: Student!
        teacher: Teacher
        doubtSession: DoubtSession
        doubtText: String!
        doubtImage: String
        bounceRate: Int
        validated: Boolean!
        rejected: Boolean!
        isOpen: Boolean!
    }

    type Quiz {
        _id: ID!
        name: String!
        courses: [Course!]
        dateMade: String!
        dateLastAttempted: String!
        questions: [QuizQuestion!]
        quizSessions: [QuizSession!]
        timesAttempted: Int!
    }

    type QuizSession {
        _id: ID!
        quiz: Quiz!
        dateAttempted: String!
        student: Student!
    }

    type QuizQuestion {
        _id: ID!
        quiz: Quiz!
        questionText: String!
        difficulty: String!
        answer: String!
        options: [String!]!
    }

    type Rating {
        _id: ID!
        type: String!
        doubtSession: DoubtSession
        quiz: Quiz
        teacher: Teacher
        rating: Float!
    }

    type TeacherRating {
        _id: ID!
        teacher: Teacher!
        ratings: [Rating!]
        reting: Float!
    }

    type DoubtSessionRating {
        _id: ID!
    }

    type Group {
        _id: ID!
        name: String!
        kind: String!
        students: [Student!]!
        dateMade: String!
        doubtSessions: [DoubtSession!]
    }

    type Course {
        _id: ID!
        name: String!
        code: String!
        targetGroup: String!
        quizzes: [Quiz!]
        teachers: [Teacher!]
        dateMade: String!
        isOpen: Boolean!
    }

    input StudentInput {
        email: String!
        name: String!
        password: String!
        phoneNumber: String!
        address: String!
    }

    input TeacherInput {
        email: String!
        name: String!
        password: String!
        age: Int!
    }

    input ManagerInput {
        name: String!
        email: String!
        password: String!
    }

    input QuizQuestionInput {
        questionId: String
        quizId: String
        questionText: String!
        options: [String!]!
        answer: String!
        difficulty: String!
    }

    input AnswerQuestionInput {
        quizSessionId: String!
        quizId: String!
        answer: String!
    }

    input CourseInput {
        name: String!
        code: String!
        targetGroup: String!
    }
    
    type AuthData {
        userId: ID!
        token: String!
        typeUser: String!
        tokenExpiration: Int!
    }

    type RootQuery {
        students: [Student!]!
        teachers: [Teacher!]!
        student: Student!
        teacher: Teacher!
        studentById(studentId: String!): Student!
        teacherById(teacherId: String!): Teacher!
        requests: [Request!]
        doubtSessions: [DoubtSession!]
        studentDoubtSessions: [DoubtSession!]!
        teacherDoubtSessions: [DoubtSession!]!
        studentCourses: [Course!]
        teacherCourses: [Course!]
        checkMyRequest(requestId: String!): Request!
        askForRequest: Request!
        getRawData(doubtSessionId: String!): DoubtSession!
        quizzes: [Quiz!]
        quizQuestions(quizId: String!): [QuizQuestion!]
        quizSessions(quizId: String!): [QuizSession!]
        courses: [Course!]
        groups: [Group!]
        studentGroup: Group!
    }
    
    type RootMutation {
        createStudent(studentInput: StudentInput): AuthData!
        createTeacher(teacherInput: TeacherInput): AuthData!
        createManager(managerInput: ManagerInput!): AuthData!
        loginStudent(method: String!, password: String!): AuthData!
        loginTeacher(method: String!, password: String!): AuthData!
        loginManager(method: String!, password: String!): AuthData!
        askDoubt(doubtText: String!, doubtImage: String): Request! 
        completeDoubtSession(doubtSessionId: String!): DoubtSession!
        teacherIsAvailable: String!
        teacherIsUnavailable: String!
        acceptRequest(requestId: String!): DoubtSession!
        rejectRequest(requestId: String!): String!
        sendRawData(doubtSessionId: String!, rawDataPoints: [String!], rawDataColors: [String!]): String!
        makeQuiz(name: String!, courses: [String!]): Quiz!
        addQuizQuestion(quizQuestionInput: QuizQuestionInput!): QuizQuestion!
        removeQuizQuestion(questionId: String!): String!
        updateQuizQuestion(quizQuestionInput: QuizQuestionInput!): QuizQuestion!
        startQuizSession(quizId: String!): QuizSession!
        answerQuizQuestion(answerQuestionInput: AnswerQuestionInput!): String!
        createCourse(courseInput: CourseInput!): Course!
        createGroup(name: String!, kind: String!): Group!
        addStudentToGroup(groupId: String!): String!
        removeStudentFromGroup: String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)


// addIntern(internInput: InternInput!): Admin!
// addModerator(moderatorInput: ModeratorInput): Admin!
// addManager(managerInput: ManagerInput): Admin!