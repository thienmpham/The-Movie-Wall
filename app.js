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
  let dataArray = [];

  if (typeof data === "object") {
    dataArray.push(iterateArray(data, "title"));
    // iterate through dataArray
    for (let i = 0; i < dataArray.length; i++) {
      container.textContent += dataArray[i];
    }
  }
}
insertDataToHTML("#body");

function iterateArray(dataArray, detail) {
  return dataArray.map((data) =>
    //iterates through nested array
    data.map((nested) => nested[detail]),
  );
}

function cloneElement(element) {
  const target = document.querySelector(element);
  let clone = target.cloneNode();
}

function updateID(target, name) {
  target.id += `${name}`;
}
