async function getData() {
  const url = "http://localhost:4000/discover";

  // routing
  try {
    let serverResponse = await fetch(url);
    if (!serverResponse.ok) {
      throw new Error(`Server status: ${serverResponse.status}`);
    }

    let data = await serverResponse.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

async function insertDataToHTML(target) {
  let data = await getData();
  let container = document.querySelector(target);

  if (typeof data === "object") {
    let dataArray = iterateArray(data, "results");
  }

  container.textContent = data[0].original_title;
}
insertDataToHTML(".body");

// function iterateArray(data, detail) {
//   const array = [];
//   for (let i = 0; i < data.length; i++) {
//     array.push(data[i][detail]);
//   }
//   return array;
// }

function iterateArray(dataArray, detail) {
  return dataArray.map((data) => data.results);
}
