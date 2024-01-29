import { WinnerData } from '../../types/interfaces';
import { updateWinner } from '../updateWinner/updateWinner';

export async function createWinner(newWinnerData: WinnerData): Promise<WinnerData | null> {
    const url = `http://127.0.0.1:3000/winners`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWinnerData),
        });

        if (response.ok) {
            return response.json();
        } else {
            await updateWinner(newWinnerData.id, newWinnerData);
            // console.error('An error occurred:');
            return null;
        }
    } catch (error) {
        // console.error('An error occurred:', error);
        return null;
    }
}
