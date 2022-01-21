require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '14',
        },
        exclude: ['proposal-optional-chaining', 'proposal-nullish-coalescing-operator'],
      },
    ],
  ],
  plugins: [],
});
require('jsdom-global')('', { url: 'http://localhost/' });
require('ignore-styles').default(['.scss', '.css', '.svg', '.woff']);
process.env.TZ = 'Australia/Sydney';
