import { fetchUserProfile, isValidUserName, showError } from './githubApi.js';
import { renderLoading, renderUserProfile, clearContainer } from './profileView.js';

const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const profileResults = document.querySelector('.profile-results');

btnSearch.addEventListener('click', handleSearch);

async function handleSearch() {
    const userName = inputSearch.value;

    if (!isValidUserName(userName)) {
        showError('Por favor, digite um nome de usuário do GitHub.');
        clearContainer(profileResults);
        return;
    }

    renderLoading(profileResults);

    try {
        const userData = await fetchUserProfile(userName);
        renderUserProfile(userData, profileResults);
    } catch (error) {
        console.error(error.message);
        showError(error.message);
        clearContainer(profileResults);
    }
}