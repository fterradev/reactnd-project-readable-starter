export function setUsername(username) {
  localStorage.username = username.trim();
  return username;
}

export function getUsername() {
  if (!localStorage.username) localStorage.username = 'anonymous';
  return localStorage.username;
}
