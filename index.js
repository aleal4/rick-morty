// https://rickandmortyapi.com/api/character?page=1

const getCharacters = (requestURL) => {
  return new Promise((resolve, reject) => {
    axios
      .get(requestURL)
      .then((res) => resolve(res.data.results))
      .catch((err) => reject(err));
  });
};

const initApp = () => {
  let baseURL = `https://rickandmortyapi.com/api/character?page=`;
  let promises = [];

  for (let i = 1; i < 43; i++) {
    let requestURL = baseURL + i;
    let promise = getCharacters(requestURL);
    promises.push(promise);
  }

  // Promise All - get all urls at the same time
  Promise.all(promises).then((values) => {
    let cleanData = values.flat();
    console.log(cleanData);
    buildApp(cleanData);
  });
};

initApp();

const buildApp = (character) => {
  let container = document.getElementById('character-container');
  container.innerHTML = '';

  character.forEach((character) => {
    let characterFlipCardContainer = document.createElement('div');
    characterFlipCardContainer.classList.add('flip-card');

    let characterFlipCardInner = document.createElement('div');
    characterFlipCardInner.classList.add('flip-card-inner');

    let characterFlipCardFront = document.createElement('div');
    characterFlipCardFront.classList.add('flip-card-front');

    let characterImage = document.createElement('img');
    characterImage.src = character.image;
    characterFlipCardFront.appendChild(characterImage);

    let characterFlipCardBack = document.createElement('div');
    characterFlipCardBack.classList.add('flip-card-back');

    let characterName = document.createElement('h2');
    characterName.textContent = character.name;
    characterFlipCardBack.appendChild(characterName);

    characterFlipCardInner.appendChild(characterFlipCardFront);
    characterFlipCardInner.appendChild(characterFlipCardBack);

    characterFlipCardContainer.appendChild(characterFlipCardInner);
    container.appendChild(characterFlipCardContainer);
  });
};

const searchCharacters = (e) => {
  e.preventDefault();
  const userSearch = document.getElementById('searchInput').value.toLowerCase();

  let baseURL = `https://rickandmortyapi.com/api/character?name=` + userSearch;
  let searchPromise = getCharacters(baseURL);

  Promise.all([searchPromise]).then((values) => {
    let cleanData = values.flat();
    buildApp(cleanData);
  });
};

let form = document.getElementById('searchForm');
form.addEventListener('submit', searchCharacters);
