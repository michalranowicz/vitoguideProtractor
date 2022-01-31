var HtmlReporter = require('protractor-beautiful-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');
exports.config = {
  framework: 'jasmine2',
  specs: ['*spec.ts'],
  directConnect: true,
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--window-size=1600,900']
    }
  },
  // plugins: [{
  //   package: 'query-selector-shadow-dom/plugins/protractor'
  // }],
  
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'raport'
    }).getJasmine2Reporter());
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'tsconfig.json'
    });
  }
}
