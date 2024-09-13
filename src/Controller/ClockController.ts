import { Clock } from '../Model/Clock';
import { ClockView } from '../View/ClockView';
import { AnalogClockView } from '../View/AnaloClockView';
import { ClockEnum } from '../utils/ClockEnum';
import { TwentyFourHourFormatStrategy } from '../strategy/TwentyFourHourFormatStrategy';
import { TwelveHourFormatStrategy } from '../strategy/TwelveHourFormatStrategy';
import { DigitalClockDisplayStrategy } from '../strategy/DigitalClockDisplayStrategy';
import { AnalogClockDisplayStrategy } from '../strategy/AnalogClockDisplayStrategy';

export class ClockController {
    private model: Clock;
    private view: ClockView | AnalogClockView;
    private modeState: number = 0;
    private static isInitialized: boolean = false;

    /**
     * Description : Instanciate a Controller
     * @param {Clock} model:Clock
     * @param {ClcokView} view:ClockView|AnalogClockView
     * @returns {void}
     */
    constructor(model: Clock, view: ClockView | AnalogClockView) {
        this.model = model;
        this.view = view;
        this.setupEventListeners();
    }
    /*
        Initialize all the colock:
        * Setup Buttons 
        * Use a boolean variable to check if there was an initialization or not.
     */
    public static init() {
        if (ClockController.isInitialized) {
            return;
        }
        ClockController.setupButtons();
        ClockController.isInitialized = true;
    }
    /**
     * Setup the differnet events from the buttons
     * Check if a button was clicked an try to find it
     */
    private setupEventListeners() {
        const modeButton = document.getElementById('mode') as HTMLButtonElement;
        const increaseButton = document.getElementById('increase') as HTMLButtonElement;
        const lightButton = document.getElementById('light') as HTMLButtonElement;
        const formatButton = document.getElementById('format') as HTMLButtonElement;
        const resetButton = document.getElementById('reset') as HTMLButtonElement;

        if (modeButton) {
            modeButton.addEventListener('click', () => this.handleModeButton());
        }

        if (increaseButton) {
            increaseButton.addEventListener('click', () => this.handleIncreaseButton());
        }

        if (lightButton) {
            lightButton.addEventListener('click', () => this.handleLightButton());
        }

        if (formatButton) {
            formatButton.addEventListener('click', () => this.handleFormatButton());
        }

        if (resetButton) {
            resetButton.addEventListener('click', () =>this.handleResetButton());
        }
    }

    private static setupButtons() {
        const addButton = document.getElementById('add') as HTMLButtonElement;
        if (addButton) {
            addButton.addEventListener('click', () => this.handleAddButtonClick());
        }
    }

    private static handleAddButtonClick() {
        console.log('Adding a new clock');
        this.createClock();
    }
    /* */
    /**
     * Create a Clock , the code create a div container to visualize the clock using the ClockView or AnalogView class
     * @returns {any}
     */
    private static createClock() {
        const clocksContainer = document.getElementById('clocks') as HTMLDivElement;

        if (!clocksContainer) {
            console.error('Clocks container not found');
            return;
        }

        const clockWrapper = document.createElement('div');
        clockWrapper.classList.add('clock-wrapper');

        const clockElement = document.createElement('div');
        clockElement.classList.add('clock');
        clockWrapper.appendChild(clockElement);

        const timezoneOffset = parseInt(prompt("Insert your time zone (0 for GMT; 1 for GMT+1, -5 for GMT-5)") || '0');
        const isAnalog = confirm("Would you like to add an analog clock?");
        
        const timeFormatStrategy = new TwentyFourHourFormatStrategy();
        const clockDisplayStrategy = isAnalog 
            ? new AnalogClockDisplayStrategy()
            : new DigitalClockDisplayStrategy();

        const clock = new Clock(timezoneOffset, timeFormatStrategy, clockDisplayStrategy);

        if (isAnalog) {
            const analogClockView = new AnalogClockView(clock, clockElement);
            new ClockController(clock, analogClockView);
        } else {
            const clockView = new ClockView(clock, clockElement);
            new ClockController(clock, clockView);
        }

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.classList.add('remove-button');
        clockWrapper.appendChild(removeButton);

        clocksContainer.appendChild(clockWrapper);

        removeButton.addEventListener('click', () => {
            clockWrapper.remove();
        });
    }

    private handleModeButton() {
        this.modeState = (this.modeState + 1) % 3;
        if (this.modeState === 0) {
            this.model.setEditable(ClockEnum.none);
        } else if (this.modeState === 1) {
            this.model.setEditable(ClockEnum.Hours);
        } else if (this.modeState === 2) {
            this.model.setEditable(ClockEnum.Minutes);
        }
    }

    private handleIncreaseButton() {
        this.model.increaseTime();
    }

    private handleLightButton() {
        if (this.view instanceof ClockView) {
            this.view.toggleLight();
        }
    }

    private handleFormatButton() {
        this.model.toggleFormat(); // D'abord, change le format
    
        const format = this.model.getTimeFormatStrategy() instanceof TwelveHourFormatStrategy 
            ? "AM/PM" 
            : "24-hour"; // Détermine quel est le format courant
    
        this.view.update(); // Met à jour l'affichage
    }
    
    /*
     */
    private handleResetButton() {
        this.model.resetTime();
        if (this.view instanceof ClockView) {
            if (this.view.getisLightOn()) {
                this.view.toggleLight();
               
            }
            
                
            
        }
        if(this.model.getTimeFormatStrategy() instanceof TwelveHourFormatStrategy)
            this.model.toggleFormat();
            this.view.update();
    }
}
