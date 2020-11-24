//@concept SIMPLE EXPRESS SERVER

//@o First we require the express module
const express = require('express');

//@o Then we instance the app as express()
const app = express();

//@o Require the config file to consume it.
const { config } = require('./config/index');

//@o Express manage routes for request.
//@o In this case when the app request the root, will print a message as a response.
app.get('/', (req, res) => {
  res.send('Sick sad world');
});

//@o As express have different type of response. In this case will give a json.
app.get('/json', (req, res) => {
  res.json({ hello: 'world' });
});

//## ---- ##
//@feature Leap-year challenge

//@o Check if the year is divisible by 100, then by 400 or by 4
const isLeap = (arg) => arg % 100 === 0 ? arg % 400 === 0 : arg % 4 === 0;

app.get('/leap:year', (req, res) => {
  let modifier = '';
  let query = parseInt(req.params.year.slice(1));
  let now = parseInt(new Date().getFullYear());

  if(query < now){
    isLeap(query) ? modifier = `was` : modifier = `wasn't`;
  }else if(query === now){
    isLeap(query) ? modifier = `is` : modifier = `isn't`;
  }else{
    isLeap(query) ? modifier = `will be` : modifier = `won't be`;
  }

  res.send(`${query} ${modifier} leap-year`);
});
//## ---- ##


//@o Finally we'll indicate the port where the server will listen. In this case served from the config file.
app.listen(config.port, () => {
  console.log('====================================');
  console.log(`Listening http://localhost:${config.port}`);
  console.log('====================================');
});