import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cluster from "cluster";
import os from "os";
import bodyParser from "body-parser";

import ConnectionDB from "./Database/Database.js";
import Router from "./Routes/Routes.js";
import CandidateRouter from "./Routes/CandidateRoute.js";
import ExpertRouter from "./Routes/ExpertRoutes.js";

dotenv.config();

const app = express();
const numCPUs = os.cpus().length;

app.use(cors());
app.use(bodyParser.json());

app.use("/", Router);
app.use("/Can", CandidateRouter);
app.use("/Exp", ExpertRouter);

const StartServer = () => {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  ConnectionDB();
};

// if (cluster.isMaster) {
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
  StartServer();
// }