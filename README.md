# Launchlist 🚀

Launchlist is a simple and sharable todo list.

[Latest demo](https://launch-list.herokuapp.com/)

## Overview

### 👇 Features
- Sign in with Twitter

### ⏰ Coming soon
- Create task item
- Save task item against users
- Show task list upon sign in
- Delete tasks
- Completed tasks
- Overdue tasks
- Share task list


## Installation

Clone this repo and use npm to install dependencies 

```javascript
npm install
```

Create an .env file in the root folder with your Twitter application and MongoDB credentials.

```
CALLBACK=[Twitter callback url e.g. https://localhost:8080]
DATABASE_URL=[MongoDB connection URL]
SESSION_SECRET=[Random secret]
TWITTER_KEY=[Twitter key]
TWITTER_SECRET=[Twitter secret]
```

You can then run the application
```javascript
npm run start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)