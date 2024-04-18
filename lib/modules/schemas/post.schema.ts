import {model, Schema} from 'mongoose';
import {IPost} from "../models/post.model"

export const PostSchema: Schema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true}
})

export default model<IPost>('Post-JPX', PostSchema)
