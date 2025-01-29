import userEndpoint from './user.endpoint.js';
import postEndpoint from "./post.endpoint.js";

const routes = function (router) {
    userEndpoint(router);
    postEndpoint(router);
};

export default routes;
