import { Clock } from './Model/Clock';
import { ClockView } from './View/ClockView';
import { AnalogClockView } from './View/AnaloClockView';
import { ClockController } from './Controller/ClockController';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the clock
    ClockController.init();
});
