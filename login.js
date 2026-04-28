// 1. Define functions FIRST

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const text = await res.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            data = { message: text };
        }

        if (!res.ok) {
            message.innerText = data.message;
            message.style.color = "red";
            return;
        }

        //  Success
        localStorage.setItem('token', data.token);
        message.innerText = "Login successful!";
        message.style.color = "green";

        //  Redirect to dashboard
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } catch (err) {
        console.error(err);
        message.innerText = "Something went wrong!";
        message.style.color = "red";
    }
}

// ✅ Dashboard API call
async function dashboard() {
    const token = localStorage.getItem('token');

    try {
        const res = await fetch('http://localhost:3000/dashboard', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const text = await res.text();
        document.getElementById("message").innerText = text;

    } catch (err) {
        console.error(err);
    }
}

// 2. THEN attach event listeners

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginBtn").addEventListener("click", login);
    document.getElementById("dashBtn").addEventListener("click", dashboard);
});