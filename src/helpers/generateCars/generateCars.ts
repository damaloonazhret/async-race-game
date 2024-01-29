import { carBrands } from '../carStorage/carStorage';
import { getRandomNumber } from '../randomNumber';
import { getRandomColor } from '../randomColor';
import { createCar, getCarInstance } from '../../view/createCar/createCar';
import { carsLength } from '../../view/garageCarsLength/carsLength';
import { carsViewHeader } from '../../view/options/optionsElements';
export const generateCars = async () => {
    let i = 0;
    while (i < 100) {
        const maxValue = Object.keys(carBrands).length;
        const random = getRandomNumber(maxValue);
        const brand = Object.keys(carBrands)[random];
        const modelsLength = carBrands[brand].length;
        const model = carBrands[brand][getRandomNumber(modelsLength)];
        const carFullName = `${brand}: ${model}`;
        const randomColor = getRandomColor();
        const instance = getCarInstance(carFullName, randomColor);
        await createCar(instance);
        const carsAmount = await carsLength();
        carsViewHeader.innerHTML = `Garage ( ${carsAmount} )`;
        i++;
    }
};
