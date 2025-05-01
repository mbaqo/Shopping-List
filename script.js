const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

function addItem (e) {
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

  itemList.appendChild(li);

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


// Event Listeners
itemForm.addEventListener("submit", addItem);