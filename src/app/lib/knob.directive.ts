import { AfterViewInit, Input, ElementRef, Directive } from '@angular/core';
import * as d3 from 'd3';

import { KnobModel } from './knob.model';

@Directive({
    selector: '[appKnob]'
})
export class KnobComponentDirective implements AfterViewInit {

    private _value = 0;
    private _options: KnobModel;

    inDrag = false;
    bgArc: d3.Arc<any, d3.DefaultArcObject>;
    hoopArc: d3.Arc<any, d3.DefaultArcObject>;
    trackArc: d3.Arc<any, d3.DefaultArcObject>;
    changeArc: d3.Arc<any, d3.DefaultArcObject>;
    valueArc: d3.Arc<any, d3.DefaultArcObject>;
    interactArc: d3.Arc<any, d3.DefaultArcObject>;
    changeElem: any; // TODO: what type is this?
    valueElem: any; // TODO: what type is this?

    @Input() get options(): KnobModel { return this._options; }
    set options(value: KnobModel) {
        this._options = value;
        this.draw();
    }

    @Input() get value(): number { return this._value; }
    set value(val: number) {
        this._value = val;
        // this.setValue(val);
        this.setValue(this._value);
    }

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        // this.draw();
        // TODO: have the order of args right?
        // this.options = Object.assign({}, this.options, defaultOptions);
        // let knob = new ui.Knob(this.el.nativeElement, this.value, this.options);

        // if (this.options.dynamicOptions) {
        //     var isFirstWatchOnOptions = true;
        //     this.$watch('options', function () {
        //         if (isFirstWatchOnOptions) {
        //             isFirstWatchOnOptions = false;
        //         } else {
        //             var newOptions = angular.merge(defaultOptions, this.options);
        //             knob = new ui.Knob(element[0], this.value, newOptions);
        //             drawKnob();
        //         }
        //     }, true);
        // }
        // this.draw(this.value)
        // var drawKnob = function () {
        //     knob.draw(function (value) {
        //         this.$apply(function () {
        //             this.value = value;
        //         });
        //     });
        // };

        // drawKnob();

    }
    /**
    *   Convert from value to radians
    */
    valueToRadians(value: number, valueEnd = 100, angleEnd = 360, angleStart = 0, valueStart = 0) {
        return (Math.PI / 180) * ((((value - valueStart) * (angleEnd - angleStart)) / (valueEnd - valueStart)) + angleStart);
    }

    /**
     *   Convert from radians to value
     */
    radiansToValue(radians: number, valueEnd = 100, valueStart = 0, angleEnd = 360, angleStart = 0) {
        return ((((((180 / Math.PI) * radians) - angleStart) * (valueEnd - valueStart)) / (angleEnd - angleStart)) + valueStart);
    }

    /**
     *   Create the arc
     */
    createArc(innerRadius: number, outerRadius = 0, startAngle = 0, endAngle = 0, cornerRadius = 0): d3.Arc<any, d3.DefaultArcObject> {
        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(startAngle)
            .endAngle(endAngle)
            .cornerRadius(cornerRadius);
        return arc;
    }

    /**
     *   Draw the arc
     */
    drawArc(svg, arc: d3.Arc<any, d3.DefaultArcObject>, label = '', style: { name: string, value: string }, click?: Function, drag = false): any {
        const elem = svg.append('path')
            .attr('id', label)
            .attr('d', arc)
            .style(style.name, style.value)
            .attr('transform', 'translate(' + (this.options.size / 2) + ', ' + (this.options.size / 2) + ')');

        if (this.options.readOnly === false) {
            if (click) {
                elem.on('click', click);
            }
            if (drag) {
                elem.call(drag);
            }
        }
        return elem;
    }

    /**
     *   Create the arcs
     */
    createArcs() {
        let outerRadius = this.options.size / 2;
        const startAngle = this.valueToRadians(this.options.startAngle, 360);
        const endAngle = this.valueToRadians(this.options.endAngle, 360);
        if (this.options.scale.enabled) {
            outerRadius -= this.options.scale.width + this.options.scale.spaceWidth;
        }
        let trackInnerRadius = outerRadius - this.options.trackWidth;
        let changeInnerRadius = outerRadius - this.options.barWidth;
        let valueInnerRadius = outerRadius - this.options.barWidth;
        // interactInnerRadius = outerRadius - this.options.barWidth,
        const interactInnerRadius = 1;

        let trackOuterRadius = outerRadius;
        let changeOuterRadius = outerRadius;
        let valueOuterRadius = outerRadius;
        let interactOuterRadius = outerRadius;
        let diff: number;

        if (this.options.barWidth > this.options.trackWidth) {
            diff = (this.options.barWidth - this.options.trackWidth) / 2;
            trackInnerRadius -= diff;
            trackOuterRadius -= diff;
        } else if (this.options.barWidth < this.options.trackWidth) {
            diff = (this.options.trackWidth - this.options.barWidth) / 2;
            changeOuterRadius -= diff;
            valueOuterRadius -= diff;
            changeInnerRadius -= diff;
            valueInnerRadius -= diff;
            // interactInnerRadius = outerRadius - this.options.trackWidth;
        }

        if (this.options.bgColor) {
            if (this.options.bgFull) {
                this.bgArc = this.createArc(0, outerRadius, 0, Math.PI * 2);
            } else {
                this.bgArc = this.createArc(0, outerRadius, startAngle, endAngle);
            }
        }

        if (this.options.skin.type === 'tron') {
            trackOuterRadius = trackOuterRadius - this.options.skin.width - this.options.skin.spaceWidth;
            changeOuterRadius = changeOuterRadius - this.options.skin.width - this.options.skin.spaceWidth;
            valueOuterRadius = valueOuterRadius - this.options.skin.width - this.options.skin.spaceWidth;
            interactOuterRadius = interactOuterRadius - this.options.skin.width - this.options.skin.spaceWidth;
            this.hoopArc = this.createArc(outerRadius - this.options.skin.width, outerRadius, startAngle, endAngle);
        }

        this.trackArc = this.createArc(trackInnerRadius, trackOuterRadius, startAngle, endAngle, this.options.trackCap);
        this.changeArc = this.createArc(changeInnerRadius, changeOuterRadius, startAngle, startAngle, this.options.barCap);
        this.valueArc = this.createArc(valueInnerRadius, valueOuterRadius, startAngle, startAngle, this.options.barCap);
        this.interactArc = this.createArc(interactInnerRadius, interactOuterRadius, startAngle, endAngle);
    }

    /**
     *   Draw the arcs
     */
    drawArcs(clickInteraction, dragBehavior) {
        const svg = d3.select(this.el.nativeElement)
            .append('svg')
            .attr('width', this.options.size)
            .attr('height', this.options.size);

        if (this.options.bgColor) {
            this.drawArc(svg, this.bgArc, 'bgArc', { name: 'fill', value: this.options.bgColor });
        }

        if (this.options.displayInput) {
            let fontSize = (this.options.size * 0.20) + 'px';
            if (this.options.fontSize !== 'auto') {
                fontSize = this.options.fontSize + 'px';
            }
            if (this.options.step < 1) {
                this._value = parseFloat(this._value.toFixed(1));
            }
            let v = this._value;
            if (typeof this.options.inputFormatter === 'function') {
                v = this.options.inputFormatter(v);
            }

            svg.append('text')
                .attr('id', 'text')
                .attr('text-anchor', 'middle')
                .attr('font-size', fontSize)
                .style('fill', this.options.textColor)
                .text(v + this.options.unit || '')
                .attr('transform', 'translate(' + ((this.options.size / 2)) + ', ' + ((this.options.size / 2) + (this.options.size * 0.06)) + ')');

            if (this.options.subText.enabled) {
                fontSize = (this.options.size * 0.07) + 'px';
                if (this.options.subText.font !== 'auto') {
                    fontSize = this.options.subText.font + 'px';
                }
                svg.append('text')
                    .attr('class', 'sub-text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', fontSize)
                    .style('fill', this.options.subText.color)
                    .text(this.options.subText.text)
                    .attr('transform', 'translate(' + ((this.options.size / 2)) + ', ' + ((this.options.size / 2) + (this.options.size * 0.15)) + ')');
            }
        }

        if (this.options.scale.enabled) {
            let radius, quantity, count = 0, angle = 0, data;
            const startRadians = this.valueToRadians(this.options.min, this.options.max, this.options.endAngle, this.options.startAngle, this.options.min);
            const endRadians = this.valueToRadians(this.options.max, this.options.max, this.options.endAngle, this.options.startAngle, this.options.min);
            let diff = 0;

            if (this.options.startAngle !== 0 || this.options.endAngle !== 360) {
                diff = 1;
            }
            if (this.options.scale.type === 'dots') {
                const width = this.options.scale.width;
                radius = (this.options.size / 2) - width;
                quantity = this.options.scale.quantity;
                const offset = radius + this.options.scale.width;
                data = d3.range(quantity).map(function () {
                    angle = (count * (endRadians - startRadians)) - (Math.PI / 2) + startRadians;
                    count = count + (1 / (quantity - diff));
                    return {
                        cx: offset + Math.cos(angle) * radius,
                        cy: offset + Math.sin(angle) * radius,
                        r: width
                    };
                });
                svg.selectAll('circle')
                    .data(data)
                    .enter().append('circle')
                    .attr('r', (d: any) => d.r)
                    .attr('cx', (d: any) => d.cx)
                    .attr('cy', (d: any) => d.cy)
                    .attr('fill', this.options.scale.color);
            } else if (this.options.scale.type === 'lines') {
                const height = this.options.scale.height;
                radius = (this.options.size / 2);
                quantity = this.options.scale.quantity;
                data = d3.range(quantity).map(function () {
                    angle = (count * (endRadians - startRadians)) - (Math.PI / 2) + startRadians;
                    count = count + (1 / (quantity - diff));
                    return {
                        x1: radius + Math.cos(angle) * radius,
                        y1: radius + Math.sin(angle) * radius,
                        x2: radius + Math.cos(angle) * (radius - height),
                        y2: radius + Math.sin(angle) * (radius - height)
                    };
                });
                svg.selectAll('line')
                    .data(data)
                    .enter().append('line')
                    .attr('x1', (d: any) => d.x1)
                    .attr('y1', (d: any) => d.y1)
                    .attr('x2', (d: any) => d.x2)
                    .attr('y2', (d: any) => d.y2)
                    .attr('stroke-width', this.options.scale.width)
                    .attr('stroke', this.options.scale.color)
                    ;
            }
        }
        if (this.options.skin.type === 'tron') {
            this.drawArc(svg, this.hoopArc, 'hoopArc', { name: 'fill', value: this.options.skin.color });
        }
        this.drawArc(svg, this.trackArc, 'trackArc', { name: 'fill', value: this.options.trackColor });

        if (this.options.displayPrevious) {
            this.changeElem = this.drawArc(svg, this.changeArc, 'changeArc', { name: 'fill', value: this.options.prevBarColor });
        } else {
            this.changeElem = this.drawArc(svg, this.changeArc, 'changeArc', { name: 'fill-opacity', value: '0' });
        }
        this.valueElem = this.drawArc(svg, this.valueArc, 'valueArc', { name: 'fill', value: this.options.barColor });

        let cursor = 'pointer';
        if (this.options.readOnly) {
            cursor = 'default';
        }

        // TODO: I had to remove the second style for now: , 'cursor': cursor
        this.drawArc(svg, this.interactArc, 'interactArc', { name: 'fill-opacity', value: '0' }, clickInteraction, dragBehavior);
    }

    /**
     *   Draw knob component
     */
    draw() {
        d3.select(this.el.nativeElement).select('svg').remove();
        const that = this;

        that.createArcs();

        const dragBehavior = d3.drag()
            .on('drag', dragInteraction)
            .on('end', clickInteraction);

        that.drawArcs(clickInteraction, dragBehavior);

        // TODO: temp
        // that.options.animate.enabled = false;
        if (that.options.animate.enabled && false) {
            that.valueElem.transition().ease(that.options.animate.ease).duration(that.options.animate.duration).tween('', function () {
                const i = d3.interpolate(that.valueToRadians(that.options.startAngle, 360), that.valueToRadians(that.value, that.options.max, that.options.endAngle, that.options.startAngle, that.options.min));
                return function (t) {
                    const val = i(t);
                    that.valueElem.attr('d', that.valueArc.endAngle(val));
                    that.changeElem.attr('d', that.changeArc.endAngle(val));
                };
            });
        } else {
            that.changeArc.endAngle(this.valueToRadians(this._value, this.options.max, this.options.endAngle, this.options.startAngle, this.options.min));
            that.changeElem.attr('d', that.changeArc);
            that.valueArc.endAngle(this.valueToRadians(this._value, this.options.max, this.options.endAngle, this.options.startAngle, this.options.min));
            that.valueElem.attr('d', that.valueArc);
        }

        function dragInteraction() {
            that.inDrag = true;
            const x = d3.event.x - (that.options.size / 2);
            const y = d3.event.y - (that.options.size / 2);
            interaction(x, y, false);
        }

        function clickInteraction() {
            that.inDrag = false;
            const coords = d3.mouse(this.parentNode);
            const x = coords[0] - (that.options.size / 2);
            const y = coords[1] - (that.options.size / 2);
            interaction(x, y, true);
        }

        function interaction(x: number, y: number, isFinal: boolean) {
            let radians: number, delta: number;
            const arc = Math.atan(y / x) / (Math.PI / 180);

            if ((x >= 0 && y <= 0) || (x >= 0 && y >= 0)) {
                delta = 90;
            } else {
                delta = 270;
                if (that.options.startAngle < 0) {
                    delta = -90;
                }
            }

            radians = (delta + arc) * (Math.PI / 180);
            that.value = that.radiansToValue(radians, that.options.max, that.options.min, that.options.endAngle, that.options.startAngle);
            if (that.value >= that.options.min && that.value <= that.options.max) {
                // tslint:disable-next-line:no-bitwise
                that.value = Math.round(((~~(((that.value < 0) ? -0.5 : 0.5) + (that.value / that.options.step))) * that.options.step) * 100) / 100;
                if (that.options.step < 1) {
                    that.value = parseFloat(that.value.toFixed(1));
                }
                // TODO: This used to be a function passed in...
                // update(that.value);
                that.valueArc.endAngle(that.valueToRadians(that.value, that.options.max, that.options.endAngle, that.options.startAngle, that.options.min));
                that.valueElem.attr('d', that.valueArc);
                if (isFinal) {
                    that.changeArc.endAngle(that.valueToRadians(that.value, that.options.max, that.options.endAngle, that.options.startAngle, that.options.min));
                    that.changeElem.attr('d', that.changeArc);
                }
                if (that.options.displayInput) {
                    let v = that.value;
                    if (typeof that.options.inputFormatter === 'function') {
                        v = that.options.inputFormatter(v);
                    }
                    d3.select(that.el.nativeElement).select('#text').text(v + that.options.unit || '');
                }
            }
        }
    }

    /**
    *   Set a value
    */
    setValue(newValue) {
        if ((!this.inDrag) && this._value >= this.options.min && this._value <= this.options.max) {
            const radians = this.valueToRadians(newValue, this.options.max, this.options.endAngle, this.options.startAngle, this.options.min);
            // tslint:disable-next-line:no-bitwise
            this._value = Math.round(((~~(((newValue < 0) ? -0.5 : 0.5) + (newValue / this.options.step))) * this.options.step) * 100) / 100;
            if (this.options.step < 1) {
                this._value = parseFloat(this._value.toFixed(1));
            }
            this.changeArc.endAngle(radians);

            d3.select(this.el.nativeElement).select('#changeArc').attr('d', this.changeArc);
            this.valueArc.endAngle(radians);

            d3.select(this.el.nativeElement).select('#valueArc').attr('d', this.valueArc);
            if (this.options.displayInput) {
                let v = this._value;
                if (typeof this.options.inputFormatter === 'function') {
                    v = this.options.inputFormatter(v);
                }
                d3.select(this.el.nativeElement).select('#text').text(v + this.options.unit || '');
            }
        }
    }
}




