let colorPicker: HTMLDivElement | null = null;

const createGradientBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgb(255, 0, 0)');
    gradient.addColorStop(0.17, 'rgb(255, 255, 0)');
    gradient.addColorStop(0.34, 'rgb(0, 255, 0)');
    gradient.addColorStop(0.51, 'rgb(0, 255, 255)');
    gradient.addColorStop(0.68, 'rgb(0, 0, 255)');
    gradient.addColorStop(0.85, 'rgb(255, 0, 255)');
    gradient.addColorStop(1, 'rgb(255, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

export function openColorPicker(element: HTMLButtonElement) {
    if (colorPicker) {
        return;
    }

    colorPicker = document.createElement('div');
    colorPicker.className = 'color-picker';

    const canvas = document.createElement('canvas');
    const canvasWidth = window.innerWidth * 0.2;
    const canvasHeight = window.innerWidth * 0.2;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        createGradientBackground(ctx, canvas);
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const imageData = ctx?.getImageData(x, y, 1, 1);
        if (imageData) {
            const [r, g, b] = imageData.data;
            element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }

        colorPicker?.remove();
        colorPicker = null;
    });

    colorPicker.appendChild(canvas);
    document.body.appendChild(colorPicker);
}
