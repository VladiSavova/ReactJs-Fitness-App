import React, { Component } from 'react';
class Login extends Component {

  constructor(props){
    super(props)
    this.state ={
      username:null,
      password: null,
      
    }
    this.handleChange = props.handleChange.bind(this);
    
  }
  render() {
    return (
        <div className="Login">
        <h1>Login</h1>
          <form onSubmit={(e)=>this.props.handleSubmit(e, this.state, false)}>
          <label htmlFor="username">Username</label>
          <input  onChange={this.handleChange} type="text" id="username"  name="username" placeholder="Username" />
          <label htmlFor="password">Password</label>
          <input  onChange={this.handleChange} type="password" id="password" name="password" placeholder="******" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
