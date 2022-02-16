import React from 'react';

export default class extends React.Component {
    render() {
        return (
            <ul class="cb-slideshow">
                <li><span>Image 01</span>
                    <div>
                        <h3>Photo Editor</h3>
                    </div>
                </li>

                <li><span>Image 02</span>
                    <div>
                        <h3>Apply Filters</h3>
                    </div>
                </li>
                <li><span>Image 03</span>
                    <div>
                        <h3>Transform</h3>
                    </div>
                </li>
                <li><span>Image 04</span>
                    <div>
                        <h3>Colorize</h3>
                    </div>
                </li>
                <li><span>Image 05</span>
                    <div>
                        <h3>Enhancement</h3>
                    </div>
                </li>
                 <li><span>Image 06</span>
                    <div>
                        <h3>Text Overlay</h3>
                    </div>
                </li>
            </ul>
        );
    }
}
