/**
 * 
 * @param {String|Number} userId 
 */
export const deleteUserById = async (userId) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${userId}`;
    const response = await fetch(url, {
        method: 'DELETE'
    });

    const deleteResult = await response.json();
    console.log(deleteResult);

    return true;
}