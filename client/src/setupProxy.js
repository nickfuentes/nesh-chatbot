const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "https://nesh-chatbot.herokuapp.com/",
      headers: {
        Connection: "keep-alive"
      }
    })
  );
};
