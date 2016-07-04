import React from 'react';
import storeFolder from './store/FolderStore';

export default class extends React.Component {
    getNext(e){
        e.preventDefault();
        var page = $(e.target).attr('href');
        storeFolder.getAll(page);
    }

    render() {
        var {page, label} = this.props;
        return (
            <li><a href={page} onClick={this.getNext}>{label}</a></li>
        );
    }
}
