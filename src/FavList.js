import React, { Component } from 'react'

 class FavList extends Component {
    constructor(){
        super();
        this.add=()=>{
          document.getElementById("list").innerHTML = "<center><b>Click on items on the left to add</b></center>";
          document.addEventListener('click',(e)=>{
            document.getElementById("list").innerHTML = "";
            if(e.target.id == "recipeIdentity"){
              document.getElementById("listItem").insertAdjacentHTML('beforeend',
              ` <li class="alert alert-warning alert-dismissable">
                  <button type="button" class="close" data-dismiss="alert">×</button>
                  ${e.target.textContent}
                </li>
              `)
            }
          })
        }
      }
    render() {
        return (
            <div id="shopping">
            <h1 id="slist">Shopping List</h1>
            <br/>
            <div id="list">
            <center>
            <h5><b>Your Shopping List is Empty</b></h5>
            <button className="btn btn-primary" id="addButton" onClick={this.add}>Add</button>
            </center>
            <br/>
            </div>
            <div id="listcontent">
            <ol id="listItem">
            </ol>
            </div>
            </div>
        )
    }
}

export default FavList;
