import { openColorPicker } from '../colorPickerView/colorPicker';
import { createCarAndRefreshGarage, getCarInstance } from '../createCar/createCar';
import { addCarsOnPageA, getMaxPageCount, getPageCount, setPageCount } from '../pagination/pagination';
import { updateCar } from '../updateCar/updateCar';
import {
    body,
    carsView,
    carsViewHeader,
    carsViewPage,
    carsViewPageContainer,
    carsViewPageNext,
    carsViewPagePrev,
    createCarButton,
    createColorCar,
    createInputCar,
    generateBtn,
    grid,
    gridRow1,
    gridRow2,
    gridRow3,
    navWrapper,
    playMusicButtonOn,
    playMusicButtonOff,
    raceBtn,
    resetBtn,
    toGarage,
    toWinners,
    updateCarButton,
    updateColorCar,
    updateInputCar,
    raceContent,
    winnersCount,
    winnersPage,
    winnersPageBtnPrev,
    winnersPageBtnNext,
    winnersGrid,
    winnersGridRow1,
    winnersGridRow3,
    winnersGridRow2,
    winnersGridRow7,
    winnersGridRow6,
    winnersGridRow5,
    winnersGridRow4,
} from './optionsElements';
import { generateCars } from '../../helpers/generateCars/generateCars';
import { startRace } from '../../helpers/startRace/startRace';
import { toWinnersView } from '../toWinners/toWinners';
import { toGarageView } from '../toGarage/toGarageView';
import { resetAllCarsPosition } from '../../resetAllCarsPosition/resetAllCarsPosition';

carsViewPageNext.addEventListener('click', async () => {
    if (getPageCount() === (await getMaxPageCount())) {
        return;
    }
    if (getPageCount() < (await getMaxPageCount())) {
        const currentPageCount = getPageCount();
        setPageCount(currentPageCount + 1);
        await addCarsOnPageA(getPageCount());
        carsViewPage.innerHTML = `Page ( ${getPageCount()} )`;
        updateCarButton.removeAttribute('id');
    }
});

export const updateCarBtnPutData = () => {
    updateCarButton.addEventListener('click', async () => {
        const id = Number(updateCarButton.id);
        if (id) {
            const name = updateInputCar.value;
            const color = updateColorCar.style.backgroundColor;
            const carCurrent = getCarInstance(name, color);
            await updateCar(id, carCurrent);
            const carElementName = document.querySelector(`[id="${id}"] .cars-view__name`) as HTMLDivElement;
            const carElementColor = document.querySelector(`[id="${id}"] .cars-view__car-logo`) as HTMLDivElement;
            carElementName.innerHTML = carCurrent.name;
            carElementColor.style.backgroundColor = carCurrent.color;
        } else {
            return;
        }
    });
};

carsViewPagePrev.addEventListener('click', async () => {
    if (getPageCount() === 1) {
        return;
    }
    if (getPageCount() > 1) {
        const currentPageCount = getPageCount();
        setPageCount(currentPageCount - 1);
        await addCarsOnPageA(getPageCount());
        carsViewPage.innerHTML = `Page ( ${getPageCount()} )`;
        updateCarButton.removeAttribute('id');
    }
});

playMusicButtonOn.className = 'play';
playMusicButtonOn.innerHTML = 'Play Music';
playMusicButtonOff.className = 'stop';
playMusicButtonOff.innerHTML = 'Stop Music';

navWrapper.className = 'nav';
toGarage.className = 'garage-btn';
toWinners.className = 'winners-btn';

grid.className = 'grid';
raceBtn.className = 'grid__race-btn';
resetBtn.className = 'grid__reset-btn';
generateBtn.className = 'grid__generate-btn';

raceContent.className = 'race-container';

carsView.className = 'cars-view';
carsViewHeader.className = 'cars-view__header';
carsViewPageContainer.className = 'cars-view_container';
carsViewPage.className = 'cars-view__page';
carsViewPageNext.className = 'cars-view__page-next';
carsViewPagePrev.className = 'cars-view__page-prev';

raceBtn.innerHTML = 'RACE';
resetBtn.innerHTML = 'Reset';
generateBtn.innerHTML = 'Generate Car';
carsViewPage.innerHTML = `Page ( ${getPageCount()} )`;
createInputCar.className = `grid__input`;
createColorCar.className = `grid__color-btn`;
createCarButton.className = `grid__create-btn`;
createCarButton.innerHTML = 'Create';
updateInputCar.className = `grid__input-2`;
updateColorCar.className = `grid__color-btn-2`;
updateCarButton.className = `grid__create-btn-2`;
updateCarButton.innerHTML = 'Update';
toGarage.innerHTML = 'To Garage';
toWinners.innerHTML = 'To Winners';

winnersCount.className = 'winners-count';
winnersPage.className = 'winners-page';
winnersPageBtnPrev.className = 'winners-btn_prev';
winnersPageBtnNext.className = 'winners-btn_next';
winnersGrid.className = 'winners-grid';

winnersGridRow1.classList.add('winners-grid-row-1', 'row');
winnersGridRow2.classList.add('winners-grid-row-2', 'row');
winnersGridRow3.classList.add('winners-grid-row-3', 'row');
winnersGridRow4.classList.add('winners-grid-row-4', 'row');
winnersGridRow5.classList.add('winners-grid-row-5', 'row');
winnersGridRow6.classList.add('winners-grid-row-6', 'row');
winnersGridRow7.classList.add('winners-grid-row-7', 'row');

export const createNavigation = () => {
    navWrapper.appendChild(toGarage);
    navWrapper.appendChild(toWinners);
    body.appendChild(navWrapper);
    toWinners.addEventListener('click', () => toWinnersView());
    toGarage.addEventListener('click', async () => await toGarageView());
    raceBtn.addEventListener('click', async () => startRace());
    createColorCar.addEventListener('click', () => openColorPicker(createColorCar));
    updateColorCar.addEventListener('click', () => openColorPicker(updateColorCar));
    createCarButton.addEventListener('click', async () => await createCarAndRefreshGarage());
    generateBtn.addEventListener('click', async () => await generateCars());
    resetBtn.addEventListener('click', () => resetAllCarsPosition());
};

export const createOptions = () => {
    grid.appendChild(gridRow1);
    grid.appendChild(gridRow2);
    grid.appendChild(gridRow3);
    gridRow1.appendChild(createInputCar);
    gridRow1.appendChild(createColorCar);
    gridRow1.appendChild(createCarButton);
    gridRow2.appendChild(updateInputCar);
    gridRow2.appendChild(updateColorCar);
    gridRow2.appendChild(updateCarButton);
    gridRow3.appendChild(raceBtn);
    gridRow3.appendChild(resetBtn);
    gridRow3.appendChild(generateBtn);

    navWrapper.appendChild(playMusicButtonOn);
    navWrapper.appendChild(playMusicButtonOff);
    carsViewPageContainer.appendChild(carsViewPage);
    carsViewPageContainer.appendChild(carsViewPagePrev);
    carsViewPageContainer.appendChild(carsViewPageNext);
    carsView.appendChild(carsViewHeader);
    carsView.appendChild(carsViewPageContainer);

    raceContent.appendChild(grid);
    raceContent.appendChild(carsView);
    body.appendChild(raceContent);
};
