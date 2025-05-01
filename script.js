const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearButton = document.querySelector("#clear");
const filter = document.querySelector(".filter");


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

/* Filtering Items */
function filterItems(e) {
  const items = itemList.querySelectorAll("li");

  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    // trim removes the extra spaces in textContent
    const itemName = item.firstChild.textContent.trim().toLowerCase();
    if(!itemName.startsWith(text)) {
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
}


// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);
filter.addEventListener("input", filterItems);

checkUI();