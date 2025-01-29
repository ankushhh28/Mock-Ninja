import express from "express"
import cors from "cors"
import ConnectionDB from "./database/Database.js";

import dotenv from "dotenv"

import cluster from 'cluster';
import os from 'os';

dotenv.config()

const app = express()
const numCPUs = os.cpus().length; 


const StartServer = () => {

  app.use(cors())
  
  const PORT = process.env.PORT_NUMBER || 5000
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  })

  ConnectionDB()
}

// if (cluster.isMaster) {

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
  StartServer();
// }