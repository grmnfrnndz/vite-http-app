import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by';

import './render-modal.css';
import modalHTML  from './render-modal.html?raw';

let modal, form ;
let loadedUser = {};

/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async (userId) => {
    modal?.classList.remove('hide-modal')
    loadedUser = {};

   if (!userId) return;
   
   const user = await getUserById(userId);
   setFormValues(user);

}

export const hideModal = () => {
    modal?.classList.add('hide-modal')
    form?.reset();
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
}


/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback 
 */
export const renderModal = (element, callback) => {

    if (modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        if (event.target.className !== 'modal-container') return;
        hideModal();
    });

    form.addEventListener('submit', async (event) => {
        // prevent event default of form
        event.preventDefault();

        const isActiveElement = form.querySelector('#is-active');

        const formData = new FormData(form);
        // formData.append(form);
        const userLike = {...loadedUser};
        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = +value; // convert to number
                continue;
            }
            if (key === 'isActive') {
                userLike[key] = (value === 'on') ? false: false;    
                continue;
            }
            
            userLike[key] = value;
        }

        userLike['isActive'] = isActiveElement.checked;

        await callback(userLike);

        hideModal();

    });


    element.append(modal);
}
