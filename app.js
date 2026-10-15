async function getData() {
  const url = "http://localhost:4000";

  // routing

  try {
    let serverResponse = await fetch("http://localhost:4000/discover");
    if (!serverResponse.ok) {
      throw new Error(`Server status: ${serverResponse.status}`);
    }

    let data = await serverResponse.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error(error.message);
  }
}

async function insertDataToHTML(target) {
  let data = await getData();
  let container = document.querySelector(target);

  iterateArray(data);
  container.textContent = data[0].original_title;
}
insertDataToHTML(".body");

function iterateArray(data) {
  const obj = [];
  for (i = 0; i < data.length; i++) {
    data = data[i].original_title;
  }
}
