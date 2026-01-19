const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const BASE_URL = 'https://api.github.com';
const profileResults = document.querySelector('.profile-results');

btnSearch.addEventListener('click', async () => {
    const userName = inputSearch.value;
    if (userName) {
        profileResults.innerHTML = '<p class="loading">Carregando...</p>';
        try {
            const response = await fetch(`${BASE_URL}/users/${userName}`);
            if (!response.ok) {
                alert("Usuário não encontrado.");
                profileResults.innerHTML = '';
                return;
            }
            const userData = await response.json();
            console.log(userData);
            profileResults.innerHTML = `
                <div class="profile-card">
                    <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
                    <div class="profile-info">
                        <h2>${userData.name}</h2>
                        <p>${userData.bio || 'Sem biografia disponível.'}</p>
                    </div>
                </div>`
        } catch (error) {
            console.error("Erro ao buscar o usuário:", error);
            alert("Por favor, digite um nome de usuário do GitHub.");
            profileResults.innerHTML = '';
        }
    } else {
        alert("Por favor, digite um nome de usuário do GitHub.");
        profileResults.innerHTML = '';
    }
});

