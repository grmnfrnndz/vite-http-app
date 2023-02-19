import { localhostUserToModel } from '../mappers/locahost-users.mapper';
import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import { User } from '../models/user';


/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {

    const user = new User(userLike);

    if (!user.firstName || !user.lastName) {
        throw new Error('First and last name are required');
    }

    const userToSave = userModelToLocalhost(user);
    let userUpdated;

    if (user.id) {
        userUpdated =  await updateUser(userToSave);
    } else {
        userUpdated = await createUser(userToSave);
    }

    return localhostUserToModel(userUpdated);
}

/**
 * 
 * @param {Like<User>} user 
 */
const createUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await response.json();
    return newUser;
}

/**
 * 
 * @param {Like<User>} user 
 */
const updateUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updateUser = await response.json();
    return updateUser;
}
