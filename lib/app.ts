import express from 'express';
import { config } from './config'
import Controller from './interfaces/controller.interface';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { requestLoggerMiddleware } from './middlewares/requestLogger.middleware'
class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initializeMiddlewares();

        this.initializeControllers(controllers)
        this.connectToDatabase();
    }

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(requestLoggerMiddleware);
    }

    private async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(config.databaseUrl)
            console.log('Connected to the database')
        } catch (error) {
            console.log('Error connecting to the database: ', error)
        }

        mongoose.connection.on('error', (error) => {
          console.error('Error connecting to the database: ', error)
        })

        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from the database')
        })

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        })
    }

    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App listening on port ${config.port}`);
        })
    }
}

export default App;
