import userManager from './user.manager.js';
import postManager from "./post.manager.js";


function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
    getUserManager: getter(userManager),
    getPostManager: getter(postManager)
};
