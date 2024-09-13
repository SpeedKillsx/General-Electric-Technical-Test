import { ClockDisplayStrategy } from './ClockDisplayStrategy';

export class DigitalClockDisplayStrategy implements ClockDisplayStrategy {
    display(clockElement: HTMLDivElement, time: { hours: string, minutes: string, seconds: string, ampm: string }): void {
        clockElement.innerHTML = `
            <span class="hours">${time.hours}</span>:
            <span class="minutes">${time.minutes}</span>:
            <span class="seconds">${time.seconds}</span>
            ${time.ampm ? `<span class="ampm">${time.ampm}</span>` : ''}
        `;
    }
}
