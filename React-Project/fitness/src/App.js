import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import AllPosts from './components/AllPosts/AllPosts';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';
import Delete  from './components/Delete/Delete';
import About from './components/About/About';




class App extends Component {
  constructor(props){
    super(props)
    this.state={
      username: '',
      isAdmin: false,
      isAuthed: false,
      posts: [],
    }
  };
  
  componentDidMount() {
    const isAdmin = localStorage.getItem('isAdmin') === "true"
    const isAuthed = !!localStorage.getItem('username');

    if (isAuthed) {
      this.setState({
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        isAdmin,
        isAuthed,
      })
    }
    this.getPosts();


  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState == this.state) {
      this.getPosts();
    }
  }

  
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
            isAdmin : body.isAdmin,
            isAuthed: !!body.username
          });
     //     toast.success('Welcome, ' + body.username);
          localStorage.setItem('username',body.username )
          localStorage.setItem('isAdmin',body.isAdmin )
          localStorage.setItem('isAuthed', !!body.username)
          toast.success(`Welcome, ${body.username}`, {closeButton: false});  
             this.props.history.push('/');
         //   console.log(this.props);
        }
        else{
           toast.error(body.message, {closeButton: false});
        }      
      }
      )
    .catch(error => console.error(error));

    console.log(localStorage);
 }
 
 handleCreateSubmit(e, data) {
   console.log(data);
   
  e.preventDefault();

  fetch('http://localhost:9999/feed/post/create', {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(
      rawData => rawData.json()
    )
    .then(

      body => {
        console.log(body);
        
        if (!body.errors) {
          toast.success(body.message);
          this.props.history.push('/');
          this.getPosts()
        }
        else {
          toast.error(body.message);
        }
      }
    )
    .catch(error => console.error(error));

}
  
  getPosts() {
    fetch('http://localhost:9999/feed/posts')
      .then(rawData => rawData.json())
      .then(
        body => {
          this.setState({
            posts: body.posts
          })
        }
      )
      .catch(error => console.error(error));
    }
    logout() {

      this.setState({
        username: null,
        isAdmin: false,
        isAuthed: false,
      })
      localStorage.clear();
      toast.success("You have been successfully logged out!")
    }
   
  
  
  render() {
    return (
      <div className="App">
      <ToastContainer/>
        <Header isAdmin={this.state.isAdmin} isAuthed={this.state.isAuthed} logout={this.logout.bind(this)}/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/register" render={(props)=>
        <Register
         {...props}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit.bind(this)}
          history={this.props.history}/>} 
          />
         <Route path="/login" render={(props) =>
            this.state.isAuthed ?
              <Redirect to="/" />
              :
              <Login
                handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange}
                history={this.props.history}
                {...props} />} />
         
          <Route path="/logout" render={(props) => {

          return (<Redirect to="/" />)
          }} />;

          <PrivateRoute path="/create"
            isAdmin={this.state.isAdmin} render={(props) =>
              <Create handleSubmit={this.handleCreateSubmit.bind(this)}
                handleChange={this.handleChange}
                history={this.props.history}
                {...props} />} />


              <Route exact path="/all" render={(props) =>
            <AllPosts
              posts={this.state.posts}
              {...props} />} />

         <Route exact path="/posts/:id" render={(props) =>
            <Details
              posts={this.state.posts}
              {...props} />} />

        <PrivateRoute exact path="/edit/:id"
            isAdmin={this.state.isAdmin} render={(props) =>
              <Edit
                getPosts={this.getPosts.bind(this)}
                handleChange={this.handleChange}
                history={this.props.history}
                {...props} />} />
         
         <PrivateRoute exact path="/delete/:id"
            isAdmin={this.state.isAdmin} render={(props) =>
              <Delete
                handleChange={this.handleChange}
                history={this.props.history}
                {...props} />} />

           <Route path="/about" render={(props) => (
            <About />
          )} />       
        </Switch>
        <Footer/>
        </div>
       
    );
  }
}

export default withRouter(App);