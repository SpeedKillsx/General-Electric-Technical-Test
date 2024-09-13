import { TimeFormatStrategy } from './TimeFormatStrategy';

export class TwentyFourHourFormatStrategy implements TimeFormatStrategy {
    formatTime(hours: number, minutes: number, seconds: number): { hours: string, minutes: string, seconds: string, ampm: string } {
        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
            ampm: ''
        };
    }
}
