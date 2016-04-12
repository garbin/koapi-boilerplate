#!/usr/bin/env node
var CronJob = require('cron').CronJob;
var glob    = require('glob');
var schedulers = './build/schedulers/**/*.js';
var Model   = require('koapi').Model;
var config  = require('./config');
var _       = require('lodash');

Model.init(config.knex);

if (process.env != 'production'){
  require('babel-register');
  schedulers = './src/schedulers/**/*.es';
}

var crons = [];
var total_done = 0;
var total_error = 0;
function job_done(scheduler) {
  total_done++;
  console.log('%s done: %s', scheduler.name, total_done);
}

function job_error() {
  total_error++;
  console.error('%s error: %s', scheduler.name, total_error);
}
function init(scheduler) {
  return {
    schedule: scheduler.schedule || '00 */1 * * * *',
    name: scheduler.name || 'default',
    description: scheduler.description || 'default',
    do: scheduler.do || function*(){},
    complete: scheduler.complete || function*(){}
  };
}

glob.sync(schedulers).forEach(function (file, index) {
  var scheduler = init(require(file).default);
  if (scheduler.do) {
    var job = new CronJob({
      cronTime: scheduler.schedule,
      onTick: function () {
        scheduler.do().then(job_done.bind(job, scheduler)).catch(job_error);
      },
      onComplete: function () {
        scheduler.complete().then(function(){}).catch(function(err){console.log(err);});
      },
      start: true,
    });
    console.log('%s started, schedule: %s', scheduler.name, scheduler.schedule);
    job.start();
    crons.push(job);
  }
});
