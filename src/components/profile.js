import React from 'react';
import axios from 'axios';


axios.defaults.withCredentials = true;


export default class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      info: ''
    };
    axios.get('http://localhost:3500/users/profile', {})
    .then(function(respons){
      // console.log(respons.data);
      var ik = {
              name: respons.data.name,
              email: respons.data.email,
              password: respons.data.password
      }
      this.setState({
        info: ik
      });
    }.bind(this)).catch( function (error){
      // window.location.href = '/profile';
    });
  }
  logout(){
        // alert('logout');
        axios.get('http://localhost:3500/users/logout', {})
             .then(function(response) {
              //  window.location.reLoad(true);
               window.location.href = './posts';
             }).catch(function(error){
               if(error)
               throw error ;
             });
      }
//render a profile
  render(){
    return(
        <div >
          <span className="alert alert-primary" role="alert">
            <span>Welcomeback  {this.state.info.name}</span>
            <a href="./posts" className="alert-link"> Postpage</a>
        </span><br /><br />
            <a href="./" className="btn btn-danger" onClick={this.logout} >logout </a><br/>
              {this.state.info.name}<br />
              {this.state.info.email}<br /><hr />

        </div>
    );
  }
}
