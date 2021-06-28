if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var grantConfig = {
    "defaults": {
      "origin": process.env.CALLBACK,
      "transport": "session",
      "state": true
    },
    "twitter": {
      "key": process.env.TWITTER_KEY,
      "secret": process.env.TWITTER_SECRET,
      "callback": "/manage",
      "response": ["tokens", "raw", "profile"]
    }
  }

module.exports = grantConfig;