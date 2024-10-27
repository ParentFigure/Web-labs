const BASE_URL = 'http://localhost:3000/api/clips';

const createForm = document.getElementById('createForm');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalText = document.getElementById('modalText');
const closeModalBtn = document.getElementById('closeModal');

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

// Обробник події для форми створення
createForm.addEventListener('submit', async function(e) {
    e.preventDefault();

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

    // Створення нового кліпу
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ artist, song, length, views })
        });

        if (!response.ok) {
            throw new Error('Помилка при створенні кліпу');
        }

        const newClip = await response.json();
        showModal('Новий музичний кліп успішно створено!');
        createForm.reset();
    } catch (error) {
        showModal(error.message);
    }
});
