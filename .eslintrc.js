const eslintrc = {
    extends: ['eslint-config-airbnb'],
    parser: 'babel-eslint',
    plugins: ['react'],
    rules: {
        'react/prop-types': 0,
        'no-plusplus': 0,
        'react/sort-comp': 0,
        'comma-dangle': ['error', 'always-multiline'],
        'function-paren-newline': 0,
        'object-curly-newline': 0,
        'class-methods-use-this': 0,
        'no-restricted-globals': 0,
    }

}

module.exports = eslintrc;