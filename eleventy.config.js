module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/contact_form.js");
  eleventyConfig.addPassthroughCopy("src/cgv-nav.js");

  eleventyConfig.setTemplateFormats(["html", "njk", "md"]);

  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: data => {
      if (data.page.filePathStem === "/index") {
        return "index.html";
      }
      return data.page.fileSlug + ".html";
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes"
    },
    templateFormats: ["html", "njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}; 