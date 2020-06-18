import React from 'react';
import { Link } from "react-router-dom";
import './index.less';

export default class Fund extends React.Component {
    render () {
        return (
            <div className='fund'>
                Fund Page
                <Link to="/bank">Bank</Link>
            </div>
        )
    }
}