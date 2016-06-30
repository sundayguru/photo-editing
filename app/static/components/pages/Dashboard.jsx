import React from 'react';
import Notifications from 'react-notify-toast';
import SideNav from '../SideNav';
import Buttons from '../Buttons';
import Nav from '../Nav';
import Modal from '../Modal';


export default class extends React.Component {
    constructor() {
      super();

    }

    render() {
        return (
         <div class="row">
         <Notifications />
          <Nav />
          <div class="container">
            <Buttons />
            <hr/>
             <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-3 line-right no-pad">
                    <SideNav />
                </div>
                <div class="col-lg-10 col-md-10 col-sm-9">
                    { this.props.children }
                    <Modal />
                </div>
            </div>
          </div>
         </div>
        );
    }
}
