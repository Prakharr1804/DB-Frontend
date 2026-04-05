import { createContext, useState } from "react";


export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)
    
    return (
        <AuthContext.Provider value = {{user, setUser, loading, setLoading, token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}