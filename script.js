class Task {
    constructor(id, title) {
      this.id = id;
      this.title = title;
    }
}
  
class TaskListPage {
    constructor() {
      this.tasks = [];
  
      this.taskInput = document.getElementById("task");
      this.listElement = document.getElementById("task-list");
    }
  
    taskSubmit(e) {
      e.preventDefault();
      const title = document.getElementById("task").value;
      const taskId = document.getElementById("task").getAttribute("data-task-id");
      
      if (taskId) {
        this.updateTask(taskId, title);
      } 
      else {
        this.addTask(title);
      }
    }
  
    taskListClick(e) {
      e.preventDefault();

      if ("edit-task" !== e.target.dataset.action) return;
  
      const taskId = e.target.parentElement.parentElement.getAttribute("data-task-id");
      
      if (!taskId) return;
  
      this.editTask(taskId);
    }
  
    addTask(title) {
      const taskId = this.tasks.length + 1;
      const task = new Task(taskId, title);
      this.tasks.push(task);
  
      //rendering task in Html
      const row = document.createElement("tr");
      row.setAttribute("data-task-id", task.id);
      row.innerHTML = `
      <td>${task.title}</td>
      <td>
        <i data-action="edit-task" class="fa fa-pencil-square-o edit" style="cursor: pointer;"></i>
      </td>
      `;
      this.listElement.appendChild(row);

      this.clearTaskInput();
    }
  
    clearTaskInput() {
      this.taskInput.value = "";
      this.taskInput.removeAttribute("data-task-id");
    }
  
    editTask(taskId) {
      const task = this.tasks.find((task) => task.id == taskId);
      if (!task) throw new Error("Task does not exist.");
  
      this.taskInput.value = task.title;
      this.taskInput.setAttribute("data-task-id", task.id);
      document.getElementById("button-addon2").innerText = "Save";
    }
  
    updateTask(taskId, title) {
      const task = this.tasks.find((task) => task.id == taskId);
      task.title = title;
  
      const existingTask = document.querySelector(`tr[data-task-id="${taskId}"]`);
      existingTask.children[0].innerHTML = task.title;

      this.clearTaskInput();
      document.getElementById("button-addon2").innerHTML = `
      <i class="fa fa-plus"></i>
      `;
    }
}
  
  
const taskListPage = new TaskListPage();
document.getElementById("task-form").addEventListener("submit", (e) => {
    taskListPage.taskSubmit(e);
});

document.getElementById("task-list").addEventListener("click", taskListPage.taskListClick.bind(taskListPage));