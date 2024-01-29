export async function carsLength() {
    try {
        const response = await fetch('http://127.0.0.1:3000/garage');
        const data = await response.json();
        return data.length;
    } catch (error) {
        // console.error(error);
    }
}
