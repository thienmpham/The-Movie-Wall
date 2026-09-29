require("dotenv").config();
const http = require("http");

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BEARER_TOKEN;
const ACCOUNT_ID = process.env.ACCOUNT_ID;

const url = {
  discover: new URL(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  ),
};

const method = { get: "GET", post: "POST" };

function createServer(url, method) {
  let path = url.pathname;

  const server = http.createServer(async (req, res) => {
    const options = {
      method: method,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN} `,
      },
    };

    let tmdbResponse = await fetch(url, options);
    let tmdbData = await tmdbResponse.json(); // turn data in json

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    });

    routeData(path, req.method);

    res.end(JSON.stringify(tmdbData));
    // console.log("Data:", tmdbData);
  });
  server.listen(PORT);
  console.log("shhhhhh... the server is listening");
}

createServer(url.discover, method.get);

// routing is a series of checks
function routeData(path, method) {
  if (path.includes("discover") == true && method == "GET") {
    console.log("routing discover data");
  }
}
