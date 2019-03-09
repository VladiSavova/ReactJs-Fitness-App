import React from 'react';
import {NavLink} from 'react-router-dom'
const Header =(props) =>{
  const {isAdmin, isAuthed, logout } = props;
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
           
           
            <li>{isAdmin && <NavLink to="/create" id="blognav">Create</NavLink>}</li>
            <li>{isAuthed &&<NavLink to="/all">All Posts</NavLink>}</li>
            <li>{!isAuthed && <NavLink to="/login" id="blognav">Login</NavLink>}</li>
            <li>{!isAuthed && <NavLink to="/register" id="fullwidthnav">Register</NavLink>}</li>
            <li>{isAuthed && <NavLink to ="/logout" onClick={logout}>Logout</NavLink>}</li>
            
          </ul>
        </nav>
      </header>
)
}

export default Header;