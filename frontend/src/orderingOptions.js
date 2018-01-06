const orderingOptions = {};
orderingOptions.VOTE_SCORE = {
  name: 'vote score',
  value: ['-voteScore', '-timestamp']
};
orderingOptions.TIMESTAMP = {
  name: 'date',
  value: ['-timestamp', '-voteScore']
};
export default orderingOptions;