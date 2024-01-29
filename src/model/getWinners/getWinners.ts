import { WinnerData } from '../../types/interfaces';

export async function getWinners(
    _page?: number,
    _limit?: number,
    _sort?: 'id' | 'wins' | 'time',
    _order?: 'ASC' | 'DESC'
): Promise<{ data: WinnerData[]; totalCount?: number }> {
    const queryParams: string[] = [];

    if (_page !== undefined) {
        queryParams.push(`_page=${_page}`);
    }
    if (_limit !== undefined) {
        queryParams.push(`_limit=${_limit}`);
    }
    if (_sort !== undefined) {
        queryParams.push(`_sort=${_sort}`);
    }
    if (_order !== undefined) {
        queryParams.push(`_order=${_order}`);
    }
    const url = `http://127.0.0.1:3000/winners${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const totalCountHeader = response.headers.get('X-Total-Count');
            const totalCount = totalCountHeader ? parseInt(totalCountHeader) : undefined;
            const data = await response.json();

            return { data, totalCount };
        } else {
            // console.error('Error:', response.status, response.statusText);
            return { data: [] };
        }
    } catch (error) {
        // console.error('An error occurred:', error);
        return { data: [] };
    }
}
