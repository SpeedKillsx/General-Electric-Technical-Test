export interface TimeFormatStrategy {
    formatTime(hours: number, minutes: number, seconds: number): { hours: string, minutes: string, seconds: string, ampm: string };
}
