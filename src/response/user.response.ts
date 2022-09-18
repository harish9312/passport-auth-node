// export enum EUserResponse {
//     LOGIN_SUCCESS,
//     LOGIN_FAILED,
//     SIGNUP_SUCCESS,
//     USER_ALREADY_REGISTERED
// }

// export const UserResponse = {
//     [EUserResponse.LOGIN_FAILED]: {
//         message: "EMAIL OR PASSWORD IS INCORRECT",
//         statusCode: 403
//     },
//     [EUserResponse.LOGIN_SUCCESS]: {
//         message: "LOGGED IN SUCCESFULLY"
//     },
//     [EUserResponse.SIGNUP_SUCCESS]: {
//         message: "REGISTERED SUCCESFULLY"
//     },
//     [EUserResponse.USER_ALREADY_REGISTERED]: {
//         message: "USER WITH THIS EMAIL ALREADY REGISTERED",
//         statusCode:404
//     }
// }
export enum EUserResponse {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SIGNUP_SUCCESS,
    USER_ALREADY_REGISTERED,
    NOT_ACCEPTABLE,
    CANNOT_UPDATE,
   
}

export const UserResponse = {
   
    [EUserResponse.CANNOT_UPDATE]: {
        message: "YOU CANNOT EDIT EMAIL",
        statusCode: 406
    },
    [EUserResponse.NOT_ACCEPTABLE]: {
        message: "PASSWORD AND REPEATPASSWORD MUST BE SAME",
        statusCode: 406
    },
    [EUserResponse.LOGIN_FAILED]: {
        message: "EMAIL OR PASSWORD IS INCORRECT",
        statusCode: 403
    },
    [EUserResponse.LOGIN_SUCCESS]: {
        message: "LOGGED IN SUCCESFULLY"
    },
    [EUserResponse.SIGNUP_SUCCESS]: {
        message: "REGISTERED SUCCESFULLY"
    },
    [EUserResponse.USER_ALREADY_REGISTERED]: {
        message: "USER WITH THIS EMAIL ALREADY REGISTERED",
        statusCode:404
    }
}