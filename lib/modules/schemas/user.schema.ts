import {model, Schema} from 'mongoose';
import {IUser} from '../models/user.model'

const roleTypeEnum = {
    user: 'user',
    admin: 'admin'
}

const roleTypes = [roleTypeEnum.user, roleTypeEnum.admin]

const UserSchema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    role: {type: String, enum: roleTypes, default: roleTypeEnum.admin},
    active: {type: Boolean, default: true},
    isAdmin: {type: Boolean, default: true}
})

export default model<IUser>('User', UserSchema);
