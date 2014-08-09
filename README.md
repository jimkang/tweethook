tweethook
=========

This is an app that listens for commits from [GitHub webhooks](https://developer.github.com/webhooks/) and then tweets them. It's just a gluing-together of a super-plain web server and [twit](https://www.npmjs.org/package/twit).

The way it works is that the web server listens for POSTs from a Github webhook, then parses the webhook payload to look for commit messages, then shapes each commit message into something tweetable, then tweets them.

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

You can run the app with `make run`. It'll start the web server up up with [pm2](https://github.com/Unitech/pm2), a supervisor process that'll bring it back up when it goes down. If you want to just run it plain-style, `node .` will do it.

After that, add webhooks to the GitHub repositories that you want to be tweeting. The webhook stuff is under https://github.com/<username>/<reponame>/settings/hooks. Hit "Add webhook", then put the URL at which you're running tweethook into the "Payload URL" field. Don't forget the port number. (It's 3002 by default.)

License
-------

MIT.
