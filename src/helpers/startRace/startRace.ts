import { returnCarElement } from '../returnCarElement';
import { raceBtn, resetBtn } from '../../view/options/optionsElements';

export const checkAnimationDuration = (elem: HTMLButtonElement) => {
    setTimeout(async () => {
        await checkAnimationInterval(elem, async () => {
            elem.removeAttribute('disabled');
        });
    }, 1000);
};

export const checkAnimationInterval = async (elem: HTMLButtonElement, callback: () => Promise<void>) => {
    const car = returnCarElement(elem);
    let previousLeftValues = '';
    let currentLeftValues: string | undefined = '';
    const interval = setInterval(async () => {
        previousLeftValues = currentLeftValues || '';
        currentLeftValues = car?.style.left;
        if (previousLeftValues === currentLeftValues && currentLeftValues !== '') {
            currentLeftValues = '';
            previousLeftValues = '';
            clearInterval(interval);
            await callback();
        }
    }, 300);
};

export const removeAttributes = () => {
    raceBtn.removeAttribute('disabled');
    resetBtn.removeAttribute('disabled');
};

const setAttributes = () => {
    raceBtn.setAttribute('disabled', '');
    resetBtn.setAttribute('disabled', '');
};

const removeAttributeDisableFromBtnStop = (allStopRaceBtn: NodeList) => {
    allStopRaceBtn.forEach((el: Node) => {
        if (el instanceof HTMLButtonElement) {
            el.removeAttribute('disabled');
        }
    });
};

export const startRace = () => {
    const allStartRaceBtn = document.querySelectorAll('.cars-view__start-btn');
    const allStopRaceBtn = document.querySelectorAll('.cars-view__stop-btn');
    const cars: Array<HTMLDivElement | null> = [];
    const intervalIds: NodeJS.Timeout[] = [];
    const previousLeftValues: string[] = [];
    const currentLeftValues: string[] = [];
    let stoppedIntervalsCount = 0;
    setAttributes();
    removeAttributeDisableFromBtnStop(allStopRaceBtn);
    allStartRaceBtn.forEach((el: Element) => {
        const buttonElement = el as HTMLButtonElement;
        const carElement = returnCarElement(el);
        checkAnimationDuration(el as HTMLButtonElement);
        if (carElement) {
            buttonElement.click();
            cars.push(carElement);
        }
    });
    function checkIfAllIntervalsStopped() {
        stoppedIntervalsCount++;
        if (stoppedIntervalsCount === cars.length) removeAttributes();
    }
    cars.forEach((carElement, index) => {
        intervalIds[index] = setInterval(() => {
            if (!intervalIds[index]) {
                previousLeftValues[index] = '';
                currentLeftValues[index] = <string>carElement?.style.left;
            } else {
                previousLeftValues[index] = currentLeftValues[index];
                currentLeftValues[index] = <string>carElement?.style.left;
                if (previousLeftValues[index] === currentLeftValues[index] && currentLeftValues[index] !== '') {
                    clearInterval(intervalIds[index]);
                    checkIfAllIntervalsStopped();
                }
            }
        }, 400);
    });
};
