import PostDAO from "../DAO/postDAO.js";


function create(context) {
    async function create(postData) {
        const post = await PostDAO.create(postData);
        if (await post) {
            return post;
        }
        return null;
    }

    async function browsePosts() {
        const posts = await PostDAO.browse({});
        if (await posts) {
            return posts;
        }
        return null;
    }

    async function getPost(id) {
        const post = await PostDAO.get(id);

        if (await post) {
            return post;
        }
        return null;
    }

    async function removePost(id) {
        const post = await PostDAO.remove(id);
        if (await post) {
            return post;
        }
        return null;
    }

    async function removeAllPosts() {
        const posts = await PostDAO.removeAll();
        if (await posts) {
            return posts;
        }
        return null;
    }

    return {
        create: create,
        browsePosts: browsePosts,
        getPost: getPost,
        removePost: removePost,
        removeAllPosts: removeAllPosts
    }
}

export default {
    create: create
}
