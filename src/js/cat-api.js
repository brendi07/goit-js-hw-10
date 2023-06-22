const COMMON_URL = 'https://api.thecatapi.com/v1';
 const API_KEY =
   'live_rHLT2vvPGdQWBh0kkmQVpTmxWz7FdkdqfMde6XxaGftuzI62kzheMak3kWL4wozk';

export function fetchBreeds() {
  return fetch(`${COMMON_URL}/breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}


export function fetchCatByBreed(breedId) {
  return fetch(
    `${COMMON_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
   
}