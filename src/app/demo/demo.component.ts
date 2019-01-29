import { Component, OnInit } from '@angular/core';

import { KnobModel } from '../lib/knob.model';
import { DemoModel } from './demo.model';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

    data: DemoModel[];

    ngOnInit() {
        this.data = [];

        ////////////// #1 - Skin Tron + scale //////////////////
        let config: any = {
            skin: {
                type: 'tron'
            },
            size: 300,
            unit: '%',
            barWidth: 40,
            trackColor: 'rgba(255,0,0,.1)',
            prevBarColor: 'rgba(0,0,0,.2)',
            subText: {
                enabled: true,
                text: 'CPU used'
            },
            scale: {
                enabled: true,
                type: 'lines',
                width: 3
            },
            step: 5,
            displayPrevious: true
        };

        this.data.push({
            name: 'Skin Tron + scale',
            value: 65,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #2 - Skin Tron //////////////////
        config = {
            skin: {
                type: 'tron',
                width: 5,
                color: '#494B52',
                spaceWidth: 3
            },
            barColor: '#494B52',
            trackWidth: 30,
            barWidth: 30,
            textColor: '#494B52',
            step: 0.1,
            max: 10
        };
        this.data.push({
            name: 'Skin Tron',
            value: 5.4,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #3 - Dots scale + Dynamic options //////////////////
        config = {
            scale: {
                enabled: true,
                type: 'dots',
                color: 'rgba(255,0,0,.2)',
                width: 2,
                quantity: 50,
                spaceWidth: 10
            },
            trackWidth: 25,
            barWidth: 40,
            barColor: 'rgba(18, 7, 101, 0.5)',
            trackColor: 'rgb(152, 140, 224)',
            dynamicOptions: true
        };
        this.data.push({
            name: 'Dots scale + Dynamic options',
            value: 65,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #4 - With subtext, unit and read only //////////////////
        config = {
            unit: '%',
            readOnly: true,
            subText: {
                enabled: true,
                text: 'CPU used',
                color: 'gray',
                font: 'auto'
            },
            trackWidth: 40,
            barWidth: 25,
            trackColor: '#656D7F',
            barColor: '#2CC185'
        };
        this.data.push({
            name: 'With subtext, unit and read only',
            value: 65,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #5 - Lines scale and step //////////////////
        config = {
            scale: {
                enabled: true,
                type: 'lines',
                color: 'gray',
                width: 1,
                quantity: 20,
                height: 8
            },
            trackWidth: 30,
            barWidth: 30,
            step: 5,
            trackColor: 'rgba(52,152,219,.1)',
            barColor: 'rgba(52,152,219,.5)'
        };
        this.data.push({
            name: 'Lines scale and step',
            value: 85,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #6 - Animate and disabled input //////////////////
        config = {
            displayInput: false,
            animate: {
                enabled: true,
                duration: 2000,
                ease: 'linear'
            },
            trackColor: 'rgba(33,33,33,.2)',
            barColor: 'rgba(255,221,51,1)'
        };
        this.data.push({
            name: 'Animate and disabled input',
            value: 65,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #7 - Bar cap and display previous value //////////////////
        config = {
            displayPrevious: true,
            barCap: 25,
            trackWidth: 30,
            barWidth: 20,
            trackColor: 'rgba(255,0,0,.1)',
            prevBarColor: 'rgba(0,0,0,.2)',
            textColor: 'rgba(255,0,0,.6)'
        };
        this.data.push({
            name: 'Bar cap and display previous value',
            value: 70,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #8 - Min, max value //////////////////
        config = {
            min: -1000,
            max: 1000,
            barColor: '#5BC01E',
            trackColor: '#212121',
            trackWidth: 15,
            barWidth: 30
        };
        this.data.push({
            name: 'Min, max value',
            value: 350,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #9 - Background color //////////////////
        config = {
            bgColor: '#2C3E50',
            trackWidth: 50,
            barWidth: 30,
            barColor: '#FFAE1A',
            textColor: '#eee'
        };
        this.data.push({
            name: 'Background color',
            value: 65,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #10 - Default Knob //////////////////
        config = {};
        this.data.push({
            name: 'Default Knob',
            value: 65,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #11 - Angles //////////////////
        config = {
            startAngle: 30,
            endAngle: 330,
            unit: 'MB',
            trackColor: 'rgba(162,121,143,1)',
            barColor: 'rgba(102,0,204,.5)',
            trackWidth: 15,
            barWidth: 15,
            subText: {
                enabled: true,
                text: 'RAM used'
            },
            max: 1024
        };
        this.data.push({
            name: 'Angles',
            value: 256,
            options: new KnobModel(config),
            config: config
        });

        ////////////// #12 - Angles + Tron + Scale //////////////////
        config = {
            startAngle: 90,
            endAngle: 180,
            displayPrevious: true,
            prevBarColor: 'rgba(255,0,0,.2)',
            trackColor: 'rgba(255,0,0,.2)',
            skin: {
                type: 'tron'
            },
            scale: {
                enabled: true,
                type: 'lines',
                width: 2,
                quantity: 5
            }
        };
        this.data.push({
            name: 'Angles + Tron + Scale',
            value: 65,
            options: new KnobModel(config),
            config: config
        });

        return;
    }
}
