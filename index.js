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

const buildApp = (names) => {
  let container = document.getElementById('character-container');

  names.forEach((character) => {
    let characterFlipCardContainer = document.createElement('div');
    characterFlipCardContainer.classList.add('flip-card');

    let characterFlipCardInner = document.createElement('div');
    characterFlipCardInner.classList.add('flip-card-inner');

    let characterFlipCardFront = document.createElement('div');
    characterFlipCardFront.classList.add('flip-card-front');

    let characterFlipCardBack = document.createElement('div');
    characterFlipCardBack.classList.add('flip-card-back');

    characterFlipCardInner.appendChild(characterFlipCardFront);
    characterFlipCardInner.appendChild(characterFlipCardBack);

    characterFlipCardContainer.appendChild(characterFlipCardInner);
    container.appendChild(characterFlipCardContainer);
  });
};
