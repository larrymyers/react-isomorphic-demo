var React = require('react');

var Forecast = React.createClass({

    render: function() {
        var forecast = this.props.forecast,
            current;

        if (!forecast || !forecast.currently) {
            return <div>Choose a city!</div>;
        }

        current = forecast.currently;

        return (
            <div className="forecast">
                <div className="current-temp">Currently {current.temperature}&deg;</div>
                <div>
                    <dl>
                        <dt>Feels Like</dt><dd>{current.apparentTemperature}&deg;</dd>
                        <dt>Humidity</dt><dd>{current.humidity}&#37;</dd>
                        <dt>Wind Speed</dt><dd>{current.windSpeed} mph {current.windDirection}</dd>
                    </dl>
                </div>
            </div>
        );
    }

});

module.exports = Forecast;
