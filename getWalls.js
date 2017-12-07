'use strict';
const snoowrap = require('snoowrap');
const r = require('./config.js');

r.getSubreddit('wallpapers')
  .getHot({limit: 900}).map(post => post.title).then(console.log)

// r.getHot().map(post => post.title).then(console.log);
