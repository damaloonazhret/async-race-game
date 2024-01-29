import { WinnerData } from '../../types/interfaces';

export async function getWinnerById(id: number): Promise<WinnerData | null> {
    const url = `http://127.0.0.1:3000/winners/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            if ('id' in data) {
                return data as WinnerData;
            }
        }

        return null;
    } catch (error) {
        return null;
    }
}
