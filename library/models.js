DS.GoogleDrive = Ember.Namespace.create({
  File: DS.Model.extend({

    kind: "drive#file",

    etag: DS.attr('string'),

    alternateLink: DS.attr('string'),
    createdDate: DS.attr('string'),
    editable: DS.attr('boolean'),
    embedLink: DS.attr('string'),
    exportLinks: DS.attr('string'),
    // exportLinks: 
    //   application/pdf:
    //   application/rtf:
    //   application/vnd.oasis.opendocument.text:
    //   application/vnd.openxmlformats-officedocument.wordprocessingml.document:
    //   text/html:
    //   text/plain:
    labels: DS.attr('string'),
    //   starred:false
    //   hidden:false
    //   trashed:false
    //   restricted:false
    //   viewed:true
    lastModifyingUserName: DS.attr('string'),
    lastViewedByMeDate: DS.attr('string'),
    mimeType: DS.attr('string'),
    modifiedByMeDate: DS.attr('string'),
    modifiedDate: DS.attr('string'),
    ownerNames: DS.attr('string'),
    
    // parents: DS.attr('string'),
    //   {
    //     id: DS.attr('string')
    //     isRoot: DS.attr('boolean')
    //     kind: DS.attr('string')
    //     parentLink: DS.attr('string')
    //     selfLink: DS.attr('string')
    //   }
    // ]
    quotaBytesUsed: DS.attr('string'),
    selfLink: DS.attr('string'),
    thumbnailLink: DS.attr('string'),
    title: DS.attr('string'),
    userPermission: DS.attr('string'),
    downloadUrl: DS.attr('string'),
    //   etag: DS.attr('string')
    //   id: DS.attr('string')
    //   kind: DS.attr('string')
    //   role: DS.attr('string')
    //   selfLink: DS.attr('string')
    //   type: DS.attr('string')
    writersCanShare: DS.attr('boolean'),

    // associations
    children: DS.hasMany("DS.GoogleDrive.ChildReference"),
    parents: DS.hasMany("DS.GoogleDrive.ParentReference"),

    init: function() {
      this._super();
    },

    // toString: function() {
    //  return 'DS.GoogleDrive.File'; 
    // }

  }),

  ChildReference: DS.Model.extend({

    kind: "drive#childReference",

    etag: DS.attr('string'),

    selfLink: DS.attr('string'),
    childLink: DS.attr('string'),

    file: DS.belongsTo("DS.GoogleDrive.File"),

    init: function() {
      this._super();
    },

    toString: function() {
     return 'DS.GoogleDrive.ChildReference'; 
    }

  }),

  ParentReference: DS.Model.extend({

    kind: "drive#parentReference",

    etag: DS.attr('string'),

    selfLink: DS.attr('string'),
    parentLink: DS.attr('string'),
    isRoot: DS.attr('boolean'),

    file: DS.belongsTo("DS.GoogleDrive.File"),

    init: function() {
      this._super();
    },

    toString: function() {
     return 'DS.GoogleDrive.ParentReference'; 
    }

  })
});

