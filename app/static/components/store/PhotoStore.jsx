import { EventEmitter } from 'events';
import dispatcher from '../../js/Dispatcher.js';
import * as request from '../actions/RequestAction.js';

class PhotoStore extends EventEmitter {
    create(content){
        var _this = this;
        request.post('/api/v1/photos/', content, (err, result) => {
            _this.emit('newPhoto', {status: result.status, data: JSON.parse(result.text) });
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

    handlerAction(action){
        switch(action.type){
            case 'NEW_PHOTO':
                this.create(action.folder_id, action.file);
            break;
            case 'UPDATE_PHOTO':
                this.update(action.content);
            break;
            case 'LIST_PHOTO':
                this.getAll();
            break;
            case 'DELETE_PHOTO':
                this.delete(action.id);
            break;
        }
    }
}

const photoStore = new PhotoStore;
dispatcher.register(photoStore.handlerAction.bind(photoStore));
export default photoStore;