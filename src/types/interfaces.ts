export interface EngineResponse {
    velocity: number;
    distance: number;
    success?: boolean;
    status: 'started' | 'stopped' | 'drive';
}

export interface WinnerData {
    id: number;
    wins: number;
    time: number;
}

export interface ElementInfo {
    selector: string;
    text: string;
}

export interface car {
    name: string;
    color: string;
    id?: number;
}
