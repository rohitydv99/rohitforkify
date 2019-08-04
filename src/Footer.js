import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div id="Footer">
            <div id="Footer2">
            <h4 id="Footer3"></h4>
            <p id="address"><b>Forkify<br/>
            </b></p>
            </div>
            <div id="Footer4">
            <img id="fimage" src={require('./images/fb.jpeg')}/>
            <img id="timage" src={require('./images/twitter.jpg')}/>
            <img id="limage" src={require('./images/linkedin.jpg')}/>
            <img id="gimage" src={require('./images/github.jpg')}/>
            </div> 
            </div>
        )
    }
}

export default Footer
