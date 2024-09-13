export interface ClockDisplayStrategy {
    display(clockElement: HTMLDivElement, time: { hours: string, minutes: string, seconds: string, ampm: string }): void;
}
