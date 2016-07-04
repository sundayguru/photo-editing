import React from 'react';
import FolderInfo from './FolderInfo';
import storeFolder from './store/FolderStore';

export default class extends React.Component {
    constructor() {
      super();
      this.detail = this.detail.bind(this)
      this.state = {title:'', data:{}};
    }

    detail(data){
      this.setState({data:data.data, title: data.data.name});
    }

    componentWillMount(){
      storeFolder.on('singleFolder', this.detail);
    }

    componentWillUnmount(){
      storeFolder.removeListener('singleFolder', this.detail);
    }

    render() {
        return (
         <div>
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel"> {this.state.title} </h4>
                  </div>
                  <div class="modal-body">
                    <FolderInfo data={this.state.data} />
                  </div>
                </div>
              </div>
            </div>
         </div>
        );
    }
}
