var React = require('react');
var {Link} = require('react-router');

var ProductBox = React.createClass({
    render: function () {
        return (
            <div className="productBox">
                <h1>标题1</h1>
                <ul>
                    <li><Link to='about'>about页面</Link></li>
                    <li><Link to='inbox'>inbox</Link></li>
                </ul>
            </div>
        );
    }
});

module.exports = ProductBox;