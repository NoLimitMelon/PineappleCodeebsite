const ADMIN_PASSWORD = "GMS1613!"; // CHANGE THIS PASSWORD

// --- NAVIGATION LOGIC ---
const menuToggle = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('#nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('is-active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const targetId = link.getAttribute('href').substring(1);
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) section.classList.add('active');
        });
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });
});

// --- FORMSPREE SUBMISSION ---
const form = document.getElementById("reviewForm");
const status = document.getElementById("form-status");

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        const data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                status.innerText = "Review sent! I'll add it to the wall soon.";
                status.style.display = "block";
                form.reset();
                submitBtn.innerText = "Review Sent!";
            } else {
                alert("Submission failed. Please check your Formspree ID.");
                submitBtn.disabled = false;
                submitBtn.innerText = "Post Review";
            }
        }).catch(error => {
            alert("Error: " + error);
        });
    });
}

// --- ADMIN LOGIC ---
function openAdmin() { document.getElementById('adminPanel').style.display = 'block'; }
function closeAdmin() { 
    document.getElementById('adminPanel').style.display = 'none'; 
    document.getElementById('adminPass').value = "";
}

function checkAdmin() {
    const pass = document.getElementById('adminPass').value;
    if (pass === ADMIN_PASSWORD) {
        alert("You are now in Admin Mode. To delete reviews, you must remove them from the HTML file manually.");
        closeAdmin();
    } else {
        alert("Incorrect Password");
    }
}
