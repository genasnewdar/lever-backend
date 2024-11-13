import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import BaseController from './controllers/BaseController';
import config from './configs/config';
import { errorHandler } from './middlewares/ErrorHandler';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: BaseController[], port: number) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.app.use(errorHandler);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        // allow cors requests from any origin and with credentials
        const corsOptions = {
            origin: '*',
            credentials: true,            //access-control-allow-credentials:true
            optionSuccessStatus: 200,
        }
        this.app.use(cors(corsOptions));

    }

    private initializeControllers(controllers: BaseController[]) {
        controllers.forEach((controller) => {
            let router = express.Router();
            controller.initializeRoutes(router);
            this.app.use(controller.baseUrl, router);
        });
    }

    private async initializeDeps() {
        await config.init();
    }

    public async listen() {
        await this.initializeDeps();
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
export default App;