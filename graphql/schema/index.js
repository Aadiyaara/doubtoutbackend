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
        dateLastLogin: String
        lastSession: DoubtSession
        sessions: [DoubtSession!]
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
        quiz: Quiz!
        dateAttempted: String!
        student: Student!
    }

    type QuizQuestion {
        questionText: String!
        difficulty: String!
        options: [String!]!
    }

    type Rating {
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

    type Course {
        _id: ID!
        name: String!
        code: String!
        token: String!
        sessions: [DoubtSession!]
        teacher: Teacher!
        students: [Student!]
        strength: Int!
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
        doubtSessions: [DoubtSession!]
        studentDoubtSessions: [DoubtSession!]!
        teacherDoubtSessions: [DoubtSession!]!
        studentCourses: [Course!]
        teacherCourses: [Course!]
        checkMyRequest(requestId: String!): Request!
        askForRequest: Request!
        getRawData(doubtSessionId: String!): DoubtSession!
    }
    
    type RootMutation {
        createStudent(studentInput: StudentInput): AuthData!
        createTeacher(teacherInput: TeacherInput): AuthData!
        loginStudent(method: String!, password: String!): AuthData!
        loginTeacher(method: String!, password: String!): AuthData!
        askDoubt(doubtText: String!, doubtImage: String): Request! 
        completeDoubtSession(doubtSessionId: String!): DoubtSession!
        teacherIsAvailable: String!
        teacherIsUnavailable: String!
        acceptRequest(requestId: String!): DoubtSession!
        rejectRequest(requestId: String!): String!
        sendRawData(doubtSessionId: String!, rawDataPoints: [String!], rawDataColors: [String!]): String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)


// addIntern(internInput: InternInput!): Admin!
// addModerator(moderatorInput: ModeratorInput): Admin!
// addManager(managerInput: ManagerInput): Admin!