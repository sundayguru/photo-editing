import React from 'react';

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
        return (
         <div class="table-of-contents">
            <h4 class="padleft-20">Favorites</h4>
            <div class="list-group">
                <a class={"list-group-item " + this.isActive('/#/?')} href="#/">
                    <img src="../static/images/icons/folder.png" class="icon-size-small" /><span>All Folders</span>
                </a>

                <a class={"list-group-item " + this.isActive('untitled')} href="#/folder/0/untitled">
                    <img src="../static/images/icons/folder.png" class="icon-size-small" /><span>Untitled</span>
                </a>

                <a class={"list-group-item " + this.isActive('photos')} href="#/photos">
                    <img src="../static/images/icons/photo-file.png" class="icon-size-small" /> All Photos
                </a>
            </div>
         </div>
        );
    }
}
