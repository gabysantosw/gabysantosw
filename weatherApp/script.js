window.addEventListener('load', () => {
  // this will run on load
  
  // dom elements
  let tempDegreeA = document.querySelector('.gaby > .degree');
  let tempDegreeC = document.querySelector('.laia > .degree');

  // 40.025620, -3.606671 Aranjuez
  const latA = 40.025620;
  const longA = -3.606671;
  // 41.347853, 2.075478 cornella
  const latC = 41.347853;
  const longC = 2.075478;

  // proxy to use the api in localhost, should be added concatenated to apiA, apiC
  // doesn't seem to be needed in atom
  // needed in github pages
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  // https://api.darksky.net/forecast/e333cc7875d26ac16489f03999b19b35/lat,long
  const apiA = `${proxy}?https://api.darksky.net/forecast/e333cc7875d26ac16489f03999b19b35/${latA},${longA}`;
  const apiC = `${proxy}?https://api.darksky.net/forecast/e333cc7875d26ac16489f03999b19b35/${latC},${longC}`;

  // [°C] = ([°F] - 32) × 5/9
  fetch(apiA).then(responseA => {
    return responseA.json();
  }).then(dataA => {
    const { temperature, icon } = dataA.currently;
    tempDegreeA.textContent = ((temperature-32)*(5/9)).toFixed(0)+'°C';
    setIcons(icon, document.querySelector('#iconA'));
  });

  fetch(apiC).then(responseC => {
    return responseC.json();
  }).then(dataC => {
    const { temperature, icon } = dataC.currently;
    tempDegreeC.textContent = ((temperature-32)*(5/9)).toFixed(0)+'°C';
    setIcons(icon, document.querySelector('#iconC'));
  });

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: 'white'});
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

});
