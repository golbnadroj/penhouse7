module.exports = function (eleventyConfig) {
  // Ensure all templates render directly to `*.html` paths instead of `/name/index.html`
  // This allows links like `services.html` to work in dev server and on production hosts.
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      // Keep the root index file path unchanged
      if (!data.page.fileSlug || data.page.fileSlug === "index") {
        return "index.html";
      }
      // For every other template, output as <slug>.html at the site root
      return `${data.page.fileSlug}.html`;
    },
  });

  // Copy static assets to the site root so links like /style.css keep working
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/script.js": "script.js" });
  eleventyConfig.addPassthroughCopy({ "src/contact_form.js": "contact_form.js" });

  // Provide a no-op `safe` filter for Liquid (matches Nunjucks `| safe`)
  eleventyConfig.addLiquidFilter("safe", (value) => value);

  return {
    // Build from the `src` source directory and output to `_site`
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes",
      output: "_site",
    },
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
  };
}; 