// Function to send query to the selected API
async function query(apiUrl, data) {
    const tokens = [
        "Bearer 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",
        "Bearer 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",
        "Bearer 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",
        "Bearer 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"

    ];
    const randomIndex = Math.floor(Math.random() * tokens.length);
    const response = await fetch(apiUrl, {
        headers: {
            Authorization: tokens[randomIndex],
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
    });

    // Check if the response is okay (status code 2xx)
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.blob();
}

// Function to generate a random character
function getRandomCharacter() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

// Function to handle image generation
async function generateImage() {
    const apiSelect = document.getElementById('api-select');
    const promptInput = document.getElementById('prompt');
    const outputDiv = document.getElementById('output');
    const errorBox = document.getElementById('error-box');
    const selectedApi = apiSelect.value;
    const prompt = promptInput.value.trim();

    if (!prompt) {
        alert('Please enter a prompt!');
        return;
    }

    // Append a random character to the prompt with a space
    const randomChar = getRandomCharacter();
    const finalPrompt = `${prompt} ${randomChar}`;

    // Show spinner and hide error box
    outputDiv.innerHTML = '<div class="spinner"></div>';
    errorBox.style.display = 'none';
  
    try {
        const imageBlob = await query(selectedApi, { inputs: finalPrompt });
        const imageUrl = URL.createObjectURL(imageBlob);
  
        // Display the generated image and add download button
        outputDiv.innerHTML = `
            <img src="${imageUrl}" alt="Generated Image" id="generated-image">
            <a id="download-btn" href="${imageUrl}" download="generated-image.png">
                <i class="fas fa-download"></i> Download
            </a>
        `;
    } catch (error) {
        console.error('Error generating image:', error);
  
        // Display error message and suggest user to try again later
        errorBox.style.display = 'block';
        errorBox.innerHTML = 'Failed to generate image. Please try again later.';
        outputDiv.innerHTML = ''; // Clear spinner
    }
}
  
// Add event listener to the button
document.getElementById('generate-btn').addEventListener('click', generateImage);
