const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearButton = document.querySelector("#clear");
const filter = document.querySelector(".filter");
const formButton = itemForm.querySelector("Button");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

/* Adding Items */
function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an Item");
    return;
  }

  //Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if(checkIfItemExists(newItem)) {
      alert("That Item already Exists");
      return;
    }
  }

  //create item DOM element
  addItemToDOM(newItem);

  //Add item to local Storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

// Only add to DOM and not local storage
function addItemToDOM(item) {
  // Create List item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item", "btn-link", "text-red");

  li.appendChild(button);

  // Add li to DOM
  itemList.appendChild(li);
}

function createButton(...buttonClass) {
  const button = document.createElement("button");
  button.classList.add(...buttonClass);

  const icon = createIcon("fa-solid", "fa-xmark");

  button.appendChild(icon);

  return button;
}

function createIcon(...iconClass) {
  const icon = document.createElement("i");
  icon.classList.add(...iconClass);

  return icon;
}

// add to local storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//gets items to display them
function getItemsFromStorage() {
  let itemsFromStorage;
  // Checks if we already have items in storage
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

/* Removing/Modifying Items */
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.tagName === "LI"){
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll("li").forEach(i => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  // Selects icon and changes its class
  formButton.querySelector("i").className = "fa-solid fa-pen";
  // Picks the text next to icon
  formButton.classList.add("editBtn");
  formButton.querySelector("span").textContent = "Update Item";
  //Puts the list items text into form input
  itemInput.value = item.textContent;
}

function removeItem(item) {
  //Remove Item From DOM
  item.remove();

  //Remove Item From Storage
  removeItemFromStorage(item.textContent);

  checkUI();
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //Re-set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems(e) {
  if (confirm("Are You Sure?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    // Clear from local Storage
    localStorage.removeItem("items")
  }

  checkUI();
}

/* Filtering Items */
function filterItems(e) {
  const items = itemList.querySelectorAll("li");

  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    // trim removes the extra spaces in textContent
    const itemName = item.firstChild.textContent.trim().toLowerCase();
    if (!itemName.startsWith(text)) {
      item.style.display = "none";
    } else {
      item.style.display = "";
    }
  });

  // console.log(text);
}



//Checks if the item list is empty
function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearButton.style.display = "none";
    filter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filter.style.display = "block";
  }

  isEditMode = false;
  formButton.classList.remove("editBtn");
  formButton.querySelector("span").textContent = "Add Item";
}

/* Initialize App */
function init() {
  /* Event Listeners */
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearButton.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItems);
  // Displays items from storage
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();