
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        endLoader();
    }, 300);
    //endLoader();
});

function endLoader() {
    const content = document.getElementById("gallery");
    setTimeout(function() {
        content.classList.replace('hidden','appear-animation'); 
    }, 50); 
}




async function fetchRepoImages(owner, repo) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file.name));
    } catch (error) {
        console.error('Error fetching the repo contents:', error);
        return [];
    }
}

function generateImageTags(images) {
    const container = document.getElementById('images-container');
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.download_url;
        imgElement.alt = image.name;
        imgElement.style.height = '300px'; 
        imgElement.style.margin = '10px'; 
        container.appendChild(imgElement);
    });
}

(async function() {
    const owner = 'Lumieres-Emergentes';
    const currentPage = window.location.pathname.split('/').pop();
    const repo = (currentPage === '' || currentPage === 'index.html') ? 'L-E_General' : 'L-E_Cars';
    const images = await fetchRepoImages(owner, repo);
    generateImageTags(images);
})();


function adjustContentPadding() {
    const header = document.getElementById('header');
    const content = document.getElementById('main');
    const headerHeight = header.offsetHeight;
    content.style.paddingTop = headerHeight + 'px';
}

window.addEventListener('load', adjustContentPadding);
window.addEventListener('resize', adjustContentPadding);




