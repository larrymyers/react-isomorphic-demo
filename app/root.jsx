var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin,
    Forecast = require('./forecast.jsx'),
    ChangeLocation = require('./change-location.jsx');

var Root = React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'showForecast'
    },

    render: function() {
        return this.renderCurrentRoute();
    },

    showForecast: function(params) {
        return <div>{JSON.stringify(params)}</div>;
    }

});

module.exports = Root;
