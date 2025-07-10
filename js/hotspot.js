// Simulate WiFi connection
function connectToWifi(phone, bundleId) {
    console.log(`Connecting ${phone} to WiFi with bundle ${bundleId}`);
    
    // In real implementation:
    // 1. Generate random credentials
    // 2. Call hotspot API to create timed user
    // 3. Return credentials to user
    
    // For demo, we'll just show an alert
    alert(`You're now connected to Hunna WiFi! Enjoy your browsing.`);
    
    // Start countdown timer
    startSessionTimer(bundleId);
}

function startSessionTimer(bundleId) {
    const bundle = getBundleById(bundleId);
    let minutesLeft = bundle.duration * 60;
    
    const timer = setInterval(() => {
        minutesLeft--;
        
        // Update UI if on dashboard
        updateTimerDisplay(minutesLeft);
        
        // Show warning when 10 minutes left
        if (minutesLeft === 10) {
            showTimeWarning();
        }
        
        // Disconnect when time's up
        if (minutesLeft <= 0) {
            clearInterval(timer);
            disconnectUser();
        }
    }, 60000); // Update every minute
}

function updateTimerDisplay(minutes) {
    const timerElement = document.getElementById('sessionTimer');
    if (timerElement) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        timerElement.textContent = `${hours}h ${mins}m remaining`;
    }
}

function showTimeWarning() {
    alert('Your WiFi session will expire in 10 minutes!');
}

function disconnectUser() {
    console.log('Disconnecting user...');
    alert('Your WiFi session has expired. Please purchase more time to continue browsing.');
    
    // In real implementation, call hotspot API to disconnect
}