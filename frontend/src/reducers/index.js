import { combineReducers } from 'redux';
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POST_DETAILS,
  RECEIVE_POST_DETAILS
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
        items: action.posts
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

const rootReducer = combineReducers({
  categories,
  posts,
  postDetails
});

export default rootReducer;