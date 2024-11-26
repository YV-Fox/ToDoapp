document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const taskInput = document.getElementById('form-input-task');
    const list = document.getElementById('list');
    const totalBox = document.getElementById('total-box');
    const doneBox = document.getElementById('done-box');
    const undoneBox = document.getElementById('undone-box');


    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateCounters() {
        const total = tasks.length;
        const done = tasks.filter(task => task.done).length;
        const undone = total - done;

        totalBox.textContent = `Total: ${total}`;
        doneBox.textContent = `Done: ${done}`;
        undoneBox.textContent = `Undone: ${undone}`;
    }
    function renderTasks() {
        list.innerHTML = '';
        tasks.sort((a, b) => a.done - b.done).forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'list-item';
            li.innerHTML = `
                <button class="list-item-delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="list-item-delete-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>                      
                </button>
                <div id="list-info">
                    <p class="list-item-input-name">${task.text}</p>
                </div>
                <div class="list-btn-pair">
                    <button class="list-item-edit-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="list-item-edit-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button class="list-item-done-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="list-item-done-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </button>
                </div>
            `;

            const deleteBtn = li.querySelector('.list-item-delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(index));

            const editBtn = li.querySelector('.list-item-edit-btn');
            editBtn.addEventListener('click', () => editTask(index));

            const doneBtn = li.querySelector('.list-item-done-btn');
            doneBtn.addEventListener('click', () => toggleDone(index));

            if (task.done) {
                li.classList.add('done-task');
            } else {
                li.classList.remove('done-task');
            }
    
            list.appendChild(li);
        });
        updateCounters();;
    }



    function addTask(text) {
        tasks.push({ text, done: false });
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

   function editTask(index) {
    const editText = prompt('Enter new task name:', tasks[index].text);
        if (editText) {
            tasks[index].text = editText;
            saveTasks();
            renderTasks();
        }
 
   }


    function toggleDone(index) {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
        const taskItem = list.children[index];
        if (tasks[index].done) {
            taskItem.classList.add('done-task');
        } else {
            taskItem.classList.remove('done-task');
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
            addTask(text);
            taskInput.value = '';
        }
    });

    renderTasks();
});
