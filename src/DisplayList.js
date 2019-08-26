import React from "react";
import axios from 'axios';
class DisplayList extends React.Component{
    constructor(){
        super()
        this.prev=()=>{
            if(this.state.j>1){
                this.setState({j:this.state.j-10})
                this.populate()
            }
        }
        this.next=()=>{
            if(this.val-this.state.j>=1){
                this.setState({j:this.state.j+10})
                this.populate()
            }
        }
        this.state={
            j:1

        }
        this.val=0;
        var total=30;
        this.populate=()=>
        {
            document.getElementById('itemlist').innerHTML="";
            document.getElementById('itemlist').innerHTML=`<img src="${require('./images/loading.gif')}"/>`
            if(localStorage.getItem('content')==undefined){
            axios.post("https://www.food2fork.com/api/search?key=c1b8564ad85ca6d78d7fa40328a58abb  ")
            .then((result)=>{
                console.log(result)
                localStorage.setItem('content',JSON.stringify(result));
                //var result1=JSON.parse(localStorage.getItem('content'));
                this.val=JSON.stringify(Object.keys(result.data.recipes).length);
                if(result.data.recipes[this.state.j-1]!=undefined){
                    document.getElementById('itemlist').innerHTML="";
                }
                else{
                    return;
                }
                for(var i=this.state.j-1;i<this.state.j+9;i++){
                    if(result.data.recipes[i]==undefined)
                    break;
                    else{
                        document.getElementById('itemlist').insertAdjacentHTML(
                            'beforeend',`<li class="items">
                            <img id="recipeimg" src="${result.data.recipes[i].image_url}"/>
                            <p id="recipeIdentity">${result.data.recipes[i].title}</p>
                            </li>`
                        );
                    }
                }
                document.getElementById('itemlist').insertAdjacentHTML('beforeend',`<div id='nav'>
            <p id="prev"><<< Prev</p>
            <p id="next">Next >>></p>
            </div>`)

            })
            .catch((error)=>{
                alert("Something Has Went Wrong");

            })
        }
        else{
            var result=JSON.parse(localStorage.getItem('content'));
            this.val=JSON.stringify(Object.keys(result.data.recipes).length);
                if(result.data.recipes[this.state.j-1]!=undefined){
                    document.getElementById('itemlist').innerHTML="";
                }
                else{
                    return;
                }
                for(var i=this.state.j-1;i<this.state.j+9;i++){
                    if(result.data.recipes[i]==undefined)
                    break;
                    else{
                        document.getElementById('itemlist').insertAdjacentHTML(
                            'beforeend',`<li class="items">
                            <img id="recipeimg" src="${result.data.recipes[i].image_url}"/>
                            <p id="recipeIdentity">${result.data.recipes[i].title}</p>
                            </li>`
                        );
                    }
                }
                document.getElementById('itemlist').insertAdjacentHTML('beforeend',`<div id='nav'>
            <p id="prev"><<< Prev</p>
            <p id="next">Next >>></p>
            </div>`)

        }
        }
        document.addEventListener("click",(e)=>{
            if(e.target.id=="next")
            {
                this.next();
            }
            else if(e.target.id=="prev")
            {
                this.prev();
            }
        
        })
    }
    componentDidMount(){
        this.populate();
    }


render(){
    return(
        <div id="listcontainer">
        <ul id="itemlist">

        </ul>
        </div>
    );
}
}
export default  DisplayList;