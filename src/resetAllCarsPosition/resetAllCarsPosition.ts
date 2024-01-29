import { returnCarElement } from '../helpers/returnCarElement';
export const resetAllCarsPosition = () => {
    const allBtnStopped = document.querySelectorAll('.cars-view__stop-btn');
    const allBtnStart = document.querySelectorAll('.cars-view__start-btn');
    allBtnStopped.forEach((el) => {
        const carLogoElement = returnCarElement(el);
        if (carLogoElement) {
            carLogoElement.style.removeProperty('left');
            el.setAttribute('disabled', '');
        }
    });
    allBtnStart.forEach((el) => {
        const startBtn = returnCarElement(el);
        if (startBtn) {
            startBtn.removeAttribute('disabled');
        }
    });
};
