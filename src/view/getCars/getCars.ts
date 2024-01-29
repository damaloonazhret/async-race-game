export async function getCars() {
    try {
        const response = await fetch('http://127.0.0.1:3000/garage');
        return await response.json();
    } catch (error) {
        // console.error('Error:', error);
    }
}
