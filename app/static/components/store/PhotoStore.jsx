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
        request.put('/api/v1/photos/' + content.get('photo_id') + '/', content, (err, result) => {
            _this.emit('updatePhoto', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    preview(content){
        var _this = this;
        request.post('/api/v1/photos/' + content.get('photo_id') + '/preview/', content, (err, result) => {
            _this.emit('previewPhoto', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    delete(id){
        var _this = this;
        request.remove('/api/v1/photos/' + id + '/', (err, result) => {
            _this.emit('deletePhoto', {status: result.status});
        });
    }

    getAll(page, folder_id){
        var _this = this;
        if(page == undefined)
            page = 1;
        var url = '/api/v1/photos/?page=' + page;
        if(folder_id !== undefined){
            var url = '/api/v1/folders/' + folder_id + '/photos/?page=' + page;
        }
        request.get(url, (err, result) => {
            _this.emit('photos', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    get(id){
        var _this = this;
        request.get('/api/v1/photos/' + id + '/', (err, result) => {
            _this.emit('photo', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    getShare(share_id){
        var _this = this;
        request.get('/api/v1/photos/share/?share_id=' + share_id, (err, result) => {
            _this.emit('sharePhoto', {status: result.status, data: JSON.parse(result.text) });
        });
    }

    broadcastColor(content){
        this.emit('color', {data: content });
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
            case 'COLOR_CHANGE':
                this.broadcastColor(action.content);
            break;
        }
    }
}

const photoStore = new PhotoStore;
dispatcher.register(photoStore.handlerAction.bind(photoStore));
export default photoStore;