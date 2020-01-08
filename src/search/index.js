import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../images/logo.jpg';
import './search.less';
import {showCommon} from '../../common';
import {usefulFn} from '../../common/useless';
import {b} from '../../tree-shaking';

class Search extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
             Text: null
         }
    }

    showText = () => {
        import('./text').then(Text => {
            this.setState({Text: Text.default});
        })
    }

    render () {
        // showCommon();
        const {Text} = this.state;
    return (
        <div className='search-text'>
            {usefulFn()}Search Page watch change hot
            {
                Text ? <div>动态：<Text /></div> : null
            }
            <img src={logo} onClick={this.showText} />
        </div>
    )
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)