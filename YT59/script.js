function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    }
}

function embedVideo() {
    const linkInput = document.getElementById('youtubeLink');
    const inputSection = document.getElementById('inputSection');
    const videoSection = document.getElementById('videoSection');
    const videoContainer = document.getElementById('videoContainer');
    
    let videoUrl = linkInput.value;
    
    let videoId = '';
    const urlPattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = videoUrl.match(urlPattern);
    
    if (match && match[1]) {
        videoId = match[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        

        videoContainer.innerHTML = `
            <iframe 
                src="${embedUrl}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
            </iframe>`;
        
        videoContainer.style.display = 'block';
        videoSection.style.display = 'block';
        inputSection.style.display = 'none';
    } else {
        alert('Please enter a valid YouTube URL');
    }
}

function goBack() {
    const inputSection = document.getElementById('inputSection');
    const videoSection = document.getElementById('videoSection');
    const videoContainer = document.getElementById('videoContainer');
    const linkInput = document.getElementById('youtubeLink');
    

    linkInput.value = '';
    
    inputSection.style.display = 'flex';
    videoSection.style.display = 'none';
    videoContainer.innerHTML = ''; 
}
