async function fetchTodos() {
    const response = await fetch('/todos');
    const todos = await response.json();
    const todoList = document.getElementById('todoList');

    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = todo;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(index));

        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
}

//ADD
async function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todo = todoInput.ariaValueMax;

    const response = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({todo}),
    });

    todoInput.value = '';
    fetchTodos();
}

//Delete
async function deleteTodo(index){
    await fetch(`/todos/${index}`, {
        method: 'DELETE',
    }),
    fetchTodos();
}

//event listener
document.getElementById('todoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo();
});

fetchTodos()