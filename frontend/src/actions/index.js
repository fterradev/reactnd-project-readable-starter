import * as PostsAPI from '../PostsAPI';

export const FETCH_POSTS = 'FETCH_POSTS';

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return PostsAPI.getPosts()
      .then(posts => dispatch(receivePosts(posts)));
  }
}