var React = require('react');

var ChangeLocation = React.createClass({

    onSubmit: function() {

        this.props.onUpdate('');
    },

    render: function() {
        return (
            <form>{this.props.location.formatted_address}</form>
        );
    }

});

module.exports = ChangeLocation;
