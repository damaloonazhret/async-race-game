import { carsLength } from '../garageCarsLength/carsLength';
import { displayItems, getPageCount } from '../pagination/pagination';
import { createCarAdd } from '../createCar/createCarAdd';
import { carsViewHeader } from '../options/optionsElements';
import { deleteWinner } from '../../model/deleteWinners/deleteWinners';
import { car } from '../../types/interfaces';

export async function deleteCar(id: string) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        // console.error('Error:', error);
    }
}

export const handleCarRemove = async (id: string, carsView: HTMLElement) => {
    await deleteCar(id);
    await deleteWinner(Number(id));
    const carsAmount = await carsLength();
    carsViewHeader.innerHTML = `Garage ( ${carsAmount} )`;
    carsView.innerHTML = '';
    const pageCurrent = await displayItems(getPageCount());
    pageCurrent.forEach((el: car) => createCarAdd(el));
};
