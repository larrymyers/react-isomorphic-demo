/* global APP_DATA */

var React = require('react'),
    App = React.createFactory(require('./root.jsx')),
    initialProps = {
        history: true,
        location: APP_DATA.location,
        forecast: APP_DATA.forecast
    };

React.render(App(initialProps), document.getElementById('root'));
