const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "https://nesh-chatbot.herokuapp.com/",
      changeOrigin: true,
      headers: {
        Connection: "keep-alive"
      }
    })
  );
};
