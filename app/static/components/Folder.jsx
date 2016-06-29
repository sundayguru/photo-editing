import React from 'react';

export default class extends React.Component {
    constructor() {
      super();

    }

    render() {
        return (
         <div class="col-md-12">
            <h3>New Folder</h3>
            <form class="form-horizontal">
              <fieldset>
                <div class="form-group col-md-6">
                  <label class="control-label">Folder Name</label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="folderName" />
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button">Save</button>
                    </span>
                  </div>
                </div>
              </fieldset>
            </form>
         </div>
        );
    }
}
