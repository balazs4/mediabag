module.exports = {
  apps: [
    {
      name: 'mediabag-db',
      cwd: '/srv/rest-flat-file-db/',
      script: 'npm',
      args: ['run', 'start'],
      env: {
        DEBUG: 'rest-flat',
        PORT: 4242,
        DB: '/srv/.database/mediabag-db.json'
      }
    },
    {
      name: 'mediaklikk-live-proxy',
      cwd: '/srv/mediaklikk-live-proxy/',
      script: 'npm',
      args: ['run', 'start'],
      env: {
        DEBUG: 'mediaklikk',
        PORT: 12345
      }
    },
    //{
    //  name: 'rtlmost-proxy',
    //  cwd: '/srv/rtlmost-proxy/',
    //  script: 'npm',
    //  args: ['run', 'start'],
    //  env: {
    //    PORT: 12367
    //  }
    //},
    {
      name: 'mediabag',
      cwd: '/srv/mediabag/',
      script: 'npm',
      args: ['run', 'start'],
      env: {
        PORT: 9999,
        DB: 'http://piserver:8080/mediabag/db',
        SERVE: 'http://piserver:8080/mediabag/serve'
      }
    },
    {
      name: 'mediabag-serve',
      cwd: '/srv/mediabag-serve/',
      script: 'npm',
      args: ['run', 'start'],
      env: {
        PORT: 9998,
        FOLDER: '/mnt/ssd/videos'
      }
    }
  ]
};
