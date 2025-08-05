let input = document.getElementById("in");
let unlist = document.getElementsByTagName("ul")[0];
let additem = document.getElementById("additem");

let list = JSON.parse(localStorage.getItem("nameList")) || [];

// Function to save the current list to localStorage
function saveListToLocalStorage() {
    localStorage.setItem("nameList", JSON.stringify(list));
}

// Function to render the list items
function renderList() {
    unlist.innerHTML = ""; // Clear existing items
    list.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const btn = document.createElement('button');
        btn.textContent = "Delete";
        btn.className = "dlt";

        btn.addEventListener("click", () => {
            list.splice(index, 1); // Remove item from array
            saveListToLocalStorage(); // Save updated list
            renderList(); // Re-render UI
        });

        li.appendChild(btn);
        unlist.appendChild(li);
    });
}

// Add item button handler
const handlebutton = (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (value !== '') {
        list.push(value); // Add new item to array
        saveListToLocalStorage(); // Save list
        renderList(); // Update UI
        input.value = ""; // Clear input
    }
};

// Load existing items on page load
window.addEventListener("DOMContentLoaded", renderList);

// Add item button click event
additem.addEventListener("click", handlebutton);
