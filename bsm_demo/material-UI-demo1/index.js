/**
 * Created by baishm on 2016/10/10.
 */
var React = require('react');
var AppBar = require('material-ui/AppBar');

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const AppBarExampleIcon = () => (
    <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
);

var ele = document.getElementById("contain");
ReactDOM.render(
    <AppBarExampleIcon/>,
    ele
)