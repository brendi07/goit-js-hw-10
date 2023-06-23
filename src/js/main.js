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
    select.classList.remove('hidden');
    addHiden();
  })
  .catch(er => {
     select.classList.add('hidden');
    Notify.failure(error.textContent);
  });


select.addEventListener('click', onSelection);

function onSelection(event) {
  event.preventDefault();
 catInfo.classList.add('hidden')
  removeHiden();

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      addHiden();
      catInfo.classList.remove('hidden')
      const { name, description, temperament } = data[0].breeds[0];
      const photo = data[0].url;
      (catInfo.innerHTML = cardMarkup(
        photo,
        name,
        temperament,
        description
      ));
    })
    .catch(er => {
      Notify.failure(error.textContent);
      select.classList.add('hidden');
    });

  select.classList.remove('hidden');


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