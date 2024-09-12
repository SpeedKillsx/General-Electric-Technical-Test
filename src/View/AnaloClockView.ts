import { Clock } from "../Model/Clock";
import { Matrix3x3 } from "../../Matrix3x3";

export class AnalogClockView {
    private clockElement: HTMLDivElement;
    private model: Clock;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(model: Clock, clockElement: HTMLDivElement) {
        this.model = model;
        this.clockElement = clockElement;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 200;
        this.canvas.height = 200;
        this.context = this.canvas.getContext('2d')!;
        this.clockElement.appendChild(this.canvas);
        this.model.onChange(() => this.update());
        this.update();
    }

    public update() {
        const { hours, minutes, seconds } = this.model.getTime();
        this.context.clearRect(0, 0, 200, 200);
        this.drawClockFace();
        this.drawClockHand(parseInt(hours) * 30, 50, 6); // Hour hand
        this.drawClockHand(parseInt(minutes) * 6, 70, 4); // Minute hand
        this.drawClockHand(parseInt(seconds) * 6, 90, 2); // Second hand
    }

    private drawClockFace() {
        this.context.beginPath();
        this.context.arc(100, 100, 95, 0, 2 * Math.PI);
        this.context.stroke();
    }

    private drawClockHand(angle: number, length: number, width: number) {
        const rotationMatrix = Matrix3x3.rotation((Math.PI / 180) * angle);
        const origin = { x: 100, y: 100 };
        const handEnd = rotationMatrix.transformPoint({ x: 100, y: 100 - length });

        this.context.beginPath();
        this.context.moveTo(origin.x, origin.y);
        this.context.lineTo(handEnd.x, handEnd.y);
        this.context.lineWidth = width;
        this.context.stroke();
    }
}
