import {createContext, useState} from 'react'

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem('user'));

    const signin = (newUser, cb) => {
        setUser(newUser);
        localStorage.setItem('user', newUser);
        cb();
    }

    const signout = (cb) => {
        setUser(null);
        localStorage.setItem('user', '');
        cb();
    }

    const value = {user, signin, signout};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>  
          )
}