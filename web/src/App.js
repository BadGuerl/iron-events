import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import Events from './screens/Events';
import EventForm from './components/events/EventForm';
import EventDetail from './components/events/EventDetail';
import Login from './screens/Login';
import Register from './screens/Register';
import AuthStore from './contexts/AuthStore';

function App() {
  return (
    <AuthStore>
      <Router>
        <Navbar />
        <div className="container pt-4 pb-5">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/create-event" component={EventForm} />
            <Route exact path="/events/:id" component={EventDetail} />
            <Redirect to="/events" />
          </Switch>
        </div>
        <Footer />
      </Router>
    </AuthStore>
  );
}

export default App;
