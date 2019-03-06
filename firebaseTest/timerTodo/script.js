// --- FIREBASE ---------------------------------------------------------
// Initialize Firebase
let config = {
  apiKey: "AIzaSyDHV-hAVdDKEBjHaA3xVnmB5BRuCtHw-yc",
  databaseURL: "https://simpletodo-testv1.firebaseio.com",
};
firebase.initializeApp(config);

let db = firebase.database().ref('doneTasks');
// will update each time it changes
// db.on("value", snapshot => {
//   console.log(snapshot.numChildren());
// 	doneTasksDBlength = snapshot.numChildren();
// });
let currentItemsDB = doneTasksDBlength();
// returns amount of items in db doneTasks
function doneTasksDBlength() {
	// will check once
	db.once("value").then(snapshot => {
		currentItemsDB = snapshot.numChildren();
		console.log(snapshot.numChildren());
		console.log(currentItemsDB);
  });
}
 
// receives new task to be added to database
function addTaskDB(string) {
	doneTasksDBlength(); // get current doneTasksDBlength
	let newTaskDB = firebase.database().ref(`doneTasks/${currentItemsDB}`)
	newTaskDB.set(string);
}

showSavedDB();
function showSavedDB() {
	// only ran when windows load, not necessary to call it again
	// because items will get added anyway to the db
	var query = firebase.database().ref("doneTasks").orderByKey();
	query.once("value").then(snapshot => {
    snapshot.forEach( item => {
			if (item.key != 0){
				let taskDiv = doneSection.insertAdjacentElement('afterbegin', document.createElement('div'));
				// let key = item.key;
				// console.log(item.val());
				let task = item.val();
				// [description, hours, minutes, seconds, month(starts with 0), day number]
				// ['first task', 1, 10, 30, 11, 5]
				let taskDesc = taskDiv.appendChild(document.createElement('p'));
				let taskTime = taskDiv.appendChild(document.createElement('p'));
				let dateDiv = taskDiv.appendChild(document.createElement('div'));
				let taskMonth = dateDiv.appendChild(document.createElement('p'));
				let taskDay = dateDiv.appendChild(document.createElement('p'));
				taskDesc.textContent = task[0];
				taskTime.textContent = giveTime(task[1], task[2], task[3]);
				taskMonth.textContent = giveMonth(task[4]);
				taskDay.textContent = giveDay(task[5]);
			}
  	});
	});
}

// --- DOM ELEMENTS ------------------------------------------------------
const inputSection = document.getElementById('input-section');
const taskInput = document.getElementById('task-input');
const timerDisplay = document.getElementById('timer-display');
const playButton = document.getElementById('play-button');
const doneButton = document.getElementById('done-button');
const doneSection = document.getElementById('done-section');

// --- GLOBAL ---------------------------------------------------------
let running = false;
let s = 0; let m = 0; let h = 0;
let totalSecs = 0;
let doneTasks = [];
playButton.addEventListener('click', playPressed);
doneButton.addEventListener('click', donePressed);

// --- EVENT FUNCTIONS ----------------------------------------------------
function playPressed() {
	// check if input is empty
	// checkInput();
	if(taskInput.value === "") {
		// show error, task must be filled
		// error();
		taskInput.placeholder = "Add a task first";
		taskInput.classList.add('error');
		inputSection.classList.add('shake-animation');
		setTimeout(() =>
		  inputSection.classList.remove('shake-animation'),
			600);
	} else {
		// startTimer();
		// timer can start
		running = true;

		// disableInput();
		// hide playButton and show done button
		playButton.classList.add('hidden');
		doneButton.classList.remove('hidden');
		taskInput.readOnly = true;
		inputSection.classList.add('playing');
		timerDisplay.textContent = "00:00:00";


		// reset variables
		s = 0; m = 0; h = 0;
    totalSecs = 0;
		let timerInterval = setInterval( () => {
			if(running){
				s++;
			  timerDisplay.textContent = giveTime(h, m, s);
			  // reset seconds/minutes
			  if (s === 59) {
				  s = -1;
				  m++;
				  if (m === 60) {
					  m = 0;
					  h++;
				  }
			  }
			  totalSecs++;
			} else {
				// done has been pressed, finish interval
				clearInterval(timerInterval);
			}

	  }, 1000);
	}
}

function donePressed() {
	const currentDate = new Date();
	// [description, hourse, minutes, seconds, month(starts with 0), day number]
	let newTask = [taskInput.value, h, m, s, currentDate.getMonth(), currentDate.getDate()];
	addTaskDB(newTask);
	// console.log(newTask);
	// push task to doneTasks
	// using unshift to easier forEach when rendering
	doneTasks.unshift(newTask);
	// STORE doneTasks <-----------------
	// add elements into dom
	// updateDoneTaks()
	// contents of each new item div{ p p div{ p p } }
	// to insert element as first child
	// targetElement.insertAdjacentElement(position, element);

	let taskDiv = doneSection.insertAdjacentElement('afterbegin', document.createElement('div'));
	let taskDesc = taskDiv.appendChild(document.createElement('p'));
	let taskTime = taskDiv.appendChild(document.createElement('p'));
	let dateDiv = taskDiv.appendChild(document.createElement('div'));
	let taskMonth = dateDiv.appendChild(document.createElement('p'));
	let taskDay = dateDiv.appendChild(document.createElement('p'));
	taskDesc.textContent = newTask[0];
	taskTime.textContent = giveTime(h, m, s);
	taskMonth.textContent = giveMonth(newTask[4]);
	taskDay.textContent = giveDay(newTask[5]);

	// enable the input section again
	// enableInput()
	running = false;
	playButton.classList.remove('hidden');
	doneButton.classList.add('hidden');
	taskInput.value = "";
	taskInput.readOnly = false;
	inputSection.classList.remove('playing');
	timerDisplay.textContent = "00:00:00";
}

// --- OTHER FUNCTIONS -----------------------------------

function giveTime(h, m, s) {
	if (s < 10) {
	  // check minutes
		if (m < 10) {
		  // check hours
			if (h < 10) {
				return `0${h}:0${m}:0${s}`;
			} else {
				return `${h}:0${m}:0${s}`;
			}
		} else {
			// check hours
			if (h < 10) {
				return `0${h}:${m}:0${s}`;
			} else {
				return `${h}:${m}:0${s}`;
			}
		}
	} else {
		// check minutes
		if (m < 10) {
		  // check hours
			if (h < 10) {
			  return `0${h}:0${m}:${s}`;
			} else {
			  return `${h}:0${m}:${s}`;
			}
		} else {
		  // check hours
			if (h < 10) {
			  return `0${h}:${m}:${s}`;
			} else {
				return `${h}:${m}:${s}`;
			}
		}
  }
}

function giveMonth(currentMonth) {
	let month;
	switch (currentMonth) {
		case 0: month = 'JAN';
			break;
		case 1: month = 'FEB';
			break;
		case 2: month = 'MAR';
			break;
		case 3: month = 'ABR';
			break;
		case 4: month = 'MAY';
			break;
		case 5: month = 'JUN';
			break;
		case 6: month = 'JUL';
			break;
		case 7: month = 'AGO';
			break;
		case 8: month = 'SEP';
			break;
		case 9: month = 'OCT';
			break;
		case 10: month = 'NOV';
			break;
		case 11: month = 'DIC';
			break;
	}
	return month;
}

function giveDay(day) {
	if (day < 10) {
		return `0${day}`;
	} else {
		return `${day}`;
	}
}
