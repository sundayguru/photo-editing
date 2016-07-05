import React from 'react';
import FolderInfo from './FolderInfo';
import Modal from './Modal';
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
          <Modal title={this.state.title} bodyContent={ <FolderInfo data={this.state.data} /> } id={"myModal"} />
        );
    }
}
