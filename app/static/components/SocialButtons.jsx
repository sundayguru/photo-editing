import React from 'react';

export default class extends React.Component {
    render() {
        const {type} = this.props
        return (
            <div class="row">
                <h4>Social Connect</h4>
                <a href="/login/facebook/?next=/" class={"btn btn-primary " + type }> <i class="mdi mdi-facebook-box" aria-hidden="true"></i> Facebook</a>
                <a href="/login/twitter/?next=/" class={"btn btn-info " + type }> <i class="mdi mdi-twitter-box" aria-hidden="true"></i> Twitter</a>
                <a href="/login/google-oauth2/?next=/" class={"btn btn-danger " + type }><i class="mdi mdi-google" aria-hidden="true"></i> Google</a>
            </div>
        );
    }
}
