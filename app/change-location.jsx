var React = require('react');

var ChangeLocation = React.createClass({

    onSubmit: function(evt) {
        evt.preventDefault();

        var input = this.refs.addressInput.getDOMNode(),
            text = input.value;

        input.value = '';

        this.props.onUpdate(text);
    },

    render: function() {
        var address = '';

        if (this.props.location) {
            address = this.props.location.formatted_address;
        }

        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" ref="addressInput" defaultValue=""/>
                <button type="submit">Get Forecast</button>
            </form>
        );
    }

});

module.exports = ChangeLocation;
