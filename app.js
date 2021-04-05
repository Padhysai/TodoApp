const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')


// Local Storage
const setLocalStorage = (key, value) =>{
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

const clearLocalStorage = () =>{
    localStorage.clear();
}

const getLocalStorage = (key)=>{
    return JSON.parse(localStorage.getItem(key));
}

const addTask = (e) => {
    if(taskInput.value === '')
    new Attention.Alert({
        title: 'Alert!',
        content: 'Oops! Please enter a task!',
        beforeRender: () =>{
            console.log('before')
            var element = document.querySelector('#main');
            element.classList.add("darkenPage");
        },
        afterClose: () =>{
            console.log('after')
            var element = document.querySelector('#main');
            element.classList.remove("darkenPage");
        }
    });
    else
    {
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create text node and append it to li
        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);

        //Local Storage
        let tasks;
        if(getLocalStorage('tasks') == null){
            tasks = [];
        }
        else{
            tasks = getLocalStorage('tasks')
        }

        tasks.push(taskInput.value)

        setLocalStorage('tasks', tasks)

        taskInput.value ='';
    }
    e.preventDefault();
}

const removeTask = (e) =>{
    //console.log(e.target)
    // Event Delegation --- targetting the "delete-item" class
    new Attention.Confirm({
        title: 'Confirm !!',
        content: 'Are you sure you want to delete this task ?',
        buttonCancel: "No, Keep it!", // custom button text
        buttonConfirm: "Yes, Delete it!",
        onConfirm() {
            e.target.parentElement.parentElement.remove();
            //Remove from Local Storage
            let taskToRemove = e.target.parentElement.parentElement.textContent;
            let tasks = getLocalStorage('tasks')
            tasks.forEach((task, index)=>{
                if(taskToRemove === task){
                    tasks.splice(index, 1);
                }
            })
            setLocalStorage('tasks', tasks)
        },
        onCancel() {
          console.log('Canceled');
        },
        beforeRender: () =>{
            console.log('before')
            var element = document.querySelector('#main');
            element.classList.add("darkenPage");
        },
        afterClose: () =>{
            console.log('after')
            var element = document.querySelector('#main');
            element.classList.remove("darkenPage");
        }
    });
}

const clearTasks = ()=>{
    //taskList.innerHTML = '';
    //Or
    //https://www.measurethat.net/Benchmarks/Show/34/0/innerhtml-vs-removechild
    if (getLocalStorage('tasks') != null) {
        new Attention.Confirm({
            title: 'Confirm !!',
            content: 'Are you sure you want to delete all tasks ?',
            buttonCancel: "No, Keep it!", // custom button text
            buttonConfirm: "Yes, Delete all!",
            onConfirm() {
                while(taskList.firstChild){
                    taskList.removeChild(taskList.firstChild);
                }
                clearLocalStorage();
            },
            onCancel() {
            console.log('Canceled');
            },
            beforeRender: () =>{
                console.log('before')
                var element = document.querySelector('#main');
                element.classList.add("darkenPage");
            },
            afterClose: () =>{
                console.log('after')
                var element = document.querySelector('#main');
                element.classList.remove("darkenPage");
            }
        });
    }
    else{
        new Attention.Alert({
            title: 'Alert!',
            content: 'You dont have any tasks to clear.',
            beforeRender: () =>{
                console.log('before')
                var element = document.querySelector('#main');
                element.classList.add("darkenPage");
            },
            afterClose: () =>{
                console.log('after')
                var element = document.querySelector('#main');
                element.classList.remove("darkenPage");
            }
        });
    }
}

const filterTasks = (e)=> {
    const typedtext = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task)=> {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(typedtext) != -1){
            task.style.display = 'block'
        }
        else{
            task.style.display = 'none'
        }
    });
}

const getTasks = ()=>{
    let tasks;
    if(getLocalStorage('tasks') == null){
        tasks = [];
    }
    else{
        tasks = getLocalStorage('tasks')
    }

    tasks.forEach((task)=>{
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create text node and append it to li
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);
    })
}


const loadEventListeners = () => {
    document.addEventListener('DOMContentLoaded',getTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click',removeTask);

    clearBtn.addEventListener('click',clearTasks);

    filter.addEventListener('keyup',filterTasks);
}

loadEventListeners();