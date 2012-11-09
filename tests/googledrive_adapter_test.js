Ember.ENV.TESTING = true;

var get = Ember.get;
var set = Ember.set;

var adapter;
var store;
var requestUrl;
var requestType;
var requestMeta;
var requestPayload;

var file;
var File, Child, Parent;

var expectUrl = function(url, desc) {
  equal(requestUrl, url, "the URL is " + desc);
};

var expectType = function(type) {
  equal(requestType, type, "the HTTP method is " + type);
};

var expectData = function(hash) {
  deepEqual(requestHash, hash, "the meta data was passed along");
};

var expectState = function(state, value, model) {
  model = model || file;

  if (value === undefined) {
    value = true;
  }

  var flag = "is" + state.charAt(0).toUpperCase() + state.substr(1);
  equal(get(model, flag), value, "the state is " + (value === false ? "not ": "") + state);
};

module("GoogleDriveAdapter", {
  setup: function() {
    adapter = DS.GoogleDriveAdapter.create({
      clientId: 'sadfsdfasdfasdfasdf@googledrive.com',
      _request: function(url, type, hash) {
        // override the _request method to stub requests
        var success = hash.success,
        self = this;

        requestUrl = url;
        requestType = type;
        requestHash = hash;

        if (success) {
          hash.success = function(json) {
            success.call(self, json);
          };
        }
      }
    });

    store = DS.Store.create({
      adapter: adapter
    });

    File = DS.GoogleDrive.File;

    Parent = DS.GoogleDrive.ParentReference;

    Child = DS.GoogleDrive.ChildReference;
  },

  teardown: function() {
    adapter.destroy();
    store.destroy();
  }
});

test("is defined", function() {
  ok(DS.GoogleDriveAdapter !== undefined, "DS.GoogleDriveAdapter is undefined");
});

test("is a subclass of DS.Adapter", function() {
  ok(DS.Adapter.detect(DS.GoogleDriveAdapter), "GoogleDriveAdapter is a subclass of DS.Adapter");
});

test("finding a file makes a GET to /drive/v2/files/:id", function() {
  file = store.find(File, 1);

  expectState('loaded', false);
  expectUrl('/drive/v2/files/1');
  expectType('GET')

  requestHash.success({
    id: 1,
    title: 'Necronomicon'
  });

  expectState('loaded', true);
  expectState('dirty', false);

  equal(file.get('id'), 1);
  equal(file.get('title'), 'Necronomicon');
});

test("createing a file makes POST to /drive/v2/files/", function() {
  file = store.createRecord(File, {
    title: 'Illuminati'
  });

  expectState('new');
  store.commit();
  expectState('saving');

  expectUrl('/drive/v2/files');
  expectType('POST');
  // expectData({
  //   title: 'Illuminati'
  // });

  requestHash.success({
    id: "1",
    title: 'Illuminati'
  });

  expectState('saving', false);
  expectState('loaded', true);
  expectState('dirty', false);

  equal(file, store.find(File, 1), "it's possible to find the file by the returned ID");
});

test("updating a file makes ...", function() {

});

test("deleting a file makes ...", function() {

});

test("findMany makes ...", function() {

});

test("findAll makes ...", function() {

});

test("hasMany relationship dirties parent if child is added", function() {

});

test("hasMany relationship dirties parent if child is removed", function() {

});

test("hasMany relationship dirties child if child is added", function() {

});

test("hasMany relationship dirties parent if child is updated", function() {

});

test("hasMany relationship dirties parent if child is updated", function() {

});

test("belongsTo relationship dirties if item is deleted", function() {

});

test("belongsTo relationship dirties item if item is updated", function() {

});

