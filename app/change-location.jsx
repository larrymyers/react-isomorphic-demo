var React = require('react');

var ChangeLocation = React.createClass({

    componentDidUpdate: function() {
        var input = this.refs.addressInput.getDOMNode();

        if (this.props.location) {
            input.value = this.props.location.formatted_address;
        } else {
            input.value = '';
        }
    },

    render: function() {
        var address = '';

        if (this.props.location) {
            address = this.props.location.formatted_address;
        }

        return (
            <form className="change-location" onSubmit={this.onSubmit}>
                <input type="text" ref="addressInput" defaultValue={address}/>
                <button type="submit">Get Forecast</button>
            </form>
        );
    },

    onSubmit: function(evt) {
        evt.preventDefault();

        var input = this.refs.addressInput.getDOMNode(),
            text = input.value;

        this.props.onUpdate(text);
    }

});

module.exports = ChangeLocation;
