import { getCar } from '../getCar/getCar';
import { updateCarButton, updateColorCar, updateInputCar } from '../options/optionsElements';
import { car } from '../../types/interfaces';

export async function updateCar(carId: number, carData: Partial<car>) {
    const url = `http://127.0.0.1:3000/garage/${carId}`;
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(carData),
        });

        if (response.ok) {
            // const updatedCar: car = await response.json();
            // console.log('Car updated successfully:', updatedCar);
        } else if (response.status === 404) {
            // console.error('Car not found. Check the car ID.');
        } else {
            // console.error('Failed to update car:', response.status, response.statusText);
        }
    } catch (error) {
        // console.error('An error occurred:', error);
    }
}

export const updateCarData = async (e: Event) => {
    const target = e.target as HTMLElement;
    const parentUsingNode = target.parentNode as HTMLElement | null;
    if (parentUsingNode && parentUsingNode.classList.contains('cars-view__item')) {
        const id = parentUsingNode.id;
        const currentCar = await getCar(Number(id));
        if (currentCar) {
            const name = currentCar.name;
            const color = currentCar.color;
            updateInputCar.value = name;
            updateColorCar.style.backgroundColor = color;
            updateCarButton.id = id;
        }
    }
};
