var React = require('react');

var Forecast = React.createClass({

    render: function() {
        var forecast = this.props.forecast;

        return <div>{forecast.currently.temperature}</div>;
    }

});

module.exports = Forecast;
