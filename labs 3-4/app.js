// Отримання даних з localStorage або створення порожнього масиву
let clips = JSON.parse(localStorage.getItem('clips')) || [
    { artist: "Silverchair", song: "Slave", length: 120, views: 5000000 },
    { artist: "Nirvana", song: "Stay away", length: 200, views: 2000000 },
    { artist: "KMFDM", song: "MEGALOMANIAC", length: 180, views: 1000000 }
];

// DOM Елементи
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

// Функція для збереження даних в localStorage
function saveClips() {
    localStorage.setItem('clips', JSON.stringify(clips));
}

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
            </div>
        `);
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

// Початковий рендер кліпів
renderClips(clips);

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

// Обробники для модального вікна
closeModalBtn.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);

// Збереження даних при закритті сторінки
window.addEventListener('beforeunload', saveClips);