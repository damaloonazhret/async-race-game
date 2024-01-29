import { createNavigation, createOptions, updateCarBtnPutData } from './options/optionsView';
import { addCarsOnPageA, getPageCount } from './pagination/pagination';
import { playMusic } from './musicAudio/playMusic';

export const appView = async () => {
    createNavigation();
    createOptions();
    await addCarsOnPageA(getPageCount());
    updateCarBtnPutData();
    playMusic();
};
