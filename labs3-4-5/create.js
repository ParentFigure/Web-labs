// Отримання даних з localStorage або створення порожнього масиву
let clips = JSON.parse(localStorage.getItem('clips')) || [];

// DOM Елементи
const createForm = document.getElementById('createForm');
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

// Обробник події для форми створення
createForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Отримання значень форми
    const artist = createForm.artist.value.trim();
    const song = createForm.song.value.trim();
    const length = parseInt(createForm.length.value);
    const views = parseInt(createForm.views.value);

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

    // Додавання нового кліпу
    clips.push({ artist, song, length, views });
    saveClips();
    showModal('Новий музичний кліп успішно створено!');

    // Очищення форми
    createForm.reset();
});

// Обробники для модального вікна
closeModalBtn.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);
