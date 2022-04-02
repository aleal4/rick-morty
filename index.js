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
    console.log(values);

    let cleanData = values.flat();
    console.log(cleanData);
  });
};

initApp();
