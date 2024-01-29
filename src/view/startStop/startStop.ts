import { getCarIdFromURL } from '../../helpers/getCarIdFromURL/getCarIdFromURL';
import { EngineResponse } from '../../types/interfaces';
import { createWinner } from '../../model/createWinners/createWinners';
import { getWinnerById } from '../../model/getWinner/getWinner';
import { removeAttributes } from '../../helpers/startRace/startRace';

export async function startOrStopEngine(carId: number, status: 'drive' | 'stopped' | 'started'): Promise<EngineResponse | null> {
    const url = `http://127.0.0.1:3000/engine?id=${carId}&status=${status}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return await response.json();
        }
        if (response.status) {
            const carId = getCarIdFromURL(response.url);
            return await startOrStopEngine(Number(carId), 'stopped');
        }
    } catch (error) {
        // console.log('An error occurred:', error);
    }

    return null;
}

export const winnersArray: { id: number; wins: number; time: number }[] = [];

export const checkTimeRace = async (end: number, start: number, id: number) => {
    await startOrStopEngine(id, 'stopped');
    const animationDuration = (end - start) / 1000;
    const winnerData = {
        id: id,
        wins: 1,
        time: animationDuration,
    };

    if (await getWinnerById(id)) {
        const winner = await getWinnerById(id);
        if (winner) {
            winnerData.wins = winner.wins + 1;
            await createWinner(winnerData);
            winnersArray.push(winnerData);
        }
    } else {
        await createWinner(winnerData);
    }

    return;
};

export async function animateCarMovement(
    velocity: number,
    distance: number,
    carId: number,
    carsViewItem?: Element | null,
    carsViewCarLogo?: Element | null,
    engineStatus?: 'drive' | 'stopped' | 'started',
    buttonB?: HTMLButtonElement,
    buttonA?: HTMLButtonElement
): Promise<void> {
    if (!(carsViewItem instanceof HTMLDivElement) || !(carsViewCarLogo instanceof HTMLDivElement)) return;
    const carWidth = 100;
    const containerWidth = carsViewItem.clientWidth;
    const totalDistance = distance + carWidth;
    const distanceInVw = (totalDistance / containerWidth) * 100;
    const totalTime = (totalDistance / velocity) * 600;
    carsViewCarLogo.style.left = '14vw';
    let animationShouldStop = false;
    const startTime = Date.now();
    const stopAnimation = () => ((animationShouldStop = true), buttonA?.removeAttribute('disabled'), removeAttributes());
    if (buttonB) buttonB.addEventListener('click', stopAnimation);
    const animateStep = async () => {
        if (animationShouldStop) return;
        const elapsedTime = Date.now() - startTime;
        const newPositionVw = (elapsedTime / totalTime) * distanceInVw + 14;
        if (newPositionVw >= 80) {
            if (animationShouldStop) return;
            animationShouldStop = true;
            await checkTimeRace(Date.now(), startTime, carId);
            return;
        }
        carsViewCarLogo.style.left = `${newPositionVw}vw`;
        requestAnimationFrame(animateStep);
    };
    requestAnimationFrame(animateStep);
    if (engineStatus) {
        const statusResponse = await startOrStopEngine(carId, engineStatus);
        animationShouldStop = statusResponse !== null && statusResponse.velocity === 0 && statusResponse.distance === 500000;
    }
}
