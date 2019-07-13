const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/.netlify", { target: "http://localhost:9000/.netlify" }));
};
