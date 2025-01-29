import business from '../business/business.container.js';
import applicationException from '../service/applicationException.js';
import admin from '../middleware/admin.js';
import auth from '../middleware/auth.js';
import Joi from "joi";

const userEndpoint = (router) => {
    router.post('/api/user/auth', async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).authenticate(request.body.login, request.body.password);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/create', async (request, response, next) => {
        const {name, password, email} = request.body;
        const schema = Joi.object({
            name: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required()
        });
        try {
            const validatedData = await schema.validateAsync({name, password, email});
            await business.getUserManager(validatedData).createNewOrUpdate(request.body);
            response.status(200).send(validatedData);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/logout/:userId', auth, async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).removeHashSession(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.get('/api/users', admin, async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).getAllUsers();
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    })

    router.post('/api/users/reset-password', async (request, response, next) => {
        const {email} = request.body;
        try {
            let result = await business.getUserManager(request).resetPassword(email);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    })

    router.post('/api/users/:userId/favorites', async (request, response) => {
        try {
            const { userId } = request.params;
            const { postId } = request.body;
            await business.getUserManager(request).addFavorite(userId, postId);
            response.status(200).send();
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/users/:userId/favorites/:postId', async (request, response) => {
        try {
            const { userId, postId } = request.params;
            await business.getUserManager(request).deleteFavorite(userId, postId)
            response.status(200).send();
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.get('/api/users/:userId/favorites', async (request, response) => {
        try {
            const { userId } = request.params;
            const favorites = await business.getUserManager(request).getFavorites(userId)
            response.status(200).send(favorites);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });


};

export default userEndpoint;
