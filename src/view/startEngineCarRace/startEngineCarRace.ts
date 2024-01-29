import { animateCarMovement, startOrStopEngine } from '../startStop/startStop';

export const startEngineCarRace = async (e: Event) => {
    const target = e.target;
    let carsViewItem;
    let carsViewCarLogo;
    let carsViewStop;
    let carsViewStart;
    let carId: number;
    if (target instanceof Element) {
        carsViewItem = target.closest('.cars-view__item');
        carsViewCarLogo = carsViewItem?.querySelector('.cars-view__car-logo');
        carsViewStop = carsViewItem?.querySelector('#buttonB') as HTMLButtonElement;
        carsViewStart = carsViewItem?.querySelector('.cars-view__start-btn') as HTMLButtonElement;
        carId = Number(carsViewItem?.id);
    } else {
        return;
    }

    try {
        const startedResponse = await startOrStopEngine(Number(carId), 'started');
        if (startedResponse && startedResponse.velocity && startedResponse.distance) {
            await animateCarMovement(
                startedResponse.velocity,
                startedResponse.distance,
                carId,
                carsViewItem,
                carsViewCarLogo,
                'drive',
                carsViewStop,
                carsViewStart
            );
        }
    } catch (e) {
        // console.log(e);
    }
};
