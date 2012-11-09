DS.GoogleDriveAdapter = DS.Adapter.extend({
  // the default scope, override in init function when scopes are passed to create method
  scopes: 'https://www.googleapis.com/auth/drive',
  // has to be set upon create
  clientId: null,

  _request: function(url, type, hash) {
    var request = gapi.client.request({
      'path': url,
      'method': type,
    });

    request.execute( function (result) {
      hash.success(result);
    });
  },

  request: function(url, type, hash) {
    return this._request(url, type, hash);
  },

  _loadMany: function(store, type, items) {
    store.loadMany(type, items);
  },

  find: function(store, type, id) {
    var root = this.rootForType(type);

    this.request(this.buildURL(root, id), 'GET', {
      success: function(data) {
        this._loadMany(store, type, [data]);
      }
    });
  },

  createRecord: function(store, type, record) {
    var root = this.rootForType(type);

    var data = this.toJSON(record);

    this.request(this.buildURL(root), 'POST', {
      data: data,
      context: this,
      success: function(hash) {
        store.didSaveRecord(record, hash);
      }
    });
  },

  updateRecord: function(store, type, record) {
    throw "Not implemented yet!";
  },

  deleteRecord: function(store, type, record) {
    throw "Not implemented yet!";
  },

  // HELPERS

  pluralize: function(name) {
    return name + "s";
  },

  rootForType: function(type) {
    // use the last part of the name as the URL
    var parts = type.toString().split(".");
    var name = parts[parts.length - 1];
    var result = name.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
    Em.Logger.log(result);
    return result;
  },

  buildURL: function(record, suffix) {
    // start with the drive base url
    var url = ['/drive/v2'];

    Ember.assert("Record URL (" + record + ") must not start with slash", !record || record.toString().charAt(0) !== "/");
    Ember.assert("URL suffix (" + suffix + ") must not start with slash", !suffix || suffix.toString().charAt(0) !== "/");

    url.push(this.pluralize(record));
    if (suffix !== undefined) {
      url.push(suffix);
    }

    return url.join("/");
  }


  // IMPLEMENT LATER

  // findMany: function(store, type, ids) {
  //   throw "Not implemented yet!";
  // },

  // findQuery: function(store, type, query, modelArray) {
  //   throw "Not implemented yet!";
  // },

  // findAll: function(store, type) {
  //   throw "Not implemented yet!";
  // },

  
});