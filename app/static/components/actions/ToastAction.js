import {notify} from 'react-notify-toast';

export function ok(message){
    notify.show(message, 'success');
}

export function warning(message){
    notify.show(message, 'warning');
}

export function error(message){
    notify.show(message, 'error');
}
