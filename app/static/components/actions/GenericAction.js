import dispatcher from '../../js/Dispatcher';

export function perform(content, action_type){
    dispatcher.dispatch({
        type:action_type,
        content
    });
}