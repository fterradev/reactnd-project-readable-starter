export function firstChars(message, size = 10) {
  const trimmed = message.trim();
  return (trimmed.length > size)
    ? trimmed.substr(0, size) + '...'
    : trimmed;
}