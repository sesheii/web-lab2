function sendGetRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

function displayUsers(users) {
    const usersListDiv = document.getElementById('users-list');
    usersListDiv.innerHTML = '';
    if (users.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'list-group';
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <div>
                    <strong>Ім'я:</strong> ${user.full_name}<br>
                    <strong>Пошта:</strong> ${user.email}
                </div>
                <span class="badge badge-primary badge-pill">User ID: ${user.id}</span>
            `;
            ul.appendChild(li);
        });
        usersListDiv.appendChild(ul);
    } else {
        usersListDiv.innerHTML = '<p class="text-muted">Користувачів не знайдено</p>';
    }
}

const requestUrl = "http://127.0.0.1:8000/users/?format=json";

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value.trim().toLowerCase();
    sendGetRequest(requestUrl)
        .then(users => {
            const filteredUsers = users.filter(user =>
                user.full_name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.id.toString().includes(query)
            );
            displayUsers(filteredUsers);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('users-list').innerHTML = '<p class="text-danger">Помилка завантаження даних</p>';
        });
});

window.addEventListener('load', function() {
    sendGetRequest(requestUrl)
        .then(displayUsers)
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('users-list').innerHTML = '<p class="text-danger">Помилка завантаження даних</p>';
        });
});