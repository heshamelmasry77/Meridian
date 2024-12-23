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

            // handle Norway separately or not at all
            if (data.hasOwnProperty('Norway')) {
                const nationalInsights = document.getElementById('national-insights');
                appendNorway(data['Norway'], nationalInsights);
            }

            // Get all city names as an array excluding 'Norway'
            const cities = Object.keys(data).filter(city => city !== "Norway");

            // Use a standard for loop to iterate through the cities
            for (let i = 0; i < cities.length; i++) {
                const city = cities[i];
                appendCityElement(data, city, listContainer, false, i); // Adjust index based on your preference
            }

            container.appendChild(listContainer);
        })
        .catch(error => console.error('Failed to load city data:', error));
});

function appendNorway(norwayData, container) {
    const formattedAveragePrice = formatPrice(norwayData['Average price']);
    const formattedPricePerSqm = formatPrice(norwayData['Average price per sqm']);

    const norwayElement = document.createElement('div');
    norwayElement.className = 'property-insights__content';
    norwayElement.innerHTML = `
        <h1 class="property-insights__title">Property insights in Norway <span>→</span></h1>
        <p class="property-insights__description">
            Norway’s real estate market has always been a fascinating mix of modern design and natural beauty.
            From urban apartments nestled in bustling city centers to serene countryside homes surrounded by fjords and forests,
            Norway offers something for everyone. But how does the country's property market adapt to the rising demand for sustainability
            and energy-efficient homes?
        </p>
        <p class="property-insights__stats">
            Average price: <span>${formattedAveragePrice} NOK</span><br>
            Average price per sqm: <span>${formattedPricePerSqm} NOK</span>
        </p>
    `;

    container.prepend(norwayElement); // Prepend to make it appear first
}
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
                <span class="cities-insights__icon">${index + 1}</span> ${city}
            </h3>
             <div class="cities-insights__image-container">
                <img src="assets/images/cities/${sanitizedCity}.jpg" class="cities-insights__image" alt="Photo in ${city}" />
                <div class="cities-insights__overlay">
                    <span>${city}</span>
                </div>
            </div>
            <h4 class="cities-insights__price">
                View More <span class="cities-insights__arrow">→</span>
            </h4>
            <p class="cities-insights__description">
                Average price: <span>${formattedAveragePrice} NOK</span>
            </p>
            <p class="cities-insights__description">
                Average price per sqm: <span>${formattedPricePerSqm} NOK</span>
            </p>
        </a>
    `;

    container.appendChild(cityElement);
}
