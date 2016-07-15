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

    update(content){
        var _this = this;
        request.put('/api/v1/folders/' + content.get('id') + '/', content, (err, result) => {
            _this.emit('newFolder', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    delete(id){
        var _this = this;
        request.remove('/api/v1/folders/' + id + '/', (err, result) => {
            _this.emit('deleteFolder', {status: result.status});
        });
    }

    getAll(page){
        var _this = this;
        if(page == undefined)
            page = 1;

        request.get('/api/v1/folders/?page=' + page, (err, result) => {
            _this.emit('listFolder', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    get(id){
        var _this = this;
        request.get('/api/v1/folders/' + id + '/', (err, result) => {
            _this.emit('singleFolder', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    selected(id){
        this.emit('selectFolder', {id: id});
    }

    handlerAction(action){
        switch(action.type){
            case 'NEW_FOLDER':
                this.create(action.content);
            break;
            case 'UPDATE_FOLDER':
                this.update(action.content);
            break;
            case 'LIST_FOLDER':
                this.getAll();
            break;
            case 'DELETE_FOLDER':
                this.delete(action.id);
            break;
        }
    }
}

const folderStore = new FolderStore;
dispatcher.register(folderStore.handlerAction.bind(folderStore));
export default folderStore;