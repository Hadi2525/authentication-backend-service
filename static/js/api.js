// static/js/api.js

async function getUserId(token) {
    try {
        const response = await fetch('/api/userid', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user ID');
        }
        const data = await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Example usage (you might call this after a successful sign-in):
// getUserId('YOUR_FIREBASE_ID_TOKEN');
