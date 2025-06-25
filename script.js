
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Login form submitted');
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log('Username:', username, 'Password:', password);
    
    // Simple validation - accepts any non-empty credentials
    if (username.trim() && password.trim()) {
        console.log('Credentials valid, logging in...');
        
        // Hide login container
        const loginContainer = document.getElementById('loginContainer');
        const adminContainer = document.getElementById('adminContainer');
        
        loginContainer.style.display = 'none';
        adminContainer.style.display = 'block';
        
        console.log('Containers switched');
        
        // Show dashboard section
        showSection('dashboard');
        console.log('Dashboard section shown');
    } else {
        console.log('Empty credentials');
        alert('Please enter both username and password');
    }
});

// Make sure DOM is loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Set today's date as default for date inputs
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');
    
    if (checkInInput) checkInInput.value = today;
    if (checkOutInput) checkOutInput.value = today;
});

// Logout functionality
function logout() {
    document.getElementById('adminContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('loginForm').reset();
}

// Navigation functionality
function showSection(sectionName, clickedElement = null) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    
    // Show selected section
    document.getElementById(sectionName).classList.remove('hidden');
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    if (clickedElement) {
        clickedElement.classList.add('active');
    } else {
        // If no element provided, find the nav link for this section
        const targetLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }
}

// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Add Room Form
document.getElementById('addRoomForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const roomNumber = document.getElementById('roomNumber').value;
    const roomType = document.getElementById('roomType').value;
    const roomRate = document.getElementById('roomRate').value;
    const roomStatus = document.getElementById('roomStatus').value;
    const roomAmenities = document.getElementById('roomAmenities').value;
    
    // Add new row to rooms table
    const table = document.getElementById('roomsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    const statusClass = roomStatus.toLowerCase() === 'available' ? 'status-available' : 
                        roomStatus.toLowerCase() === 'occupied' ? 'status-occupied' : 'status-maintenance';
    
    newRow.innerHTML = `
        <td>${roomNumber}</td>
        <td>${roomType}</td>
        <td>${roomRate}</td>
        <td><span class="status-badge ${statusClass}">${roomStatus}</span></td>
        <td>${roomAmenities}</td>
        <td>
            <button class="btn btn-warning" onclick="editRoom(this)">Edit</button>
            <button class="btn btn-danger" onclick="deleteRoom(this)">Delete</button>
        </td>
    `;
    
    this.reset();
    closeModal('addRoomModal');
    alert('Room added successfully!');
});

// Add Booking Form
document.getElementById('addBookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const guestName = document.getElementById('guestName').value;
    const guestEmail = document.getElementById('guestEmail').value;
    const room = document.getElementById('bookingRoom').value;
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const total = document.getElementById('totalAmount').value;
    
    // Generate booking ID
    const bookingId = '#BK' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    
    this.reset();
    closeModal('addBookingModal');
    alert(`Booking ${bookingId} created successfully for ${guestName}!`);
});

// Assign Staff Form
document.getElementById('assignStaffForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const room = document.getElementById('assignRoom').value;
    const task = document.getElementById('taskType').value;
    const staff = document.getElementById('assignedStaff').value;
    const priority = document.getElementById('priority').value;
    
    this.reset();
    closeModal('assignStaffModal');
    alert(`${task} task assigned to ${staff} for Room ${room} with ${priority} priority!`);
});

// Room management functions
function editRoom(button) {
    const row = button.closest('tr');
    const roomNumber = row.cells[0].textContent;
    alert(`Edit room ${roomNumber} functionality would be implemented here.`);
}

function deleteRoom(button) {
    if (confirm('Are you sure you want to delete this room?')) {
        const row = button.closest('tr');
        row.remove();
        alert('Room deleted successfully!');
    }
}

// Check-in/out functions
function checkIn(button) {
    const row = button.closest('tr');
    const guestName = row.cells[0].textContent;
    const statusCell = row.cells[3];
    statusCell.innerHTML = '<span class="status-badge status-confirmed">Checked In</span>';
    button.textContent = 'Completed';
    button.disabled = true;
    button.className = 'btn btn-warning';
    alert(`${guestName} has been checked in successfully!`);
}

function setCleaningStatus(button) {
    const row = button.closest('tr');
    const roomNumber = row.cells[1].textContent;
    button.textContent = 'Cleaning Assigned';
    button.disabled = true;
    alert(`Cleaning status set for Room ${roomNumber}!`);
}

function showSideNav() {
    const sidebar = document.getElementById('sideNav');
    sidebar.classList.toggle('sidebar-visible');
    document.getElementById('navbarContent').classList.toggle('show');
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default for date inputs
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkInDate').value = today;
    document.getElementById('checkOutDate').value = today;
});