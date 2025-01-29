import business from "../business/business.container.js";
import applicationException from "../service/applicationException.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import Joi from "joi";

const postEndpoint = (router) => {
    router.post('/api/posts', auth, async (request, response, next) => {
        const { title, text, image } = request.body;
        const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required()
        })

        try {
            const validatedData = await schema.validateAsync({title, text, image})
            await business.getPostManager(validatedData).create(request.body);
            response.status(200).send(validatedData);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    })

    router.get('/api/posts', async (request, response, next) => {
        try {
            let result = await business.getPostManager(request).browsePosts({});
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    })

    router.get('/api/posts/:id', async (request, response, next) => {
        const { id } = request.params;
        try {
            const post = await business.getPostManager(request).getPost(id);
            post ?
                response.status(200).send(post) :
                response.status(404).send(`Post with id: ${id} not found`);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    })

    router.delete('/api/posts/:id', auth,admin, async (request, response, next) => {
        const { id } = request.params;
        try {
            let result = await business.getPostManager(request).removePost(id);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    })

    router.delete('/api/posts', admin, async (request, response, next) => {
        try {
            let result = await business.getPostManager(request).removeAllPosts();
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    })
}

export default postEndpoint;
