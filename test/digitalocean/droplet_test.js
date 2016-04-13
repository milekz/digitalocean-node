'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var digitalocean = require('../../lib/digitalocean');
var token = testUtils.getUserDigitalOceanToken();
var client = digitalocean.client(token);

describe('droplet endpoints', function() {
  describe('list', function() {
    var data = {
      "droplets": [
        {
          "id": 19,
          "name": "test.example.com",
          "memory": 1024,
          "vcpus": 2,
          "disk": 20,
          "region": {
            "slug": "nyc1",
            "name": "New York",
            "sizes": [
              "1024mb",
              "512mb"
            ],
            "available": true,
            "features": [
              "virtio",
              "private_networking",
              "backups",
              "ipv6"
            ]
          },
          "image": {
            "id": 119192817,
            "name": "Ubuntu 13.04",
            "distribution": "ubuntu",
            "slug": "ubuntu1304",
            "public": true,
            "regions": [
              "nyc1"
            ],
            "created_at": "2014-07-29T14:35:36Z"
          },
          "size_slug": "1024mb",
          "locked": false,
          "status": "active",
          "networks": {
            "v4": [
              {
                "ip_address": "10.0.0.19",
                "netmask": "255.255.0.0",
                "gateway": "10.0.0.1",
                "type": "private"
              },
              {
                "ip_address": "127.0.0.19",
                "netmask": "255.255.255.0",
                "gateway": "127.0.0.20",
                "type": "public"
              }
            ],
            "v6": [
              {
                "ip_address": "2001::13",
                "cidr": 124,
                "gateway": "2400:6180:0000:00D0:0000:0000:0009:7000",
                "type": "public"
              }
            ]
          },
          "kernel": {
            "id": 485432985,
            "name": "DO-recovery-static-fsck",
            "version": "3.8.0-25-generic"
          },
          "created_at": "2014-07-29T14:35:36Z",
          "features": [
            "ipv6"
          ],
          "backup_ids": [
            449676382
          ],
          "snapshot_ids": [
            449676383
          ],
          "droplet_ids": [

          ]
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('returns droplets', function() {
      testUtils.api.get('/v2/droplets').reply(200, JSON.stringify(data));

      client.droplets.list(function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });

    it('returns droplets at page', function() {
      testUtils.api.get('/v2/droplets?page=2').reply(200, JSON.stringify(data));

      client.droplets.list(2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });

    it('returns droplets at page with length', function() {
      testUtils.api.get('/v2/droplets?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.list(2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });
  });

  describe('create', function() {
    var data_singular = {
      "droplet": {
        "id": 19,
        "name": "name",
        "memory": 1024,
        "vcpus": 2,
        "disk": 20,
        "region": {
          "slug": "nyc1",
          "name": "New York",
          "sizes": [
            "1024mb",
            "512mb"
          ],
          "available": true,
          "features": [
            "virtio",
            "private_networking",
            "backups",
            "ipv6"
          ]
        },
        "image": {
          "id": 1,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": "ubuntu1304",
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:37Z"
        },
        "size_slug": "1gb",
        "locked": false,
        "status": "new",
        "networks": {
          "v4": [
            {
              "ip_address": "10.0.0.19",
              "netmask": "255.255.0.0",
              "gateway": "10.0.0.1",
              "type": "private"
            },
            {
              "ip_address": "127.0.0.19",
              "netmask": "255.255.255.0",
              "gateway": "127.0.0.20",
              "type": "public"
            }
          ],
          "v6": [
            {
              "ip_address": "2001::13",
              "cidr": 124,
              "gateway": "2400:6180:0000:00D0:0000:0000:0009:7000",
              "type": "public"
            }
          ]
        },
        "kernel": {
          "id": 485432985,
          "name": "DO-recovery-static-fsck",
          "version": "3.8.0-25-generic"
        },
        "created_at": "2014-07-29T14:35:37Z",
        "features": [
          "ipv6"
        ],
        "backup_ids": [],
        "snapshot_ids": [],
        "action_ids": []
      }
    };

    var data_multiple = {
      "droplets": [{
        "id": 19,
        "name": "name1",
        "memory": 1024,
        "vcpus": 2,
        "disk": 20,
        "region": {
          "slug": "nyc1",
          "name": "New York",
          "sizes": [
            "1024mb",
            "512mb"
          ],
          "available": true,
          "features": [
            "virtio",
            "private_networking",
            "backups",
            "ipv6"
          ]
        },
        "image": {
          "id": 1,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": "ubuntu1304",
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:37Z"
        },
        "size_slug": "1gb",
        "locked": false,
        "status": "new",
        "networks": {
          "v4": [
            {
              "ip_address": "10.0.0.19",
              "netmask": "255.255.0.0",
              "gateway": "10.0.0.1",
              "type": "private"
            },
            {
              "ip_address": "127.0.0.19",
              "netmask": "255.255.255.0",
              "gateway": "127.0.0.20",
              "type": "public"
            }
          ],
          "v6": [
            {
              "ip_address": "2001::13",
              "cidr": 124,
              "gateway": "2400:6180:0000:00D0:0000:0000:0009:7000",
              "type": "public"
            }
          ]
        },
        "kernel": {
          "id": 485432985,
          "name": "DO-recovery-static-fsck",
          "version": "3.8.0-25-generic"
        },
        "created_at": "2014-07-29T14:35:37Z",
        "features": [
          "ipv6"
        ],
        "backup_ids": [],
        "snapshot_ids": [],
        "action_ids": []
      }]
    };

    it('creates the droplet', function() {
      var attributes = {
        name: 'name',
        region: 'nyc1',
        size: '1gb',
        image: 1
      };

      testUtils.api.post('/v2/droplets', attributes).reply(202, data_singular);

      client.droplets.create(attributes, function(err, droplet, headers) {
        expect(droplet).to.be.eql(data_singular.droplet);
      });
    });

    it('creates duplicate droplets', function() {
      var attributes = {
        names: ['name1'],
        region: 'nyc1',
        size: '1gb',
        image: 1
      };

      testUtils.api.post('/v2/droplets', attributes).reply(202, data_multiple);

      client.droplets.create(attributes, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data_multiple.droplets);
      });
    });
  });

  describe('get', function() {
    var data = {
      "droplet": {
        "id": 19,
        "name": "test.example.com",
        "memory": 1024,
        "vcpus": 2,
        "disk": 20,
        "region": {
          "slug": "nyc1",
          "name": "New York",
          "sizes": [
            "1024mb",
            "512mb"
          ],
          "available": true,
          "features": [
            "virtio",
            "private_networking",
            "backups",
            "ipv6"
          ]
        },
        "image": {
          "id": 119192817,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": "ubuntu1304",
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:37Z"
        },
        "size_slug": "1024mb",
        "locked": false,
        "status": "active",
        "networks": {
          "v4": [
            {
              "ip_address": "10.0.0.19",
              "netmask": "255.255.0.0",
              "gateway": "10.0.0.1",
              "type": "private"
            },
            {
              "ip_address": "127.0.0.19",
              "netmask": "255.255.255.0",
              "gateway": "127.0.0.20",
              "type": "public"
            }
          ],
          "v6": [
            {
              "ip_address": "2001::13",
              "cidr": 124,
              "gateway": "2400:6180:0000:00D0:0000:0000:0009:7000",
              "type": "public"
            }
          ]
        },
        "kernel": {
          "id": 485432985,
          "name": "DO-recovery-static-fsck",
          "version": "3.8.0-25-generic"
        },
        "created_at": "2014-07-29T14:35:37Z",
        "features": [
          "ipv6"
        ],
        "backup_ids": [
          449676382
        ],
        "snapshot_ids": [
          449676383
        ],
        "action_ids": [

        ]
      }
    };

    it('returns the droplet', function() {
      testUtils.api.get('/v2/droplets/123').reply(200, JSON.stringify(data));

      client.droplets.get(123, function(err, droplet, headers) {
        expect(droplet).to.be.eql(data.droplet);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar').reply(200, JSON.stringify(data));

      client.droplets.get('foo/bar', function(err, droplet, headers) {
        expect(droplet).to.be.eql(data.droplet);
      });
    });
  });

  describe('kernels', function() {
    var data = {
      "kernels": [
        {
          "id": 231,
          "name": "DO-recovery-static-fsck",
          "version": "3.8.0-25-generic"
        }
      ],
      "links": {
        "pages": {
          "last": "https://api.digitalocean.com/v2/droplets/3164494/kernels?page=124&per_page=1",
          "next": "https://api.digitalocean.com/v2/droplets/3164494/kernels?page=2&per_page=1"
        }
      },
      "meta": {
        "total": 1
      }
    };

    it('lists droplet kernels', function() {
      testUtils.api.get('/v2/droplets/123/kernels').reply(200, JSON.stringify(data));

      client.droplets.kernels(123, function(err, kernels, headers) {
        expect(kernels).to.be.eql(data.kernels);
      });
    });

    it('lists droplet kernels at page', function() {
      testUtils.api.get('/v2/droplets/123/kernels?page=2').reply(200, JSON.stringify(data));

      client.droplets.kernels(123, 2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.kernels);
      });
    });

    it('lists droplet kernels at page with length', function() {
      testUtils.api.get('/v2/droplets/123/kernels?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.kernels(123, 2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.kernels);
      });
    });

    it('lists droplet kernels with a query object', function() {
      testUtils.api.get('/v2/droplets/123/kernels?page=1&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.kernels(123, {
        page: 1,
        per_page: 1
      }, function(err, kernels, headers) {
        expect(kernels).to.be.eql(data.kernels);
      });
    });
  });

  describe('snapshots', function() {
    var data = {
      "snapshots": [
        {
          "id": 119192817,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": null,
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:40Z",
          "type": "snapshot"
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('lists droplet snapshots', function() {
      testUtils.api.get('/v2/droplets/123/snapshots').reply(200, JSON.stringify(data));

      client.droplets.snapshots(123, function(err, snapshots, headers) {
        expect(snapshots).to.be.eql(data.snapshots);
      });
    });

    it('lists droplet snapshots at page', function() {
      testUtils.api.get('/v2/droplets/123/snapshots?page=2').reply(200, JSON.stringify(data));

      client.droplets.snapshots(123, 2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.snapshots);
      });
    });

    it('lists droplet snapshots at page with length', function() {
      testUtils.api.get('/v2/droplets/123/snapshots?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.snapshots(123, 2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.snapshots);
      });
    });

    it('lists droplet snapshots with a query object', function() {
      testUtils.api.get('/v2/droplets/123/snapshots?page=1&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.snapshots(123, {
        page: 1,
        per_page: 1
      }, function(err, snapshots, headers) {
        expect(snapshots).to.be.eql(data.snapshots);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar/snapshots').reply(200, JSON.stringify(data));

      client.droplets.snapshots('foo/bar', function(err, snapshots, headers) {
        expect(snapshots).to.be.eql(data.snapshots);
      });
    });
  });

  describe('backups', function() {
    var data = {
      "backups": [
        {
          "id": 119192817,
          "name": "Ubuntu 13.04",
          "distribution": "ubuntu",
          "slug": null,
          "public": true,
          "regions": [
            "nyc1"
          ],
          "created_at": "2014-07-29T14:35:40Z",
          "type": "backup"
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('lists droplet backups', function() {
      testUtils.api.get('/v2/droplets/123/backups').reply(200, JSON.stringify(data));

      client.droplets.backups(123, function(err, backups, headers) {
        expect(backups).to.be.eql(data.backups);
      });
    });

    it('lists droplet backups at page', function() {
      testUtils.api.get('/v2/droplets/123/backups?page=2').reply(200, JSON.stringify(data));

      client.droplets.backups(123, 2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.backups);
      });
    });

    it('lists droplet backups at page with length', function() {
      testUtils.api.get('/v2/droplets/123/backups?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.backups(123, 2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.backups);
      });
    });

    it('lists droplet backups with a query object', function() {
      testUtils.api.get('/v2/droplets/123/backups?page=1&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.backups(123, {
        page: 1,
        per_page: 1
      }, function(err, backups, headers) {
        expect(backups).to.be.eql(data.backups);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar/backups').reply(200, JSON.stringify(data));

      client.droplets.backups('foo/bar', function(err, backups, headers) {
        expect(backups).to.be.eql(data.backups);
      });
    });
  });

  describe('neighbors', function() {
    var data = {
      "droplets": [
        {
          "id": 19,
          "name": "test.example.com",
          "memory": 1024,
          "vcpus": 2,
          "disk": 20,
          "region": {
            "slug": "nyc1",
            "name": "New York",
            "sizes": [
              "1024mb",
              "512mb"
            ],
            "available": true,
            "features": [
              "virtio",
              "private_networking",
              "backups",
              "ipv6"
            ]
          },
          "image": {
            "id": 119192817,
            "name": "Ubuntu 13.04",
            "distribution": "ubuntu",
            "slug": "ubuntu1304",
            "public": true,
            "regions": [
              "nyc1"
            ],
            "created_at": "2014-07-29T14:35:36Z"
          },
          "size_slug": "1024mb",
          "locked": false,
          "status": "active",
          "networks": {
            "v4": [
              {
                "ip_address": "10.0.0.19",
                "netmask": "255.255.0.0",
                "gateway": "10.0.0.1",
                "type": "private"
              },
              {
                "ip_address": "127.0.0.19",
                "netmask": "255.255.255.0",
                "gateway": "127.0.0.20",
                "type": "public"
              }
            ],
            "v6": [
              {
                "ip_address": "2001::13",
                "cidr": 124,
                "gateway": "2400:6180:0000:00D0:0000:0000:0009:7000",
                "type": "public"
              }
            ]
          },
          "kernel": {
            "id": 485432985,
            "name": "DO-recovery-static-fsck",
            "version": "3.8.0-25-generic"
          },
          "created_at": "2014-07-29T14:35:36Z",
          "features": [
            "ipv6"
          ],
          "backup_ids": [
            449676382
          ],
          "snapshot_ids": [
            449676383
          ],
          "droplet_ids": [

          ]
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('lists droplet neighbors', function() {
      testUtils.api.get('/v2/droplets/123/neighbors').reply(200, JSON.stringify(data));

      client.droplets.neighbors(123, function(err, neighbors, headers) {
        expect(neighbors).to.be.eql(data.droplets);
      });
    });

    it('lists droplet neighbors at page', function() {
      testUtils.api.get('/v2/droplets/123/neighbors?page=2').reply(200, JSON.stringify(data));

      client.droplets.neighbors(123, 2, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });

    it('lists droplet neighbors at page with length', function() {
      testUtils.api.get('/v2/droplets/123/neighbors?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.neighbors(123, 2, 1, function(err, droplets, headers) {
        expect(droplets).to.be.eql(data.droplets);
      });
    });

    it('lists droplet neighbors with a query object', function() {
      testUtils.api.get('/v2/droplets/123/neighbors?page=1&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.neighbors(123, {
        page: 1,
        per_page: 1
      }, function(err, neighbors, headers) {
        expect(neighbors).to.be.eql(data.droplets);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar/neighbors').reply(200, JSON.stringify(data));

      client.droplets.neighbors('foo/bar', function(err, neighbors, headers) {
        expect(neighbors).to.be.eql(data.droplets);
      });
    });
  });

  describe('delete', function() {
    it('deletes the droplet', function() {
      testUtils.api.delete('/v2/droplets/123').reply(204, '');

      client.droplets.delete(123, function(err) {
        expect(err).to.be.null;
      });
    });

    it('escapes the name', function() {
      testUtils.api.delete('/v2/droplets/foo%2Fbar').reply(204, '');

      client.droplets.delete('foo/bar', function(err) {
        expect(err).to.be.null;
      });
    });
  });

  describe('deleteByTag', function() {
    it('deletes the droplet', function() {
      testUtils.api.delete('/v2/droplets', { tag_name: 'awesome' }).reply(204, '');

      client.droplets.deleteByTag('awesome', function(err) {
        expect(err).to.be.null;
      });
    });
  });

  describe('listActions', function() {
    var data = {
      "actions": [
        {
          "id": 19,
          "status": "in-progress",
          "type": "create",
          "started_at": "2014-07-29T14:35:39Z",
          "completed_at": null,
          "resource_id": 24,
          "resource_type": "droplet",
          "region_slug": "nyc1",
          "region": {
            "name": "New York",
            "slug": "nyc1",
            "available": true,
            "sizes": ["512mb"],
            "features": ["virtio", "private_networking", "backups", "ipv6", "metadata"]
          }
        }
      ],
      "meta": {
        "total": 1
      }
    };

    it('lists droplet actions', function() {
      testUtils.api.get('/v2/droplets/123/actions').reply(200, JSON.stringify(data));

      client.droplets.listActions(123, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists droplet actions at page', function() {
      testUtils.api.get('/v2/droplets/123/actions?page=2').reply(200, JSON.stringify(data));

      client.droplets.listActions(123, 2, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists droplet actions at page with length', function() {
      testUtils.api.get('/v2/droplets/123/actions?page=2&per_page=1').reply(200, JSON.stringify(data));

      client.droplets.listActions(123, 2, 1, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('lists droplet actions with a query object', function() {
      testUtils.api.get('/v2/droplets/123/actions?page=1&per_page=2').reply(200, JSON.stringify(data));

      client.droplets.listActions(123, {
        page: 1,
        per_page: 2
      }, function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar/actions').reply(200, JSON.stringify(data));

      client.droplets.listActions('foo/bar', function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });
  });

  describe('getAction', function() {
    var data = {
      "action": {
        "id": 123,
        "status": "in-progress",
        "type": "test",
        "started_at": "2014-07-29T14:35:27Z",
        "completed_at": null,
        "resource_id": null,
        "resource_type": "backend",
        "region_slug": "nyc1",
        "region": {
          "name": "New York",
          "slug": "nyc1",
          "available": true,
          "sizes": ["512mb"],
          "features": ["virtio", "private_networking", "backups", "ipv6", "metadata"]
        }
      }
    };

    it('returns the action', function() {
      testUtils.api.get('/v2/droplets/123/actions/123').reply(200, JSON.stringify(data));

      client.droplets.getAction(123, 123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.get('/v2/droplets/foo%2Fbar/actions/foo%2Fbar').reply(200, JSON.stringify(data));

      client.droplets.getAction('foo/bar', 'foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('shutdown', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "shutdown",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'shutdown' }).reply(201, data);

      client.droplets.shutdown(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'shutdown' }).reply(201, data);

      client.droplets.shutdown('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('powerOff', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "power_off",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'power_off' }).reply(201, data);

      client.droplets.powerOff(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'power_off' }).reply(201, data);

      client.droplets.powerOff('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('powerOn', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "power_on",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'power_on' }).reply(201, data);

      client.droplets.powerOn(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'power_on' }).reply(201, data);

      client.droplets.powerOn('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('powerCycle', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "power_cycle",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'power_cycle' }).reply(201, data);

      client.droplets.powerCycle(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'power_cycle' }).reply(201, data);

      client.droplets.powerCycle('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('reboot', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "reboot",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'reboot' }).reply(201, data);

      client.droplets.reboot(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'reboot' }).reply(201, data);

      client.droplets.reboot('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('enableBackups', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "enable_backups",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'enable_backups' }).reply(201, data);

      client.droplets.enableBackups(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'enable_backups' }).reply(201, data);

      client.droplets.enableBackups('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('disableBackups', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "disable_backups",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'disable_backups' }).reply(201, data);

      client.droplets.disableBackups(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'disable_backups' }).reply(201, data);

      client.droplets.disableBackups('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('passwordReset', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "password_reset",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'password_reset' }).reply(201, data);

      client.droplets.passwordReset(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'password_reset' }).reply(201, data);

      client.droplets.passwordReset('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('enableIPv6', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "enable_ipv6",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'enable_ipv6' }).reply(201, data);

      client.droplets.enableIPv6(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'enable_ipv6' }).reply(201, data);

      client.droplets.enableIPv6('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('enablePrivateNetworking', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "enable_private_networking",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action', function() {
      testUtils.api.post('/v2/droplets/123/actions', { type: 'enable_private_networking' }).reply(201, data);

      client.droplets.enablePrivateNetworking(123, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions', { type: 'enable_private_networking' }).reply(201, data);

      client.droplets.enablePrivateNetworking('foo/bar', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('resize', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "resize",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        size: '64gb'
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'resize', size: '64gb' }
      ).reply(201, data);

      client.droplets.resize(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a size name', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'resize', size: '64gb' }
      ).reply(201, data);

      client.droplets.resize(123, '64gb', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions',
        { type: 'resize', size: '64gb' }
      ).reply(201, data);

      client.droplets.resize('foo/bar', '64gb', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('rename', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "rename",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        name: 'foo'
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'rename', name: 'foo' }
      ).reply(201, data);

      client.droplets.rename(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a name', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'rename', name: 'foo' }
      ).reply(201, data);

      client.droplets.rename(123, 'foo', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions',
        { type: 'rename', name: 'foo' }
      ).reply(201, data);

      client.droplets.rename('foo/bar', 'foo', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('snapshot', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "snapshot",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        name: 'foo'
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'snapshot', name: 'foo' }
      ).reply(201, data);

      client.droplets.snapshot(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a name', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'snapshot', name: 'foo' }
      ).reply(201, data);

      client.droplets.snapshot(123, 'foo', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions',
        { type: 'snapshot', name: 'foo' }
      ).reply(201, data);

      client.droplets.snapshot('foo/bar', 'foo', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('restore', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "restore",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        image: 12345
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'restore', image: 12345 }
      ).reply(201, data);

      client.droplets.restore(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a image', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'restore', image: 12345 }
      ).reply(201, data);

      client.droplets.restore(123, 12345, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions',
        { type: 'restore', image: 12345 }
      ).reply(201, data);

      client.droplets.restore('foo/bar', 12345, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('rebuild', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "rebuild",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        image: 'ubuntu-14-04-x64'
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'rebuild', image: 'ubuntu-14-04-x64' }
      ).reply(201, data);

      client.droplets.rebuild(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a image', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'rebuild', image: 'ubuntu-14-04-x64' }
      ).reply(201, data);

      client.droplets.rebuild(123, 'ubuntu-14-04-x64', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions',
        { type: 'rebuild', image: 'ubuntu-14-04-x64' }
      ).reply(201, data);

      client.droplets.rebuild('foo/bar', 'ubuntu-14-04-x64', function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('changeKernel', function() {
    var data = {
      "action": {
        "id": 36804751,
        "status": "in-progress",
        "type": "changeKernel",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }
    };

    it('creates the action with a parameters hash', function() {
      var parameters = {
        kernel: 12345
      };

      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'change_kernel', kernel: 12345 }
      ).reply(201, data);

      client.droplets.changeKernel(123, parameters, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('creates the action with a kernel', function() {
      testUtils.api.post('/v2/droplets/123/actions',
        { type: 'change_kernel', kernel: 12345 }
      ).reply(201, data);

      client.droplets.changeKernel(123, 12345, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });

    it('escapes the name', function() {
      testUtils.api.post('/v2/droplets/foo%2Fbar/actions',
        { type: 'change_kernel', kernel: 12345 }
      ).reply(201, data);

      client.droplets.changeKernel('foo/bar', 12345, function(err, action, headers) {
        expect(action).to.be.eql(data.action);
      });
    });
  });

  describe('actionByTag', function() {
    var data = {
      "actions": [{
        "id": 36804751,
        "status": "in-progress",
        "type": "enable_private_networking",
        "started_at": "2014-11-14T16:31:07Z",
        "completed_at": null,
        "resource_id": 123,
        "resource_type": "droplet",
        "region": "nyc3",
        "region_slug": "nyc3"
      }]
    };

    it('creates the actions', function() {
      testUtils.api.post('/v2/droplets/actions', { tag_name: 'foo', type: 'enable_private_networking' }).reply(201, data);

      client.droplets.actionByTag('foo', 'enable_private_networking', function(err, actions, headers) {
        expect(actions).to.be.eql(data.actions);
      });
    });
  });
});