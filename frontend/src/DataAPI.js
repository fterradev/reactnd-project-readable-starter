const api = 'http://localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const getCategories = () =>
fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories);

export const getPosts = (category = null) =>
  fetch(`${api}${category ? `/${category.path}` : ''}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPostDetails = (id) =>
fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())
  .then(data => data);

export const votePost = (id, option) =>
fetch(`${api}/posts/${id}`, {
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({ option })
})
  .then(res => res.json())
  .then(data => data);
  

export const getPostComments = (postId) =>
fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.json())
  .then(data => data);

export const voteComment = (id, option) =>
fetch(`${api}/comments/${id}`, {
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({ option })
})
  .then(res => res.json())
  .then(data => data);

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => data);

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    headers,
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => data);