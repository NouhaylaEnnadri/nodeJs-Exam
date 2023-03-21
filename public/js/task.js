import { taskInput , tbody, submitBtn, taskForm, urlApi } from "./config.js";


  let tasks = [] ; 
// Define an array to store the tasks

// Load tasks from the array on page load
window.addEventListener('load', () => {
  tasks.forEach(task => {
    addTaskToTable(task);
  });
});

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent form submission

  const taskValue = taskInput.value.trim();

  if (taskValue) { //to  make sure the task value is not empty 

    const task = { task: taskValue };

    // Call the API to create the task
    const response = await fetch(urlApi + "task", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const newTask = await response.json();
      
      // Add the new task to the array
      tasks.push(newTask);

      // Add the new task to the table
      addTaskToTable(newTask);
    } else {
      alert("can't add task");
    }

    taskInput.value = ''; // clear the input
  }
});

// Add a task to the table
//here just the middle ones that can have the up and down buttons the first and the last one can just have down or up 
export const addTaskToTable = (task) => {
    const newRow = document.createElement('tr');
    const taskData = document.createElement('td');
    const taskText = document.createTextNode(task.task);
    taskData.appendChild(taskText);
  
    const deleteBtn = document.createElement('button');
    const deleteText = document.createTextNode('Delete');
    deleteBtn.appendChild(deleteText);
  
    deleteBtn.addEventListener('click', async () => {
      const taskId = task.id;
  
      // Call the API to delete the task
      const response = await fetch(urlApi + "task/" + taskId, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Remove the task from the array
        tasks = tasks.filter(t => t.id !== taskId);
  
        // Remove the task row from the table
        newRow.remove();
      } else {
        alert("can't delete task");
      }
    });
  
    const deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteBtn);
  
    newRow.appendChild(taskData);
    newRow.appendChild(deleteCell);
  
    // Determine the position of the task in the array
    const index = tasks.findIndex(t => t.id === task.id);
  
    // Add Up button if not the first task
    if (index > 0) {
      const upBtn = document.createElement('button');
      const upText = document.createTextNode('Up');
      upBtn.appendChild(upText);
  
      upBtn.addEventListener('click', async () => {
        [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
  
        tbody.innerHTML = '';
        tasks.forEach(t => addTaskToTable(t));
      });
  
      const upCell = document.createElement('td');
      upCell.appendChild(upBtn);
      newRow.appendChild(upCell);
    }
  
    // Add Down button if not the last task
    if (index < tasks.length - 1) {
      const downBtn = document.createElement('button');
      const downText = document.createTextNode('Down');
      downBtn.appendChild(downText);
  
      downBtn.addEventListener('click', async () => {
        [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
          tbody.innerHTML = '';
        tasks.forEach(t => addTaskToTable(t));
      });
  
      const downCell = document.createElement('td');
      downCell.appendChild(downBtn);
      newRow.appendChild(downCell);
    }
  
    tbody.appendChild(newRow);
  };
  