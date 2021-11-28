/* eslint-disable @typescript-eslint/no-var-requires */

const withPWA = require('next-pwa');
// const wordList = require('./utils/wordList');

module.exports = withPWA({
  future: { webpack5: true },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  // trailingSlash: true,
  // exportPathMap() {
  //   const paths = {
  //     '/': { page: '/' },
  //   };

  //   wordList.forEach((word) => {
  //     paths[`/search/${word}`] = {
  //       page: '/search/[keyword]',
  //       query: { keyword: word },
  //     };
  //   });

  //   return paths;
  // },
});
