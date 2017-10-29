import React from 'react';
import Login from './login';
import Regestir from './register';
// import Posts from './posts';
// the posts Component not diefiend i home.js page that is mean i can not move to posts Page
export default class Home extends React.Component{

  render(){
    return(
      <div className="row">
        <Regestir />
        <Login />
      </div>
    );
  }
}
