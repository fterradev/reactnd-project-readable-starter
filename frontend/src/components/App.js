import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from '../actions';
import './App.css';
import PostFormDialog from './PostFormDialog';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarMenuIcon, ToolbarIcon } from 'rmwc/Toolbar';
import { Fab, Typography, Button } from 'rmwc';
import { Card, CardPrimary, CardTitle, CardSubtitle, CardSupportingText, CardActions, CardAction} from 'rmwc/Card';
import { MenuAnchor, Menu, MenuItem } from 'rmwc/Menu';
import sortBy from 'sort-by';

class App extends Component {
  state = {
    postFormDialogIsOpen: false,
    categoriesOptions: [],
    selectedCategory: null
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }
  
  render() {
    const { postFormDialogIsOpen, selectedCategory } = this.state;
    const { categoriesStore, postsStore } = this.props;
    const nullCategory = {
      name: 'All',
      path: ''
    };
    const categories = [nullCategory, ...categoriesStore.items];
    let orderedPosts = [...postsStore.items];
    orderedPosts.sort(sortBy('-voteScore'));
    return (
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarMenuIcon use="menu"/>
                <MenuAnchor onClick={evt => this.setState({'menuIsOpen': !this.state.menuIsOpen})} style={{display: 'flex'}}>
                  <ToolbarTitle>{selectedCategory ? selectedCategory.name : 'All'}</ToolbarTitle>
                  <ToolbarIcon use="arrow_drop_down" style={{paddingLeft: 0}} />
                  <Menu
                    open={this.state.menuIsOpen}
                    onClose={evt => this.setState({menuIsOpen: false})}
                    onSelected={evt => this.setState({selectedCategory: categories[evt.detail.index]})}
                  >
                    {categories.map(category => 
                      <MenuItem key={category.name}>{category.name}</MenuItem>
                    )}
                  </Menu>
                </MenuAnchor>
            </ToolbarSection>

          </ToolbarRow>
        </Toolbar>
        <PostFormDialog isOpen={postFormDialogIsOpen} onClose={() => this.setState({postFormDialogIsOpen: false})} />
        <Fab className="app-fab app-fab--absolute" onClick={evt => this.setState({postFormDialogIsOpen: true})}>add</Fab>
        {orderedPosts.map(post =>
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

function mapStateToProps({ categories, posts }) {
  return {
    categoriesStore: categories,
    postsStore: posts
  };
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPosts
})(App);
