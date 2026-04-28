document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("registerBtn");

    if (!btn) {
        console.error(" Register button not found!");
        return;
    }

    console.log("✅ JS Loaded");

    btn.addEventListener("click", register);
});

async function register() {
    console.log("STEP 1 - Button clicked");

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    console.log("STEP 2 - Before fetch");

    try {
        const res = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        console.log("STEP 3 - After fetch");

        const text = await res.text();

        if (!res.ok) {
            message.innerText = text;
            message.style.color = "red";
            return;
        }

        message.innerText = text;
        message.style.color = "green";

        // Clear inputs
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";

    } catch (err) {
        console.error(" ERROR:", err);
        message.innerText = "Something went wrong!";
        message.style.color = "red";
    }
}