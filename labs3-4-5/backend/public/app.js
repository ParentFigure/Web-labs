const BASE_URL = 'http://localhost:3000/api/clips';

let clips = [];

const clipsList = document.getElementById('clipsList');
const searchInput = document.getElementById('search');
const sortViewsBtn = document.getElementById('sortViews');
const sortLengthBtn = document.getElementById('sortLength');
const totalViewsBtn = document.getElementById('totalViews');
const totalDiv = document.getElementById('total');

const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalText = document.getElementById('modalText');
const closeModalBtn = document.getElementById('closeModal');

// Функція для відображення кліпів
function renderClips(displayClips) {
    clipsList.innerHTML = ''; // Очистити список
    if (displayClips.length === 0) {
        clipsList.innerHTML = '<p>Кліпи не знайдено.</p>';
        return;
    }
    displayClips.forEach((clip, index) => {
        clipsList.insertAdjacentHTML('beforeend', `
            <div class="clip">
                <p><strong>Artist:</strong> ${clip.artist}</p>
                <p><strong>Song:</strong> ${clip.song}</p>
                <p><strong>Length:</strong> ${clip.length} seconds</p>
                <p><strong>Views:</strong> ${clip.views.toLocaleString()}</p>
                <button class="deleteBtn" data-id="${clip._id}">Delete</button>
            </div>
        `);
    });

    // Додаємо обробники подій для кнопок Delete
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const clipId = this.getAttribute('data-id');
            try {
                const response = await fetch(`${BASE_URL}/${clipId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Помилка при видаленні кліпу');
                }

                // Видаляємо кліп з масиву та перерендерюємо список
                clips = clips.filter(clip => clip._id !== clipId);
                renderClips(clips);
                showModal('Музичний кліп успішно видалено!');
            } catch (error) {
                showModal(error.message);
            }
        });
    });
}

// Функція для показу модального вікна
function showModal(message) {
    modalText.textContent = message;
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Заборонити прокручування
}

// Функція для приховання модального вікна
function hideModal() {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Відновити прокручування
}

// Закриття модального вікна
closeModalBtn.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);

// Функція для отримання кліпів з бекенду
async function fetchClips() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Помилка при отриманні кліпів');
        }
        clips = await response.json();
        renderClips(clips);
    } catch (error) {
        showModal(error.message);
    }
}

fetchClips();

// Обробник події пошуку
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredClips = clips.filter(clip => 
        clip.artist.toLowerCase().includes(searchTerm) ||
        clip.song.toLowerCase().includes(searchTerm)
    );
    renderClips(filteredClips);
});

// Обробник події сортування за переглядами
sortViewsBtn.addEventListener('click', function() {
    const sortedClips = [...clips].sort((a, b) => b.views - a.views);
    renderClips(sortedClips);
});

// Обробник події сортування за тривалістю
sortLengthBtn.addEventListener('click', function() {
    const sortedClips = [...clips].sort((a, b) => b.length - a.length);
    renderClips(sortedClips);
});

// Обробник події підрахунку загальних переглядів
totalViewsBtn.addEventListener('click', function() {
    const totalViews = clips.reduce((acc, clip) => acc + clip.views, 0);
    totalDiv.textContent = `Total Views: ${totalViews.toLocaleString()}`;
});
