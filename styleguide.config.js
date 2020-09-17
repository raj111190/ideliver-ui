const path = require('path');

module.exports = {
  components: 'app/js/components/**/*.{js,jsx,ts,tsx}',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleGuideWrapper'),
  },
};
