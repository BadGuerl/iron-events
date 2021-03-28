import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthStore';
// import Events from '../screens/Events';

function PrivateRoute({ component: Component, ...routeProps}) {
    // {}desestructura :renombra(si ponemos un = le da un valor por defecto) y ...le pasa todas las variables a routeProps
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Route {...routeProps} component={(componentProps) => {
        // <Route {...routeProps} component={() => {<Events color="blue"/>} } /> //Para pasarle propiedades a events
            if (isAuthenticated()) {
                return <Component {...componentProps} />
            } else {
                return <Redirect to="/login" />
            }
        }} />
    )
}

export default PrivateRoute;