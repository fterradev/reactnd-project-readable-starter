import * as DataAPI from '../DataAPI';

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories());
    return DataAPI.getCategories()
      .then(categories => dispatch(receiveCategories(categories)));
  }
}

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

export function fetchPosts(category = null) {
  return dispatch => {
    dispatch(requestPosts());
    return DataAPI.getPosts(category)
      .then(posts => dispatch(receivePosts(posts)));
  }
}

export const REQUEST_POST_DETAILS = 'REQUEST_POST_DETAILS';
function requestPostDetails() {
  return {
    type: REQUEST_POST_DETAILS
  }
}

export const RECEIVE_POST_DETAILS = 'RECEIVE_POST_DETAILS';
function receivePostDetails(post) {
  return {
    type: RECEIVE_POST_DETAILS,
    post
  }
}

export function fetchPostDetails(id) {
  return dispatch => {
    dispatch(requestPostDetails());
    return DataAPI.getPostDetails(id)
      .then(post => dispatch(receivePostDetails(post)));
  }
}

export const REQUEST_POST_COMMENTS = 'REQUEST_POST_COMMENTS';
function requestPostComments() {
  return {
    type: REQUEST_POST_COMMENTS
  }
}

export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
function receivePostComments(comments) {
  return {
    type: RECEIVE_POST_COMMENTS,
    comments
  }
}

export function fetchPostComments(postId) {
  return dispatch => {
    dispatch(requestPostComments());
    return DataAPI.getPostComments(postId)
      .then(comments => dispatch(receivePostComments(comments)));
  }
}