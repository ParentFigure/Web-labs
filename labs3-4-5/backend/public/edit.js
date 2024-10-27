const BASE_URL = 'http://localhost:3000/api/clips';

let clips = [];

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
        populateEditOptions();
    } catch (error) {
        showModal(error.message);
    }
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
editForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const selectedIndex = editSelect.value;
    if (selectedIndex === "") {
        showModal('Будь ласка, виберіть кліп для редагування.');
        return;
    }

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

    const clipId = clips[selectedIndex]._id;

    // Оновлення кліпу
    try {
        const response = await fetch(`${BASE_URL}/${clipId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ artist, song, length, views })
        });

        if (!response.ok) {
            throw new Error('Помилка при оновленні кліпу');
        }

        const updatedClip = await response.json();
        clips[selectedIndex] = updatedClip;
        showModal('Музичний кліп успішно оновлено!');
        editForm.reset();
        populateEditOptions();
    } catch (error) {
        showModal(error.message);
    }
});

// Ініціалізація
fetchClips();
