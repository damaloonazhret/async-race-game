import { carsView, updateCarButton } from '../options/optionsElements';
import { handleCarRemove } from '../deleteCar/deleteCar';
import { startEngineCarRace } from '../startEngineCarRace/startEngineCarRace';
import { updateCarData } from '../updateCar/updateCar';
import { returnCarElement } from '../../helpers/returnCarElement';
import { checkAnimationDuration, checkAnimationInterval, removeAttributes } from '../../helpers/startRace/startRace';
import { car } from '../../types/interfaces';
import { startOrStopEngine } from '../startStop/startStop';

const createElementWithAttributes = (
    tag: string,
    attributes: Record<string, string>,
    content?: string,
    attribute?: string
): HTMLElement => {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    if (content) {
        element.textContent = content;
    }
    if (attribute) {
        element.setAttribute(attribute, '');
    }
    return element;
};

const carsViewItemContainer = createElementWithAttributes('div', { class: 'cars-view__item_container' });

const carsRemove = async (e: Event) => {
    const target = e.target as HTMLButtonElement;
    const id = target.id;
    const car = returnCarElement(target);
    if (car?.style.left) {
        setTimeout(async () => {
            await checkAnimationInterval(target, async () => {
                await handleCarRemove(target.id, carsViewItemContainer);
                if (id === updateCarButton.id) {
                    updateCarButton.removeAttribute('id');
                }
            });
        }, 1000);
    } else {
        await handleCarRemove(target.id, carsViewItemContainer);
        if (id === updateCarButton.id) {
            updateCarButton.removeAttribute('id');
        }
    }
};

const startCars = async (e: Event, carsViewItemStart: HTMLElement) => {
    const target = e.target as HTMLButtonElement;
    e.preventDefault();
    carsViewItemStart.setAttribute('disabled', '');
    checkAnimationDuration(target);
    await startEngineCarRace(e);
};

const stopBtnOn = async (e: Event, carsViewItemStop: HTMLElement) => {
    const carLogoElement = returnCarElement(e.target);
    const target = e.target as HTMLButtonElement;
    const parentElement = target.parentNode as HTMLDivElement;
    await startOrStopEngine(Number(parentElement.id), 'stopped');
    const timer = setInterval(() => {
        if (carLogoElement?.style.left) {
            if (carLogoElement) carLogoElement.style.removeProperty('left');
        } else {
            clearInterval(timer);
            removeAttributes();
        }
    }, 100);
    carsViewItemStop?.setAttribute('disabled', '');
};

const startBtnOn = async (e: Event, carsViewItemStart: HTMLElement) => {
    const target = e.target as HTMLButtonElement;
    const btnStop = target.parentNode?.querySelector('.cars-view__stop-btn');
    if (btnStop) btnStop.removeAttribute('disabled');
    await startCars(e, carsViewItemStart);
};

export const createCarAdd = async (data: car) => {
    const carsViewItem = createElementWithAttributes('div', { class: 'cars-view__item' });
    const carsViewItemSelect = createElementWithAttributes('button', { class: 'cars-view__select-btn' }, 'select');
    const carsViewItemRemove = createElementWithAttributes('button', { class: 'cars-view__remove-btn' }, 'remove');
    const carsViewItemStart = createElementWithAttributes('button', { class: 'cars-view__start-btn' }, 'A');
    const carsViewItemStop = createElementWithAttributes('button', { class: 'cars-view__stop-btn' }, 'B', 'disabled');
    const carsViewItemName = createElementWithAttributes('div', { class: 'cars-view__name' }, data.name);
    const carsViewItemCar = createElementWithAttributes('div', {
        class: 'cars-view__car-logo',
        style: `background-color: ${data.color}`,
    });
    const carsViewItemFlag = createElementWithAttributes('div', { class: 'cars-view__flag' });
    const idString = String(data.id);
    carsViewItem.id = idString;
    carsViewItemRemove.id = idString;
    carsViewItem.appendChild(carsViewItemSelect);
    carsViewItem.appendChild(carsViewItemRemove);
    carsViewItem.appendChild(carsViewItemStart);
    carsViewItem.appendChild(carsViewItemStop);
    carsViewItem.appendChild(carsViewItemName);
    carsViewItem.appendChild(carsViewItemCar);
    carsViewItem.appendChild(carsViewItemFlag);
    carsViewItemContainer.appendChild(carsViewItem);
    carsView.appendChild(carsViewItemContainer);
    carsViewItemRemove.addEventListener('click', async (e) => await carsRemove(e));
    carsViewItemSelect.addEventListener('click', async (e) => await updateCarData(e));
    carsViewItemStart.addEventListener('click', async (e: Event) => startBtnOn(e, carsViewItemStart));
    carsViewItemStop.addEventListener('click', async (e) => stopBtnOn(e, carsViewItemStop));
};
