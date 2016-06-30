import dispatcher from '../../js/Dispatcher.js';

export function register(content){
    dispatcher.dispatch({
        type:'NEW_REGISTER',
        content
    });
}
