module.exports = {
  disableEmoji: false,
  list: ['chore', 'fix', 'feat', 'style', 'refactor', 'docs', 'test', 'ci', 'perf'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [],
  types: {
    chore: {
      description: '杂七杂八的开发或者插件改变',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci',
    },
    docs: {
      description: '文档改变',
      emoji: '✏️',
      value: 'docs',
    },
    feat: {
      description: '添加新特性',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: 'BUG修复',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: '性能优化',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: '重构代码，不是添加新特性也不是修复BUG',
      emoji: '💡',
      value: 'refactor',
    },
    release: {
      description: 'Create a release commit',
      emoji: '🏹',
      value: 'release',
    },
    style: {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: 'Adding missing tests',
      emoji: '💍',
      value: 'test',
    },
  },
};
