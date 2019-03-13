import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';
class AllPosts extends Component {

  render() {
    return (
        
        <section>
        <div id="line">
          <div className="dline" />
          <h1>All Posts</h1>
          <div className="dline" />
        </div>
        
        {console.log(this.props.posts)}
        {this.props.posts.map(post =>
        <div id="ourserv">

            <h1 >{post.title}</h1>
            <a href="">
            <img src={post.imageUrl} alt width={287} height={192} /></a>
             <p>{this.props.posts.content}</p>
            <NavLink to={"/posts/"+ post._id} className="rm">Read</NavLink>
           
        </div>
        )}

      </section>
    );
  }
}
    

export default AllPosts;
