import React from 'react';
import axios from 'axios';

// to save cookie, to send to browsre
// axios.defaults.withCredentials = true;
// import Message from './message';

export default class Login extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            data: {
            	email: '',
            	password: ''
            },
            err: {
            	email: '',
            	password: ''
            }
        }

        this.hdlChange     = this.hdlChange.bind(this);
        this.hdlLogin = this.hdlLogin.bind(this);
    }

    hdlLogin(e){
        e.preventDefault();
        this.setState({
          success: ''
        });
          axios({
            method: 'post',
            url: 'http://localhost:3500/users/login/',
            data: this.state.data
        }).then(result => {
               window.location.href= '/profile'
             }).catch(function (error) {
                 if (error.response) {
                     let mainErrors = error.response.data.errors,
                         err_msg = {
                            email: mainErrors.email ? mainErrors.email.msg : '',
                            password: mainErrors.password ? mainErrors.password.msg : ''
                         };
                     this.setState({
                         err: err_msg
                     });
                 }
             }.bind(this));
    }

    hdlChange(element){
        var temp = this.state.data;
        temp[element.target.name] = element.target.value;

        this.setState({
            data: temp

        });
    }


    render(){
        return (
            <div className="col col-md-6">
                <h1>Login Form</h1><br /><hr />
                <form action="" method="POST" onSubmit={this.hdlLogin} className="form-control">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input onChange={this.hdlChange} type="text" name="email" ref="email" className="box1 border2" placeholder="Your Email"/>
                        <span className="text-danger">{this.state.err.email}</span>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={this.hdlChange} type="password" name="password" ref="password" className="box1 border2" placeholder="Your Password"/>
                        <span className="text-danger">{this.state.err.password}</span>
                    </div>
                    <input type="submit" value="Login" className="btn btn-outline-dark"/>
                </form>
            </div>
        );
    }
}
