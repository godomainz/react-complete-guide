export type OrderForm = {
        name: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean
            },
            valid: boolean,
            touched: boolean
        };
        street: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean
            },
            valid: boolean,
            touched: boolean
        };
        zipCode?: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean,
                minLength?: number,
                maxLength?: number
            },
            valid: boolean,
            touched: boolean
        };
        country?: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean
            },
            valid: boolean,
            touched: boolean
        };
        email: {
            elementType: string,
            elementConfig: {
                type: string;
                placeholder: string;
            },
            value:string,
            validation?: {
                required?: boolean
            },
            valid: boolean,
            touched: boolean
        };
        deliveryMethod: {
            elementType: string,
            elementConfig: {
                options: {value: string, displayValue: string}[] 
            },
            value:string,
            validation?: {}
            valid: boolean
        };
}

export const OrderFormModel:OrderForm = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Street'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    zipCode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 5
        },
        valid: false,
        touched: false
    },
    country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Country'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'}
            ]
        },
        value: 'fastest',
        validation: {},
        valid: true
    }
}