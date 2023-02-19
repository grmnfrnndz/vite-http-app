import './render-button.css';
import usersStore from "../../store/users-store";
import { renderTable } from '../render-table/render-table';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButton = (element) => {

    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next >';
    const previosButton = document.createElement('button');
    previosButton.innerHTML = '< Prev>';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = usersStore.getCurrentPage();

    element.append(previosButton, currentPageLabel, nextButton); 


    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    });

    previosButton.addEventListener('click', async() => {
        await usersStore.loadPreviusPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    });


};