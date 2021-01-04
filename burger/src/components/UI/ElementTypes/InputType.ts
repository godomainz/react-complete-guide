export type InputType = {
    elementType: string,
    elementConfig: {
        type: string;
        placeholder: string;
    },
    value:string,
    validation?: {
        required?: boolean,
        minLength?: number,
        maxLength?: number,
        isEmail?: boolean
    },
    valid: boolean,
    touched: boolean
}
