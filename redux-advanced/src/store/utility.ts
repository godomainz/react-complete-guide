export const updatedObject = (oldObject:any,updatedValues:any) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};