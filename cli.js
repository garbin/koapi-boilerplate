#!/usr/bin/env node
var program = require('commander');
var glob    = require('glob');
var commands = './build/commands/**/*.js';
var Model   = require('koapi').Model;
var config  = require('config');
var co      = require('co');
var _       = require('lodash');

Model.init(config.knex);

if (process.env != 'production'){
  require('babel-register');
  commands = './src/commands/**/*.es';
}

glob.sync(commands).forEach(function (file, index) {
  function done(err) {
    if(err) console.error(err);
    Model.bookshelf.knex.destroy();
  }
  var cmd= require(file).default;
  if (cmd.command) {
    program.command(cmd.command);
  }
  _.keys(cmd.options).forEach(function (k) {
    program.option(k, cmd.options[k]);
  });
  if (cmd.description) program.description(cmd.description);
  if (cmd.action) program.action(function () {
    co(cmd.action.bind.apply(
              cmd.action,
              [null].concat(Array.prototype.slice.call(arguments)))).then(done).catch(done);
  });
});

program.parse(process.argv);
