import { TimeFormatStrategy } from '../strategy/TimeFormatStrategy';
import { ClockDisplayStrategy } from '../strategy/ClockDisplayStrategy'; // Interface for display strategies
import { ClockEnum } from '../utils/ClockEnum';
import { TwentyFourHourFormatStrategy } from '../strategy/TwentyFourHourFormatStrategy';
import { TwelveHourFormatStrategy } from '../strategy/TwelveHourFormatStrategy';

export class Clock {
    private hours: number;
    private minutes: number;
    private seconds: number;
    private timezoneOffset: number;
    private editable: ClockEnum = ClockEnum.none;
    private observer: () => void;
    private timeFormatStrategy: TimeFormatStrategy;
    private clockDisplayStrategy: ClockDisplayStrategy;

    constructor(timezoneOffset = 0, timeFormatStrategy: TimeFormatStrategy, clockDisplayStrategy: ClockDisplayStrategy) {
        const now = new Date();
        this.timezoneOffset = timezoneOffset;
        this.timeFormatStrategy = timeFormatStrategy;
        this.clockDisplayStrategy = clockDisplayStrategy;
        this.hours = (now.getHours() + timezoneOffset) % 24;
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        this.startClock();
    }

    /**
     * Description : Start the timer
     * @returns {any}
     */
    private startClock() {
        setInterval(() => {
            this.seconds++;
            if (this.seconds >= 60) {
                this.seconds = 0;
                this.minutes++;
                if (this.minutes >= 60) {
                    this.minutes = 0;
                    this.hours = (this.hours + 1) % 24;
                }
            }
            this.notify();
        }, 1000);
    }
   // Getters
    public getTime() {
        return this.timeFormatStrategy.formatTime(this.hours, this.minutes, this.seconds);
    }

    public getEditable(): ClockEnum {
        return this.editable;
    }

    public getTimeFormatStrategy():TimeFormatStrategy{
        return this.timeFormatStrategy;
    }
    // Setter
    public setEditable(part: ClockEnum) {
        this.editable = part;
        this.notify();
    }

    

    /**
     * Description : Increase the element (hours or minuties) in case it was selectioned as the modifiable ellement
     * @returns {any}
     */
    public increaseTime() {
        if (this.editable === ClockEnum.Hours) { // Check the valeu of the editable
            this.hours = (this.hours + 1) % 24;
        } else if (this.editable === ClockEnum.Minutes) {
            this.minutes = (this.minutes + 1) % 60;
            if (this.minutes === 0) {
                this.hours = (this.hours + 1) % 24;
            }
        }
        this.notify();
    }
    // Function to change Format
    public toggleFormat() {
        this.timeFormatStrategy = this.timeFormatStrategy instanceof TwentyFourHourFormatStrategy
            ? new TwelveHourFormatStrategy()
            : new TwentyFourHourFormatStrategy();
        this.notify();
    }

    public resetTime() {
        const now = new Date();
        this.hours = (now.getHours() + this.timezoneOffset) % 24;
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        this.notify();
    }

    public onChange(callback: () => void) {
        this.observer = callback;
    }

    private notify() {
        if (this.observer) {
            this.observer();
        }
    }
}
