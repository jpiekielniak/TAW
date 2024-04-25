import UserModel from '../schemas/user.schema';
import {IUser} from "../models/user.model";

class UserService {
    public async createNewOrUpdate(user: IUser) {
        console.log(user)
        try {
            if (!user._id) {
                const userModel = new UserModel(user);
                return await userModel.save();
            } else {
                return await UserModel.findByIdAndUpdate(user._id, {$set: user}, {new: true});
            }
        } catch (error) {
            console.error('Error creating or updating user', error);
            throw new Error('Error creating or updating user')
        }
    }

    public async getByEmailOrName(name: string) {
        try {
            const result = await UserModel.findOne({$or: [{email: name}, {name: name}]});

            if (result) {
                return result;
            }
        } catch (error) {
            console.error('Error getting user by email or name', error);
            throw new Error('Error getting user by email or name');
        }
    }

    public async getAllUsers() {
        try {
            return await UserModel.find();
        } catch (error) {
            console.error('Error getting all users', error);
            throw new Error('Error getting all users');
        }
    }
}

export default UserService;
