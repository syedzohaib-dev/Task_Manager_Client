export const API_PATHS = {
    AUTH: {
        SIGNUP: "/api/v1/auth/signup",
        LOGIN: "/api/v1/auth/login",
    },
    USER: {
        GET_USER: "/api/v1/user/getuser", // id
        GET_ALL_USERS: "/api/v1/user/getallusers",
        EDIT_USER: "/api/v1/user/edituser", // id
        DELETE_USER: "/api/v1/user/deleteuser", // id
        UPLOAD_PROFILE: "/api/v1/user/uploadprofile",
        LOGOUT: "/api/v1/user/logout",
    },
    TASK: {
        ADD_TASK: "/api/v1/task/addtask",
        EDIT_TASK: "/api/v1/task/edittask", //id
        ADD_COMMENT: "/api/v1/task/addcomment", //id
        MOVE_TO_TRASH: "/api/v1/task/movetotrash", //id
        RESTORE_TRASH: "/api/v1/task/restoretrash", //id
        DELETE_TASK: "/api/v1/task/deletetask", //id
        DUPLICATE_TASK: "/api/v1/task/duplicatetask", //id
        ADD_ACTIVITY: "/api/v1/task/addactivity", //id
        GET_TASK: "/api/v1/task/gettask", //id
        GET_ALL_TASK: "/api/v1/task/all", //id
        // UPLOAD_ASSETS:"/api/v1/task/uploadassets"
    },
};