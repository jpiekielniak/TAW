import mongoose from 'mongoose';
import _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException.js';
import mongoConverter from '../service/mongoConverter.js';
import uniqueValidator from 'mongoose-unique-validator';
import generator from 'generate-password';
import passwordDAO from './passwordDAO.js';
import emailService from "../service/emailService.js";
import sha1 from "sha1";
import { v4 as uuidv4 } from 'uuid';

const userRole = {
    admin: 'admin',
    user: 'user'
};

const userRoles = [userRole.admin, userRole.user];

const userSchema = new mongoose.Schema({
    id: {type: String, index: true, unique: true},
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    role: {type: String, enum: userRoles, default: userRole.admin, required: false},
    active: {type: Boolean, default: true, required: false},
    isAdmin: {type: Boolean, default: true, required: false},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'post-jpxes', default: []}]
}, {
    collection: 'user'
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('user', userSchema);

function createNewOrUpdate(user) {
    return Promise.resolve().then(async () => {
        if (!user.id) {
            user.id = uuidv4();
        }

        const existingUser = await UserModel.findOne({ email: user.email });
        if (existingUser) {
            return UserModel.findByIdAndUpdate(existingUser._id, _.omit(user, 'id'), { new: true }).then(result => {
                if (result) {
                    return mongoConverter(result);
                }
                throw applicationException.new(applicationException.BAD_REQUEST, 'User update failed');
            });
        } else {
            return new UserModel(user).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
                throw applicationException.new(applicationException.BAD_REQUEST, 'User creation failed');
            });
        }
    }).catch(error => {
        if (error.name === 'ValidationError') {
            const validationError = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, validationError.message);
        }
        throw applicationException.new(applicationException.INTERNAL_SERVER_ERROR, error.message);
    });
}

async function getByEmailOrName(name) {
    const result = await UserModel.findOne({$or: [{email: name}, {name: name}]});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function get(id) {
    const result = await UserModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function removeById(id) {
    return await UserModel.findByIdAndRemove(id);
}

async function getAllUsers() {
    return await UserModel.find({});
}

async function resetPassword(email) {
    const user = await UserModel.findOne({$or: [{email: email}, {name: email}]});
    const password = generator.generate({length: 10, numbers: true});
    await passwordDAO.createOrUpdate({userId: user._id, password: hashString(password)});
    await emailService.sendEmail({
        recipient: user.email,
        subject: 'Your new password!',
        message: `Your new password is: ${password}`
    });
}

async function addFavorite(userId, postId) {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
    }
    if (!user.favorites.includes(postId)) {
        user.favorites.push(postId);
        await UserModel.updateOne({ _id: userId }, { favorites: user.favorites });

    }
}

async function deleteFavorite(userId, postId) {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
    }
    const index = user.favorites.indexOf(postId);
    if (index !== -1) {
        user.favorites.splice(index, 1);
        await UserModel.updateOne({ _id: userId }, { favorites: user.favorites });
    }
}

async function getFavorites(userId) {
    const user = await UserModel.findById(userId).populate('favorites');
    if (!user) {
        throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
    }
    return user.favorites;
}

function hashString(password) {
    return sha1(password);
}

export default {
    createNewOrUpdate: createNewOrUpdate,
    getByEmailOrName: getByEmailOrName,
    get: get,
    removeById: removeById,
    getAllUsers: getAllUsers,
    resetPassword: resetPassword,
    addFavorite: addFavorite,
    deleteFavorite: deleteFavorite,
    getFavorites: getFavorites,

    userRole: userRole,
    model: UserModel
};
