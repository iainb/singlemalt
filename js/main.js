/*jslint nomen:true, browser:true, node:true*/
"use strict";
var single_malts, ngrams, model, create;


single_malts = require('./malts.js');
ngrams = require('./ngrams.js');
create = require('./create.js');

model = ngrams.produce(single_malts);

window.onload = function() {
    var button, name, whisky, existing;
    button = document.getElementById('button');
    whisky = document.getElementById('name');

    existing = window.location.hash.slice(1);
    if (existing === "") {
        name = create.create(model, 4);
        whisky.innerText = name;
        window.location.hash = name;
    } else {
        whisky.innerText = existing;
    }

    button.onclick = function() {
        var n;
        n = create.create(model, 4);
        whisky.innerText = n;
        window.location.hash = n;
        this.blur();
    };
};
