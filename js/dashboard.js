// Simulate an active session timer
function updateTimer() {
    let hours = 18, minutes = 32, seconds = 15;
    
    const timer = setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        
        if (hours < 0) {
            clearInterval(timer);
            alert("Your session has expired!");
            document.getElementById('sessionTimer').textContent = "EXPIRED";
            return;
        }
        
        document.getElementById('sessionTimer').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

updateTimer();