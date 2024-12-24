// Utility function to sanitize city names
export function sanitizeCityName(cityName) {
    return cityName.replace(/[^a-zA-Z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
}

// Utility function to format price
export function formatPrice(price) {
    const numericPrice = price.replace(/[^\d.-]/g, '');
    return parseFloat(numericPrice).toLocaleString('en-US');
}
