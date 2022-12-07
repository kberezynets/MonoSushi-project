export interface IActionRequest {
    date: number,
    name: string,
    title: string,
    description: string;
    imagePath: string;
}

export interface IActionResponse extends IActionRequest {
    id: number;
}