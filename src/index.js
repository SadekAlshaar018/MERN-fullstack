import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import Regestir  from './components/register';
// import Login from './components/login';
import Home from './components/home';
import Profile  from './components/profile';

ReactDOM.render( <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </div>
    </Router>,document.getElementById('root'));
