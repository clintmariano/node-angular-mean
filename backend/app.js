const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb://clint:' + process.env.MONGO_ATLAS_PW + '@meanappcluster-shard-00-00-sfpgo.mongodb.net:27017,meanappcluster-shard-00-01-sfpgo.mongodb.net:27017,meanappcluster-shard-00-02-sfpgo.mongodb.net:27017/node-angular?ssl=true&replicaSet=MeanAppCluster-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  }).catch((error) => {
    console.log(error);
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
