import { combineReducers } from 'redux';
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POST_DETAILS,
  RECEIVE_POST_DETAILS,
  REQUEST_POST_COMMENTS,
  RECEIVE_POST_COMMENTS,
  SEND_POST_VOTE,
  SEND_COMMENT_VOTE,
  RECEIVE_COMMENT_DETAILS,
  SEND_ADD_POST,
  SEND_DELETE_POST,
  SEND_ADD_COMMENT,
  SEND_DELETE_COMMENT
} from '../actions';

function categories(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.categories
      })
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts.reduce((posts, post) => {
          posts[post.id] = post;
          return posts;
        }, {})
      })
    case RECEIVE_POST_DETAILS:
      return Object.assign({}, state, {
        isFetching: false,
        items: {
          ...state.items,
          [action.post.id]: action.post
        }
      })
    default:
      return state
  }
}

function postDetails(
  state = {
    isFetching: false,
    item: undefined
  },
  action
) {
  switch (action.type) {
    case SEND_POST_VOTE:
    case SEND_ADD_POST:
    case SEND_DELETE_POST:
    case REQUEST_POST_DETAILS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POST_DETAILS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.post
      })
    default:
      return state
  }
}

function comments(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_POST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.comments.reduce((comments, comment) => {
          comments[comment.id] = comment;
          return comments;
        }, {})
      })
    case RECEIVE_COMMENT_DETAILS:
      return Object.assign({}, state, {
        isFetching: false,
        items: {
          ...state.items,
          [action.comment.id]: action.comment
        }
      })
    default:
      return state
  }
}

function commentDetails(
  state = {
    isFetching: false,
    item: undefined
  },
  action
) {
  switch (action.type) {
    case SEND_ADD_COMMENT:
    case SEND_DELETE_COMMENT:
    case SEND_COMMENT_VOTE:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_COMMENT_DETAILS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.comment
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  postDetails,
  comments,
  commentDetails
});

export default rootReducer;