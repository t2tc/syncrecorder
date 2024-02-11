
// copilot generated, not tested yet.

export class Timecode {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;

    constructor(hours: number, minutes: number, seconds: number, milliseconds: number);
    constructor(_timecode: number) {
        if (arguments.length === 1) {
            const milliseconds = arguments[0];
            const { hours, minutes, seconds, milliseconds: ms } = millisecondsToTimecode(milliseconds);
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
            this.milliseconds = ms;
        } else {
            this.hours = arguments[0];
            this.minutes = arguments[1];
            this.seconds = arguments[2];
            this.milliseconds = arguments[3];
        }
    }

    static minus(timecode1: Timecode, timecode2: Timecode): number {
        return Timecode.toMilliseconds(timecode1) - Timecode.toMilliseconds(timecode2);
    }

    static plus(timecode: Timecode, milliseconds: number): Timecode {
        return millisecondsToTimecode(Timecode.toMilliseconds(timecode) + milliseconds);
    }

    static toMilliseconds(timecode: Timecode): number {
        return timecode.hours * 3600000 + timecode.minutes * 60000 + timecode.seconds * 1000 + timecode.milliseconds;
    }

}

export function millisecondsToTimecode(milliseconds: number): Timecode {
    const hours = Math.floor(milliseconds / 3600000);
    milliseconds -= hours * 3600000;
    const minutes = Math.floor(milliseconds / 60000);
    milliseconds -= minutes * 60000;
    const seconds = Math.floor(milliseconds / 1000);
    milliseconds -= seconds * 1000;
    return { hours, minutes, seconds, milliseconds };
}

export function timecodeToString(timecode: Timecode, option?: 'full' | 'seconds' | 'minutes'): string {
    const hours = timecode.hours.toString().padStart(2, '0');
    const minutes = timecode.minutes.toString().padStart(2, '0');
    const seconds = timecode.seconds.toString().padStart(2, '0');
    const milliseconds = Math.floor(timecode.milliseconds).toString().padStart(3, '0');

    if (option === 'seconds') {
        return `${hours}:${minutes}:${seconds}`;
    }
    if (option === 'minutes') {
        return `${hours}:${minutes}`;
    }
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function stringToTimecode(timecode: string): Timecode {
    const [hours, minutes, seconds] = timecode.split(':').map((value) => parseInt(value));
    const [_, millisecondsString] = timecode.split('.');
    const milliseconds = parseInt(millisecondsString);
    return { hours, minutes, seconds, milliseconds };
}