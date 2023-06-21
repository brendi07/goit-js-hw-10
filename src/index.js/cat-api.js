const COMMON_URL = 'https://api.thecatapi.com/v1';
 const api_key =
   'live_rHLT2vvPGdQWBh0kkmQVpTmxWz7FdkdqfMde6XxaGftuzI62kzheMak3kWL4wozk';

export function fetchBreeds() {
  return fetch(`${COMMON_URL}/breeds?api_key=${api_key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}


export function fetchCatByBreed(breedId) {
  return fetch(
    `${COMMON_URL}/images/search?api_key=${api_key}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
   
}