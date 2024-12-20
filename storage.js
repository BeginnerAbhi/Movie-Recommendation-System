export function saveUsersToStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  export function loadUsersFromStorage() {
    return JSON.parse(localStorage.getItem("users")) || {}; // Return empty object if no data in LocalStorage
  }
  