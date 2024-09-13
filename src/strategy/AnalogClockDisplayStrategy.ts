import { ClockDisplayStrategy } from './ClockDisplayStrategy';

export class AnalogClockDisplayStrategy implements ClockDisplayStrategy {
    display(clockElement: HTMLDivElement, time: { hours: string, minutes: string, seconds: string, ampm: string }): void {
        // Implementation for rendering an analog clock using canvas or DOM manipulation
        console.log('Displaying an analog clock');
    }
}
