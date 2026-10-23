require("dotenv").config();
const http = require("http");

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BEARER_TOKEN;
const ACCOUNT_ID = process.env.ACCOUNT_ID;

const link = {
  discover: new URL(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  ),
};

const method = { get: "GET", post: "POST" };

function createServer(method, link) {
  const server = http.createServer(async (req, res) => {
    const path = req.url;

    const options = {
      method: method,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN} `,
      },
    };

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    });

    let data = await routeData(options, path, link, req.method);

    res.end(JSON.stringify(data));
  });
  server.listen(PORT);
  console.log("shhhhhh... the server is listening");
}
createServer(method.get, link.discover);
// createServer(method.get, link.image);

// routing is a series of checks
async function routeData(options, path, link, method) {
  if (path === "/discover" && method == "GET") {
    let min = 0;
    let max = 20;

    let tmdbResponse = await fetch(link, options);
    let tmdbData = await tmdbResponse.json(); // turn data in json
    for (i = 0; i < 20; i++) {
      iterateData(tmdbData.results[iterateNum(0, 20)].id);
    }
    return tmdbData;
  }
  if (path === "/image" && method == "GET") {
    let tmdbResponse = await fetch(link, options);
    let tmdbData = await tmdbResponse.json(); // turn data in json
  }
}

function storeMovieDetails(data) {
  let obj = {};
}

function iterateData(data) {
  console.log(data);
  // for(i = 0; i < data.length; i++){
  //   data[i].
  // }
}

function iterateNum(min, max) {
  for (i = min; i < max; i++) {
    return i;
  }
}
