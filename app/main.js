require('babel/polyfill');

var React = require('react'),
    App = React.createFactory(require('./root.jsx'));

React.render(App({ history: true }), document.getElementById('root'));
