import React from 'react';
import storeFolder from './store/FolderStore';
import storePhoto from './store/PhotoStore';

export default class extends React.Component {
    toggleDetailModal(e){
        e.preventDefault();
        $('#myModal').modal();
        if(this.detailType == 'image'){
            storePhoto.get(this.id);
        }else{
            storeFolder.get(this.id);
        }
    }

    toggleFolderModal(e){
        e.preventDefault();
        $('#formModal').modal();
        $('#formModal .modal-title').html('Update Folder');
        storeFolder.get(this.id);
    }

    render() {
        const {editLink, deleteMethod, id, type} = this.props;
        this.id = id;
        this.detailType = type;
        return (
         <div class="options">
          <div class="btn-group">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Options <span class="caret"></span></a>
                <ul class="dropdown-menu dropdown-menu-left">
                    <li>
                        <a href={"#/"+editLink} onClick={ type != 'image' ? this.toggleFolderModal.bind(this) : '' } >
                        <i class="mdi mdi-table-edit"></i> Edit</a>
                    </li>
                    <li>
                        <a href="#" onClick={deleteMethod}>
                            <i class="mdi mdi-delete-forever"></i> Delete</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="#" onClick={ this.toggleDetailModal.bind(this) } >
                        <i class="mdi mdi-information"></i> Info</a>
                    </li>
                </ul>
            </div>
         </div>
        );
    }
}
