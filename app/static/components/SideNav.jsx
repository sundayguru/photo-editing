import React from 'react';

export default class extends React.Component {
    constructor() {
      super();

    }

    render() {
        return (
         <div class="table-of-contents">
            <h4 class="padleft-20">Favorites</h4>
            <div class="list-group">
                <a class="list-group-item active" href="#/">
                <img src="../static/images/icons/folder.png" class="icon-size-small" /><span>All Folders</span></a>

                <a class="list-group-item" href="#/photos">
                    <img src="../static/images/icons/photo-file.png" class="icon-size-small" /> All Photos
                </a>
            </div>
         </div>
        );
    }
}
