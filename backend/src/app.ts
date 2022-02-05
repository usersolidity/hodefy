import express from "express";
import { startServer } from "./utils/server.js";
import { ServerConfig } from "./interfaces/server";
import { setMongoConnection } from "./middleware/db.js";
import { PORT } from "./constants/index.js";
import "dotenv/config";

// Routes
import propertiesRoutes from "./routes/properties.js";
import usersRoutes from "./routes/users.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
// Connect to mongodb
app.use(setMongoConnection);

app.use("/users", usersRoutes);
app.use("/properties", propertiesRoutes);

startServer(
  (config: ServerConfig) => {
    app.listen(config.port);
  },
  { port: PORT }
);
