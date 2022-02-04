import express from 'express';
import {startServer} from './utils/server.js';
import { ServerConfig } from './interfaces/server';
import 'dotenv/config';

const app = express();
console.log(process.env.AWS_ACCESS_KEY_ID, typeof process.env.AWS_ACCESS_KEY_ID)

startServer((config: ServerConfig) => {
    app.listen(config.port);    
},{port: 4000});

 