import React from 'react';
import ShareSideNav from './ShareSideNav';

export default class extends React.Component {
    componentDidMount() {
        $('.list-group-item').click(function(){
            $('.list-group-item').each(function(){
                $(this).removeClass('active');
            })
            $(this).addClass('active');
        });
    }

    isActive(page){
        if(document.location.href.indexOf(page) > -1)
            return 'active'
        return ''
    }

    render() {
        if(localStorage.getItem('user') == 'false'){
            return ( <ShareSideNav /> );
        }
        return (
         <div class="table-of-contents">
            <h4 class="padleft-20">Favorites</h4>
            <div class="list-group">
                <a class={"list-group-item " + this.isActive('/#/?')} href="#/">
                    <i class="mdi mdi-folder"></i> <span>All Folders</span>
                </a>
                <a class={"list-group-item " + this.isActive('untitled')} href="#/folder/0/untitled">
                    <i class="mdi mdi-folder-outline"></i> <span>Uncategorized</span>
                </a>
                <a class={"list-group-item " + this.isActive('photos')} href="#/photos">
                    <i class="mdi mdi-file-image"></i>  All Photos
                </a>
            </div>
         </div>
        );
    }
}
