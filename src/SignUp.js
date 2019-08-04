import React, { Component } from 'react'

export class SignUp extends Component {
    render() {
        return (
            <div id="signUp">
            <div id="signupInterface">
            <h2 id="sign"><b>SIGN UP</b></h2>
            <label>UserName:</label>
            <i class="fas fa-user-edit"></i><br/>
            <input type="text" placeholder="Enter Name" id="uname"required/><br/>
            <label>Email:</label>
            <i class="fas fa-envelope"></i><br/>
            <input type="text" placeholder="Enter Email" id="uemailid" required/><br/>
            <label>Password:</label>
            <i class="fas fa-lock"></i><br/>
            <input type="password" placeholder="Enter Password" id="upwd" required/><br/>
            <label>Phone No:</label>
            <i class="fas fa-phone-square"></i><br/>
            <input type="number" placeholder="Enter Phone No. " id="uphone" required/><br/>
            <button className="btn btn-primary" type="button " id="usignup" >Sign Up</button>
            </div>  
            </div>
        );
    }
}

export default SignUp;
