const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

const memeUrl = 'https://memegen.link/examples';

// Axios is basically for requests on the memeUrl website.
// .get is the request, .then is the response. If you console.log this than you get a lot of html text in the terminal.
axios
  .get(memeUrl)
  .then((response) => {
    download(urlConnect(htmlArray(response.data)));
  })
  // this will trigger when the requests makes a problem.
  .catch((err) => {
    console.log(err);
  });

// Cheerio extracts data from the memeURL. We tell cheerio that the is a class called "meme-img". It contains Objects to pull out. (the memes)
const htmlArray = (html) => {
  const $ = cheerio.load(html);
  const Meme = $('.meme-img');
  return memesArray(Meme);
};

// the memes are objects I want a loop that puts them in an array I = 0 is position, i < 10 is to fill up the positions in the array till we hit 10 and than stop.
const memesArray = (meme) => {
  let newArray = [];
  for (let i = 0; i < 10; i++) {
    newArray.push(meme[i].attribs.src);
  }
  return newArray;
};

// now we use a download async function to download the memes. But we want to give them different names. Again we use a loop to download the files from 1-10. We send them to the folder /memes/ and give them names.
async function download(Array) {
  const nameArray = [
    'meme1',
    'meme2',
    'meme3',
    'meme4',
    'meme5',
    'meme6',
    'meme7',
    'meme8',
    'meme9',
    'meme10',
  ];
  for (let i = 0; i < Array.length; i++) {
    const response = await fetch(Array[i]);
    const buffer = await response.buffer();
    fs.writeFile(`./memes/${nameArray[i]}.jpg`, buffer, () =>
      console.log('WOW I DID IT!'),
    );
  }
}

// We need to connect the array and the url and loop them ????????
const urlConnect = (array) => {
  let urlArray = [];
  const baseUrl = 'https://api.memegen.link/images';
  for (let i = 0; i < array.length; i++) {
    urlArray.push(baseUrl + array[i].toString());
  }
  return urlArray;
};
