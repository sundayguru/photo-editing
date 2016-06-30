import React from 'react';

export default class extends React.Component {
    constructor() {
      super();

    }

    render() {
        return (
         <div class="options">
          <div class="btn-group">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Options <span class="caret"></span></a>
                <ul class="dropdown-menu dropdown-menu-left">
                    <li>
                        <a href="#/edit">
                            <img src="../static/images/icons/edit.png" class="icon-size-small" /> Edit</a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="../static/images/icons/delete-file.png" class="icon-size-small" /> Delete</a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="../static/images/icons/delete-folder.png" class="icon-size-small" /> Delete Folder</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="#" data-toggle="modal" data-target="#myModal"><img src="../static/images/icons/info.png" class="icon-size-small" /> Info</a>
                    </li>
                </ul>
            </div>
         </div>
        );
    }
}
