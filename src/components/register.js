import React from 'react';
import axios from 'axios';



export default class Regestir extends React.Component
{
  constructor(props){
    super(props);
    this.state ={
      frmData: {
          email: "",
          name: "",
          password : "",
          conf_password: ""
},
// error message in  browser.
      msg: {
          email: "",
          name: "",
          password : "",
          conf_password: ""
},
      success: ''
    }
      this.hdlChange = this.hdlChange.bind(this);
      this.hdlSubmitUser = this.hdlSubmitUser.bind(this);
  }
  hdlSubmitUser(event){
      event.preventDefault();
      this.setState({
          success: ''
      });

      axios.post('http://localhost:3500/users/register', this.state.frmData)
           .then(function (response) {
              this.setState({

                  msg: {
                    email: '',
                    name: '',
                    password: '',
                    conf_password: ''
                  },
                  success: "Thanks for registration."

              });

              this.refs.name.value = '';
              this.refs.email.value = '';
              this.refs.password.value = '';
              this.refs.conf_password.value = '';
          }.bind(this))
           .catch(function (error) {
               if (error.response) {
                   let mainErrors = error.response.data.errors,
                       msg = {
                          name: mainErrors.name ? mainErrors.name.msg : '',
                          email: mainErrors.email ? mainErrors.email.msg : '',
                          password: mainErrors.password ? mainErrors.password.msg : '',
                          conf_password: mainErrors.conf_password ? mainErrors.conf_password.msg : ''
                       };
                   this.setState({
                       msg: msg
                   });
               }
           }.bind(this));
  }

  // function to handle the triggered events
  hdlChange(element){
    // console.log(element.target.value)
    var temp = this.state.frmData;
    temp[element.target.name] = element.target.value;

    this.setState({
      frmData: temp
      // success: element.target.value--- to show the state in browser.

    });
    // console.log(this.state);
  }

    render(){
        return (



          <div className="col col-md-6">
          <h1>Registration Form</h1><br /><hr />
          <p className="alert alert-success" >
          {this.state.success}</p>
          <form action="" method="POST" onSubmit={this.hdlSubmitUser} className="form-control"><br /><br />
                  <div className="form-group">
                      <label>Full name</label>
                      <input onChange={this.hdlChange} type="text" name="name" ref="name" className="box1 border2" placeholder="Your Name"/><br />
                      <span className="text-danger">{this.state.msg.name}</span>
                  </div>
                  <div className="form-group">
                      <label>Email</label><br />
                      <input onChange={this.hdlChange} type="text" name="email" ref="email" className="box1 border2" placeholder="Your Email"/><br />
                      <span className="text-danger">{this.state.msg.email}</span>
                  </div>

                  <div className="form-group">
                      <label>Password</label>
                      <input onChange={this.hdlChange} type="password"  name="password" ref="password" className="box1 border2" placeholder="Your Password"/><br />
                      <span className="text-danger">{this.state.msg.password}</span>
                  </div>
                  <div className="form-group">
                      <label>Confirm Password</label>
                      <input onChange={this.hdlChange} type="password" name="conf_password" ref="conf_password" className="box1 border2" placeholder="Confirm Password"/><br />
                      <span className="text-danger">{this.state.msg.conf_password}</span>
                  </div>
                  <input type="submit" value="Register"  className="btn btn-outline-dark"/>
              </form>
          </div>
        )
    }
}
