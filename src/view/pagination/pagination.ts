import { getCars } from '../getCars/getCars';
import { createCarAdd } from '../createCar/createCarAdd';
import { carsLength } from '../garageCarsLength/carsLength';
import { carsViewHeader } from '../options/optionsElements';
import { car } from '../../types/interfaces';

let pageCountValue = 1;
export const itemsPerPage = 6;

export function setPageCount(value: number) {
    pageCountValue = value;
}

export function getPageCount() {
    return pageCountValue;
}

export async function getMaxPageCount() {
    const allCars = await getCars();
    return Math.ceil(allCars.length / itemsPerPage);
}

export async function displayItems(pageNumber: number) {
    const items = await getCars();

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
}

export async function addCarsOnPage(displayItems: Array<car>) {
    await displayItems.forEach((el: car) => {
        createCarAdd(el);
    });
}

export async function addCarsOnPageA(num: number) {
    const currentPageElements = document.querySelector('.cars-view__item_container') as HTMLDivElement;
    const item = await displayItems(num);
    if (currentPageElements === null) {
        await addCarsOnPage(item);
    } else {
        currentPageElements.innerHTML = '';
        await addCarsOnPage(item);
    }

    const carsAmount = await carsLength();
    carsViewHeader.innerHTML = `Garage ( ${carsAmount} )`;
}
