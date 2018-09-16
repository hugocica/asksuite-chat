import {Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy} from '@angular/core';

@Pipe({
    name: 'timeAgo',
    pure: false
})

export class TimeAgoPipe implements PipeTransform, OnDestroy {
    private timer: number;
    constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
    transform(value: string) {
        this.removeTimer();
        const d = new Date(value);
        const now = new Date();
        const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
        const timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
        this.timer = this.ngZone.runOutsideAngular(() => {
            if (typeof window !== 'undefined') {
                return window.setTimeout(() => {
                    this.ngZone.run(() => this.changeDetectorRef.markForCheck());
                }, timeToUpdate);
            }
            return null;
        });
        const minutes = Math.round(Math.abs(seconds / 60));
        const hours = Math.round(Math.abs(minutes / 60));
        const days = Math.round(Math.abs(hours / 24));
        const months = Math.round(Math.abs(days/30.416));
        const years = Math.round(Math.abs(days/365));
        if (Number.isNaN(seconds)){
            return '';
        } else if (seconds <= 45) {
            return 'alguns segundos';
        } else if (seconds <= 90) {
            return 'um minuto';
        } else if (minutes <= 45) {
            return minutes + ' minutos';
        } else if (minutes <= 90) {
            return 'uma hora';
        } else if (hours <= 22) {
            return hours + ' horas';
        } else if (hours <= 36) {
            return 'um dia';
        } else if (days <= 25) {
            return days + ' dias';
        } else if (days <= 45) {
            return 'um mês';
        } else if (days <= 345) {
            return months + ' meses';
        } else if (days <= 545) {
            return 'um ano';
        } else { // (days > 545)
            return years + ' anos';
        }
    }
    ngOnDestroy(): void {
        this.removeTimer();
    }
    private removeTimer() {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }
    private getSecondsUntilUpdate(seconds: number) {
        const min = 60;
        const hr = min * 60;
        const day = hr * 24;
        if (seconds < min) { // less than 1 min, update every 2 secs
            return 2;
        } else if (seconds < hr) { // less than an hour, update every 30 secs
            return 30;
        } else if (seconds < day) { // less then a day, update every 5 mins
            return 300;
        } else { // update every hour
            return 3600;
        }
    }
}
