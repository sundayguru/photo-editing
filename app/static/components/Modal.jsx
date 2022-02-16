import React from 'react';

export default class extends React.Component {
    render() {
        const {title, bodyContent, id} = this.props;
        return (
         <div>
            <div class="modal fade" id={id} tabindex="-1" role="dialog" aria-labelledby={id}>
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"> {title} </h4>
                  </div>
                  <div class="modal-body">
                    {bodyContent}
                  </div>
                </div>
              </div>
            </div>
         </div>
        );
    }
}
