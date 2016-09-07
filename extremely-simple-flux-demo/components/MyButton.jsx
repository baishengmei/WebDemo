var React = require('react');

// var MyButton = function(props) {
//   var items = props.items;
//   var itemHtml = items.map(function (listItem, i) {
//     return <li key={i}>{listItem}</li>;
//   });
//
//   return <div>
//     <ul>{itemHtml}</ul>
//     <button onClick={props.onClick}>New Item</button>
//   </div>;
// };


var MyButton = React.createClass({
  render: function () {
    return (
        <div>
          <ul>
            {this.props.items.map(function (listItem, i) {
              return <li key={"item"+i}>{listItem}</li>
            })}
          </ul>
          <button onClick={this.props.onClick}>按钮</button>
        </div>
    )
  }
});
module.exports = MyButton;