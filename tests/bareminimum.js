var assert = require('assert');
var webhooktweeterFactory = require('../webhooktweeter');
var fs = require('fs');

var webhooktweeter = webhooktweeterFactory({
  twit: {
    post: function mockPost(path, data, callback) {
      // console.log(data);
      assert.equal(path, 'statuses/update');

      var isTrucatedTweetCase = (data.status.length > 142);
      if (isTrucatedTweetCase) {
        assert.deepEqual(data, {
            status: 'Underscore is a JavaScript library that provides a whole mess of useful functional programming helpers without extendi… https://github.com/jimkang/godtributes/commit/e15663abc6ee6c6d57f4d7929b6d1a7b45775a9f'
          },
          'Test failed: Twitter post is not as expected.'
        );
      }
      else {
        assert.deepEqual(data, {
            status: 'Updated followback to log in logger instead of console. https://github.com/jimkang/godtributes/commit/e15663abc6ee6c6d57f4d7929b6d1a7b45775a9f'
          },
          'Test failed: Twitter post is not as expected.'
        );        
      }

      callback();
    }
  }
});

var payload = JSON.parse(fs.readFileSync(
  __dirname + '/example-commit-payload.json'
));

webhooktweeter.reportCommitsFromPayload(payload);
