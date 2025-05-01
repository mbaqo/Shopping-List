const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearButton = document.querySelector("#clear");
const filterItems = document.querySelector(".filter");


/* Adding Items */
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an Item");
    return;
  }

  // Create List item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item", "btn-link", "text-red");

  li.appendChild(button);

  // Add li to DOM
  itemList.appendChild(li);

  checkUI();

  itemInput.value = "";
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

/* Removing Items */
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();

    checkUI();
  }
}

function clearItems(e) {
  if (confirm("Are You Sure?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
      checkUI();
    }
  }
}
//Checks if the item list is empty
function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearButton.style.display = "none";
    filterItems.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filterItems.style.display = "block";
  }
}


// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);

checkUI();