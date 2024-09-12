import { Clock } from "../Model/Clock";

export class ClockView {

    private clockElement: HTMLDivElement;
    private model: Clock;
    private isLightOn: boolean = false;

    constructor(model: Clock, clockElement: HTMLDivElement) {
        this.model = model;
        this.clockElement = clockElement;
        this.model.onChange(() => this.update());
        this.update();
    }
    public getisLightOn(): boolean{
        return this.isLightOn;
    }

    public update() {
        const { hours, minutes, seconds, ampm } = this.model.getTime();
        this.clockElement.innerHTML = `
            <span class="hours">${hours}</span>:
            <span class="minutes">${minutes}</span>:
            <span class="seconds">${seconds}</span>
            ${ampm ? `<span class="ampm">${ampm}</span>` : ''}`;
        this.updateBlinking();
    }


    private updateBlinking() {
        const editable = this.model.getEditable();
        const hoursElement = this.clockElement.querySelector('.hours') as HTMLElement;
        const minutesElement = this.clockElement.querySelector('.minutes') as HTMLElement;

        if (editable === 'hours') {
            hoursElement.classList.add('blinking');
            minutesElement.classList.remove('blinking');
        } else if (editable === 'minutes') {
            hoursElement.classList.remove('blinking');
            minutesElement.classList.add('blinking');
        } else {
            hoursElement.classList.remove('blinking');
            minutesElement.classList.remove('blinking');
        }
    }

    public toggleLight() {
        this.isLightOn = !this.isLightOn;
        if (this.isLightOn === true){
            alert('The light is turn ON!');
        }else{
            alert('The light is turn OFF!');
        }
        this.clockElement.style.backgroundColor = this.isLightOn ? '#FBE106' : '#FFFFFF';
    }
}
