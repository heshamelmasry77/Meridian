function sanitizeCityName(cityName) {
    // Remove special characters, replace spaces with hyphens, and convert to lowercase
    return cityName.replace(/[^a-zA-Z0-9 -]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase(); // Convert to lowercase
}
function formatPrice(price) {
    // Remove any non-digit characters except decimal points
    let numericPrice = price.replace(/[^\d.-]/g, '');
    return parseFloat(numericPrice).toLocaleString('en-US');
}
document.addEventListener('DOMContentLoaded', function() {
    fetch('data/insights.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cities-container');
            container.innerHTML = ''; // Clear existing content

            const listContainer = document.createElement('div');
            listContainer.className = 'cities-insights__list';

            // Check and append Norway first if it exists in the data
            if (data.hasOwnProperty('Norway')) {
                appendCityElement(data, 'Norway', listContainer, true, 0); // Norway as the first item
            }

            // Get all city names as an array excluding 'Norway'
            const cities = Object.keys(data).filter(city => city !== "Norway");

            // Use a standard for loop to iterate through the cities
            for (let i = 0; i < cities.length; i++) {
                const city = cities[i];
                if (data.hasOwnProperty(city)) {
                    appendCityElement(data, city, listContainer, false, i + 1); // Pass index + 1 since Norway takes position 0
                }
            }

            container.appendChild(listContainer);
        })
        .catch(error => console.error('Failed to load city data:', error));
});

function appendCityElement(data, city, container, isNational, index) {
    const cityData = data[city];
    const sanitizedCity = sanitizeCityName(city);
    const formattedAveragePrice = formatPrice(cityData['Average price']);
    const formattedPricePerSqm = formatPrice(cityData['Average price per sqm']);

    const cityElement = document.createElement('div');
    cityElement.className = 'cities-insights__item';
    if (isNational) {
        cityElement.classList.add('national-overview'); // Add special class for styling
    }

    cityElement.innerHTML = `
        <a href="details.html?city=${encodeURIComponent(sanitizedCity)}">
            <h3 class="cities-insights__title">
                <span class="cities-insights__icon">${index + 1}</span> ${city}  <!-- Display index + 1 -->
            </h3>
            <img src="assets/images/cities/${sanitizedCity}.jpg" class="cities-insights__image" alt="Photo in ${city}" />
            <h4 class="cities-insights__price">
                View More <span class="cities-insights__arrow">→</span>
            </h4>
            <p class="cities-insights__description">
                Average price: <span>${formattedAveragePrice} NOK </span>
            </p>
            <p class="cities-insights__description">
                Average price per sqm: <span>${formattedPricePerSqm} NOK  </span>
            </p>
        </a>
    `;

    container.appendChild(cityElement);
}
