/*jslint nomen:true, node:true*/
"use strict";

var _;

_ = require('underscore');

module.exports = {
    'splitWords': function (input) {
        return _.flatten(_.map(input, function (value) {
            return value.split(" ");
        }));
    },

    'ngrams': function (input, size, memo) {
        var cutoff;
        input = input.toLowerCase().split("");
        cutoff = input.length - size + 1;
        return _.reduce(input, function (memo, value, index, list) {
            var ngram, next;
            if (index <= cutoff) {
                ngram = list.slice(index, index + size).join('');
                next = list.slice(index + size, index + size * 2).join('');

                // add ngram to array
                if (memo[ngram] === undefined) {
                    memo[ngram] = [];
                }

                // next ngram, is this a word ending character
                memo[ngram].push([next, next.length !== size]);
            }

            return memo;
        }, memo);
    },

    'produce': function (input) {
        var self, ngrams;
        self = this;
        input = self.splitWords(input);
        ngrams = {};
        _.each(_.range(1, 4), function (size) {
            _.each(input, function (word) {
                ngrams = self.ngrams(word, size, ngrams);
            });
        });
        return ngrams;
    },
};
