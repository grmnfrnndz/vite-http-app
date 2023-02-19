import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 1,
    users: [],
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if (users.length === 0) return;

    state.users =  users;
    state.currentPage +=  1;
}

const loadPreviusPage = async () => {
    if (state.currentPage === 1) return;

    const users = await loadUsersByPage(state.currentPage - 1);

    if (users.length === 0) return;

    state.users =  users;
    state.currentPage -=  1;
}


/**
 * 
 * @param {User} user 
 */
const onUserChanged = (userUpdated) => {

    let isFound = false;

    state.users = state.users.map(user => {
        if (user.id === userUpdated.id) {
            isFound = true;
            return userUpdated;
        }
        return user;
    });

    if (state.users.length < 10 && !isFound) {
        state.users.push(userUpdated);
    }

}

const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage);
    if (users.length === 0) {
        await loadPreviusPage();
        return;
    };

    state.users =  users;
}


export default {
    loadNextPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getusers: () => [...state.users],

    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}