import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import Events from './screens/Events';
import EventForm from './components/events/EventForm';
import EventDetail from './components/events/EventDetail';
import Login from './screens/Login';
import Register from './screens/Register';
import AuthStore from './contexts/AuthStore';
<<<<<<< HEAD

function App() {
  return (
    <AuthStore>
      <Router>
=======
import PrivateRoute from './guards/PrivateRoute';
import Error from './screens/Error';
import EditEvent from './screens/EditEvent';

function App() {
  return (
    <Router>
      <AuthStore>
>>>>>>> 0558830182c8d49ddb364df98a938a7fc29d74c0
        <Navbar />
        <div className="container pt-4 pb-5">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
<<<<<<< HEAD
            <Route exact path="/events" component={Events} />
            <Route exact path="/create-event" component={EventForm} />
            <Route exact path="/events/:id" component={EventDetail} />
            <Redirect to="/events" />
          </Switch>
        </div>
        <Footer />
      </Router>
    </AuthStore>
=======
            
            <Route exact path="/events" component={Events} />
            <Route exact path="/events/:id" component={EventDetail} />
            <PrivateRoute exact path="/create-event" component={EventForm} />
            <PrivateRoute exact path="/events/:id/edit" component={EditEvent} />
            
            <Route exact path="/404" component={() => <Error code={404} />} />
            <Route exact path="/403" component={() => <Error code={403} />} />

            <Redirect to="/events" />
          </Switch>
        </div>
        <Footer/>
      </AuthStore>
    </Router>
>>>>>>> 0558830182c8d49ddb364df98a938a7fc29d74c0
  );
}

export default App;
