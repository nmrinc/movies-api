# Express JS API server

## Basic setup

---

### 1. NPM Setup

```
> npm init -y
```

---

### 2. Install Production dependencies

```
> npm i express dotenv
```

### Express JS

Express is a minimal and flexible Node.js web application framework. 
With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.

### dotenv

It's a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on [The Twelve-Factor App methodology](https://12factor.net/config).

---

### 3. Install Dev dependencies

```
> npm i -D nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier
```

### nodemon

It's a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.

### eslint

ESLint statically analyze your code to quickly find problems.

### eslint-config-prettier

Turns off all rules that are unnecessary or might conflict with Prettier. 
This lets you use your favorite shareable config without letting its stylistic choices get in the way when using Prettier.

### eslint-plugin-prettier

Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

### prettier

An opinionated code formatter

---

### 4. Install Hook to auto format every commit

```
>npx mrm lint-staged
```
[lint-staged](https://www.npmjs.com/package/lint-staged)  
Run linters against staged git files and don't let 💩 slip into your code base!
---

### 5. Update package.json Scripts

```
"scripts": {
  "dev": "DEBUG=app:* nodemon index",
  "start": "NODE_ENV=production node index"
},
```

### "dev"

Launch a development environment, using a debug and launching nodemon

### "start"

Launch a production environment.

---

### 6. Create eslintrc file

```
{
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "extends": ["eslint:recommended", "prettier"],
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "no-console": "warn"
  }
}
```

Basic settings letting eslint know the ecmaVersion we'll going to use.  
Declaring the types of environment variables we're going to use.  
And turning as warn the no-console rule so we can use it.

---

### 7. Create prettierrc file

```
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Simple rules so everyone code in the same fashion.

---

### 8. Create a config file for the project

```
require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000
};

module.exports = { config };
```

It's a good practice to set an external config file so later it's easier to modify if there's any change.

---

### 9. Create Express server

Finally the last step it's create the server.

```
const express = require('express');

const app = express();

const { config } = require('./config/index');

app.get('/', (req, res) => {
  res.send('Sick sad world');
});

app.get('/json', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(config.port, () => {
  console.log('====================================');
  console.log(`Listening http:/localhost:${config.port}`);
  console.log('====================================');
});
```
