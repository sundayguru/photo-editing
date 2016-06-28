import  React from 'react';
import ReactDOM from 'react-dom' ;
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout  from '../components/pages/Layout';
import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';
import Folders from '../components/Folders';
import Upload from '../components/Upload';
import Photos from '../components/Photos';
import Edit from '../components/Edit';
import Folder from '../components/Folder';


ReactDOM.render(
   <Router history={hashHistory}>
        <Route path="/" component={ Layout }>
            <IndexRoute component={ Login } />
            <Route path="/dashboard" component={ Dashboard }>
                <IndexRoute component={ Folders } />
                <Route path="upload" component={ Upload } />
                <Route path="photos" component={ Photos } />
                <Route path="edit" component={ Edit } />
                <Route path="folder" component={ Folder } />
            </Route>
        </Route>
    </Router>,
  document.getElementById('app')
);
