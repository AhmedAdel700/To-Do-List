// Get The Variables
let main = document.querySelector('main'),
    taskForm = document.querySelector('.tasks-form'),
    addBtn = document.querySelector('.add-btn'),
    inputText = document.querySelector('.input-text');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to add a task to the UI
function addTaskToUI(taskText, isChecked = false) {
    // Create The Container
    let container = document.createElement('section');
    container.classList.add('container');

    // Create The Checkbox That Will Be Used For Marking The Task As Done
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = isChecked; // Set the checkbox state based on the saved data

    // Create The Complete Div Which Will Have Our Checkbox And A Paragraph
    let completeDiv = document.createElement('div');
    completeDiv.classList.add('complete');
    
    let paragraphMessage = document.createElement('p');
    paragraphMessage.innerText = "Did You Complete Your Task ?";
    completeDiv.appendChild(paragraphMessage);
    completeDiv.appendChild(checkbox);

    // Add The Checkbox To The Container
    container.appendChild(completeDiv);

    // Create The Task Div That Will Have The Whole Ui Of The Task Except The Chechbox
    let task = document.createElement('div');
    task.classList.add('task');
    if (isChecked) {
        task.classList.add('done');
    }

    // Create The Task Input That Will Have The Task Text And Buttons
    let content = document.createElement('div');
    content.classList.add('content');

    // Create The Task Input That Will Show Our Task Text After The Submission
    let input = document.createElement('textarea');
    input.classList.add('text');
    input.value = taskText;
    input.setAttribute('readonly', 'readonly');

    // Create The Action Div That Will Have The Buttons
    let action = document.createElement('div');
    action.classList.add('actions');

    // Create The Buttons That Will Handle The Task Operations
    let editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'Edit';

    editBtn.addEventListener('click', () => {
        if (editBtn.innerHTML === 'Edit') {
            input.removeAttribute('readonly');
            input.focus();
            editBtn.innerText = 'Save';
        } else {
            input.setAttribute('readonly', 'readonly');
            editBtn.innerText = 'Edit';

            // Update the task text in localStorage
            updateTaskInLocalStorage(taskText, input.value);
            taskText = input.value; // Update the taskText variable to the new value
        }
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.addEventListener('click', () => {
        main.removeChild(container);
        deleteTaskFromLocalStorage(taskText); // Remove the task from localStorage
    });

    // Check If The Checkbox Is Checked Or Not => "The Task Should Be Done Is Checked"
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            task.classList.add('done');
            editBtn.setAttribute("disabled", 'disabled');
            deleteBtn.setAttribute("disabled", 'disabled');
        } else {
            task.classList.remove('done');
            editBtn.removeAttribute("disabled");
            deleteBtn.removeAttribute("disabled");
        }

        // Update the task status in localStorage
        updateTaskStatusInLocalStorage(taskText, checkbox.checked);
    })

    // Add The Buttons To The Action Div Then Add The Action Div To Content Then Add Content To The Task Div
    action.appendChild(editBtn);
    action.appendChild(deleteBtn);

    // Add The Input To Content Then Add Content To The Task Div And The Add Both The Main
    content.appendChild(input);
    task.appendChild(content);
    task.appendChild(action);
    container.appendChild(task);
    main.appendChild(container);
}

// Function to update a task in localStorage
function updateTaskInLocalStorage(oldText, newText) {
    let tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.text === oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex].text = newText;
        saveTasks(tasks);
    }
}

// Function to update a task's status in localStorage
function updateTaskStatusInLocalStorage(taskText, isChecked) {
    let tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    if (taskIndex !== -1) {
        tasks[taskIndex].isChecked = isChecked;
        saveTasks(tasks);
    }
}

// Function to delete a task from localStorage
function deleteTaskFromLocalStorage(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.text !== taskText);
    saveTasks(tasks);
}

// Function to load tasks from localStorage
function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(task => {
        addTaskToUI(task.text, task.isChecked);
    });
}

taskForm.addEventListener('submit', (e) => {
    // Prevent The Form From Submission
    e.preventDefault();

    // Get The Value Of The Input => "The Task Text"
    const taskText = inputText.value;

    // Check If The Task Text Is Empty Or Not
    if (!taskText) {
        alert('Please Enter A Task');
        return;
    }

    // Add Task to the UI
    addTaskToUI(taskText);

    // Save the new task to localStorage
    let tasks = getTasks();
    tasks.push({ text: taskText, isChecked: false });
    saveTasks(tasks);

    // Clear The Input After Submission
    inputText.value = '';
});


// // Get The Variables
// let main = document.querySelector('main'),
//     taskForm = document.querySelector('.tasks-form'),
//     addBtn = document.querySelector('.add-btn'),
//     inputText = document.querySelector('.input-text');


// taskForm.addEventListener('submit', (e) => {
//     // Prevent The Form From Submission
//     e.preventDefault();

//     // Get The Value Of The Input => "The Task Text"
//     const taskText = inputText.value;

//     // Check If The Task Text Is Empty Or Not
//     if (!taskText) {
//         alert('Please Enter A Task');
//         return;
//     }

//     // Create The Container
//     let container = document.createElement('section');
//     container.classList.add('container');

//     // Create The Checkbox That Will Be Used For Marking The Task As Done
//     let checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.classList.add('checkbox');

//     // Add The Checkbox To The Container
//     container.appendChild(checkbox);

//     // Create The Task Div That Will Have The Whole Ui Of The Task Except The Chechbox
//     let task = document.createElement('div');
//     task.classList.add('task');

//     // Create The Task Input That Will Have The Task Text And Buttons
//     let content = document.createElement('div');
//     content.classList.add('content');

//     // Create The Task Input That Will Show Our Task Text After The Submittion
//     let input = document.createElement('textarea');
//     input.classList.add('text');
//     input.value = taskText;
//     input.setAttribute('readonly', 'readonly');

//     // Create The Action Div That Will Have The Buttons
//     let action = document.createElement('div');
//     action.classList.add('actions');

//     // Create The Buttons That Will Handle The Task Operations
//     let editBtn = document.createElement('button');
//     editBtn.classList.add('edit');
//     editBtn.innerText = 'Edit';

//     editBtn.addEventListener('click', () => {

//         if (editBtn.innerHTML === 'Edit') {
//             input.removeAttribute('readonly');
//             input.focus();
//             editBtn.innerText = 'Save';
//         } else {
//             input.setAttribute('readonly', 'readonly');
//             editBtn.innerText = 'Edit';
//         }
//     });

//     let deleteBtn = document.createElement('button');
//     deleteBtn.classList.add('delete');
//     deleteBtn.innerHTML = 'Delete';
//     deleteBtn.addEventListener('click', () => {
//         main.removeChild(container);
//     });

//     // Check If The Checkbox Is Checked Or Not => "The Task Should Be Done Is Checked"
//     checkbox.addEventListener('change', () => {

//         if (checkbox.checked) {
//             task.classList.add('done');
//             editBtn.setAttribute("disabled", 'disabled');
//             deleteBtn.setAttribute("disabled", 'disabled');
//         } else {
//             task.classList.remove('done');
//             editBtn.removeAttribute("disabled");
//             deleteBtn.removeAttribute("disabled");
//         }
//     })

//     // Add The Buttons To The Action Div Then Add The Action Div To Content Then Add Content To The Task Div
//     action.appendChild(editBtn);
//     action.appendChild(deleteBtn);


//     // Add The Input To Content Then Add Content To The Task Div And The Add Both The Main
//     content.appendChild(input);
//     task.appendChild(content);
//     task.appendChild(action);
//     container.appendChild(task);
//     main.appendChild(container);

//     // Clear The From After Submmition
//     inputText.value = '';
// })

