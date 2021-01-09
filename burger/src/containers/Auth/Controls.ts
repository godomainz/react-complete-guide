import { InputType } from "../../components/UI/ElementTypes/InputType";
export type Controls = {
    email: InputType;
    password: InputType;
}

export const ControlModal:Controls = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    }
}