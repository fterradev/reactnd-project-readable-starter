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
  REQUEST_COMMENT_DETAILS,
  RECEIVE_COMMENT_DETAILS,
  SEND_ADD_POST,
  SEND_UPDATE_POST,
  SEND_DELETE_POST,
  SEND_ADD_COMMENT,
  RECEIVE_ADDED_COMMENT,
  SEND_UPDATE_COMMENT,
  SEND_DELETE_COMMENT,
  RECEIVE_DELETED_COMMENT,
  LOGIN,
  SEND_RESTORE_COMMENT,
  PERMANENTLY_DELETE_COMMENT,
  SEND_RESTORE_POST,
  RECEIVE_RESTORED_POST_DETAILS,
  PERMANENTLY_DELETE_POST
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
      });
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.categories
      });
    default:
      return state;
  }
}

function posts(
  state = {
    isFetching: false,
    items: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts.reduce((posts, post) => {
          posts[post.id] = post;
          return posts;
        }, {})
      });
    case RECEIVE_POST_DETAILS:
    case RECEIVE_RESTORED_POST_DETAILS:
      const nextState = {
        ...state
      };
      if (action.post.deleted) {
        delete nextState.items[action.post.id];
      } else {
        nextState.items[action.post.id] = action.post;
      }
      return nextState;
    default:
      return state;
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
    case SEND_RESTORE_POST:
    case SEND_UPDATE_POST:
    case SEND_DELETE_POST:
    case REQUEST_POST_DETAILS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POST_DETAILS:
    case RECEIVE_RESTORED_POST_DETAILS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.post
      });
    case RECEIVE_ADDED_COMMENT:
    case RECEIVE_DELETED_COMMENT:
      return Object.assign({}, state, {
        item: {
          ...state.item,
          commentCount: state.item.commentCount + (action.comment.deleted ? -1 : 1)
        }
      });
    default:
      return state;
  }
}

function comments(
  state = {
    isFetching: false,
    items: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_POST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case REQUEST_COMMENT_DETAILS:
    case SEND_COMMENT_VOTE:
    case SEND_UPDATE_COMMENT:
      return Object.assign({}, state, {
        items: {
          ...state.items,
          [action.id]: {
            ...state.items[action.id],
            isFetching: true
          }
        }
      });
    case RECEIVE_POST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.comments.reduce((comments, comment) => {
          comments[comment.id] = {
            item: comment,
            isFetching: false
          };
          return comments;
        }, {})
      });
    case RECEIVE_ADDED_COMMENT:
    case RECEIVE_COMMENT_DETAILS:
      return Object.assign({}, state, {
        items: {
          ...state.items,
          [action.comment.id]: {
            item: action.comment,
            isFetching: false
          }
        }
      });
    case RECEIVE_DELETED_COMMENT:
      const nextState = {
        ...state
      };
      delete nextState.items[action.comment.id];
      return nextState;
    default:
      return state;
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
    case REQUEST_COMMENT_DETAILS:
    case SEND_ADD_COMMENT:
    case SEND_RESTORE_COMMENT:
    case SEND_UPDATE_COMMENT:
    case SEND_DELETE_COMMENT:
    case SEND_COMMENT_VOTE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_ADDED_COMMENT:
    case RECEIVE_DELETED_COMMENT:
    case RECEIVE_COMMENT_DETAILS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.comment
      });
    default:
      return state;
  }
}

function deletedPost(
  state = {
    item: undefined
  },
  action
) {
  switch (action.type) {
    case RECEIVE_POST_DETAILS:
      if (action.post.deleted) {
        return Object.assign({}, state, {
          item: action.post
        });
      }
      return state;
    case SEND_RESTORE_POST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_RESTORED_POST_DETAILS:
    case PERMANENTLY_DELETE_POST:
      const postId = action.id || action.post.id;
      if (postId === state.item.id) {
        return Object.assign({}, state, {
          isFetching: false,
          item: undefined
        });
      }
      return state;
    default:
      return state;
  }
}

function deletedComments(
  state = {
    items: []
  },
  action
) {
  switch (action.type) {
    case RECEIVE_DELETED_COMMENT:
      return Object.assign({}, state, {
        items: (state.items.length > 0 ? state.items : []).concat([action.comment])
      });
    case SEND_RESTORE_COMMENT:
    case PERMANENTLY_DELETE_COMMENT:
      const index = state.items.findIndex(item => item.id === action.id);
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.slice(0, index)
          .concat(state.items.slice(index+1))
      });
    default:
      return state;
  }
}

function app(
  state = {
    username: undefined
  },
  action
) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        username: action.username
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  postDetails,
  comments,
  commentDetails,
  app,
  deletedComments,
  deletedPost
});

export default rootReducer;