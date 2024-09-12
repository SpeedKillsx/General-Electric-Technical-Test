import {ClockEnum} from '../utils/ClockEnum';
export class Clock {
    private hours: number;
    private minutes: number;
    private seconds: number;
    private timezoneOffset: number;
    private editable: ClockEnum  = ClockEnum.none;
    private observer: () => void;
    private is24HourFormat: boolean = true;
    constructor(timezoneOffset = 0) {
        const now = new Date();
        this.timezoneOffset = timezoneOffset;
        this.hours = (now.getHours() + timezoneOffset) % 24;
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        this.startClock();
    }

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
    public getTime() {
        let displayHours = this.hours;
        let ampm = '';
        
        if (!this.is24HourFormat) {
            ampm = displayHours >= 12 ? 'PM' : 'AM';
            displayHours = displayHours % 12 || 12; // Convert to 12-hour format
        }

        return {
            hours: displayHours.toString().padStart(2, '0'),
            minutes: this.minutes.toString().padStart(2, '0'),
            seconds: this.seconds.toString().padStart(2, '0'),
            ampm
        };
    }

    public getEditable(): ClockEnum {
        return this.editable;
    }

    public setEditable(part: ClockEnum) {
        this.editable = part;
        this.notify(); 
    }

    public getIs24HourFormat() : boolean
    {
        return this.is24HourFormat;
    }
    public setIs24HourFormat() : void
    {
        this.is24HourFormat = !this.is24HourFormat;
    }


    public increaseTime() {
        if (this.editable === ClockEnum.Hours) {
            this.hours = (this.hours + 1) % 24;
        } else if (this.editable === ClockEnum.Minutes) {
            this.minutes = (this.minutes + 1) % 60;
            if (this.minutes === 0) {
                this.hours = (this.hours + 1) % 24;
            }
        }
        this.notify();
    }

    public onChange(callback: () => void) {
        this.observer = callback;
    }

    
    public toggleFormat() {
        this.is24HourFormat = !this.is24HourFormat;
        this.notify();
    }

    public resetTime() {
        const now = new Date();
        this.hours = (now.getHours() + this.timezoneOffset) % 24;
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        this.notify();
    }
    private notify() {
        if (this.observer) {
            this.observer();
        }
    }
}
