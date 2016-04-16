'use strict';

var dbm;
var type;
var seed;
var async = require('async');

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  async.series([
    db.all.bind(db, 'ALTER TABLE runs ADD COLUMN branches_id BIGINT;'),
    db.addIndex.bind(db, 'runs', 'branches_id_index', ['branches_id'], false),
  ], callback);
};

exports.down = function(db, callback) {
  db.all('ALTER TABLE runs DROP COLUMN branches_id', callback);
};
