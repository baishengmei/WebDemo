/**
 * Created by baishm on 2016/9/2.
 */
var React = require('react');
var ReactDOM = require("react-dom");
var {Router, Route, hashHistory} = require('react-router');

var AppComponent = require('./components/productBox');
var About = require('./components/about');
var Inbox = require('./components/inbox');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={AppComponent}>

        </Route>
        <Route path="/about" component={About} />
        <Route path="/inbox" component={Inbox} />
    </Router>,
    document.getElementById('content')
);

