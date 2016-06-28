import React from 'react';

export default class extends React.Component {
    constructor() {
      super();

    }

    render() {
        return (
         <section>
           <div class="row">
              <div class="col-lg-3 col-md-3 col-sm-4">
                <a href="#/dashboard/folder" title="New Folder" class="btn toolbar">
                <img src="../static/images/icons/add-folder.png" className="icon-size-small" />
                <br/>New Folder</a>
                <a href="#/dashboard/upload" title="Upload New File" class="btn toolbar"><img src="../static/images/icons/upload.png" class="icon-size-small" />
                    <br/>Upload Photo</a>
              </div>

          </div>
        </section>
        );
    }
}
