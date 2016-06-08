'use strict';

const jsdom = require('jsdom');
const path = require('path');
const fs = require('fs');

jsdom.env({
  url: 'http://substack.net/images/',
  scripts: ['http://code.jquery.com/jquery.js'],
  done: function (err, window) {
    const $ = window.$;
    let result = '';
    $('table tr').each(function(index, element) {
      const permission = $(element).children('td').eq(0).text();
      if (permission[1] !== 'd') { // avoid grabbing directories
        const url = $(element).children('td').eq(2).children('a').attr('href');
        const fileName = $(element).children('td').eq(2).text();
        const fileType = path.extname(fileName);
        result = result + `"${permission}", "http://substack.net${url}", "${fileType}"\n`;
      }
    });
    fs.writeFileSync('images.csv', result);
  }
});
