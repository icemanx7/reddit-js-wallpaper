'use strict';
// -------------------------- imports ----------------------
const fetch = require('node-fetch');
const snoowrap = require('snoowrap');
const r = require('./config.js');
const fs = require('fs');
const FileReader = require('filereader')
const S = require('string');

// ------------------------- code that needs work ----------
const posts = r.getSubreddit('wallpapers').getHot({limit: 900})

const dir = '/home/richard.thomas/Pictures/';

const extValid = (file) => {
  if (S(file).endsWith(".jpg") || S(file).endsWith(".png")) {
    return true
  }
  else {
    return false
  }
}

const mkDest = (dirs) => {
  return dir + dirs
}

const makeFinal = (temp) => {
  let name = getBaseName(temp)
  let final = dir + name
}

const getHd = (post) => (post.title).includes("1920x1080")

const makeFile = (files) => fs.createWriteStream(files)

const getBaseName  = (link) => {
  let len = link.length
  let start = link.lastIndexOf("/") + 1
  let result = link.slice(start,len)
  return result
}

const valid = posts.filter(getHd)
  .map(post => post.url)
  .filter(extValid)
  .map(post => { 
    let name = getBaseName(post)
    request(String(post), mkDest(name))
  })

const request = (url,filename) => fetch(url).then(image => image.body
  .pipe(fs.createWriteStream(filename))
  .on('close', () => console.log('image downloaded'))
);


