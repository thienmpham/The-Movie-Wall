async function getData() {
  const url = "http://localhost:4000";

  // routing

  try {
    let serverResponse = await fetch(url);
    if (!serverResponse.ok) {
      throw new Error(`Server status: ${serverResponse.status}`);
    }

    let data = await serverResponse.json();
    console.log(data.results);
  } catch (error) {
    console.error(error.message);
  }
}
getData();
