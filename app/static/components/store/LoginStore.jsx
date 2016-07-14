import { EventEmitter } from 'events';
import dispatcher from '../../js/Dispatcher.js';
import * as request from '../actions/RequestAction.js';

class LoginStore extends EventEmitter {
    login(content){
        var _this = this;
        request.post('/api/v1/auth/login/', content, (err, result) => {
            _this.emit('loginComplete', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    handlerAction(action){
        switch(action.type){
            case 'LOGIN':
                this.login(action.content);
            break;
        }
    }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handlerAction.bind(loginStore));
export default loginStore;