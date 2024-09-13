import { TimeFormatStrategy } from './TimeFormatStrategy';

export class TwelveHourFormatStrategy implements TimeFormatStrategy {
    formatTime(hours: number, minutes: number, seconds: number): { hours: string, minutes: string, seconds: string, ampm: string } {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
            ampm
        };
    }
}
