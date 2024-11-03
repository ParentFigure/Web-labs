// Отримання даних з localStorage або створення порожнього масиву
let clips = JSON.parse(localStorage.getItem('clips')) || [];

// DOM Елементи
const editForm = document.getElementById('editForm');
const editSelect = document.getElementById('editSelect');
const editArtist = document.getElementById('editArtist');
const editSong = document.getElementById('editSong');
const editLength = document.getElementById('editLength');
const editViews = document.getElementById('editViews');

const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalText = document.getElementById('modalText');
const closeModalBtn = document.getElementById('closeModal');

// Функція для збереження даних в localStorage
function saveClips() {
    localStorage.setItem('clips', JSON.stringify(clips));
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

// Функція для заповнення селекту
function populateEditOptions() {
    editSelect.innerHTML = '<option value="" disabled selected>Select a clip</option>'; // Default option
    clips.forEach((clip, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${clip.artist} - ${clip.song}`;
        editSelect.appendChild(option);
    });
}

// Початкове заповнення селекту
populateEditOptions();

// Обробник події зміни вибору кліпу
editSelect.addEventListener('change', function() {
    const selectedIndex = editSelect.value;
    if (selectedIndex === "") return;

    const clip = clips[selectedIndex];
    editArtist.value = clip.artist;
    editSong.value = clip.song;
    editLength.value = clip.length;
    editViews.value = clip.views;
});

// Обробник події для форми редагування
editForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Отримання вибраного індексу
    const selectedIndex = editSelect.value;
    if (selectedIndex === "") {
        showModal('Будь ласка, виберіть кліп для редагування.');
        return;
    }

    // Отримання значень форми
    const artist = editArtist.value.trim();
    const song = editSong.value.trim();
    const length = parseInt(editLength.value);
    const views = parseInt(editViews.value);

    // Валідація
    if (!artist || !song) {
        showModal('Artist та Song не можуть бути порожніми.');
        return;
    }
    if (isNaN(length) || length <= 0) {
        showModal('Length повинен бути позитивним числом.');
        return;
    }
    if (isNaN(views) || views < 0) {
        showModal('Views повинен бути невід’ємним числом.');
        return;
    }

    // Оновлення кліпу
    clips[selectedIndex] = { artist, song, length, views };
    saveClips();
    showModal('Музичний кліп успішно оновлено!');

    // Очищення форми
    editForm.reset();
    populateEditOptions();
});

// Обробники для модального вікна
closeModalBtn.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);