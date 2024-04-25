import {NextFunction, Request, Response, Router} from 'express';
import DataService from "../modules/services/data.service";
import Joi from "joi";

class DataController {
    public path = '/api/data';
    public router = Router();
    private postService: DataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.createData);
        this.router.get(`${this.path}s`, this.browseData);
        this.router.get(`${this.path}/:id`, this.getDataById);
        this.router.delete(`${this.path}/:id`, this.removeAllData);
        this.router.delete(`${this.path}s`, this.removeAllData);
    }

    private createData = async (request: Request, response: Response) => {
        const {title, text, image} = request.body;

        const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required()
        });

        try {
            const validatedData = await schema.validateAsync({title, text, image });
            await this.postService.createPost(validatedData)
            response.status(201).json(validatedData);
        } catch (error) {
            console.error('Validation Error:', error);
            response.status(400).json({error: 'Invalid data'});
        }
    };

    private browseData = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const posts = await this.postService.browsePosts({});
            response.status(200).json(posts);
        } catch (error) {
            console.error(`Browse error: ${error.message}`);
            response.status(500).json({error: 'There was an error'});
        }
    }

    private getDataById = async (request: Request, response: Response) => {
        const {id} = request.params;
        const post = await this.postService.getById(id);

        post ?
            response.status(200).json(post) :
            response.status(404).json({error: `Post with id: ${id} not found`});

    }

    private removeData = async (request: Request, response: Response) => {
        const {id} = request.params;
        await this.postService.removePostById(id);
        response.sendStatus(204);
    }

    private removeAllData = async (request: Request, response: Response) => {
        await this.postService.deleteAllPosts({});
        return response.sendStatus(204);
    }
}

export default DataController;
