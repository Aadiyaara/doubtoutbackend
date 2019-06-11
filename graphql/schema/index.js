const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type Student {
        _id: ID!
        name: String!
        email: String!
        password: String
        dateJoined: String
        dateLastLogin: String
        lastSession: Session
        sessions: [Session!]
    }
    
    type Teacher {
        _id: ID!
        name: String!
        email: String!
        password: String
        dateJoined: String
        dateLastLogin: String
        lastSession: Session
        sessions: [Session!]
    }

    type Session {
        _id: ID!
        name: String!
        teacher: Teacher!
        attendance: Int!
        course: Course!
        sessionId: String!
        students: [Student!]!
        sessionToken: String!
        dateCreated: String!
        isComplete: Boolean!
    }

    type Course {
        _id: ID!
        name: String!
        code: String!
        token: String!
        sessions: [Session!]
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
    }

    input SessionInput {
        name: String!
        sessionToken: String!
    }
    
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type RootQuery {
        students: [Student!]!
        teachers: [Teacher!]!
        student: Student!
        teacher: Teacher!
        sessions: [Session!]!
        studentSessions: [Session!]!
        teacherSessions: [Session!]!
        courseSessions (courseCode: String!) : [Session!]!
        teacherSession(name: String!): Session!
        studentCourses: [Course!]
        teacherCourses: [Course!]
    }
    
    type RootMutation {
        createStudent(studentInput: StudentInput): AuthData!
        createTeacher(teacherInput: TeacherInput): AuthData!
        createSession(courseToken: String!, name: String!): Session!
        createCourse(name: String!, code: String!): Course!
        loginStudent(method: String!, password: String!): AuthData!
        loginTeacher(method: String!, password: String!): AuthData!
        joinCourse(token: String!): Course!
        markAttendance(token: String!): String!
        completeSession(sessionId: String!): Session!
        closeCourse(name: String): Course!
        completeCourse(name: String): Course!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)