import React from 'react';
import storeFolder from './store/FolderStore';

export default class extends React.Component {
    toggleModal(e){
      e.preventDefault();
      $('#folder_name').val('');
       $('#formModal .modal-title').html('New Folder');
      $('#folder_id').val('');
      $('#formModal').modal();
    }

    render() {
        return (
         <section>
           <div class="row">
              <div class="col-lg-3 col-md-3 col-sm-4">
                <a href="#" title="New Folder" class="btn toolbar" onClick={ this.toggleModal } >
                <img src="../static/images/icons/add-folder.png" className="icon-size-small" />
                <br/>New Folder</a>
                <a href={"#/upload"} title="Upload New File" class="btn toolbar"><img src="../static/images/icons/upload.png" class="icon-size-small" />
                    <br/>Upload Photo</a>
              </div>

          </div>
        </section>
        );
    }
}
