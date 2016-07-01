import { EventEmitter } from 'events';
import dispatcher from '../../js/Dispatcher.js';
import * as request from '../actions/RequestAction.js';

class FolderStore extends EventEmitter {
    create(content){
        var _this = this;
        request.post('/api/v1/folders/', content, (err, result) => {
            _this.emit('newFolder', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    getAll(){
        var _this = this;
        request.get('/api/v1/folders/', (err, result) => {
            _this.emit('listFolder', {status: result.status, data: JSON.parse(result.text) });
        });
    }


    handlerAction(action){
        switch(action.type){
            case 'NEW_FOLDER':
                this.create(action.content);
            break;

            case 'LIST_FOLDER':
                this.getAll();
            break;
        }
    }
}

const folderStore = new FolderStore;
dispatcher.register(folderStore.handlerAction.bind(folderStore));
export default folderStore;