const { PROFILES } = require('./profiles');
const app_package = require('../package.json')



const prepare_app = (( name ) => {
  app_package.name = name
});

const deploy_app = () => {}

PROFILES.map((app) => {
  prepare_app(app.name);
  deploy_app();
});
