import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../images/logo.jpg';

class Search extends React.Component {
    render () {
        return <div>Search Page change<img src={logo}/></div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)