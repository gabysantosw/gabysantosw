// needed for the dump filter
const util = require('util');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('assets');

  // making the dump pipe return an actual json from the collections object
  eleventyConfig.addFilter('dump', obj => { 
    return util.inspect(obj);
  });
}