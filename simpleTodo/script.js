// declaring variables
var input = document.querySelector('input');
var button = document.querySelector('button');
var ul = document.querySelector('ul');

// add li tasks items
function addTask() {

	var newLi = document.createElement('li');
	newLi.appendChild(document.createTextNode(input.value));
	newLi.addEventListener('click', done);

	var deleteButton = document.createElement('button');
	deleteButton.appendChild(document.createTextNode('delete'));
	deleteButton.addEventListener('click', deleteTask);
	newLi.appendChild(deleteButton);

	ul.appendChild(newLi);
	input.value = '';

	  // delete task function
    function deleteTask() {

	    newLi.remove();

    }

	  // task done toggle
	  function done() {

			newLi.classList.toggle('done');

		}

}

// check input length so its not empty
function inputLength() {
	return input.value.length;
}

// when user presses enter inside input
function enterKey(event) {
	if (inputLength() > 0 && event.keyCode === 13){

		addTask();

	} else {

		input.placeholder = 'Write your to do here';

	}
}

// when user clicks add button
function addButton() {
	if (inputLength() > 0){

		addTask();

	} else {

		input.placeholder = 'Write your to do here';

	}
}


// event listeners for button and input
button.addEventListener('click', addButton);
input.addEventListener('keypress', enterKey);
