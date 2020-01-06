import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../images/logo.jpg';
import './search.less';

class Search extends React.Component {
    render () {
        return <div className='search-text'>Search Page watch change hot<img src={logo}/></div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)