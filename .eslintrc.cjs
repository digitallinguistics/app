// ESLint v7.23.0

module.exports = {
  extends: `.eslintrc.yml`,
  rules:   {
    'array-bracket-newline': `warn`,
    'array-bracket-spacing': [
      `error`,
      `never`,
      {
        arraysInArrays:  false,
        objectsInArrays: false,
        singleValue:     false,
      },
    ],
    'arrow-body-style': `warn`,
    'arrow-parens':     [
      `error`,
      `as-needed`,
    ],
    'arrow-spacing': `error`,
    'block-spacing': [
      `error`,
      `always`,
    ],
    'brace-style': [
      `warn`,
      `1tbs`,
      {
        allowSingleLine: true,
      },
    ],
    camelcase: [
      `warn`,
      {
        properties: `always`,
      },
    ],
    'comma-dangle': [
      `error`,
      `always-multiline`,
    ],
    'comma-spacing': [
      `error`,
      {
        after:  true,
        before: false,
      },
    ],
    'comma-style': [
      `error`,
      `last`,
    ],
    'computed-property-spacing': [
      `error`,
      `never`,
    ],
    curly: [
      `error`,
      `multi-line`,
      `consistent`,
    ],
    'dot-location': [
      `error`,
      `property`,
    ],
    'dot-notation':      `error`,
    'func-call-spacing': [
      `error`,
      `never`,
    ],
    'func-name-matching': [
      `error`,
      `always`,
    ],
    'func-names': [
      `warn`,
      `as-needed`,
    ],
    'function-paren-newline': [
      `error`,
      `multiline`,
    ],
    'generator-star-spacing': `error`,
    'grouped-accessor-pairs': [
      `error`,
      `getBeforeSet`,
    ],
    'implicit-arrow-linebreak': `error`,
    indent:                     [
      `error`,
      2,
      {
        MemberExpression: 0,
        SwitchCase:       2,
      },
    ],
    'key-spacing': [
      `error`,
      {
        afterColon:  true,
        align:       `value`,
        beforeColon: false,
        mode:        `minimum`,
      },
    ],
    'keyword-spacing': [
      `error`,
      {
        after:  true,
        before: true,
      },
    ],
    'lines-around-comment': [
      `warn`,
      {
        afterBlockComment:  false,
        afterLineComment:   false,
        allowArrayEnd:      false,
        allowArrayStart:    false,
        allowBlockEnd:      false,
        allowBlockStart:    true,
        allowObjectEnd:     false,
        allowObjectStart:   false,
        beforeBlockComment: true,
        beforeLineComment:  false,
      },
    ],
    'lines-between-class-members': [
      `warn`,
      `always`,
      {
        exceptAfterSingleLine: true,
      },
    ],
    'max-len': [
      `warn`,
      {
        code:                   120,
        ignoreComments:         true,
        ignoreStrings:          true,
        ignoreTemplateLiterals: true,
        ignoreUrls:             true,
      },
    ],
    'newline-per-chained-call': `warn`,
    'no-else-return':           `error`,
    'no-extra-parens':          `warn`,
    'no-floating-decimal':      `error`,
    'no-multi-assign':          `warn`,
    'no-multi-spaces':          [
      `error`,
      {
        exceptions: {
          AssignmentExpression: true,
          AssignmentPattern:    true,
          IfStatement:          true,
          ImportDeclaration:    true,
          ImportSpecifier:      true,
          SwitchCase:           true,
          VariableDeclaration:  true,
          VariableDeclarator:   true,
        },
        ignoreEOLComments: true,
      },
    ],
    'no-multi-str':            `error`,
    'no-multiple-empty-lines': [
      `warn`,
      {
        max: 2,
      },
    ],
    'no-nested-ternary':    `warn`,
    'no-new-object':        `warn`,
    'no-sequences':         `error`,
    'no-undef-init':        `error`,
    'no-underscore-dangle': [
      `warn`,
      {
        allow: [
          `__dirname`,
          `_ts`,
          `_etag`,
        ],
      },
    ],
    'no-unneeded-ternary': [
      `error`,
      {
        defaultAssignment: false,
      },
    ],
    'no-whitespace-before-property':    `error`,
    'nonblock-statement-body-position': [
      `error`,
      `beside`,
    ],
    'object-curly-newline': [
      `warn`,
      {
        ObjectExpression: {
          consistent:    true,
          minProperties: 4,
        },
        ObjectPattern: {
          multiline: true,
        },
      },
    ],
    'object-curly-spacing': [
      `error`,
      `always`,
      {
        arraysInObjects:  true,
        objectsInObjects: true,
      },
    ],
    'object-property-newline': [
      `warn`,
      {
        allowMultiplePropertiesPerLine: true,
      },
    ],
    'object-shorthand': `warn`,
    'one-var':          [
      `error`,
      `never`,
    ],
    'operator-assignment': [
      `error`,
      `always`,
    ],
    'operator-linebreak': [
      `error`,
      `before`,
      {
        overrides: {
          ':': `ignore`,
          '?': `ignore`,
        },
      },
    ],
    'prefer-arrow-callback': [
      `error`,
      {
        allowNamedFunctions: true,
      },
    ],
    'prefer-destructuring':       `warn`,
    'prefer-named-capture-group': `warn`,
    quotes:                       [
      `error`,
      `backtick`,
      {
        allowTemplateLiterals: true,
        avoidEscape:           true,
      },
    ],
    'rest-spread-spacing': `error`,
    'semi-spacing':        `error`,
    'semi-style':          `error`,
    'sort-imports':        [
      `warn`,
      {
        allowSeparatedGroups:  true,
        ignoreCase:            true,
        memberSyntaxSortOrder: [
          `none`,
          `all`,
          `single`,
          `multiple`,
        ],
      },
    ],
    'sort-keys': [
      `warn`,
      `asc`,
      {
        natural: true,
      },
    ],
    'sort-vars':                   `warn`,
    'space-before-blocks':         `error`,
    'space-before-function-paren': [
      `error`,
      {
        anonymous: `never`,
        named:     `never`,
      },
    ],
    'space-in-parens': `error`,
    'space-infix-ops': `error`,
    'space-unary-ops': `error`,
    'spaced-comment':  [
      `error`,
      `always`,
      {
        markers: [`*`],
      },
    ],
    'switch-colon-spacing':   `error`,
    'template-curly-spacing': [
      `warn`,
      `always`,
    ],
    'template-tag-spacing': `error`,
    'yield-star-spacing':   `error`,
  },
};
