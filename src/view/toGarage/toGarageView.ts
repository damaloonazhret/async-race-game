import { createOptions, updateCarBtnPutData } from '../options/optionsView';
import { addCarsOnPageA, getPageCount } from '../pagination/pagination';
import { removeAttributes } from '../../helpers/startRace/startRace';

export const toGarageView = async () => {
    const main = document.querySelector('.race-container');
    if (main) {
        main.innerHTML = '';
        createOptions();
        removeAttributes();
        await addCarsOnPageA(getPageCount());
        updateCarBtnPutData();
    }
};
