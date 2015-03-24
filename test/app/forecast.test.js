/* global describe: true, it: true */

require('node-jsx').install({ extension: '.jsx' });

var React = require('react'),
    Forecast = React.createFactory(require('../../app/forecast.jsx')),
    assert = require('assert');

describe('Forecast Component', function() {

    it('Should render "Choose a city!" when no forecast data is available.', function() {
        var html = React.renderToStaticMarkup(Forecast());

        assert.equal(html, '<div>Choose a city!</div>');
    });

});
