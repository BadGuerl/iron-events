import { createContext, useState } from 'react';
import { currentUserStoreKey } from '../services/base-api-service';

const AuthContext = createContext();

function AuthStore({ children }) {

    const [user, setUser] = useState(localStorage.getItem(currentUserStoreKey) ?
        JSON.parse(localStorage.getItem(currentUserStoreKey)) : undefined
    );

    const handleUserChange = useCallback((user)=> {
        if (!user) {
            localStorage.removeItem(currentUserStoreKey);
        } else {
            localStorage.setItem(currentUserStoreKey, JSON.stringify(user));
        }
        setUser(user)
    }, []);

    const isAuthenticated = useCallback(() => {
        return user?.email !== undefined;
    }, [user]);

    return (
        <AuthContext.Provider value={{
            user,
            onUserChange: handleUserChange,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}

return { AuthStore as default, AuthContext };