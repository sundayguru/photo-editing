import React from 'react';
import Notifications from 'react-notify-toast';
import SideNav from '../SideNav';
import Subnav from '../Subnav';
import Nav from '../Nav';
import DetailModal from '../DetailModal';
import FolderModal from '../FolderModal';


export default class extends React.Component {
    constructor() {
      super();
      this.state = {user: $('#current-user').val()}
    }

    render() {
        return (
         <div class="row">
          <Notifications />
          <Nav user={ this.state.user }/>
          <div class="container">
            <Subnav />
            <hr/>
             <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-3 line-right no-pad">
                  <SideNav />
                </div>
                <div class="col-lg-10 col-md-10 col-sm-9">
                  { this.props.children }
                  <DetailModal />
                  <FolderModal />
                </div>
            </div>
          </div>
         </div>
        );
    }
}
