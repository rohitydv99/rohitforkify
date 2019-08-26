import React, { Component } from 'react'
import axios from 'axios';
import FavList from './FavList';
class Content extends Component {
    constructor(props){
        super(props)
        document.addEventListener("click",(e)=>{
            if(e.target.id=="recipeIdentity"){
                document.getElementById("hello").style.display="none";
                document.getElementById("first").innerHTML="";
                var recipeName=e.target.textContent;
                document.getElementById("recipeTitle").textContent=recipeName;
                var contentJSON=JSON.parse(localStorage.getItem('content'));
                console.log(contentJSON)
                for(var i=0;;i++){
                
                    if(contentJSON.data.recipes[i].title==recipeName){
                        document.getElementById("first").insertAdjacentHTML("beforeend",`
                        <img id="recipeImage" src="${contentJSON.data.recipes[i].image_url}"/>`)
                        break;
                    }
                }
                axios.post('https://rohitforkifyserver.herokuapp.com/sendData',{'dishName':recipeName})
                .then((result)=>{
                    document.getElementById("ing").innerHTML="";
                    document.getElementById("prep").innerHTML="";
                    document.getElementById("ing").insertAdjacentHTML("beforeend",`
                   <p><b>Ingredients:</b><br/></p>
                    ${result.data.ingredients}`)
                    document.getElementById("prep").insertAdjacentHTML("beforeend",`
                    <p><b>Preparation:</b><br/></p>
                    ${result.data.preparation}`)
                })
                .catch((error)=>{
                    alert("OOPS!!Cannot fetch data")
                })
                // document.getElementById('second').innerHTML="";
                // document.getElementById('second').insertAdjacentHTML("beforeend",`
                // <button type="button">add</botton>`)

            }
        })
    }
    render() {
        return (
            <div id="mncontent">
            <p id="hello">Welcome To Forkify,Click on recipes to know more<br/>
            <img id="forkifyimg" src={require('./images/forkify.jpg')}/></p>
            <img id="back" src={require('./images/back.jpg')}/>
            <h1 id="recipeTitle"></h1>
            <div id="first">
            </div>
            <div id="second">
            <p id="ing"></p>
            <p id="prep"></p>
            </div>
            {/*<div id="fav">
            <img id="cross2" src={require('./images/cross.jpg')}/>
            <FavList/>
            </div> */}
            </div>
        )
    }
}

export default Content;
