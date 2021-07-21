import './sass/main.scss';

import fetchApi from './js/fetchCountries.js';

import cardTpl from './templates/countrie-card-markup.hbs';
import listTpl from './templates/countrie-list-markup.hbs';


const refs = {
    cardContainerRef: document.querySelector('.js-card-container'),
    inputRef: document.querySelector('.js-input')
}

var debounce = require('lodash.debounce');

refs.inputRef.addEventListener('input', debounce(onSearch, 500))


function onSearch(e) {    
    e.preventDefault();
       
    const searchInput = e.target.value;
    
    if (searchInput === "") {
       return
    }

    if (searchInput.status === 404) {
        return myError();
    }
   
    fetchApi(searchInput)
        .then(renderResult)
        .catch(myError)
            
}

function renderResult(countries) {
    
    if (countries.length === 1) {        
        renderCountryCard(countries)
    } else if (countries.length > 1 && countries.length <= 10) {   
        renderCountrysList(countries);
    } else {
        myError(error);      
          
    }
}


function renderCountryCard(country) {
    const markup = cardTpl(country)
    refs.cardContainerRef.innerHTML = markup;
}


function renderCountrysList(contrys) {
    const markupList = listTpl(contrys)
    refs.cardContainerRef.innerHTML = markupList;
}

function myError(error) {
    alert('Oh No! Something terrible happened. Clarify your request!');
}


