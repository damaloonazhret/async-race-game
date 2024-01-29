import { createCarAdd } from './createCarAdd';
import { convertRGBtoHex } from '../../helpers/converter/converter';
import { carBrands } from '../../helpers/carStorage/carStorage';
import { getRandomNumber } from '../../helpers/randomNumber';
import { carsLength } from '../garageCarsLength/carsLength';
import { carsViewHeader, createColorCar, createInputCar } from '../options/optionsElements';
import { car } from '../../types/interfaces';

export async function createCar(carData: car) {
    const carsOnPageAmount = document.querySelector('.cars-view__item_container')?.childNodes.length as number;
    try {
        const response = await fetch('http://127.0.0.1:3000/garage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });

        const data = await response.json();
        if (carsOnPageAmount < 6 || carsOnPageAmount === undefined) {
            await createCarAdd(data);
        }
    } catch (error) {
        // console.error('Error:', error);
    }
}

export const getCarInstance = (name: string, color: string) => {
    return {
        name: `${name}`,
        color: `${color}`,
    };
};

export async function createCarAndRefreshGarage() {
    const rgbColor = createColorCar.style.backgroundColor;
    const hexColor = convertRGBtoHex(rgbColor);
    const brandNames = Object.keys(carBrands);
    const maxValue = brandNames.length;
    let createInputCarValue = '';
    if (createInputCar.value === '') {
        createInputCarValue = brandNames[getRandomNumber(maxValue)];
    } else {
        createInputCarValue = createInputCar.value;
    }

    const carCurrent = getCarInstance(createInputCarValue, hexColor);

    await createCar(carCurrent);
    const carsAmount = await carsLength();
    carsViewHeader.innerHTML = `Garage ( ${carsAmount} )`;
    await carsLength();
}
