var extend = require('lodash/object/extend'),
    forOwn = require('lodash/object/forOwn'),
    map = require('lodash/collection/map'),
    contains = require('lodash/collection/contains'),
    find = require('lodash/collection/find'),
    isNumber = require('lodash/lang/isNumber'),
    isPlainObject = require('lodash/lang/isPlainObject'),
    isArray = require('lodash/lang/isArray');

function Forecast(data) {
    extend(this, transformValues(data));
}

module.exports = Forecast;

Forecast.prototype.getDaylightHours = function(date) {
    var day = find(this.daily.data, function(day) {
        var dt = day.time;

        return date.getFullYear() === dt.getFullYear() &&
            date.getMonth() === dt.getMonth() &&
            date.getDate() === dt.getDate();
    });

    var deltaMS = day.sunsetTime - day.sunriseTime,
        millisToHours = 1000 * 60 * 60;

    return {
        sunrise: day.sunriseTime,
        sunset: day.sunsetTime,
        hours: parseFloat((deltaMS / millisToHours).toFixed(1))
    };
};

function transformValues(obj) {
    var transformed = {};

    forOwn(obj, function(value, key) {
        if (isPlainObject(value)) {
            transformed[key] = transformValues(value);
        } else if (isArray(value)) {
            transformed[key] = map(value, transformValues);
        } else if (contains(['time', 'expires', 'sunriseTime', 'sunsetTime'], key) && isNumber(value)) {
            transformed[key] = new Date(value * 1000);
        } else if (key === 'humidity' || key.toLowerCase().indexOf('probability') > -1) {
            transformed[key] = parseInt(value * 100);
        } else if (key === 'windBearing') {
            transformed[key] = parseInt(value);
            transformed.windDirection = toDirection(value);
        } else {
            transformed[key] = value;
        }
    });

    return transformed;
}

function toDirection(degrees) {
    var direction = '';

    if (degrees > 293 || degrees < 67) {
        direction += 'N';
    }

    if (degrees < 247 && degrees > 113) {
        direction += 'S';
    }

    if (degrees > 22 && degrees < 157) {
        direction += 'E';
    }

    if (degrees < 337 && degrees > 203) {
        direction += 'W';
    }

    return direction;
}
