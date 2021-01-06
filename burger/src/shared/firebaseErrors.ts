const EMAIL_EXISTS = "EMAIL_EXISTS";
const OPERATION_NOT_ALLOWED = "OPERATION_NOT_ALLOWED";
const TOO_MANY_ATTEMPTS_TRY_LATER = "TOO_MANY_ATTEMPTS_TRY_LATER";

const EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND";
const INVALID_PASSWORD = "INVALID_PASSWORD";
const USER_DISABLED = "USER_DISABLED";

export const getError = (error:string) => {
    switch(error){
        case EMAIL_EXISTS:
            return "Email address already exist in the database";
        case OPERATION_NOT_ALLOWED:
            return "Sorry this operation is NOT allowed";
        case TOO_MANY_ATTEMPTS_TRY_LATER:
            return "Too many attempts. Please try again later";
        case EMAIL_NOT_FOUND:
            return "Email address not found in the database";
        case INVALID_PASSWORD:
            return "Invalid password";
        case USER_DISABLED:
            return "This user is disabled";
        default:
            return error;
    }
}