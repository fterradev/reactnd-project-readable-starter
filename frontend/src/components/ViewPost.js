import React, { Component } from 'react';
import { FormField } from 'rmwc/FormField';
import { Typography } from 'rmwc/Typography';
import { connect } from 'react-redux';
import { fetchPostDetails } from '../actions';

class ViewPost extends Component {
  componentDidMount() {
    const { postId, fetchPostDetails } = this.props;
    fetchPostDetails(postId);
  }
  
  render() {
    const { postDetails } = this.props;
    const post = postDetails.item;
    return (
      <div>
      {
        post &&
        <Typography use="title">{post.title}</Typography>
      }
      </div>
    );
  }
}

function mapStateToProps({ postDetails }) {
  return {
    postDetails
  };
}

export default connect(mapStateToProps, {
  fetchPostDetails
})(ViewPost);