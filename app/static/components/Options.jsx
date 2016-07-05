import React from 'react';
import storeFolder from './store/FolderStore';

export default class extends React.Component {
    toggleDetailModal(e){
        e.preventDefault();
        $('#myModal').modal();
        storeFolder.get(this.id);
    }

    toggleFolderModal(e){
        e.preventDefault();
        $('#formModal').modal();
        $('#formModal .modal-title').html('Update Folder');
        storeFolder.get(this.id);
    }

    render() {
        const {editLink, deleteMethod, id} = this.props;
        this.id = id;
        return (
         <div class="options">
          <div class="btn-group">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Options <span class="caret"></span></a>
                <ul class="dropdown-menu dropdown-menu-left">
                    <li>
                        <a href={"#/"+editLink} onClick={ this.toggleFolderModal.bind(this) } >
                            <img src="../static/images/icons/edit.png" class="icon-size-small" /> Edit</a>
                    </li>
                    <li>
                        <a href="#" onClick={deleteMethod}>
                            <img src="../static/images/icons/delete-file.png" class="icon-size-small" /> Delete</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="#" onClick={ this.toggleDetailModal.bind(this) } ><img src="../static/images/icons/info.png" class="icon-size-small" /> Info</a>
                    </li>
                </ul>
            </div>
         </div>
        );
    }
}
