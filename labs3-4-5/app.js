// Initial Data from Python Project
let clips = [
    { artist: "Silverchair", song: "Slave", length: 120, views: 5000000 },
    { artist: "Nirvana", song: "Stay away", length: 200, views: 2000000 },
    { artist: "KMFDM", song: "MEGALOMANIAC", length: 180, views: 1000000 }
];

// DOM Elements
const clipsList = document.getElementById('clipsList');
const searchInput = document.getElementById('search');
const sortViewsBtn = document.getElementById('sortViews');
const sortLengthBtn = document.getElementById('sortLength');
const totalViewsBtn = document.getElementById('totalViews');
const totalDiv = document.getElementById('total');

const createForm = document.getElementById('createForm');
const editForm = document.getElementById('editForm');
const editSelect = document.getElementById('editSelect');

const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalText = document.getElementById('modalText');
const closeModalBtn = document.getElementById('closeModal');

// Function to Render Clips
function renderClips(displayClips) {
    clipsList.innerHTML = ''; // Clear existing clips
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

// Function to Populate Edit Select Options
function populateEditOptions() {
    editSelect.innerHTML = ''; // Clear existing options
    clips.forEach((clip, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${clip.artist} - ${clip.song}`;
        editSelect.appendChild(option);
    });
}

// Function to Show Modal with Message
function showModal(message) {
    modalText.textContent = message;
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
}

// Function to Hide Modal
function hideModal() {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
}

// Initial Rendering
renderClips(clips);
populateEditOptions();

// Event Listeners

// Search Functionality
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredClips = clips.filter(clip => 
        clip.artist.toLowerCase().includes(searchTerm) ||
        clip.song.toLowerCase().includes(searchTerm)
    );
    renderClips(filteredClips);
});

// Sort by Views
sortViewsBtn.addEventListener('click', function() {
    const sortedClips = [...clips].sort((a, b) => b.views - a.views);
    renderClips(sortedClips);
});

// Sort by Length
sortLengthBtn.addEventListener('click', function() {
    const sortedClips = [...clips].sort((a, b) => b.length - a.length);
    renderClips(sortedClips);
});

// Calculate Total Views
totalViewsBtn.addEventListener('click', function() {
    const totalViews = clips.reduce((acc, clip) => acc + clip.views, 0);
    totalDiv.textContent = `Total Views: ${totalViews.toLocaleString()}`;
});

// Handle Create Form Submission
createForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get Form Values
    const artist = createForm.artist.value.trim();
    const song = createForm.song.value.trim();
    const length = parseInt(createForm.length.value);
    const views = parseInt(createForm.views.value);

    // Validate Inputs
    if (!artist || !song) {
        showModal('Artist and Song names cannot be empty.');
        return;
    }
    if (isNaN(length) || length <= 0) {
        showModal('Length must be a positive number.');
        return;
    }
    if (isNaN(views) || views < 0) {
        showModal('Views must be a non-negative number.');
        return;
    }

    // Add New Clip
    clips.push({ artist, song, length, views });
    renderClips(clips);
    populateEditOptions();
    createForm.reset();
    showModal('New music clip created successfully!');
});

// Handle Edit Form Submission
editForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get Selected Clip Index
    const selectedIndex = editSelect.value;
    if (selectedIndex === "") {
        showModal('Please select a clip to edit.');
        return;
    }

    // Get Form Values
    const artist = editForm.editArtist.value.trim();
    const song = editForm.editSong.value.trim();
    const length = parseInt(editForm.editLength.value);
    const views = parseInt(editForm.editViews.value);

    // Validate Inputs
    if (!artist || !song) {
        showModal('Artist and Song names cannot be empty.');
        return;
    }
    if (isNaN(length) || length <= 0) {
        showModal('Length must be a positive number.');
        return;
    }
    if (isNaN(views) || views < 0) {
        showModal('Views must be a non-negative number.');
        return;
    }

    // Update Clip
    clips[selectedIndex] = { artist, song, length, views };
    renderClips(clips);
    populateEditOptions();
    editForm.reset();
    showModal('Music clip updated successfully!');
});

// Handle Modal Close
closeModalBtn.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);

// Populate Edit Form When Selection Changes
editSelect.addEventListener('change', function() {
    const selectedIndex = editSelect.value;
    if (selectedIndex === "") return;

    const clip = clips[selectedIndex];
    document.getElementById('editArtist').value = clip.artist;
    document.getElementById('editSong').value = clip.song;
    document.getElementById('editLength').value = clip.length;
    document.getElementById('editViews').value = clip.views;
});
