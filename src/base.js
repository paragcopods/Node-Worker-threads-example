var baseCall = async (jobs) => {
  return new Promise((resolve, reject) => {
    let tick = 0;
    let tock = 0;
    tick = performance.now();
    let count = 0;
    for (let job of jobs) {
      for (let i = 0; i < job; i++) {
        count++;
      }
    }
    tock = performance.now();
    resolve(tock - tick);
  });
};
module.exports = {baseCall}
