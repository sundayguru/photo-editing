import React from 'react';

export default class extends React.Component {
    constructor() {
      super();

    }

    render() {
        return (
         <div>
            <ul class="cb-slideshow">
                <li><span>Image 01</span>
                    <div>
                        <h3>se·ren·i·ty</h3></div>
                </li>
                <li><span>Image 02</span>
                    <div>
                        <h3>com·po·sure</h3></div>
                </li>
                <li><span>Image 03</span>
                    <div>
                        <h3>e·qua·nim·i·ty</h3></div>
                </li>
                <li><span>Image 04</span>
                    <div>
                        <h3>bal·ance</h3></div>
                </li>
                <li><span>Image 05</span>
                    <div>
                        <h3>qui·e·tude</h3></div>
                </li>
                <li><span>Image 06</span>
                    <div>
                        <h3>re·lax·a·tion</h3></div>
                </li>
            </ul>

            <section class="row center">
                <div class="login">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#login" data-toggle="tab" aria-expanded="true">Login </a></li>
                                <li class=""><a href="#signup" data-toggle="tab" aria-expanded="false">Register</a></li>
                            </ul>

                            <div id="myTabContent" class="tab-content">
                                <div class="tab-pane fade active in" id="login">
                                    <form class="form-horizontal">
                                        <fieldset>
                                            <div class="form-group">
                                                <label class="col-lg-2 control-label">Email</label>
                                                <div class="col-lg-10">
                                                    <input type="text" class="form-control" placeholder="Email" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="inputPassword" class="col-lg-2 control-label">Password</label>
                                                <div class="col-lg-10">
                                                    <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-lg-10 col-lg-offset-2">
                                                    <button type="submit" class="btn btn-primary right">Login</button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>

                                <div class="tab-pane fade  in" id="signup">
                                    <form class="form-horizontal">
                                        <fieldset>
                                            <div class="form-group">
                                                <label for="inputEmail" class="col-lg-2 control-label">Name</label>
                                                <div class="col-lg-10">
                                                    <input type="text" class="form-control" id="name" placeholder="Name" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="inputEmail" class="col-lg-2 control-label">Email</label>
                                                <div class="col-lg-10">
                                                    <input type="text" class="form-control" id="inputEmail" placeholder="Email" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="inputPassword" class="col-lg-2 control-label">Password</label>
                                                <div class="col-lg-10">
                                                    <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="inputPassword" class="col-lg-2 control-label">Confirm Password</label>
                                                <div class="col-lg-10">
                                                    <input type="password" class="form-control" id="inputcPassword" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-lg-10 col-lg-offset-2">
                                                    <button type="submit" class="btn btn-primary right">Register</button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>

                            <div class="row">
                              <a href="#" class="btn btn-default">Connect with Facebook</a>
                              <a href="#" class="btn btn-primary">Login with Twitter</a>
                              <a href="#" class="btn btn-danger">Login with Gmail</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


         </div>
        );
    }
}
