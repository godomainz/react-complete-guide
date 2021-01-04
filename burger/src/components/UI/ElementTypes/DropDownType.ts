export type DropDownType = {
    elementType: string,
            elementConfig: {
                options: {value: string, displayValue: string}[] 
            },
            value:string,
            validation?: {}
            valid: boolean
}