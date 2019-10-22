const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "https://hellonesh.herokuapp.com/",
      changeOrigin: true,
      headers: {
        Connection: "keep-alive"
      }
    })
  );
};
