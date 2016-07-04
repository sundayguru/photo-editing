import React from 'react';
import storeFolder from './store/FolderStore';

export default class extends React.Component {
    toggleModal(e){
        e.preventDefault();
        $('#myModal').modal();
        storeFolder.get(this.id);
    }

    render() {
        const {editLink, deleteMethod, id} = this.props;
        this.id = id
        return (
         <div class="options">
          <div class="btn-group">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Options <span class="caret"></span></a>
                <ul class="dropdown-menu dropdown-menu-left">
                    <li>
                        <a href={"#/"+editLink}>
                            <img src="../static/images/icons/edit.png" class="icon-size-small" /> Edit</a>
                    </li>
                    <li>
                        <a href="#" onClick={deleteMethod}>
                            <img src="../static/images/icons/delete-file.png" class="icon-size-small" /> Delete</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="#" onClick={ this.toggleModal.bind(this) } ><img src="../static/images/icons/info.png" class="icon-size-small" /> Info</a>
                    </li>
                </ul>
            </div>
         </div>
        );
    }
}
