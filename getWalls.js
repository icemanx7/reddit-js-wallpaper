'use strict';
const fetch = require('node-fetch');
const snoowrap = require('snoowrap');
const r = require('./config.js');
const http = require('http');
const https = require('https');
const fs = require('fs');
const FileReader = require('filereader')

const posts = r.getSubreddit('wallpapers').getHot({limit: 900})

const dir = '/home/richard.thomas/Pictures/';

// const testDest = (dir) => {
//   if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
//   }
// }

// const getDestStatus = (dir) => {

// }

// console.log(testDest(dir))

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
  .map(post => { 
    let name = getBaseName(post)
    let file = makeFile(String(name))
    request(String(post),name)
  })

const request = (url,filename) => fetch(url).then(image => image.body
  .pipe(fs.createWriteStream(filename))
  .on('close', () => console.log('image downloaded'))
);


