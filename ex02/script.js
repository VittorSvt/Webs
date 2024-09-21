// Selecionar elementos
const taskList = document.getElementById('task-list');
const taskNameInput = document.getElementById('task-name');
const addTaskBtn = document.getElementById('add-task-btn');
const filterInput = document.getElementById('filter-task');
const themeToggleBtn = document.getElementById('theme-toggle');

// Inicializar tarefas fictícias
const initialTasks = [
  { id: 1, name: 'Comprar leite', completed: false },
  { id: 2, name: 'Lavar o carro', completed: true },
  { id: 3, name: 'Estudar JavaScript', completed: false },
];

// Função para salvar no localStorage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar do localStorage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  return tasks ? tasks : initialTasks;
}

// Renderizar a lista de tarefas
function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (task.completed) li.classList.add('completed');
    li.textContent = task.name;

    // Adicionando o evento de clique para marcar como concluída
    li.addEventListener('click', () => toggleTaskCompletion(task.id));

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.onclick = () => removeTask(task.id);

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });
}

// Adicionar tarefa
function addTask() {
  const taskName = taskNameInput.value.trim();
  if (!taskName) return;

  const tasks = loadTasksFromLocalStorage();
  const newTask = { id: Date.now(), name: taskName, completed: false };
  tasks.push(newTask);

  saveTasksToLocalStorage(tasks);
  renderTasks(tasks);
  taskNameInput.value = '';
}

// Remover tarefa
function removeTask(id) {
  let tasks = loadTasksFromLocalStorage();
  tasks = tasks.filter(task => task.id !== id);

  saveTasksToLocalStorage(tasks);
  renderTasks(tasks);
}

// Marcar como concluída
function toggleTaskCompletion(id) {
  const tasks = loadTasksFromLocalStorage();
  const task = tasks.find(task => task.id === id);
  task.completed = !task.completed;

  saveTasksToLocalStorage(tasks);
  renderTasks(tasks);
}

// Filtrar tarefas por nome
filterInput.addEventListener('input', () => {
  const filter = filterInput.value.toLowerCase();
  const tasks = loadTasksFromLocalStorage();
  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(filter));
  renderTasks(filteredTasks);
});

// Tema claro/escuro
function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

themeToggleBtn.addEventListener('click', toggleTheme);

// Inicializar tema
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  }
}

// Adicionar tarefa com "Enter"
taskNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Carregar tarefas e tema ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  renderTasks(loadTasksFromLocalStorage());
});

addTaskBtn.addEventListener('click', addTask);
