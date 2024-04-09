import { Request, Response, Router } from "express";

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/:id`, this.addData.bind(this));
        this.router.get(`${this.path}/:id`, this.getPost.bind(this));
        this.router.post(`${this.path}`, this.addPost.bind(this));
        this.router.delete(`${this.path}/:id`, this.deletePost.bind(this));
        this.router.post(`${this.path}/:num`, this.getNthPost.bind(this));
        this.router.get(`${this.path}s`, this.getAll.bind(this));
        this.router.delete(`${this.path}s`, this.deleteAll.bind(this));
    }

    private getAll(response: Response) {
        response.status(200).json(testArr);
    }

    private addData(request: Request, response: Response) {
        testArr.push(request.body.data);
        response.status(200).json(testArr);
    }

    private getPost(request: Request, response: Response) {
        const id = Number(request.params.id);
        if (!Number.isInteger(id) || id >= testArr.length || id < 0) {
            response.status(400).json({ exception: 'Invalid ID' });
            return;
        }
        response.status(200).json(testArr[id]);
    }

    private addPost(request: Request, response: Response) {
        testArr.push(request.body.data);
        response.status(201).send();
    }

    private deletePost(request: Request, response: Response) {
        const id = Number(request.params.id);
        if (!Number.isInteger(id) || id >= testArr.length || id < 0) {
            response.status(400).json({ exception: 'Invalid ID' });
            return;
        }
        testArr.splice(id, 1);
        response.status(204).send();
    }

    private getNthPost(request: Request, response: Response) {
        const num = Number(request.params.num);
        const posts = testArr.slice(0, num);
        response.status(200).json(posts);
    }

    private deleteAll(request: Request, response: Response) {
        testArr = [];
        response.status(200).json(testArr);
    }
}

export default PostController;
