import React, { Component } from 'react'

export class Menu extends Component {
    render() {
        return (
            <div id="menuBar">
            <img id="cross" src={require('./images/cross.jpg')}/>
            <input type="text" id="searchbar2" placeholder="Search Here"></input>
            <button className="btn btn-primary" type="button" id="menuLoginSignup">Login/Signup</button>
            <p id="logout2">Logout</p>
            </div>
        )
    }
}

export default Menu
