window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  const form = document.querySelector('#form-todo');

  const deleteAll = document.querySelector('#delete-all');
  deleteAll.addEventListener('click', () => {
    todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));

    displayTodos();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.elements.todo.value === '') {
      form.classList.add('empty');
      setTimeout(() => {
        form.classList.remove('empty');
      }, 500);
    } else {
      const todo = {
        content: e.target.elements.todo.value,
        completed: false,
        createdAt: new Date().getTime(),
      };

      todos = [...todos, todo];
      localStorage.setItem('todos', JSON.stringify(todos));

      e.target.reset();
      displayTodos();
    }
  });

  displayTodos();
});

const displayTodos = () => {
  const tareasCompletadas = document.querySelector('.tareas-completadas');

  const completedTodos = todos.filter((todo) => todo.completed === true);
  const completed = completedTodos.length;
  tareasCompletadas.innerHTML = completed;

  const todoItemContent = document.querySelector('.todo-item-content');
  todoItemContent.innerHTML = '';

  todos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('edit');
    btnEdit.innerHTML = 'Edit';
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('delete');
    btnDelete.innerHTML = 'Delete';
    const todoItemText = document.createElement('div');
    todoItemText.classList.add('todo-item-text');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    const actions = document.createElement('div');
    actions.classList.add('actions');

    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);
    todoItemText.innerHTML = `<input class="item-text" type="text" value="${todo.content}" readonly>`;
    todoItemText.appendChild(checkbox);

    todoItemContent.appendChild(todoItemText);
    todoItemContent.appendChild(actions);

    const input = todoItemText.querySelector('input.item-text');

    if (todo.completed) {
      input.classList.add('done');
    }

    checkbox.addEventListener('change', (e) => {
      todo.completed = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.completed) {
        input.classList.add('done');
      } else {
        input.classList.remove('done');
      }

      displayTodos();
    });

    btnEdit.addEventListener('click', (e) => {
      const input = todoItemText.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();

      // cuando quito el foco o el mouse del input para editar ya no me deja 👇
      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));

        displayTodos();
      });
    });

    btnDelete.addEventListener('click', (e) => {
      todos = todos.filter((t) => t !== todo);
      localStorage.setItem('todos', JSON.stringify(todos));

      displayTodos();
    });
  });
};
