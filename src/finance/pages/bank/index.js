import React from 'react';
import { Link } from "react-router-dom";

import './index.less';

export default class Bank extends React.Component {
    render () {
        return (
            <div className='bank'>
                Bank Page
                <Link to="/fund">fund</Link>
            </div>
        )
    }
}