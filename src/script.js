// (function () {
// })()
var withoutWorkerBtn = document.getElementById("withoutWorkerBtn");
withoutWorkerBtn.addEventListener("click", (e) => {
  runTestForWithoutWorker();
});
var withWorkerBtn = document.getElementById("withWorkerBtn");
withWorkerBtn.addEventListener("click", (e) => {
  runTestForWorker();
});
var wwLoader = document.querySelector("#wwLoader");
var uwLoader = document.querySelector("#uwLoader");
var wwText = document.querySelector("#wwText");
var uwText = document.querySelector("#uwText");

const API_URLS = [
  "http://localhost:3000/worker?q=5",
  "http://localhost:3000?q=5",
];

async function runTestForWorker() {
  uwLoader.classList.remove("hidden");
  fetch("http://localhost:3000/worker?q=5")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      uwLoader.classList.add("hidden");
      uwText.textContent = Math.round(res.data)/1000 + 'sec';
    })
    .catch(err => {
        console.log(err);
    })
// 
  //   try {
  //     const promises = API_URLS.map((url) => fetch(url));
  //     const responses = await Promise.all(promises);
  //     const data = await Promise.all(
  //       responses.map((response) => response.json())
  //     );
  //     console.log("DATA", data);
  //     wwLoader.classList.add('hidden')

  //     wwText.textContent = data[1].data

  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching APIs:", error);
  //     throw error;
  //   }
}
async function runTestForWithoutWorker() {
    wwLoader.classList.remove("hidden");
    fetch("http://localhost:3000?q=5")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      wwLoader.classList.add("hidden");
      wwText.textContent = Math.round(res.data)/1000 + 'sec'
    })
    .catch(err => {
        console.log(err);
    })
}
