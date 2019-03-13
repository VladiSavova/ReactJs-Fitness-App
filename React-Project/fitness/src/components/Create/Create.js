import React, { Component } from 'react';
class Create extends Component {
    constructor(props){
        super(props)
        this.state ={
          title:null,
          imageUrl: null,
          content: null    
        }
        this.handleChange = props.handleChange.bind(this);
    }
 
    
    render() {
    return (
        <div className="Create">
        <h1>Create New Post</h1>
     <form onSubmit={(e)=>this.props.handleSubmit(e, this.state)}>
          <label htmlFor="title">Title</label>
          <input type="text"  onChange={this.handleChange} id="title"  name="title"  placeholder="Title" />
          <label htmlFor="ImageUrl">Image</label>
          <input type="text"   onChange={this.handleChange}  id="imageUrl"  name="imageUrl"  placeholder="imageUrl" />
          <label htmlFor="content">Content</label>
          <textarea type="textarea" onChange={this.handleChange}  id="content" name="content"   placeholder="Text" />
          <input type="submit" value="Create" /></form>
      </div>
    );
  }
}

export default Create;
