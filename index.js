const fastify = require("fastify")();
const { baseCall } = require("./src/base.js");
const { runWithWorker } = require("./src/worker/index.js");
fastify.register(require("@fastify/cors"), {
  origin: "*",
  methods: ["POST", "GET"],
});

fastify.get("/", async function handler(req, res) {
  const DATASETVALUE = req.query.q;
  const jobs = Array.from({ length: DATASETVALUE }, () => 1e9);
  const resp = await baseCall(jobs);
  return { data: resp };
});
fastify.get("/worker", async function handler(req, res) {
  var DATASETVALUE2 = req.query.q;
  // var WORKERSCOUNT = req.query.w;
  const jobs = Array.from({ length: DATASETVALUE2 }, () => 1e9);
  const resp = await runWithWorker(jobs, 8);
  // return { data: [{time: resp}, {workers: 8}] };
  return { data: resp };
});
// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    console.log("Server is running on port 3000");
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};
start();
