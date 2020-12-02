import React from 'react';
import { Link } from "react-router-dom";
import './index.less';
import {add} from './handle';

export default class Fund extends React.Component {
    render () {
        console.log(add(1,2));
        return (
            <div className='fund'>
                Fund Page
                <Link to="/bank">Bank</Link>
            </div>
        )
    }
}