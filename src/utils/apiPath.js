export const API_PATHS = {
    AUTH: {
        SIGNUP: "/api/v1/auth/signup",
        LOGIN: "/api/v1/auth/login", // complete
    },
    USER: {
        GET_USER: "/api/v1/user/getuser", // id  complete
        GET_ALL_USERS: "/api/v1/user/getallusers", // complete
        EDIT_USER: "/api/v1/user/edituser", // id  complete
        DELETE_USER: "/api/v1/user/deleteuser", // id complete 
        UPLOAD_PROFILE: "/api/v1/user/uploadprofile", // id  complete 
        LOGOUT: "/api/v1/user/logout", // id complete
    },
    TASK: {
        ADD_TASK: "/api/v1/task/addtask", // complete
        EDIT_TASK: "/api/v1/task/edittask", // id 
        ADD_COMMENT: "/api/v1/task/addcomment", // id complete
        MOVE_TO_TRASH: "/api/v1/task/movetotrash", // id complete
        RESTORE_TRASH: "/api/v1/task/restoretrash", // id complete
        DELETE_TASK: "/api/v1/task/deletetask", // id complete
        DUPLICATE_TASK: "/api/v1/task/duplicatetask", // id complete
        ADD_ACTIVITY: "/api/v1/task/addactivity", // id 
        ADD_SUB_TASK: "/api/v1/task/addsubtask", // id
        UPDATE_STATUS: "/api/v1/task/status", // id
        GET_TASK: "/api/v1/task/gettask", // id complete
        GET_ALL_TASK: "/api/v1/task/all", // complete
        GET_MY_TASK: "/api/v1/task/mytasks", // 
        GET_STATS: "/api/v1/task/getstats", //
        UPLOAD_ASSETS: "/api/v1/task/uploadassets" // id complete
    },
    NOTIFICATION: {
        CREATE_NOTI: '/api/v1/notification/createnotification',
        GET_NOTI: '/api/v1/notification/getnotifications'
    }
};