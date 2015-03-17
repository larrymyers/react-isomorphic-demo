var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin;

export default React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'index',
        '/forecast/:state/:city': 'showForecast'
    },

    render() {
        return this.renderCurrentRoute();
    },

    index() {
        return <div>Hello World</div>;
    },

    showForecast() {

    }

});
