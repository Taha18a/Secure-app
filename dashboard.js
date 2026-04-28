//  Make users array
let users = JSON.parse(localStorage.getItem("users")) || [];

//  Attach events after page loads
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addBtn").addEventListener("click", addUser);
    document.getElementById("logoutBtn").addEventListener("click", logout);

    displayUsers(); // show existing users (if any)
});

//  Add user
function addUser() {
    const name = document.getElementById("name").value;
    const studentId = document.getElementById("studentId").value;
    const department = document.getElementById("department").value;

    if (!name || !studentId || !department) {
        showMessage("Please fill all fields!", "red");
        return;
    }

    const user = { name, studentId, department };
    users.push(user);

//  SAVE DATA
localStorage.setItem("users", JSON.stringify(users));

displayUsers();

    

    showMessage("User added successfully!", "green");

    //  Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("studentId").value = "";
    document.getElementById("department").value = "";
}

//  Show users (TABLE FORMAT)
function displayUsers() {
    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.studentId}</td>
            <td>${user.department}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        // Attach delete event
        row.querySelector("button").addEventListener("click", () => deleteUser(index));

        list.appendChild(row);
    });
}

//  Delete user
function deleteUser(index) {
    users.splice(index, 1);

    //  UPDATE STORAGE
    localStorage.setItem("users", JSON.stringify(users));

    displayUsers();

    showMessage("User deleted!", "red");
}

//  Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

//  Message function
function showMessage(text, color) {
    const msg = document.getElementById("message");
    msg.innerText = text;
    msg.style.color = color;

    setTimeout(() => {
        msg.innerText = "";
    }, 2000);
}