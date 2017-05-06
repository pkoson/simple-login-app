module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['react', 'jsx-a11y', 'import', 'flowtype'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
};
