'use strict';
const snoowrap = require('snoowrap');
const r = require('./config.js');

const posts = r.getSubreddit('wallpapers').getHot({limit: 900})
  
const getHd = (post) => (post.title).includes("1920x1080")

const valid = posts.filter(getHd)
  .map(post => post.title).then(console.log)
