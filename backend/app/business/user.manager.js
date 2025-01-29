import PasswordDAO from '../DAO/passwordDAO.js';
import TokenDAO from '../DAO/tokenDAO.js';
import UserDAO from '../DAO/userDAO.js';
import applicationException from '../service/applicationException.js';
import sha1 from 'sha1';
import generator from "generate-password";

function create(context) {

  function hashString(password) {
    return sha1(password);
  }

  async function authenticate(name, password) {
    let userData;
    const user = await UserDAO.getByEmailOrName(name);
    if (!user) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }
    userData = await user;
    await PasswordDAO.authorize(user._id, hashString(password));
    const token = await TokenDAO.create(userData);
    return getToken(token);
  }

  function getToken(token) {
    return {token: token.value};
  }

  async function createNewOrUpdate(userData) {
    const user = await UserDAO.createNewOrUpdate(userData);
    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({userId: user._id, password: hashString(userData.password)});
    } else {
      return user;
    }
  }

  async function removeHashSession(userId) {
    return await TokenDAO.remove(userId);
  }

  async function getAllUsers() {
    return await UserDAO.getAllUsers();
  }

  async function resetPassword(email) {
    return await UserDAO.resetPassword(email);
  }

  async function addFavorite(userId, postId) {
    return await UserDAO.addFavorite(userId, postId);
  }

  async function deleteFavorite(userId, postId) {
    return await UserDAO.deleteFavorite(userId, postId);
  }

  async function getFavorites(userId) {
    return await UserDAO.getFavorites(userId);
  }

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession,
    getAllUsers: getAllUsers,
    resetPassword: resetPassword,
    addFavorite: addFavorite,
    deleteFavorite: deleteFavorite,
    getFavorites: getFavorites
  };
}

export default {
  create: create
};
