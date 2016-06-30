import React from 'react';

export default class extends React.Component {
    constructor() {
      super();

    }

    render() {
        return (
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
        );
    }
}
