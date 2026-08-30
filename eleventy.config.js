module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/interactive");
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter("date", (value) => {
    return new Date(value).toISOString().slice(0, 10);
  });

  // Neighbor post within a series: dir = "prev" | "next".
  eleventyConfig.addFilter("seriesNeighbor", (seriesList, name, part, dir) => {
    const series = (seriesList || []).find((s) => s.name === name);
    if (!series) return null;
    const posts = series.posts;
    const i = posts.findIndex((p) => (p.data.part ?? 0) === part);
    if (i === -1) return null;
    return dir === "prev" ? posts[i - 1] || null : posts[i + 1] || null;
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  // Posts that don't belong to a series, newest first.
  eleventyConfig.addCollection("standalonePosts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .filter((p) => !p.data.series)
      .reverse();
  });

  // One entry per series: { name, posts } with posts ordered by `part` ascending.
  eleventyConfig.addCollection("seriesList", (collectionApi) => {
    const bySeries = {};
    for (const post of collectionApi.getFilteredByGlob("src/posts/*.md")) {
      const name = post.data.series;
      if (!name) continue;
      (bySeries[name] = bySeries[name] || []).push(post);
    }
    return Object.keys(bySeries)
      .sort()
      .map((name) => ({
        name,
        posts: bySeries[name].sort(
          (a, b) => (a.data.part ?? 0) - (b.data.part ?? 0)
        ),
      }));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
