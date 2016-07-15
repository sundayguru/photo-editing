import React from 'react';

export default class extends React.Component {
    render() {
     const {user_active_class, user} = this.props;
        return (
         <div class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <a href="#/" class="navbar-brand">Fotoditor</a>
              <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="navbar-collapse collapse" id="navbar-main">
              <ul class={ "nav navbar-nav navbar-right " + user_active_class }>
               <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="download"> <i class="mdi mdi-account"></i> { user }<span class="caret"></span></a>
                  <ul class="dropdown-menu" aria-labelledby="download">
                    <li><a href="/logout"><i class="mdi mdi-logout-variant"></i> Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        );
    }
}
