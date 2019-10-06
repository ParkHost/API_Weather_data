getData();

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();

  for (item of data) {
    const root = document.createElement("p");
    const geo = document.createElement("div");

    geo.textContent = `${item.lat}, ${item.lon}`;
    root.append(geo);
    document.body.append(root);
  }
  console.log(data);
}
