import React, { Component } from 'react';
import { toast } from 'react-toastify'

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: null,
      imageUrl: null,
      content: null,
    }
    this.handleChange = props.handleChange.bind(this);
  }

  componentDidMount() {
    this.deleteGet();
    
  }
  
  deleteGet() {
    fetch('http://localhost:9999/feed/post/delete/' + this.props.match.params.id)
      .then(rawData => rawData.json())
      .then(
        body => {
            
          this.setState({
            id: this.props.match.params.id,
            title: body.post.title,
            imageUrl: body.post.imageUrl,
            content: body.post.content
          })     
          
        }
      )
      .catch(error => console.error(error));
  }

  deletePost(e, data) {
      
    e.preventDefault();
    
    fetch('http://localhost:9999/feed/post/delete/' + this.props.match.params.id, {
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
            toast.success(body.message);
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
            
          <div className="Delete">
          <h1>want to delete?</h1>
       <form onSubmit={(e) => this.deletePost(e, this.state)}>

            <input type="submit" value="yes" /></form>
        </div>

        );
    }
}

export default Delete;