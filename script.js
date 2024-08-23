// Function to create a new task element
const createTaskElement = (taskText, status = 'pending') => {
    const taskItem = document.createElement('li');
    taskItem.classList.add(status);

    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete-btn">✔</button>
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
        </div>
    `;

    return taskItem;
};

// Function to add a task
const addTask = () => {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const taskList = document.getElementById('task-list');
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
};

// Function to handle task actions (complete, edit, delete)
const handleTaskActions = (e) => {
    const taskItem = e.target.closest('li');
    
    if (e.target.classList.contains('complete-btn')) {
        taskItem.classList.toggle('completed');
    } else if (e.target.classList.contains('edit-btn')) {
        const newTaskText = prompt('Edit task:', taskItem.querySelector('span').textContent);
        if (newTaskText) {
            taskItem.querySelector('span').textContent = newTaskText;
        }
    } else if (e.target.classList.contains('delete-btn')) {
        taskItem.remove();
    }
};

// Function to filter tasks by status
const filterTasks = (filter) => {
    const tasks = document.querySelectorAll('#task-list li');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'pending':
                task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                break;
        }
    });
};

// Event listeners
document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-list').addEventListener('click', handleTaskActions);
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => filterTasks(e.target.dataset.filter));
});
