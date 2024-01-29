export async function deleteWinner(id: number): Promise<NonNullable<unknown> | null> {
    const url = `http://127.0.0.1:3000/winners/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (response.ok) {
            return {};
        } else if (response.status === 404) {
            return {};
        } else {
            // console.error('Error:', response.status, response.statusText);
            return null;
        }
    } catch (error) {
        // console.error('An error occurred:', error);
        return null;
    }
}
