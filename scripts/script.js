


const thumbnailsContainer = document.getElementById('gallery-container');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let images = [];
let currentIndex = 0;

async function fetchImages(repo) {
    try {
        const repoURL = `https://api.github.com/repos/Lumieres-Emergentes/${repo}/contents/`;
        const response = await fetch(repoURL);
        const data = await response.json();
        images = data.filter(item => item.type === 'file' && /\.(jpg|jpeg|png|gif)$/.test(item.name));
        displayThumbnails();
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

(async function() {
    const currentPage = window.location.pathname.split('/').pop();
    const repo = (currentPage === '' || currentPage === 'index.html') ? 'L-E_General' : 'L-E_Cars';
    fetchImages(repo);
})();



function displayThumbnails() {
    images.forEach((image, index) => {
        const thumbnailDiv = document.createElement('div');
        //thumbnailDiv.classList.add('thumbnail');
        thumbnailDiv.innerHTML = `<img src="${image.download_url}" alt="${image.name}" class='thumbnail' data-index="${index}">`;
        thumbnailsContainer.appendChild(thumbnailDiv);
    });
}

function openModal(index) {
    currentIndex = index;
    modalImage.src = images[index].download_url;
    modal.style.display = 'flex';
}

function closeModalFn() {
    modal.style.display = 'none';
}

function showPrev() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    modalImage.src = images[currentIndex].download_url;
}

function showNext() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    modalImage.src = images[currentIndex].download_url;
}

thumbnailsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        openModal(parseInt(e.target.dataset.index));
    }
});

closeModal.addEventListener('click', closeModalFn);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

window.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'Escape') closeModalFn();
    }
});

fetchImages();

