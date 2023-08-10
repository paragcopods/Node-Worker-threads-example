const { Worker } = require("worker_threads");
// CHUNKING
function chunkify(array, n) {
  let chunks = [];
  for (let i = n; i > 0; i--) {
    chunks.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return chunks;
}
// MAIN
function runWithWorker(jobs, concurrentWorkers) {
  const tick = performance.now();
  var tock = 0;
  let completedWorkers = 0;
  var globalCount = 0;
  const chunks = chunkify(jobs, concurrentWorkers);
  return new Promise((resolve, reject) => {
    chunks.forEach((data, i) => {
      const worker = new Worker("./worker.js");
      worker.postMessage(data);
      worker.on("message", (count) => {
        globalCount += count;
        completedWorkers++;
        if (concurrentWorkers === completedWorkers) {
          tock = performance.now();
          resolve(tock - tick);
        }
      });
      worker.on("error", (err) => {
        reject(err);
      });
      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  });
}
module.exports = { runWithWorker };
