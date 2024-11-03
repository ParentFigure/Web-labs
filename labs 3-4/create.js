let clips = JSON.parse(localStorage.getItem('clips')) || [];

const createForm = document.getElementById('createForm');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalText = document.getElementById('modalText');
const closeModalBtn = document.getElementById('closeModal');

function saveClips() {
    localStorage.setItem('clips', JSON.stringify(clips));
}

function showModal(message) {
    modalText.textContent = message;
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

createForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const artist = createForm.artist.value.trim();
    const song = createForm.song.value.trim();
    const length = parseInt(createForm.length.value);
    const views = parseInt(createForm.views.value);

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

    clips.push({ artist, song, length, views });
    saveClips();
    showModal('Новий музичний кліп успішно створено!');

    createForm.reset();
});

closeModalBtn.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);
