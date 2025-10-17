module.exports = {
  siteUrl: "https://www.BMCS365.com",
  generateRobotsTxt: true,
  exclude: ["/api/*","/admin/*"],
  transform: async (config, path) => ({ loc: path, changefreq: "weekly", priority: path === "/" ? 1.0 : 0.8, lastmod: new Date().toISOString() }),
};
