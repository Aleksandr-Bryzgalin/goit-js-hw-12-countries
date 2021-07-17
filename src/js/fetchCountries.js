const BASE_URL = 'https://restcountries.eu/rest/v2'

export default function fetchCountrieByName(contryName) {
    return fetch(`${BASE_URL}/name/${contryName}`)
        .then(response => {
            return response.json();
        });
}  
