import {IData, Query} from "../models/data.model";
import model from "../schemas/data.schema";

class DataService {

    public async createPost(dataParams: IData): Promise<IData> {
        try {
            const post = new model(dataParams);
            await post.save();
            return post;
        } catch (error) {
            throw new Error('Failed to create post');
        }
    }

    public async browsePosts(query: Query<number | string | boolean>): Promise<IData[]> {
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

    public async getById(id: string): Promise<IData | null> {
        try {
            return await model.findById(id);
        } catch (error) {
            throw new Error(`Post with id: ${id} not found`)
        }
    }
}

export default DataService;
