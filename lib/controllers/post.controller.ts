import {NextFunction, Request, Response, Router} from 'express';
import PostService from "../modules/services/post.service";

class PostController {
    public path = '/api/post';
    public router = Router();
    private postService: PostService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.createPost);
        this.router.get(`${this.path}s`, this.browsePosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.delete(`${this.path}/:id`, this.removePost);
        this.router.delete(`${this.path}s`, this.removeAllPosts);
    }

    private createPost = async (request: Request, response: Response) => {
        const {title, text, image} = request.body;

        const readingData = {
            title,
            text,
            image
        };

        try {
            await this.postService.createPost(readingData)
            response.status(201).json(readingData);
        } catch (error) {
            console.error('Error during save model:', error);
            response.status(400).json({error: 'Error during save model'});
        }
    };

    private browsePosts = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const posts = await this.postService.browsePosts({});
            response.status(200).json(posts);
        } catch (error) {
            console.error(`Browse error: ${error.message}`);
            response.status(500).json({error: 'There was an error'});
        }
    }

    private getPostById = async (request: Request, response: Response) => {
        const {id} = request.params;
        const post = await this.postService.getById(id);

        post ?
            response.status(200).json(post) :
            response.status(404).json({error: `Post with id: ${id} not found`});

    }

    private removePost = async (request: Request, response: Response) => {
        const {id} = request.params;
        await this.postService.removePostById(id);
        response.sendStatus(204);
    }

    private removeAllPosts = async (request: Request, response: Response) => {
        await this.postService.deleteAllPosts({});
        return response.sendStatus(204);
    }
}

export default PostController;
