import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Logger } from './logger.service';

export let debug = environment.debug;

const noop = (): any => undefined;

@Injectable()
export class ConsoleLoggerService {

    get info() {
        if (debug) {
            return console.info.bind(console);
        }
        return noop;
    }
}
