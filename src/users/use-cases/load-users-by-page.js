import { localhostUserToModel } from "../mappers/locahost-users.mapper";
import { User } from "../models/user";

/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async (page = 1) => {

    const url =`${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    // const users = data.map(userRaw => localhostUserToModel(userRaw));
    const users = data.map(localhostUserToModel);
    // console.log(users);
    return users;
}