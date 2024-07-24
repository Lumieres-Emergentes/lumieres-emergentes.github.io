
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        endLoader();
    }, 150); // Timeout pour les tests
    //endLoader();

});

function endLoader() {
    //const loader = document.getElementById("loader");
    const content = document.getElementById("gallery");
    //loader.classList.add('disappear-animation'); // make loader disappear
    setTimeout(function() {
        content.classList.replace('hidden','appear-animation'); // make page content appear
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
        imgElement.style.height = '300px'; // optional: adjust image size
        imgElement.style.margin = '10px'; // optional: adjust image margin
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

// Adjust padding on load
window.addEventListener('load', adjustContentPadding);

// Adjust padding on resize (to handle window resizing)
window.addEventListener('resize', adjustContentPadding);



/*
document.addEventListener("DOMContentLoaded", () => {
    // Simulate an API request or any async operation
    setTimeout(() => {
        hideLoader();
        showContent();
    }, 4000); // Replace with your actual data loading logic and time

    function hideLoader() {
        const loader = document.getElementById("loader");
        loader.style.display = "none";
    }

    function showContent() {
        const content = document.getElementById("content");
        content.style.display = "block";
    }
});



*/




