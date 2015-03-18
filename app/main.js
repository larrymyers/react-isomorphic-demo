/* global APP_DATA */

var React = require('react'),
    Root = React.createFactory(require('./root.jsx'));

React.render(Root(APP_DATA), document.getElementById('root'));
