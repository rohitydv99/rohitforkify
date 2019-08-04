import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './Test';
import Header from './Header';
import DisplayList from './DisplayList';
import Content from './Content';
import FavList from './FavList';
import Footer from './Footer';

class App extends Component {
  
  render(){
  return (
    <div id="appcontainer">
    <Header/>
    <div id="middle">
    <DisplayList/>
    <Content/>
    <FavList/>
    </div>
    <Footer/>
    </div>
  );
  }
}

export default App;
