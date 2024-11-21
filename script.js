const inputField = document.getElementById("inputfield");
const tasksContainer = document.getElementById("liscontainer");

// Add event listener for the Enter key
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Add event listener for the Add button
document.getElementById("add").addEventListener("click", addTask);

// Function to add a task
function addTask() {
    const taskText = inputField.value.trim(); // Get the task text
    if (!taskText) return; // Exit if the input is empty

    const li = document.createElement("li"); // Create a new list item
    li.textContent = taskText; // Set the task text

    const cross = document.createElement("i"); // Create a delete icon
    cross.className = "fa-solid fa-x xmark"; // Set the icon's class
    cross.addEventListener("click", removeTask); // Attach a click event listener
    li.appendChild(cross); // Append the icon to the list item

    tasksContainer.appendChild(li); // Add the task to the list
    inputField.value = ""; // Clear the input field

    saveTasksToLocalStorage(); // Save tasks to localStorage
}

// Function to remove a task
function removeTask(event) {
    const li = event.target.parentNode; // Get the task's list item
    li.parentNode.removeChild(li); // Remove it from the DOM

    saveTasksToLocalStorage(); // Save updated tasks to localStorage
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = Array.from(tasksContainer.querySelectorAll("li")).map((li) =>
        li.textContent.trim()
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => {
        const li = document.createElement("li");
        li.textContent = taskText;

        const cross = document.createElement("i");
        cross.className = "fa-solid fa-x xmark";
        cross.addEventListener("click", removeTask);
        li.appendChild(cross);

        tasksContainer.appendChild(li);
    });
}

// Load tasks from localStorage when the page loads
window.addEventListener("load", loadTasksFromLocalStorage);
