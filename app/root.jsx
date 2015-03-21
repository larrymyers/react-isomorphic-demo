var React = require('react'),
    Forecast = require('../lib/forecast'),
    ForecastView = require('./forecast.jsx'),
    ChangeLocation = require('./change-location.jsx'),
    querystring = require('querystring'),
    request = require('superagent');

var Root = React.createClass({

    getInitialState: function() {
        var props = this.props;

        return {
            location: props.location,
            forecast: new Forecast(props.forecast)
        };
    },

    componentDidMount: function() {
        window.addEventListener('popstate', this.onPopState, false);
    },

    componentWillUnmount: function() {
        window.removeEventListener('popstate', this.onPopState);
    },

    render: function() {
        var state = this.state;

        return (
            <div>
                <ChangeLocation location={state.location} onUpdate={this.onChangeLocation}/>
                <ForecastView forecast={state.forecast}/>
            </div>
        );
    },

    getForecast: function(address) {
        var self = this;

        request.get('/api/forecast').query({ address: address }).end(function(err, res) {
            self.setState(new Forecast(res.body));
        });
    },

    onPopState: function() {
        var params = querystring.parse(window.location.search.slice(1)),
            address = params.address;

        this.getForecast(address);
    },

    onChangeLocation: function(address) {
        window.history.pushState(null, '', '/?' + querystring.stringify({ address: address }));
        this.getForecast(address);
    }

});

module.exports = Root;
