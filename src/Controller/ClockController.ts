import { Clock } from '../Model/Clock';
import { ClockView } from '../View/ClockView';
import { AnalogClockView } from '../View/AnaloClockView';
import { ClockEnum } from '../utils/ClockEnum';

export class ClockController {
    private model: Clock;
    private view: ClockView | AnalogClockView;
    private modeState: number = 0;
    private static isInitialized: boolean = false;

    constructor(model: Clock, view: ClockView | AnalogClockView) {
        this.model = model;
        this.view = view;
        this.setupEventListeners();
    }

    public static init() {
        // S'assurer que l'initialisation n'est effectuée qu'une seule fois
        if (ClockController.isInitialized) {
            return;
        }

        ClockController.setupButtons();
        ClockController.isInitialized = true;
    }

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
            resetButton.addEventListener('click', () => this.handleResetButton());
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

        // Obtenir le décalage horaire de l'utilisateur
        const timezoneOffset = parseInt(prompt("Insert your time zone (0 for GMT; 1 for GMT+1, -5 for GMT-5)") || '0');
        const isAnalog = confirm("Would you like to add an analog clock?");

        const clock = new Clock(timezoneOffset);

        if (isAnalog) {
            const analogClockView = new AnalogClockView(clock, clockElement); // Créer une horloge analogique
            new ClockController(clock, analogClockView); // Passer l'horloge analogique au contrôleur
        } else {
            const clockView = new ClockView(clock, clockElement); // Créer une horloge numérique
            new ClockController(clock, clockView); // Passer l'horloge numérique au contrôleur
        }

        // Créer le bouton de suppression
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.classList.add('remove-button');
        clockWrapper.appendChild(removeButton);

        // Ajouter l'horloge au conteneur
        clocksContainer.appendChild(clockWrapper);

        // Ajouter un événement pour supprimer l'horloge
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
        // Vérifier si la vue est une horloge numérique avant de basculer la lumière
        if (this.view instanceof ClockView) {
            this.view.toggleLight();
            
        }
    }

    private handleFormatButton() {
        this.model.toggleFormat();
        alert('The time is shown in AM/PM format!!');
    }

    private handleResetButton() {
        // Check if the clock is digital
        this.model.resetTime();
        if (this.view instanceof ClockView){
            if (this.view.getisLightOn() === true){
                this.view.toggleLight();
            } 
            // Check if the model is in am/pm format
            if (this.model.getIs24HourFormat() === false){
                
                this.model.toggleFormat();
            }
        }
    }
}
