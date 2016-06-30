import { EventEmitter } from 'events';
import dispatcher from '../../js/Dispatcher.js';
import * as request from '../actions/RequestAction.js';

class RegisterStore extends EventEmitter {
    register(content){
        var _this = this;
        request.post('/api/v1/auth/register/', content, (err, result) => {
            _this.emit('registerComplete', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    handlerAction(action){
        switch(action.type){
            case 'NEW_REGISTER':
                this.register(action.content);
            break;
        }
    }
}

const registerStore = new RegisterStore;
dispatcher.register(registerStore.handlerAction.bind(registerStore));
export default registerStore;