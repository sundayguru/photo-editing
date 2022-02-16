import React from 'react';
import FolderForm from './forms/FolderForm';
import Modal from './Modal';

export default class extends React.Component {
    render() {
        return (
          <Modal title={"New Folder"} bodyContent={ <FolderForm /> } id={"formModal"} />
        );
    }
}
