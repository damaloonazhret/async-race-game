import { WinnerData } from '../../types/interfaces';

export async function updateWinner(id: number, updatedWinnerData: Partial<WinnerData>): Promise<WinnerData | null> {
    const url = `http://127.0.0.1:3000/winners/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedWinnerData),
        });

        if (response.ok) {
            return (await response.json()) as Promise<WinnerData>;
        } else if (response.status === 404) {
            return null;
        } else {
            // console.error('Error:', response.status, response.statusText);
            return null;
        }
    } catch (error) {
        // console.error('An error occurred:', error);
        return null;
    }
}
