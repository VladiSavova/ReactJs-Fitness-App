import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import toast from 'react-toastify';
import Login from './components/Login/Login';



class App extends Component {
  constructor(props){
    super(props)
    this.state={
      username: '',
      isAdmin: false
    }
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
      
    })

  }
  handleSubmit(e, data, isSignUp) {
    e.preventDefault()
    //console.log(data);
    
    fetch('http://localhost:9999/auth/sign' + (isSignUp ? 'up': 'in') , {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    .then(
      rawData => rawData.json()
    )
      .then(
      body =>{
        console.log(body)
        if (body.username) {
          this.setState({
            username: body.username,
         //   isAdmin : body.isAdmin
          })
          localStorage.setItem('username',body.username )
        //  localStorage.setItem('isAdmin',body.isAdmin )
     //     toast.success('Welcome' + body.username);  
             this.props.history.push('/');
        }
        else{
          // toast.error(body.message);
        }      
      }
      )
    .catch(error => console.error(error));

    console.log(localStorage);
    
  }
  render() {
    return (
      <div className="App">
        

        <Header/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/register" render={(props)=>
        <Register
         {...props}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit.bind(this)}/>} 
          />
         <Route path="/login" render={(props)=>
        <Login
         {...props}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit.bind(this)}/>} 
          />
        </Switch>
        <Footer/>
        </div>
    );
  }
}

export default App;
