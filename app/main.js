/* global APP_DATA */

/**
 * The entrypoint for the client side portion of our application.
 *
 * Creates the application and performs the initial render with
 * the data provided from the server.
 */

var React = require('react'),
    Root = React.createFactory(require('./root.jsx'));

React.render(Root(APP_DATA), document.getElementById('root'));
