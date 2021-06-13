document.querySelector('#logout-btn').addEventListener('click', async function () {
    const response = await fetch('user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
        console.log('Log out successful')
    } else {
        alert('Log out failed');
    }
});
