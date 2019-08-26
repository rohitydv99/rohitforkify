import React from "react"
import Axios from "axios";
import Push from "push.js";
import io from "socket.io-client";
// var socket = io.connect("http://localhost:4000")
// socket.on('test',(data)=>{
//     console.log("connected")
//     console.log(data)
// })


// socket.emit('abc',{"key":"value"});



class Header extends React.Component{
constructor(props){
    super(props);
    this.verifyToken=()=>{


        if(localStorage.getItem('token')!=undefined){
            Axios.post('https://rohitforkifyserver.herokuapp.com/verifyToken',{'token':localStorage.getItem('token')})
            .then((result)=>{
                console.log(result)
                if(result.data.status=='valid'){
                    if(window.outerWidth<450){
                        document.getElementById('menuLoginSignup').insertAdjacentHTML('afterend',`
                        <p id="welcome2" style="color:white">Welcome,${localStorage.getItem('userName')}</p>`)
                        document.getElementById('menuLoginSignup').style.display="none";
                    }


                    else{
                        document.getElementById('login-signup').insertAdjacentHTML('afterend',`
                        <p id="welcome" style="color:white">Welcome,${localStorage.getItem('userName')}</p>`)
                        document.getElementById('login-signup').style.display="none";
                    }
                }
            })
        }
    }
}
componentDidMount(){
    this.verifyToken();
}

render(){
    Push.create("Forkify",{body:"Welcome To Forkify",timeout:4000,icon:require('./images/forkify.jpg')})
    return(
        <div id="header">
        <img id="menu" src={require('./images/menu.jpg')}/>
        <p id="htitle">Forkify</p>
        <input type="text" id="searchbar" placeholder="Search Here"></input>
        <button type="submit" id="search">Search</button>
        <button className="btn btn-primary" type="button" id="login-signup">Login/Signup</button>
        <p id="logout">Logout</p>
        <img id="himage" src={require('./images/heart.jpg')}/>
        <img id="himage1" src={require('./images/heart.jpg')}/>
        </div>
    );
}
}
export default Header;