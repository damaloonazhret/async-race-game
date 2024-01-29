import { car } from '../../types/interfaces';

export async function getCar(carId: number): Promise<car | null> {
    const url = `http://127.0.0.1:3000/garage/${carId}`;

    try {
        const response = await fetch(url);

        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            // console.error('Car not found. Check the car ID.');
        } else {
            // console.error('Failed to get car data:', response.status, response.statusText);
        }
    } catch (error) {
        // console.error('An error occurred:', error);
    }

    return null;
}
