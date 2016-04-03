'use strict';

var dbm;
var type;
var seed;
var async = require('async');

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {

  async.series([

    db.all.bind(db, 'CREATE TABLE testfiles (' +
      'id BIGSERIAL,' +
      'repositories_id BIGINT,' +
      'created_at TIMESTAMP WITHOUT TIME ZONE,' +
      'name TEXT,' +
      // 'last_run_global TEXT,' +
      'last_run_at TIMESTAMP WITHOUT TIME ZONE' +
    ')'),

    db.addIndex.bind(db, 'testfiles', 'testfiles_repositories_id_index', ['repositories_id'], false),
    db.addIndex.bind(db, 'testfiles', 'testfiles_name_repositories_id_index_uniq', ['name', 'repositories_id'], true),
    db.addIndex.bind(db, 'testfiles', 'testfiles_created_at_index', ['created_at'], false),
    db.addIndex.bind(db, 'testfiles', 'testfiles_name_index', ['name'], false),
 // db.addIndex.bind(db, 'testfiles', 'testfiles_last_run_global_index', ['last_run_global'], false),
    db.addIndex.bind(db, 'testfiles', 'testfiles_last_run_at_index', ['last_run_at'], false),

  ], callback);
};

exports.down = function(db, callback) {
  db.dropTable('testfiles', callback);
};
