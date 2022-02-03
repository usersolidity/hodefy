import express from 'express';
import {startServer} from './utils/server.js';
import { ServerConfig } from './interfaces/server';

const app = express();


startServer((config: ServerConfig) => {
    app.listen(config.port);    
},{port: 3000});

 