tweethook
=========

This is an app that listens for commits from GitHub WebHooks and then tweets them. It's just a gluing-together of a super-plain web server and [twit](https://www.npmjs.org/package/twit).

Installation
------------

    git clone git@github.com:jimkang/tweethook.git
    npm install

Then, create a `config.js` file in the project root that contains your [Twitter API keys](https://apps.twitter.com/). Example:

    module.exports = {
      twitter: {
        consumer_key: 'asdfkljqwerjasdfalpsdfjas',
        consumer_secret: 'asdfasdjfbkjqwhbefubvskjhfbgasdjfhgaksjdhfgaksdxvc',
        access_token: '9999999999-zxcvkljhpoiuqwerkjhmnb,mnzxcvasdklfhwer',
        access_token_secret: 'opoijkljsadfbzxcnvkmokwertlknfgmoskdfgossodrh'
      }
    };

Usage
-----

You can run the app with `make run`.

License
-------

MIT.
