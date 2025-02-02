import { addTask, updateTask, deleteTask, markInProgress, markDone, listTasks } from './taskManager.js';

// Обработка аргументов командной строки
const [,, command, ...args] = process.argv;

switch (command) {
  case 'add':
    const description = args.join(' ');
    addTask(description);
    break;

  case 'update':
    const updateId = parseInt(args[0], 10);
    const newDescription = args.slice(1).join(' ');
    updateTask(updateId, newDescription);
    break;

  case 'delete':
    const deleteId = parseInt(args[0], 10);
    deleteTask(deleteId);
    break;

  case 'mark-in-progress':
    const inProgressId = parseInt(args[0], 10);
    markInProgress(inProgressId);
    break;

  case 'mark-done':
    const doneId = parseInt(args[0], 10);
    markDone(doneId);
    break;

  case 'list':
    const status = args[0] || null;
    listTasks(status);
    break;

  default:
    console.log('Invalid command!');
    break;
}
