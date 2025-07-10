// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load plans dynamically
    loadPlans();
    
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            const nav = document.querySelector('header nav');
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Check if on WiFi network
    checkNetwork();
});

// Load plans from API
function loadPlans() {
    const planContainer = document.getElementById('planContainer');
    if (!planContainer) return;
    
    // Simulated API call - in real app, fetch from backend
    const plans = [
        { id: 1, name: "1 Hour", price: 50, duration: "1h", desc: "Quick browsing" },
        { id: 2, name: "6 Hours", price: 200, duration: "6h", desc: "Half day package" },
        { id: 3, name: "1 Day", price: 350, duration: "24h", desc: "Full day access" },
        { id: 4, name: "1 Week", price: 1000, duration: "168h", desc: "Weekly bundle" }
    ];
    
    let html = '';
    plans.forEach(plan => {
        html += `
        <div class="plan-card">
            <h3>${plan.name}</h3>
            <div class="price">KES ${plan.price}</div>
            <p>${plan.desc}</p>
            <a href="buy.html?plan=${plan.id}" class="btn">Buy</a>
        </div>
        `;
    });
    
    planContainer.innerHTML = html;
}

// Check if user is on WiFi network
function checkNetwork() {
    // In real implementation, this would check SSID or captive portal detection
    console.log('Checking network...');
    
    // For demo, we'll assume they're on the WiFi
    showWifiNotification();
}

function showWifiNotification() {
    const notification = document.createElement('div');
    notification.className = 'wifi-notification';
    notification.innerHTML = `
        <p>Welcome to Hunna WiFi! Buy internet to get connected.</p>
        <a href="buy.html" class="btn">Get Online</a>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 1000);
}