function createWebhookTweeter(opts) {
  // opts should include:
  //  twit: A twit instance.

  function reportCommitsFromPayload(payload) {
    // console.log('payload', payload);
    if ('commits' in payload && Array.isArray(payload.commits)) {
      var tweetMessages = payload.commits.map(getCommitTweetText);
      tweetMessages.forEach(tweetMessage);    
    }
  }
  
  function tweetMessage(message) {
    opts.twit.post('statuses/update', {
      status: message
    },
    function logResult(error, reply) {
      if (error) {
        console.log(error);
      }
    });  
  } 

  return {
    reportCommitsFromPayload: reportCommitsFromPayload
  };
}

var shortenedURLLength = 20;
var maxTweetMessageLength = 140 - shortenedURLLength - 2;
var ellipsis = '\u2026';

function getCommitTweetText(commit) {
  var text = commit.message;
  if (text.length > maxTweetMessageLength) {
    text = text.slice(0, maxTweetMessageLength) + ellipsis;
  }
  text += (' ' + commit.url);
  return text;
}

module.exports = createWebhookTweeter;
