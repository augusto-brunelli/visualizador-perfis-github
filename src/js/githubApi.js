const BASE_URL = 'https://api.github.com';

export function isValidUserName(userName) {
    return userName && userName.trim().length > 0;
}

export async function fetchUserProfile(userName) {
    try {
        const response = await fetch(`${BASE_URL}/users/${userName}`);

        if (!response.ok) {
            throw new Error('Usuário não encontrado');
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Erro ao buscar o usuário: ${error.message}`);
    }
}

export function showError(message) {
    alert(message);
}

export async function fetchGithubUserRepos(userName) {
    const response = await fetch(`${BASE_URL}/users/${userName}/repos?per_page=10&sort=created`);
    if (!response.ok) {
        throw new Error('Repositórios não encontrados.');
    }
    return await response.json();
}