'use strict';
const snoowrap = require('snoowrap');
const r = require('./config.js');
const http = require('https');
const fs = require('fs');

const posts = r.getSubreddit('wallpapers').getHot({limit: 900})

const getHd = (post) => (post.title).includes("1920x1080")

const makeFile = (files) => fs.createWriteStream(files)

const getBaseName  = (link) => {
  let len = link.length
  let start = link.lastIndexOf("/") + 1
  let result = link.slice(start,len)
  return result
}

console.log( getBaseName('http://i.pi.gy/LNbJl.png'))

const valid = posts.filter(getHd)
  .map(post => post.url)
  .map(post => { 
    let name = getBaseName(post)
    let file = makeFile(String(name))
    request(String( post ),file)
  })


// const valids = posts.filter(getHd)
//   .map(post => {
//     let file = post.url
//     request(file,file)
//   })
//   .then(console.log)

var request = (url,filename) => http.get(url, function(response) {
  response.pipe(filename);
});

request('https://i.redd.it/ol38n959lfyz.jpg',makeFile( "r.jpg" ))
