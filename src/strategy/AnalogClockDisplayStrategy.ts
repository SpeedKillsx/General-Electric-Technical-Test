import { ClockDisplayStrategy } from './ClockDisplayStrategy';

export class AnalogClockDisplayStrategy implements ClockDisplayStrategy {
    display(clockElement: HTMLDivElement, time: { hours: string, minutes: string, seconds: string, ampm: string }): void {
        console.log('Displaying an analog clock');
    }
}
