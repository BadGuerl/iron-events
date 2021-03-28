import { createContext, useState, useCallback } from 'react';  // contexto proporciona los datos de padre a hijo, sin que tenga que ser hijo directo
import { currentUserStoreKey } from '../services/base-api-service';

const AuthContext = createContext();

function AuthStore({ children }) {

  const [user, setUser] = useState(localStorage.getItem(currentUserStoreKey) ? // local storage es la "base de datos" pero en el navegador
    JSON.parse(localStorage.getItem(currentUserStoreKey)) : undefined   // el stringify pasa los datos a string y el parse a objeto
  );
     /// cuando una funcion es una propiedad de un componente, usaremos el usecallback
  const handleUserChange = useCallback((user) => {  // hook usecallback envuelve la funcion y le pasa un array de dependencias
    if (!user) {  // si el usuario es undefined
      localStorage.removeItem(currentUserStoreKey); // me cargo la clave
    } else {   // pero si viene usuario
      localStorage.setItem(currentUserStoreKey, JSON.stringify(user));  // seteo la clave, y con JSOS.stringify lo guardo en el local storage
    }
    setUser(user)
  }, []);  // al usecallback como segundo argumento le pasamos un array de dependencias

  const isAuthenticated = useCallback(() => {  // el isAuthenticated tiene como dependencia el propio usuario
    return user?.email !== undefined;
  }, [user]);  // aqui se le pasa el usuario

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

export { AuthStore as default, AuthContext };
