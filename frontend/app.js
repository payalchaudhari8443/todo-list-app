document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('task-name').value;
        const description = document.getElementById('task-description').value;
        
        try {
            const response = await fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description })
            });
            const result = await response.json();
            if (response.ok) {
                alert('Task added successfully!');
                form.reset();
                loadTasks();  // Reload tasks after adding
            } else {
                alert('Failed to add task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    async function loadTasks() {
        try {
            const response = await fetch('/tasks');
            const tasks = await response.json();
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = `${task.name}: ${task.description}`;
                taskList.appendChild(li);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    loadTasks();  // Load tasks on page load
});
