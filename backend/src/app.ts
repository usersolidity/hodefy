import express from 'express';
import {startServer} from './utils/server.js';
import { ServerConfig } from './interfaces/server';
import {setMongoConnection} from './middleware/db.js';
import { PORT } from "./constants/index.js";
import 'dotenv/config';

// Routes
import propertiesRoutes from './routes/properties.js';

const app = express();

// Connect to mongodb
app.use(setMongoConnection);

app.use('/properties', propertiesRoutes);

startServer((config: ServerConfig) => {
    app.listen(config.port);    
},{port: PORT});

 