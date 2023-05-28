const input = document.getElementById("input");
const inputSubmit = document.getElementById("inputSubmit");
const list = document.getElementById("list");

// Load saved list items from localStorage, if any exists
const savedListItems = JSON.parse(localStorage.getItem("listItems")) || [];

const createListEl = () => {
    if (input.value === "") {
        return;
    }

    const newLi = document.createElement("li");
    const newP = document.createElement("p");
    const delBtn = document.createElement("button");

    newP.textContent = input.value;
    delBtn.textContent = "Delete";

    newLi.setAttribute("id", "listEl");
    delBtn.setAttribute("id", "deleteListEl")
    delBtn.setAttribute("onclick", "deleteListItem()")

    list.insertAdjacentElement("beforeend", newLi);
    newLi.appendChild(newP);
    newLi.appendChild(delBtn);

    // Save the new list item to localStorage
    savedListItems.push(input.value);
    localStorage.setItem("listItems", JSON.stringify(savedListItems));
    
    input.value = "";
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        createListEl();
    }
});

document.addEventListener("keypress", function(event) {
    if (event.key === "Backspace") {
        deleteListItem();
    }
});

const deleteListItem = () => {
    const currentBtn = document.getElementById("deleteListEl");
    const currentItem = currentBtn.parentElement;

    // Remove the item from the saved list items
    const index = savedListItems.indexOf(currentItem.firstChild.innerHTML);
    if (index !== -1) {
        savedListItems.splice(index, 1);
        localStorage.setItem("listItems", JSON.stringify(savedListItems));
    }

    currentItem.remove();
}

// On page load, populate the list with the saved list items
savedListItems.forEach(item => {
    const newLi = document.createElement("li");
    const newP = document.createElement("p");
    const delBtn = document.createElement("button");

    newP.innerHTML = item;
    delBtn.innerHTML = "Delete";

    newLi.setAttribute("id", "listEl");
    delBtn.setAttribute("id", "deleteListEl");
    delBtn.setAttribute("onclick", "deleteListItem()");

    newLi.appendChild(newP);
    newLi.appendChild(delBtn);
    list.appendChild(newLi);
});