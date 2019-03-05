import React from 'react';
import {NavLink} from 'react-router-dom'
const Header =() =>{
return(
    <header>
        
        <div id="logo">
          <h1>Fitness</h1>
          <div id="tagline">
            <h2>Be healthy!</h2>
          </div>
        </div>
        <nav>
          <ul>
            <li><NavLink to="/" id="homenav">Home</NavLink></li>
            <li><NavLink to="/all">All Posts</NavLink></li>
            <li><NavLink to="/create" id="blognav">Create</NavLink></li>
            <li><NavLink to="/login" id="blognav">Login</NavLink></li>
            <li><NavLink to="/register" id="fullwidthnav">Register</NavLink></li>
            <li><NavLink to ="/logout">Logout</NavLink></li>
          </ul>
        </nav>
      </header>
)
}

export default Header;