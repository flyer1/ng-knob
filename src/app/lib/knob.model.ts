import { mergeDeep } from '../demo/common.helper';
import { v } from '@angular/core/src/render3';

export class KnobModel {
    skin: {
        type: string,
        width: number,
        color: string,
        spaceWidth: number
    };
    animate: {
        enabled: boolean,
        duration: number,
        ease: string
    };
    size: number;
    startAngle: number;
    endAngle: number;
    unit: string;
    displayInput: boolean;
    inputFormatter: Function; // function (v) { return v; };
    readOnly: boolean;
    trackWidth: number;
    barWidth: number;
    trackColor: string;
    barColor: string;
    prevBarColor: string;
    textColor: string;
    barCap: number;
    trackCap: number;
    fontSize: string;
    subText: {
        enabled: boolean,
        text: string,
        color: string,
        font: string
    };
    bgColor: string;
    bgFull: boolean;
    scale: {
        enabled: boolean,
        type: string,
        color: string,
        width: number,
        quantity: number,
        height: number,
        spaceWidth: number
    };
    step: number;
    displayPrevious: boolean;
    min: number;
    max: number;
    dynamicOptions: boolean;

    constructor(options: any) {
        const defaultOptions = this.getDefaults();
        Object.assign(this, mergeDeep(defaultOptions, options));
    }

    private getDefaults() {
        return {
            skin: {
                type: 'simple',
                width: 10,
                color: 'rgba(255,0,0,.5)',
                spaceWidth: 5
            },
            animate: {
                enabled: true,
                duration: 1000,
                ease: 'bounce'
            },
            size: 200,
            startAngle: 0,
            endAngle: 360,
            unit: '',
            displayInput: true,
            inputFormatter: (val: any) => val,
            readOnly: false,
            trackWidth: 50,
            barWidth: 50,
            trackColor: 'rgba(0,0,0,0)',
            barColor: 'rgba(255,0,0,.5)',
            prevBarColor: 'rgba(0,0,0,0)',
            textColor: '#222',
            barCap: 0,
            trackCap: 0,
            fontSize: 'auto',
            subText: {
                enabled: false,
                text: '',
                color: 'gray',
                font: 'auto'
            },
            bgColor: '',
            bgFull: false,
            scale: {
                enabled: false,
                type: 'lines',
                color: 'gray',
                width: 4,
                quantity: 20,
                height: 10,
                spaceWidth: 15
            },
            step: 1,
            displayPrevious: false,
            min: 0,
            max: 100,
            dynamicOptions: false
        };
    }
}
