const button = document.querySelector("#button1");

button.addEventListener("click", () => {
  getGeo();
});

function getGeo() {
  if ("geolocation" in navigator) {
    console.log("geolocation is available");
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.querySelector("#latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;

      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      console.log(json);
    });
  } else {
    console.log("geolocation is not available");
  }
}
