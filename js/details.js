import { sanitizeCityName, formatPrice } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const cityKey = params.get('city');  // This comes correctly sanitized

    fetch('data/insights.json')
        .then(response => response.json())
        .then(originalData => {
            // Create a new object with sanitized keys
            const sanitizedData = {};
            Object.keys(originalData).forEach(key => {
                sanitizedData[sanitizeCityName(key)] = originalData[key];
            });

            const cityData = sanitizedData[cityKey];
            const container = document.getElementById('details-container');
            displayCityDetails(cityData, container, cityKey);
        })
        .catch(error => console.error('Error loading city data:', error));
});

function displayCityDetails(cityData, container, cityName) {
    if (cityData) {
        container.innerHTML = `
            <div class="city-details__container">
                <div>
                    <a href="index.html" class="city-details__back-link">← Back to insights</a>
                </div>
                <h1 class="city-details__title">Details for ${cityName || 'the city'}</h1>
                
                <img src="assets/images/cities/${cityName}.jpg" alt="${cityData.name || 'City'}" class="city-details__image">
                ${generateCityDetailRow('Change Last Month', cityData['Change last month'], '%')}
                ${generateCityDetailRow('Change Seasonally Adjusted Last Month', cityData['Change seasonally adjusted last month'], '%')}
                ${generateCityDetailRow('Change Year to Date', cityData['Change year to date'], '')}
                ${generateCityDetailRow('Change Last Year', cityData['Change last year'], '%')}
                ${generateCityDetailRow('Change Last 5 Years', cityData['Change last 5 years'], '%')}
                ${generateCityDetailRow('Change Last 10 Years', cityData['Change last 10 years'], '%')}
                ${generateCityDetailRow('Average Price per Sqm', formatPrice(cityData['Average price per sqm']), 'NOK')}
                ${generateCityDetailRow('Average Price', formatPrice(cityData['Average price']), 'NOK')}
            </div>
        `;
    } else {
        container.innerHTML = "<p class='city-details__error'>City details are not available.</p>";
    }
}

function generateCityDetailRow(label, value, unit) {
    // Check if the value is negative and apply a red color class
    const isNegative = parseFloat(value) < 0;
    const valueClass = isNegative ? 'city-details__value--negative' : 'city-details__value';

    return `
        <div class="city-details__detail">
            <span class="city-details__label">${label}:</span>
            <span class="${valueClass}">${value}${unit}</span>
        </div>
    `;
}

