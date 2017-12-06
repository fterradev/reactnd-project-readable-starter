import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import './ListPosts.css';
import { Fab, Typography, Button } from 'rmwc';
import { Card, CardPrimary, CardTitle, CardSubtitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom';

class ListPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.selectedCategory);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      this.props.fetchPosts(this.props.selectedCategory);
    }
  }

  render() {
    const { postsStore, orderBy } = this.props;
    let orderedPosts = [...postsStore.items];
    orderedPosts.sort(sortBy(orderBy));
    return (
      <div>
        <Fab className="app-fab app-fab--absolute" onClick={evt => this.setState({postFormDialogIsOpen: true})}>add</Fab>
        {orderedPosts.map(post =>
          <Card key={post.id}>
            <CardPrimary>
              <CardTitle large><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></CardTitle>
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

function mapStateToProps({ categories, posts }) {
  return {
    categoriesStore: categories,
    postsStore: posts
  };
}

export default connect(mapStateToProps, {
  fetchPosts
})(ListPosts);
