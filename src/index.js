import './sass/main.scss';

import fetchApi from './js/fetchCountries.js';

import cardTpl from './templates/countrie-card-markup.hbs';
import listTpl from './templates/countrie-list-markup.hbs';

// import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import { alert, notice, info, success, error } from '@pnotify/core';



const refs = {
    cardContainerRef: document.querySelector('.js-card-container'),
    inputRef: document.querySelector('.js-input')
}

var debounce = require('lodash.debounce');

refs.inputRef.addEventListener('input', debounce(onSearch, 500))


function clearSearch() {
  refs.cardContainerRef.innerHTML = '';
}

function onSearch(e) {    
    e.preventDefault();
    clearSearch();
    
    const searchInput = refs.inputRef.value;    
   
    fetchApi(searchInput)
        .then(renderResult)
        .catch(myError)
    
        // .catch(error => console.log(error))
        // .finally(() => clearSearch());
        
}

function renderResult(countries) {
   
     if (countries.length === 1) {
        clearSearch();
        renderCountryCard(countries)
    } else if (countries.length > 1 && countries.length <= 10) {
        clearSearch();
        renderCountrysList(countries);
    } else if (countries.length > 10) {
         error({
             title: 'Oh! To many matches found!',
             text: 'Clarify your request!'
         });    
    }
}

function myError() {
    error({
        title: 'Oh No!',
        text: 'Something terrible happened.'
    });
}

function renderCountryCard(country) {
    const markup = cardTpl(country)
    refs.cardContainerRef.innerHTML = markup;
}


function renderCountrysList(contrys) {
    const markupList = listTpl(contrys)
    refs.cardContainerRef.innerHTML = markupList;
}



