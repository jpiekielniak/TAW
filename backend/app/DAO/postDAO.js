import mongoose from "mongoose";
import mongoConverter from "../service/mongoConverter.js";
import {v4 as uuidv4} from "uuid";


const postSchema = new mongoose.Schema({
    id: {type: String, required: false, unique: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    views: {type: Number, default: 0},
    created: {type: Date, default: Date.now},
}, {
    collection: 'post-jpxes'
})

const PostModel = mongoose.model('post-jpxes', postSchema);

async function create(data) {
    if (!data.id) {
        data.id = uuidv4();
    }
    const result = await new PostModel(data).save();
    if (result) {
        return mongoConverter(result);
    }
    return null;
}

async function browse() {
    try {
        const result = await PostModel.find({ __v: 0 }).sort({ created: -1 })

        if (result) {
            return mongoConverter(result);
        }
        return null;
    } catch (error) {
        console.error("Error browsing posts:", error);
        return null;
    }
}


async function get(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    const result = await PostModel.findById(id)
    result.views += 1;
    await result.update(result);
    if (result) {
        return mongoConverter(result);
    }
    return null;

}

async function remove(id) {
    return await PostModel.findByIdAndDelete(id);
}

async function removeAll() {
    return await PostModel.deleteMany({});
}

export default {
    create: create,
    browse: browse,
    get: get,
    remove: remove,
    removeAll: removeAll,

    model: PostModel
}
