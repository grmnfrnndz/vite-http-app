import { localhostUserToModel } from "../mappers/locahost-users.mapper";
import { User } from "../models/user";

/**
 * 
 * @param {String|Number} userId 
 * @returns {Promise<User>}
 */
export const getUserById = async (userId) => {

    const url =`${import.meta.env.VITE_BASE_URL}/users/${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    const user = localhostUserToModel(data);
    return user;
}