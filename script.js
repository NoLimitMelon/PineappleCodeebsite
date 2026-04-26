const ADMIN_PASSWORD = "Eric1613!"; // CHANGE THIS PASSWORD

const menuToggle = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('#nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// --- 1. SIDEBAR & NAVIGATION LOGIC ---

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('is-active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active class on links
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Switch visible sections
        const targetId = link.getAttribute('href').substring(1);
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // Close mobile menu
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });
});

// --- 2. REVIEW SYSTEM LOGIC ---

// Function to handle new review submissions
function postReview() {
    const name = document.getElementById('revName').value.trim();
    const server = document.getElementById('revServer').value.trim();
    const ip = document.getElementById('revIP').value.trim();
    const rating = document.getElementById('revRating').value;
    const message = document.getElementById('revMessage').value.trim();

    if (!name || !server || !message) {
        alert("Please fill in your name, server, and review message!");
        return;
    }

    const reviewData = {
        name,
        server,
        ip: ip || "Private",
        rating,
        message,
        date: new Date().toLocaleDateString()
    };

    // Save to LocalStorage
    let savedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    savedReviews.push(reviewData);
    localStorage.setItem('userReviews', JSON.stringify(savedReviews));

    // Clear form and reload to show new data
    alert("Review posted successfully!");
    location.reload();
}

// Function to display reviews on the page
function loadReviews() {
    const reviewArea = document.getElementById('review-display-area');
    const savedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    // Clear area before loading
    reviewArea.innerHTML = "";

    // If no reviews exist, show a placeholder
    if (savedReviews.length === 0) {
        reviewArea.innerHTML = "<p style='opacity:0.5; text-align:center; grid-column: 1/-1;'>No reviews yet. Be the first!</p>";
        return;
    }

    // Loop through reviews (reverse order so newest is on top)
    savedReviews.slice().reverse().forEach((review, index) => {
        // Calculate the actual index in the original array for deletion
        const actualIndex = savedReviews.length - 1 - index;
        
        const card = document.createElement('div');
        card.className = 'project-card review-card';
        card.style.position = 'relative';
        card.style.borderLeft = "4px solid #FFD700";

        // Create Delete Button if Admin is logged in
        const deleteBtn = isAdmin ? 
            `<button onclick="deleteReview(${actualIndex})" style="position: absolute; top: 10px; right: 10px; background: #ff4444; color: white; border: none; border-radius: 5px; cursor: pointer; padding: 5px 10px; font-size: 10px; font-weight: bold;">DELETE</button>` 
            : "";

        card.innerHTML = `
            ${deleteBtn}
            <div class="rating" style="margin-bottom: 0.5rem;">${review.rating}</div>
            <p class="review-text" style="font-style: italic; margin-bottom: 1rem; opacity: 0.9;">"${review.message}"</p>
            <p class="highlight" style="font-weight: bold; color: #FFD700;">- ${review.server} ${review.ip !== "Private" ? '(' + review.ip + ')' : ''}</p>
            <small style="opacity: 0.4; font-size: 0.7rem;">Date: ${review.date}</small>
        `;
        reviewArea.appendChild(card);
    });
}

// --- 3. ADMIN PANEL LOGIC ---

function openAdmin() {
    document.getElementById('adminPanel').style.display = 'block';
}

function closeAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPass').value = "";
}

function checkAdmin() {
    const passInput = document.getElementById('adminPass').value;
    if (passInput === ADMIN_PASSWORD) {
        localStorage.setItem('isAdmin', 'true');
        alert("Admin Mode Activated. Delete buttons are now visible.");
        closeAdmin();
        loadReviews(); // Refresh the view
    } else {
        alert("Incorrect password!");
    }
}

function deleteReview(index) {
    if (confirm("Are you sure you want to delete this review?")) {
        let savedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
        savedReviews.splice(index, 1); // Remove specific item
        localStorage.setItem('userReviews', JSON.stringify(savedReviews));
        loadReviews(); // Refresh the list
    }
}

// --- 4. INITIALIZE PAGE ---

window.onload = () => {
    loadReviews();
};
