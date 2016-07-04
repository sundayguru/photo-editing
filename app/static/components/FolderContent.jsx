import React from 'react';
import Loader from 'react-loader';
import * as action from './actions/GenericAction';
import * as Toast from './actions/ToastAction';
import store from './store/FolderStore';
import Empty from './Empty';


export default class extends React.Component {
    constructor() {
      super();
    }

    render() {
        return (
          <Empty />
        );
    }
}
