# Shopping List App

A modern, interactive shopping list application built with vanilla JavaScript. This project allows users to manage their grocery items with persistent data storage, ensuring the list remains available even after refreshing the browser.

## Features

* **CRUD Operations:**
    * **Add Items:** Users can add new items to the list via the input field.
    * **Edit Items:** Click on any list item to enter "Edit Mode," allowing you to update the item name.
    * **Remove Items:** Delete individual items using the "X" button.
    * **Clear All:** A specialized button clears the entire list and local storage at once.
* **Smart Filtering:** A real-time filter input hides items that don't match the search text.
* **Data Persistence:** Uses the browser's **Local Storage** to save items, so your list is never lost.
* **Dynamic UI:**
    * The "Filter" and "Clear All" buttons automatically hide when the list is empty.
    * The "Add Item" button transforms into an "Update Item" button (changing color and icon) when in Edit Mode.

## Tech Stack

* **HTML5:** Semantic structure including a header, form inputs, and list containers.
* **CSS3:**
    * Custom styling with the **Poppins** font family.
    * Responsive layout for mobile devices (media queries for screens under 500px).
    * Flexbox used for layout alignment.
* **JavaScript (ES6+):**
    * DOM manipulation (`document.querySelector`, `createElement`).
    * Event delegation for handling clicks on list items.
    * `localStorage` API for data persistence.
* **Libraries:**
    * [FontAwesome](https://fontawesome.com/) (CDN) for icons.

## Project Structure

```text
.
├── index.html      # Main HTML structure
├── style.css       # Styles for forms, buttons, and list items
├── script.js       # Logic for state management, storage, and events
└── images          # folder for storing project images
