export const returnCarElement = (target: EventTarget | null): HTMLDivElement | null => {
    if (!target || !(target instanceof HTMLElement)) {
        return null;
    }

    const parentElement = target.parentNode as HTMLDivElement;
    return parentElement.querySelector('.cars-view__car-logo') as HTMLDivElement;
};
