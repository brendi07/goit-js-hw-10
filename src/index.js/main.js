import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderText = document.querySelector('.loader-text');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');


fetchBreeds()
  .then(data => {
    const option = data.map(elements => {
      const { id, name } = elements;
      const murkup = `<option value=${id}>${name}</option>`;
      select.innerHTML += murkup;
    });
  })
  .catch(er => {
    Notify.failure(error.textContent);
  });


select.addEventListener('click', onSelection);

function onSelection(event) {
  event.preventDefault();
  select.classList.add('hidden');
  removeHiden();
  error.classList.add('hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { name, description, temperament } = data[0].breeds[0];
      const photo = data[0].url;
      return (catInfo.innerHTML = cardMarkup(
        photo,
        name,
        temperament,
        description
      ));
    })
    .catch(er => {
         Notify.failure(error.textContent);
    });

    select.classList.remove('hidden');
  addHiden();
   error.classList.add('hidden');
}

function cardMarkup(photo, name, temperament, description) {
 return `<img src=${photo} width=700px><div class="cat-decr"><h1>${name}</h1><p>${temperament}</p><p>${description}</p></div>`;
}

function removeHiden() {
   loaderText.classList.remove('hidden');
   loader.classList.remove('hidden');
}

function addHiden() {
 loaderText.classList.add('hidden');
 loader.classList.add('hidden');
}