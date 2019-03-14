import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      imageUrl: '',
      content: '',
    }
    this.handleChange = props.handleChange.bind(this);
    
  }

  componentDidMount() {
    this.editGet()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title) {
        return;
    }
  }

  editGet() {
    fetch('http://localhost:9999/feed/post/edit/' + this.props.match.params.id)
      .then(rawData => rawData.json())
      .then(
        body => {

          this.setState({
            title: body.post.title,
            imageUrl: body.post.imageUrl,
            content: body.post.content
          })

        }
      )
      .catch(error => console.error(error));
  }

  editPost(e, data) {
    e.preventDefault();
   
    fetch('http://localhost:9999/feed/post/edit/' + this.props.match.params.id, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(

        rawData => rawData.json()
      )
      .then(
        body => {
          if (!body.errors) {

            
            toast.success(body.message)      
            this.props.history.push('/')
          }
          else {
            console.log(body.message)
          }
        }
      )
      .catch(error => console.error(error));
  }
  render() {
    return (
      <div className="Create">
        <h1>Edit Post</h1>
     <form onSubmit={(e) => this.editPost(e, this.state)}>
          <label htmlFor="title">Title</label>
          <input type="text"  onChange={this.handleChange} id="title"  name="title" value={this.state.title} />
          <label htmlFor="ImageUrl">ImageUrl</label>
          <input type="text"   onChange={this.handleChange}  id="imageUrl"  name="imageUrl"  value={this.state.imageUrl} />
          <label htmlFor="content">Content</label>
          <textarea type="textarea" onChange={this.handleChange}  id="content" name="content"  value={this.state.content} />
          <input type="submit" value="Edit" /></form>
      </div>
      
    );
  }
}

export default Edit;

