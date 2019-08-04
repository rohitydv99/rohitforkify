import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Test from './Test';
import axios from 'axios';
import SAndL from './SAndL';
import SignUp from './SignUp';
import Login from './Login';
import FavList from './FavList';
import * as serviceWorker from './serviceWorker';
import Menu from "./Menu"
import Shopping from './Shopping';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Menu />, document.getElementById('indexMenu'));
ReactDOM.render(<Shopping/>,document.getElementById('ShoppingMenu'));
var i=0;
var j=0;
var k=0;
var z=0;
document.addEventListener("click",(e)=>{
    if(e.target.id=="login-signup"){
        document.getElementById('TransparentBack').style.display= "block";
        document.getElementById('dyna').style.display="block";
        ReactDOM.render(<SAndL/>,document.getElementById('dyna2'));
        ReactDOM.render(<Login/>,document.getElementById('dyna3'));
      }
      else if(e.target.id=="himage")
      {
    //   document.getElementById('middle').style.gridTemplateColumns = "30% 40% 30%";
    //   document.getElementById('shopping').style.display = "block";
        if(i==0){
            document.getElementById('middle').style.gridTemplateColumns = "30% 40% 30%";
              document.getElementById('shopping').style.display = "block";
              i++;
        }
        else if(i==1){
            document.getElementById('shopping').style.display="none";
            document.getElementById('middle').style.gridTemplateColumns="30% 70%";
            i--;
        }
      }
      else if(e.target.id=="TransparentBack"){
         document.getElementById('TransparentBack').style.display="none";
         document.getElementById('dyna').style.display="none";
    }
    else if(e.target.id=="menu"){
       document.getElementById("menuBar").style.display="grid";
       
    }
    else if(e.target.id=="back"){
        document.getElementById('mncontent').style.display="none";
        document.getElementById('listcontainer').style.display="grid";
    }
    else if(e.target.id=="cross"){
        document.getElementById('menuBar').style.display="none";
    }
    else if(e.target.id=="menuLoginSignup"){
        document.getElementById('menuBar').style.display="none";
        document.getElementById('dyna').style.display="block";
        ReactDOM.render(<SAndL/>,document.getElementById('dyna2'));
        ReactDOM.render(<Login/>,document.getElementById('dyna3'));
    }
    else if(e.target.id=="Logincross"){
        document.getElementById('dyna').style.display="none";
        ReactDOM.unmountComponentAtNode(document.getElementById('dyna'));
    }
    else if(e.target.id=="himage1"){
        if(k==0){
        document.getElementById('fav').style.display="grid";
        ReactDOM.render(<FavList/>,document.getElementById('fav'));
        document.getElementById('shopping').style.display="block";
        k++
        }
        else if(k==1){
            document.getElementById('fav').style.display="none";
            k--
        }
    }
    /*else if(e.target.id=="cross2"){
        document.getElementById('fav').style.display="none";
    }*/
    else if(e.target.id=="welcome"){
        if(j==0){
            document.getElementById('logout').style.display="block";
            j++;
        }
        else if(j==1){
            document.getElementById('logout').style.display="none";
            j--;
        }
    }
    else if(e.target.id=="welcome2"){
        if(z==0){
            document.getElementById('logout2').style.display="block";
            z++;
        }
        else if(z==1){
            document.getElementById('logout2').style.display="none";
            z--;
        }
    }
    else if(e.target.id=="logout2"){
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.reload();
    }
    else if(e.target.id=="logout"){
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.reload();
    }
    else if(e.target.id=="recipeIdentity"  && window.outerWidth <450){
        document.getElementById('listcontainer').style.display="none";
        document.getElementById('mncontent').style.display="grid";
    }
    else if(e.target.id=="lgn2"){
        ReactDOM.unmountComponentAtNode(document.getElementById('dyna3'));
        ReactDOM.render(<SignUp/>,document.getElementById('dyna3'));
    }
    else if(e.target.id=="lgn"){
        ReactDOM.unmountComponentAtNode(document.getElementById('dyna3'));
        ReactDOM.render(<Login/>,document.getElementById('dyna3'));
    }
    else if(e.target.id=="ulogin"){
        var uname=document.getElementById('uemail').value
        var up=document.getElementById('upass').value
        axios.post('http://localhost:8080/http://localhost:4000/login',{'userName':uname,'userPass':up})
        .then((result)=>{
            if(result.data.token=='invalid'){
                window.location.reload();
                alert('you are not authentic!Please SignUp');
            }else{
                localStorage.setItem('token',result.data.token);
                localStorage.setItem('userName',uname)
                window.location.reload();
            }
        })
        .catch()
    }
    else if(e.target.id=="usignup"){
        var username=document.getElementById('uname').value
        var useremail=document.getElementById('uemailid').value
        var userpwd=document.getElementById('upwd').value
        var userphone=document.getElementById('uphone').value
        axios.post('http://localhost:8080/http://localhost:4000/signup',{'name':username,'email':useremail,'password':userpwd,'phone':userphone})
        .then((result)=>{
            if(result.data.status=='ok'){
                window.location.reload();
                alert("signed Up successfully")
            }
            else if(result.data.status=='notOk'){
                window.location.reload();
                alert("You Have already signed up!")
            }
        })
    
        .catch()
    }

})







// axios.post("https://www.food2fork.com/api/search?key=67835422fe6eec0c201ed93153594a2e")
// .then((res)=>{
//     console.log(res);
//     /*for(var i=0;i++){
//         if(res.data.recipes[i].title==undefined){
//             break;
//         }
//     }*/
//     for(var i=0;i<res.data.count;i++){
//     document.getElementById('check').insertAdjacentHTML('beforeend',`
//     <p>Recipe Name=${JSON.stringify(res.data.recipes[i].title)}</p>`)}
// })
// .catch(()=>{
//     alert("error occured")
// })


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
