const popSubmit = document.getElementById('popSubmit');
const popUpdate = document.getElementById('popUpdate');

function openPop(currPop, anotherPop, anotherPop2){
    const popupMain = document.getElementById(currPop);
    const anotherPopup = document.getElementById(anotherPop);
    const anotherPopup2 = document.getElementById(anotherPop2);
    if(anotherPopup.classList.contains('hidden') && anotherPopup2.classList.contains('hidden'))
        popupMain.classList.remove('hidden');
}
function closePop(idDiv){
    const popup = document.getElementById(idDiv);
    popup.classList.add('hidden');
}

document.getElementById('submitTask').addEventListener('click', function(e){
    e.preventDefault();
    console.log(e);
    console.log(popSubmit['taskName'].value);
    console.log(popSubmit['taskDesc'].value);
    if(popSubmit['taskName'].value !== ''){
        addTask(popSubmit['taskName'].value, popSubmit['taskDesc'].value);
        popSubmit['taskName'].value = '';
        popSubmit['taskDesc'].value = '';
        popSubmit.classList.add('hidden');
    }
    
})


var arr = JSON.parse(localStorage.getItem('tasks')) || [];
arr.forEach(task => addTaskDom(task));
var taskId = localStorage.getItem('taskId');

function addTask(taskName, taskDesc){
    let taskObject = {
        taskId: taskId++,
        taskName,
        taskDesc
    }
    localStorage.setItem('taskId',taskId);
    taskObject.taskName = taskName;
    taskObject.taskDesc = taskDesc;
    addTaskDom(taskObject);
    // console.log(taskObject);
    arr.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(arr));
}

function addTaskDom(taskObject){
    const taskCard = document.createElement('div');
    taskCard.setAttribute('id', `task-${taskObject.taskId}`);

    const taskArea = document.createElement('div');
    taskArea.classList.add('taskArea');

    const taskDetails = document.createElement('div');
    const taskNamePlace = document.createElement('h2');
    const taskDescPlace = document.createElement('span');

    taskNamePlace.textContent = taskObject.taskName;
    taskDescPlace.textContent = taskObject.taskDesc;
    taskDetails.append(taskNamePlace, taskDescPlace);

    const taskButton = document.createElement('div');
    taskButton.classList.add('buttonsClass');
    const updateButton = document.createElement('button');
    updateButton.classList.add('addButton');
    updateButton.textContent = 'Edit Task';
    updateButton.onclick = () => {
        popUpdate.classList.remove('hidden');
    
        const updateName = document.getElementById('updateName');
        const updateDesc = document.getElementById('updateDesc');

        updateName.value = taskObject.taskName;
        updateDesc.value = taskObject.taskDesc;

        const updateButton = document.getElementById('confirmUpdate');
        updateButton.onclick = () => {
            popUpdate.classList.add('hidden');
            
            taskObject.taskName = updateName.value;
            taskObject.taskDesc = updateDesc.value;

            taskNamePlace.textContent = taskObject.taskName;
            taskDescPlace.textContent = taskObject.taskDesc;

            localStorage.setItem('tasks', JSON.stringify(arr));
        }
    }

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('cancelButton');
    deleteButton.textContent = 'Delete Task';

    deleteButton.onclick = () => {
        showDeletePopup(taskObject, () => {arr = arr.filter(item => item.taskId !== taskObject.taskId);
            localStorage.setItem('tasks', JSON.stringify(arr));
            document.getElementById(`task-${taskObject.taskId}`).remove();
        });
        
    }

    taskButton.append(deleteButton, updateButton);
    taskArea.append(taskDetails, taskButton);
    taskCard.append(taskArea, document.createElement('hr'));
    document.body.append(taskCard);
}



function showDeletePopup(taskObject, onConfirm) {
    const popUp = document.createElement('div');
    popUp.id = 'popDelete';
    popUp.classList.add('popUp');

    const stylingPop = document.createElement('div');
    stylingPop.classList.add('stylingPop');

    const heading = document.createElement('h1');
    heading.textContent = 'Do you really want to delete the Task?';
    heading.style.marginBottom = '0.5rem';

    const taskName = document.createElement('h2');
    taskName.style.margin = '0px';
    const taskDesc = document.createElement('span');
    taskName.textContent = `${taskObject.taskName}:`;
    taskDesc.textContent = `${taskObject.taskDesc}`;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonsClass');
    buttonContainer.style.justifyContent = 'center';
    const yesButton = document.createElement('button');
    yesButton.classList.add('cancelButton');
    yesButton.textContent = 'Yes';
    yesButton.onclick = () => {
        onConfirm();  
        popUp.remove(); 
    };

    const noButton = document.createElement('button');
    noButton.classList.add('addButton');
    noButton.textContent = 'No';
    noButton.onclick = () => popUp.remove();

    buttonContainer.append(yesButton, noButton);
    stylingPop.append(heading, taskName, taskDesc, buttonContainer);
    popUp.append(stylingPop);

    document.body.appendChild(popUp);
}

// addTask();
// addTask();

// console.log(arr);