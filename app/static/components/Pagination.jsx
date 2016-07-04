import React from 'react';
import PaginationList from './PaginationList';

export default class extends React.Component {
    render() {
        var pages = [];
        var {count} = this.props;
        var lastPage = Math.floor(count/8);
        if(count % 8 !== 0 && count > 16){
            lastPage += 1;
        }

        for(var i = 1; i <= lastPage; i++){
            pages.push(<PaginationList label={i} page={i} key={i} />);
        }

        return (
            <ul class="pagination pagination-sm right">
                <PaginationList label="&laquo;" page={1} />
                {pages}
                <PaginationList label="&raquo;" page={lastPage} />
            </ul>
        );
    }
}
