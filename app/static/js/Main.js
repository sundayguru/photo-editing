import  React from 'react';
import ReactDOM from 'react-dom' ;
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import HomeLayout  from '../components/pages/HomeLayout';
import Login from '../components/pages/Login';
import Share from '../components/pages/Share';
import Dashboard from '../components/pages/Dashboard';
import Folders from '../components/Folders';
import Upload from '../components/Upload';
import Photos from '../components/Photos';
import EditImage from '../components/EditImage';
import FolderContent from '../components/FolderContent';
import FolderUntitled from '../components/FolderUntitled';

function requireAuth(nextState, replace) {
  if (localStorage.getItem('user') == 'false') {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

var index = $('#index').val();
var Home = HomeLayout;
var FirstPage = Login
if(index == 'Dashboard'){
  Home = Dashboard;
  FirstPage = Folders;
  localStorage.setItem('user', true)
}else{
  localStorage.setItem('user', false)
}


ReactDOM.render(
   <Router history={hashHistory}>
        <Route path="/(_=_)" component={ Home }>
            <IndexRoute component={ FirstPage } />
            <Route path="share/:id" component={ Share } />
            <Route path="upload/:id" component={ Upload } onEnter={requireAuth} />
            <Route path="photos" component={ Photos } onEnter={requireAuth} />
            <Route path="editimage/:id" component={ EditImage } onEnter={requireAuth} />
            <Route path="folder/:id" component={ FolderContent } onEnter={requireAuth} />
            <Route path="folder/:id/untitled" component={ FolderUntitled } onEnter={requireAuth} />
        </Route>
    </Router>,
  document.getElementById('app')
);
