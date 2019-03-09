import React, { Component } from 'react';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
          post: null
        };
      }
      
    componentDidMount() {
      const { posts, match } = this.props;
  
      this.setState({
        post: posts.length 
          ? posts.find(p => p._id === match.params.id) 
          : null
      })
    }
    
    componentDidUpdate(prevProps) {
      const { posts, match } = this.props;
    
      if (JSON.stringify(prevProps) === JSON.stringify(this.props)) {
        return;
      }
  
      this.setState({
        post: posts.length 
          ? posts.find(p => p._id === match.params.id) 
          : null
      });
    }
    
    render() {
      if (!this.state.post){
        return <span>Loading post...</span>
      }

      return (
          <div>
              <h1>{this.state.post.title}</h1>
              <p>{this.state.post.content}</p>
          </div>
      )
  }
}

export default Details;
