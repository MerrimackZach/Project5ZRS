async function getAPOD(apiKey, date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function displayAPOD() {
    const apiKey = 'xBOJzxOxxPIym1X8WByXgc5T2HUDKupNzwCrxFjp';
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    
    const apodContainer = document.getElementById('apodContainer');
    const apodData = await getAPOD(apiKey, formattedDate);

    if (apodData) {
        const apodImage = document.createElement('img');
        apodImage.src = apodData.url;
        apodImage.alt = apodData.title;

        const apodTitle = document.createElement('h3');
        apodTitle.textContent = apodData.title;

        const apodExplanation = document.createElement('p');
        apodExplanation.textContent = apodData.explanation;

        apodContainer.appendChild(apodImage);
        apodContainer.appendChild(apodTitle);
        apodContainer.appendChild(apodExplanation);
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to fetch Astronomy Picture of the Day. Please try again later.';
        apodContainer.appendChild(errorMessage);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayAPOD();
});
