import React, { Component } from 'react'

export class Login extends Component {
    render() {
        return (
            <div id="login">
            <div id="lgnInterface">
            <img id="Logincross" src={require('./images/cross.jpg')}/>
            <h2 id="lgn3"><b>LOGIN</b></h2>
            <label>User Name:</label>
            <i class="fas fa-user"></i>
            <p><input type="text" placeholder="Enter Email" id="uemail" required/></p>
            <label>Password:</label>
            <i class="fas fa-lock"></i>
            <p><input type="password" placeholder="Enter your password" id="upass" required/></p>
            <input type="checkbox"/> Remember me 
            <button className="btn btn-primary" type="button" id="ulogin" >Login</button>
            </div>
            </div>
        )
    }
}

export default Login
