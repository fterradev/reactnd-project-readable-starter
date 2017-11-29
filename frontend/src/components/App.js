import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import './App.css';
import PostFormDialog from './PostFormDialog';
import { Toolbar, ToolbarRow, ToolbarTitle } from 'rmwc/Toolbar';
import { Fab, Typography, Button } from 'rmwc';
import { Card, CardPrimary, CardTitle, CardSubtitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';

class App extends Component {
  state = {
    postFormDialogIsOpen: false
  };

  componentDidMount() {
    this.props.fetchPosts();
  }
  
  render() {
    const { postFormDialogIsOpen } = this.state;
    const { posts } = this.props;
    return (
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Readable</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
        <PostFormDialog isOpen={postFormDialogIsOpen} onClose={() => this.setState({postFormDialogIsOpen: false})} />
        <Fab className="app-fab app-fab--absolute" onClick={evt => this.setState({postFormDialogIsOpen: true})}>add</Fab>
        {posts.map(post =>
          <Card key={post.id}>
            <CardPrimary>
              <CardTitle large>{post.title}</CardTitle>
              <CardSubtitle>{(new Date(post.timestamp)).toDateString()} by {post.author}</CardSubtitle>
            </CardPrimary>
            <CardSupportingText>
              <Typography use="button">{post.voteScore} votes</Typography><br />
              <Button stroked>
                <i className="material-icons mdc-button__icon">arrow_upward</i>
                Upvote
              </Button>&nbsp;
              <Button stroked>
                <i className="material-icons mdc-button__icon">arrow_downward</i>
                Downvote
              </Button>
            </CardSupportingText>
            <CardSupportingText>
              <Typography use="button">{post.commentCount} comments</Typography>
              
            </CardSupportingText>
            {/* <CardActions className="mdc-card__actions--vertical"> */}
            <CardActions>
              {/* <CardAction>
                <i className="material-icons mdc-button__icon">arrow_upward</i>
                Upvote
              </CardAction>
              <CardAction>
              <i className="material-icons mdc-button__icon">arrow_downward</i>
                Downvote
              </CardAction> */}
              <CardAction>
              <i className="material-icons mdc-button__icon">edit</i>
                Edit
              </CardAction>
              <CardAction>
              <i className="material-icons mdc-button__icon">delete</i>
                Remove
              </CardAction>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

export default connect(mapStateToProps, {
  fetchPosts
})(App);
