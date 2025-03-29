// Show only the active section and hide others
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    // Show the selected section
    document.getElementById(sectionId).classList.add('active-section');
    
    // Update active nav link
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === "#${sectionId}") {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
};

// Set home as default active section
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    
    // Navigation click events
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
});

// Sign Up Modal
const signupBtn = document.getElementById('signupBtn');
const signupModal = document.getElementById('signupModal');
const closeBtn = document.querySelector('.close');

signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    signupModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Form Submission
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert("Thank you for signing up with ${email}!");
    signupModal.style.display = 'none';
    document.getElementById('signupForm').reset();
});

// Book Now Button
document.getElementById('bookNowBtn').addEventListener('click', () => {
    showSection('booking');
});

// Booking Form
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const roomType = document.getElementById('roomType').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    
    // Simulate availability check
    setTimeout(() => {
        showAvailability(roomType, checkIn, checkOut, guests);
        showSection('availability');
    }, 1000);
});

function showAvailability(roomType, checkIn, checkOut, guests) {
    const availabilityResults = document.getElementById('availabilityResults');
    availabilityResults.innerHTML = '';
    
    // Sample data - in a real app, this would come from a server
    const rooms = [
        { type: 'Deluxe Room', available: 5, price: 150 },
        { type: 'Executive Suite', available: 2, price: 250 },
        { type: 'Presidential Suite', available: 1, price: 500 }
    ];
    
    rooms.forEach(room => {
        const card = document.createElement('div');
        card.className = 'availability-card';
        card.innerHTML = `
            <h3>${room.type}</h3>
            <p>Available: ${room.available}</p>
            <p>Price: $${room.price}/night</p>
            <button class="btn" onclick="bookRoom('${room.type}')">Book Now</button>
        `;
        availabilityResults.appendChild(card);
    });
}

function bookRoom(roomType) {
    alert("Booking confirmed for ${roomType}!");
    document.getElementById('bookingForm').reset();
    document.getElementById('availabilityResults').innerHTML = '';
    showSection('home');
}

// Food Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});