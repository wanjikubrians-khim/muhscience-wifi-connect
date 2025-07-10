async function checkAdmin() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '../auth.html';
    return;
  }

  try {
    const res = await fetch('/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    
    if (!data.user.isAdmin) {
      alert('You are not an admin!');
      window.location.href = '../dashboard.html';
    }
  } catch (err) {
    console.error(err);
    window.location.href = '../auth.html';
  }
}
checkAdmin();