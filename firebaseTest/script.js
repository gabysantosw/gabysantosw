// Initialize Firebase
let config = {
  apiKey: 'AIzaSyDHV-hAVdDKEBjHaA3xVnmB5BRuCtHw-yc',
  databaseURL: 'https://simpletodo-testv1.firebaseio.com',
};
firebase.initializeApp(config);

// testing if working
const testH1 = document.querySelector('#test');
let db = firebase.database().ref('text');
db.on('value', snapshot => {
  testH1.textContent = snapshot.val(); // hi luke
});

// returns amount of items in db doneTasks
db.once('value').then(snapshot => console.log(snapshot.numChildren()));
