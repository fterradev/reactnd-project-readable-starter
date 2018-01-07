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

export const SEND_POST_VOTE = 'SEND_POST_VOTE';
function sendPostVote() {
  return {
    type: SEND_POST_VOTE
  }
}

export function votePost(id, option) {
  return dispatch => {
    dispatch(sendPostVote());
    return DataAPI.votePost(id, option)
      .then(post => dispatch(receivePostDetails(post)));
  }
}

export const SEND_COMMENT_VOTE = 'SEND_COMMENT_VOTE';
function sendCommentVote(id) {
  return {
    type: SEND_COMMENT_VOTE,
    id
  }
}

export const REQUEST_COMMENT_DETAILS = 'REQUEST_COMMENT_DETAILS';
function requestCommentDetails(id) {
  return {
    type: REQUEST_COMMENT_DETAILS,
    id
  }
}

export const RECEIVE_COMMENT_DETAILS = 'RECEIVE_COMMENT_DETAILS';
function receiveCommentDetails(comment) {
  return {
    type: RECEIVE_COMMENT_DETAILS,
    comment
  }
}

export function fetchCommentDetails(id) {
  return dispatch => {
    dispatch(requestCommentDetails(id));
    return DataAPI.getCommentDetails(id)
      .then(comment => dispatch(receiveCommentDetails(comment)));
  }
}

export function voteComment(id, option) {
  return dispatch => {
    dispatch(sendCommentVote(id));
    return DataAPI.voteComment(id, option)
      .then(comment => dispatch(receiveCommentDetails(comment)));
  }
}

export const SEND_ADD_POST = 'SEND_ADD_POST';
function sendAddPost() {
  return {
    type: SEND_ADD_POST
  }
}

export function addPost(post) {
  return dispatch => {
    dispatch(sendAddPost());
    return DataAPI.addPost(post)
      .then(post => dispatch(receivePostDetails(post)));
  }
}

export const SEND_UPDATE_POST = 'SEND_UPDATE_POST';
function sendUpdatePost() {
  return {
    type: SEND_UPDATE_POST
  }
}

export function updatePost(id, post) {
  return dispatch => {
    dispatch(sendUpdatePost());
    return DataAPI.updatePost(id, post)
      .then(post => dispatch(receivePostDetails(post)));
  }
}

export const SEND_DELETE_POST = 'SEND_DELETE_POST';
function sendDeletePost() {
  return {
    type: SEND_DELETE_POST
  }
}

export function deletePost(id) {
  return dispatch => {
    dispatch(sendDeletePost());
    return DataAPI.deletePost(id)
      .then(post => dispatch(receivePostDetails(post)));
  }
}

export const SEND_ADD_COMMENT = 'SEND_ADD_COMMENT';
function sendAddComment() {
  return {
    type: SEND_ADD_COMMENT
  }
}

export const RECEIVE_ADDED_COMMENT = 'RECEIVE_ADDED_COMMENT';
function receiveAddedComment(comment) {
  return {
    type: RECEIVE_ADDED_COMMENT,
    comment
  }
}

export function addComment(comment) {
  return dispatch => {
    dispatch(sendAddComment());
    return DataAPI.addComment(comment)
      .then(comment => dispatch(receiveAddedComment(comment)));
  }
}

export const SEND_UPDATE_COMMENT = 'SEND_UPDATE_COMMENT';
function sendUpdateComment(id) {
  return {
    type: SEND_UPDATE_COMMENT,
    id
  }
}

export function updateComment(id, comment) {
  return dispatch => {
    dispatch(sendUpdateComment(id));
    return DataAPI.updateComment(id, comment)
      .then(comment => dispatch(receiveCommentDetails(comment)));
  }
}

export const SEND_DELETE_COMMENT = 'SEND_DELETE_COMMENT';
function sendDeleteComment() {
  return {
    type: SEND_DELETE_COMMENT
  }
}

export const RECEIVE_DELETED_COMMENT = 'RECEIVE_DELETED_COMMENT';
function receiveDeletedComment(comment) {
  return {
    type: RECEIVE_DELETED_COMMENT,
    comment
  }
}

export function deleteComment(id) {
  return dispatch => {
    dispatch(sendDeleteComment());
    return DataAPI.deleteComment(id)
      .then(comment => dispatch(receiveDeletedComment(comment)));
  }
}

export const LOGIN = 'LOGIN';
export function login(username) {
  return {
    type: LOGIN,
    username
  }
}