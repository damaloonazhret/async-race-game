import { winnersCount, winnersGrid, winnersPage, winnersPageBtnNext, winnersPageBtnPrev } from '../options/optionsElements';
import { ElementInfo, WinnerData } from '../../types/interfaces';
import { getWinners } from '../../model/getWinners/getWinners';
import { getCar } from '../getCar/getCar';

interface winnersGet {
    data: WinnerData[];
    totalCount?: number;
}
const numberOfWinners = 6;
let winners: winnersGet;
let countPage = 1;
let currentSortType: 'id' | 'wins' | 'time' = 'wins';
let currentSortOrder: 'ASC' | 'DESC' = 'DESC';
let page = 1;

export const winnersPaginationNext = async () => {
    let maxPages;
    if (winners.totalCount) {
        maxPages = Math.ceil(winners.totalCount / numberOfWinners);
    }
    if (countPage === maxPages) {
        return;
    } else {
        countPage++;
        page++;
        winnersPage.innerHTML = `Page ( ${page} )`;
        winners = await getWinners(countPage, 6, currentSortType, currentSortOrder);
        await addParams();
    }
};

export const winnersPaginationPrev = async () => {
    if (countPage === 1) {
        return;
    } else {
        countPage--;
        page--;
        winnersPage.innerHTML = `Page ( ${page} )`;
        winners = await getWinners(countPage, 6, currentSortType, currentSortOrder);
        await addParams();
    }
};

winnersPageBtnNext.addEventListener('click', () => winnersPaginationNext());
winnersPageBtnPrev.addEventListener('click', () => winnersPaginationPrev());

export const toWinnersView = async () => {
    const main = document.querySelector('.race-container');
    if (main) {
        winnersGrid.innerHTML = '';
        main.innerHTML = '';
        main.appendChild(winnersCount);
        main.appendChild(winnersPage);
        main.appendChild(winnersPageBtnPrev);
        main.appendChild(winnersPageBtnNext);
        for (let i = 0; i < 35; i++) {
            const winnersGridElement = document.createElement('div');
            winnersGridElement.classList.add(`grid-element-${i + 1}`, 'element');
            winnersGrid.appendChild(winnersGridElement);
        }
        main.appendChild(winnersGrid);
        await getWinnersFromServer('wins');
        await headerInnerHtml();
        addEventToBtn();
    }
};

const addParams = async () => {
    let carCount = 7;
    let nameCount = 8;
    let winCount = 9;
    let bestCount = 10;
    const winnersDataLength = winners.data.length;
    for (let i = 0; i < 6; i++) {
        if (i < winnersDataLength) {
            const idCar = await getCar(winners.data[i].id);
            const elemName = document.querySelector(`.grid-element-${nameCount}`) as HTMLDivElement;
            const elemWin = document.querySelector(`.grid-element-${winCount}`) as HTMLDivElement;
            const elemBest = document.querySelector(`.grid-element-${bestCount}`) as HTMLDivElement;
            const elemCar = document.querySelector(`.grid-element-${carCount}`) as HTMLDivElement;
            if (elemName && elemWin && elemBest && elemCar) {
                elemName.innerHTML = idCar ? idCar.name : '';
                elemWin.innerHTML = winners.data[i].wins !== undefined ? String(winners.data[i].wins) : '';
                elemBest.innerHTML = winners.data[i].time !== undefined ? String(winners.data[i].time) : '';
                elemCar.classList.add('show');
                if (idCar && idCar.color !== undefined) elemCar.style.backgroundColor = `${idCar.color}`;
            } else elemCar ? elemCar.classList.remove('show') : null; // elemCar.classList.remove('show');
        } else {
            const elemName = document.querySelector(`.grid-element-${nameCount}`) as HTMLDivElement;
            const elemWin = document.querySelector(`.grid-element-${winCount}`) as HTMLDivElement;
            const elemBest = document.querySelector(`.grid-element-${bestCount}`) as HTMLDivElement;
            const elemCar = document.querySelector(`.grid-element-${carCount}`) as HTMLDivElement;

            if (elemName && elemWin && elemBest && elemCar) {
                elemName.innerHTML = '';
                elemWin.innerHTML = '';
                elemBest.innerHTML = '';
                elemCar.classList.remove('show');
                elemCar.style.backgroundColor = ``;
            }
        }
        nameCount += 5;
        winCount += 5;
        bestCount += 5;
        carCount += 5;
    }
};

const headerInnerHtml = async () => {
    const elements: ElementInfo[] = [
        { selector: '.grid-element-1', text: 'Number' },
        { selector: '.grid-element-2', text: 'Car' },
        { selector: '.grid-element-3', text: 'Name' },
        { selector: '.grid-element-4', text: 'Wins' },
        { selector: '.grid-element-5', text: 'Best Drag' },
        { selector: '.grid-element-6', text: '1' },
        { selector: '.grid-element-11', text: '2' },
        { selector: '.grid-element-16', text: '3' },
        { selector: '.grid-element-21', text: '4' },
        { selector: '.grid-element-26', text: '5' },
        { selector: '.grid-element-31', text: '6' },
    ];

    elements.forEach(({ selector, text }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = text;
        }
    });
    await addParams();
};

const getWinnersFromServer = async (sortType: 'id' | 'wins' | 'time') => {
    currentSortOrder = sortType === currentSortType ? (currentSortOrder === 'DESC' ? 'ASC' : 'DESC') : 'DESC';

    winners = await getWinners(page, 6, sortType, currentSortOrder);
    if (winners.totalCount) {
        winnersCount.innerHTML = `Winners ( ${winners.totalCount} )`;
    }
    winnersPage.innerHTML = `Page ( ${page} )`;
};

async function setParams(param: 'id' | 'wins' | 'time') {
    await getWinnersFromServer(param);
    await addParams();
    currentSortType = param;
}

function addEventToBtn() {
    const bestBtn = document.querySelector('.grid-element-5') as HTMLDivElement;
    const winsBtn = document.querySelector('.grid-element-4') as HTMLDivElement;
    if (bestBtn && winsBtn) {
        bestBtn.addEventListener('click', async () => setParams('time'));
        winsBtn.addEventListener('click', async () => setParams('wins'));
    }
}
