window.addEventListener('load', () => {
  // this will run on load

  // dom elements
  let tempDegreeA = document.querySelector('.gaby > degree');
  let tempDegreeC = document.querySelector('.laia > degree');

  // 40.025620, -3.606671 Aranjuez
  const latA = 40.025620;
  const longA = -3.606671;
  // 41.347853, 2.075478 cornella
  const latC = 41.347853;
  const longC = 2.075478;

  // proxy to use the api in localhost, should be added concatenated to apiA, apiC
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  // https://api.darksky.net/forecast/e333cc7875d26ac16489f03999b19b35/lat,long
  const apiA = `https://api.darksky.net/forecast/e333cc7875d26ac16489f03999b19b35/${latA},${longA}`;
  const apiC = `https://api.darksky.net/forecast/e333cc7875d26ac16489f03999b19b35/${latC},${longC}`;


  fetch(apiA).then(responseA => {
    return responseA.json();
  }).then(dataA => {
    const { temperature } = data.currently;
    tempDegreeA.textContent = temperature;
  });

  fetch(apiC).then(responseC => {
    return responseA.json();
  }).then(dataC => {
    const { temperature } = data.currently;
    tempDegreeA.textContent = temperature;
  });

});
