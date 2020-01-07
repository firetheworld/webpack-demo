import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../images/logo.jpg';
import './search.less';
import {showCommon} from '../../common';
import {usefulFn} from '../../common/useless';
import {b} from '../../tree-shaking';
class Search extends React.Component {
    render () {
        // showCommon();
    return <div className='search-text'>{usefulFn()}Search Page watch change hot<img src={logo}/></div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)