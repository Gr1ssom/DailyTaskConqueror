import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import NoteEditor from './components/NoteEditor';

const App = () => {
  // Your authentication logic can be implemented here
  const isAuthenticated = false; // Set this to true if the user is authenticated

  return (
    <Router>
      <div>
        {/* Common header, navigation, or layout components can be placed here */}
        {/* For example, you can have a navigation bar or header that appears on all pages */}

        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/home" /> : <LoginForm />}
          </Route>
          <Route path="/home" component={isAuthenticated ? Home : LoginForm} />
          <Route path="/note" component={isAuthenticated ? NoteEditor : LoginForm} />

          {/* If no route matches, redirect to a 404 page */}
          <Route path="*">
            <h1>404 - Not Found</h1>
          </Route>
        </Switch>

        {/* Common footer or other layout components can be placed here */}
      </div>
    </Router>
  );
};

export default App;
