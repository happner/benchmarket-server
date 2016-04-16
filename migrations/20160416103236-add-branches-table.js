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

    db.all.bind(db, 'CREATE TABLE branches (' +
      'id BIGSERIAL,' +
      'created_at TIMESTAMP WITHOUT TIME ZONE,' +
      'name TEXT,' +
      'repositories_id BIGINT' +
    ')'),

    db.addIndex.bind(db, 'branches', 'branches_created_at_index', ['created_at'], false),
    db.addIndex.bind(db, 'branches', 'branches_name_index', ['name'], false),
    db.addIndex.bind(db, 'branches', 'branches_repositories_id_index', ['repositories_id'], false),
    db.addIndex.bind(db, 'branches', 'branches_name_repositories_id_index_uniq', ['name', 'repositories_id'], true),

  ], callback);

};

exports.down = function(db, callback) {
  db.dropTable('branches', callback);
};
