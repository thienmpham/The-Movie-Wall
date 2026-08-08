require("dotenv").config();
const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.end("Hello!");
});

server.listen(PORT);
