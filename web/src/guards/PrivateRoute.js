import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthStore';

function PrivateRoute({ component: Component, ...routeProps}) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route {...routeProps} component={(componentProps => {
      if (isAuthenticated()) return <Component {...componentProps}/>
      else return <Redirect to="/login"/>
    }) } />
  )
}

export default PrivateRoute;
