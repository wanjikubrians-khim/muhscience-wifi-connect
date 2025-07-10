// Handle M-Pesa payment
document.getElementById('paymentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const bundleId = new URLSearchParams(window.location.search).get('plan');
    
    if (!phone || !bundleId) {
        alert('Please select a bundle and enter your phone number');
        return;
    }
    
    // Show processing
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
    
    // Simulate API call to backend
    setTimeout(() => {
        initiateSTKPush(phone, bundleId);
    }, 1500);
});

function initiateSTKPush(phone, bundleId) {
    // In real implementation, this would call your backend
    console.log(`Initiating payment for ${phone}, bundle ${bundleId}`);
    
    // Simulate successful payment after 3 seconds
    setTimeout(() => {
        completePurchase(phone, bundleId);
    }, 3000);
}

function completePurchase(phone, bundleId) {
    // Hide processing, show success
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step4').classList.add('active');
    
    // Connect to WiFi (would call hotspot API in real implementation)
    connectToWifi(phone, bundleId);
    
    // Update UI with bundle details
    const bundle = getBundleById(bundleId);
    document.getElementById('bundleDuration').textContent = bundle.name;
    
    const now = new Date();
    const expires = new Date(now.getTime() + bundle.duration * 60 * 60 * 1000);
    document.getElementById('expiryTime').textContent = expires.toLocaleTimeString();
}

// Helper function - in real app would fetch from backend
function getBundleById(id) {
    const bundles = {
        '1': { name: "1 Hour", duration: 1, price: 50 },
        '2': { name: "6 Hours", duration: 6, price: 200 },
        '3': { name: "1 Day", duration: 24, price: 350 },
        '4': { name: "1 Week", duration: 168, price: 1000 }
    };
    return bundles[id] || bundles['1'];
}