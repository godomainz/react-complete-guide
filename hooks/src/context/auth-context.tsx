import React, {useState} from 'react';

interface IAuth{
    isAuth: boolean;
    login: () => any;
}

export const AuthContext = React.createContext<IAuth>({
    isAuth: false,
    login: () => {}
});

const AuthContextProvider= (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = () =>{
        console.log("Login");
        setIsAuthenticated(true);
    }

    return (
        <AuthContext.Provider value={{isAuth: isAuthenticated, login: loginHandler}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;