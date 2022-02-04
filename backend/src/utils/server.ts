import { ServerConfig } from "../interfaces/server";

export const startServer = (cb: any, config: ServerConfig)  => {
    try { 
        cb(config);
        console.log((`Server started at port: ${config.port}`));
    } catch (err) {
        console.log(`Could not start server: ${err}`);
        throw Error('Server error');
    }    
};
