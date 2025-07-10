// Toggle between Login & Register forms
document.querySelectorAll('.tab-btn, .switch-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = btn.getAttribute('data-tab');
        
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        
        // Show the selected form
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById(`${tab}Form`).classList.add('active');
    });
});

// Form submission (simulated)
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login successful! Redirecting to dashboard...');
    window.location.href = 'dashboard.html';
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Account created! Please login.');
    document.querySelector('[data-tab="login"]').click();
});