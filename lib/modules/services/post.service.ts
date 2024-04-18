import {IPost, Query} from "../models/post.model";
import model from "../schemas/post.schema";

class PostService {

    public async createPost(postParams: IPost): Promise<IPost> {
        try {
            const post = new model(postParams);
            await post.save();
            return post;
        } catch (error) {
            throw new Error('Failed to create post');
        }
    }

    public async browsePosts(query: Query<number | string | boolean>): Promise<IPost[]> {
        try {
            return await model.find(query, {__v: 0});
        } catch (error) {
            throw new Error('Failed browse posts');
        }
    }

    public async deleteAllPosts(query: Query<number | string | boolean>): Promise<void> {
        try {
            await model.deleteMany(query);
        } catch (error) {
            throw new Error('Failed to delete posts');
        }
    }

    public async removePostById(id: string): Promise<void> {
        try {
            await model.deleteOne({_id: id});
        } catch (error) {
            throw new Error('Failed to delete post');
        }
    }

    public async getById(id: string): Promise<IPost | null> {
        try {
            return await model.findById(id);
        } catch (error) {
            throw new Error(`Post with id: ${id} not found`)
        }
    }
}

export default PostService;
