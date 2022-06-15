export const formatSeconds = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
}
