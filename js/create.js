/*jslint nomen:true, node:true*/
"use strict";

var _;
_ = require('underscore');

module.exports = {
    'create': function (model, minLength) {
        var name, i, numWords;
        name = "";
        numWords = _.random(1, 2);
        for (i = 0; i < numWords; i++) {
            name = name + " " + this.generateWord(model, minLength);
        }
        return name.slice(1);
    },
    'pickStart': function (model, length) {
        var ngrams, start;
        ngrams = _.filter(_.keys(model), function(value) {
            return value.length == length; });
        start = ngrams[_.random(0, ngrams.length - 1)];
        if (start.indexOf('-') != -1) {
            return this.pickStart(model, length);
        }
        return start;
    },
    'pickNext': function(model, current) {
        if (current in model) {
            return model[current][_.random(0, model[current].length - 1)];
        } else {
            if (current.length > 1) {
                return this.pickNext(model, current.slice(1));
            }
            throw "unable to locate key in model";
        }
    },
    'generateWord': function (model, minLength) {
        var word, last, finished, next;
        finished = false;
        word =  this.pickStart(model, 2);
        last = word;
        while (!finished) {
            next = this.pickNext(model, last);
            finished = next[1];
            next = next[0];
            word = word + next;
            last = this.varyLast(word);
        }

        if (word.length < minLength) {
            return this.generateWord(model, minLength);
        }

        return word.slice(0, 1).toUpperCase() + word.slice(1);
    },
    'varyLast': function (current) {
        var length, start;

        length = _.random(0, 100);
        if (length >= 75) {
            length = 3;
        } else if (length >= 33) {
            length = 2;
        } else {
            length = 1;
        }

        start = current.length - length;
        if (start < 0) {
            start = 0;
        }
        return current.slice(start);
    },
};
