function shouldRetry(attempt, maxRetries) {
  return attempt < maxRetries;
}

module.exports = { shouldRetry };