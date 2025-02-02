import fs from 'fs';
import path from 'path';

// Получаем путь к файлу tasks.json
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, 'tasks.json');

// Функция для получения всех задач из файла
const getTasks = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Функция для сохранения задач в файл
const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
};

// Функция для добавления новой задачи
const addTask = (description) => {
  const tasks = getTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
};

// Функция для обновления задачи
const updateTask = (id, newDescription) => {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.log('Task not found!');
    return;
  }
  task.description = newDescription;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task updated successfully (ID: ${id})`);
};

// Функция для удаления задачи
const deleteTask = (id) => {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  console.log(`Task deleted successfully (ID: ${id})`);
};

// Функция для изменения статуса задачи на "in-progress"
const markInProgress = (id) => {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.log('Task not found!');
    return;
  }
  task.status = 'in-progress';
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task marked as in-progress (ID: ${id})`);
};

// Функция для изменения статуса задачи на "done"
const markDone = (id) => {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.log('Task not found!');
    return;
  }
  task.status = 'done';
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task marked as done (ID: ${id})`);
};

// Функция для вывода всех задач
const listTasks = (status = null) => {
  const tasks = getTasks();
  const filteredTasks = status ? tasks.filter(t => t.status === status) : tasks;
  if (filteredTasks.length === 0) {
    console.log('No tasks found!');
    return;
  }
  filteredTasks.forEach(t => {
    console.log(`ID: ${t.id}, Description: ${t.description}, Status: ${t.status}, Created At: ${t.createdAt}, Updated At: ${t.updatedAt}`);
  });
};