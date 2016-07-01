import React from 'react';
import Loader from 'react-loader';
import Options from './Options';


export default class extends React.Component {
  deleteFolder(){
    alert(this.state.id);
  }

  render() {
      var {name, id} = this.props;
      this.setState({id});
      return (
         <div class="col-sm-4 col-md-3">
            <div class="thumbnail">
            <Options editLink={ "editfolder/" + id } deleteMethod={this.deleteFolder.bind(this)} />
            <a href={"#/folder/" + id }><img src="../static/images/icons/folder.png"  /></a>
              <div class="caption">
                <h5>{name} <span class="badge right">4</span></h5>
              </div>
            </div>
          </div>
      );
  }
}
