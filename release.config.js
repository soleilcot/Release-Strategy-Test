const REF_NAME = process.env.GITHUB_REF_NAME;
const MAIN_BRANCH = 'main';

let config = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@saithodev/semantic-release-backmerge',
      {
        backmergeBranches: [
          { from: 'main', to: 'release' },
          { from: 'main', to: 'dev' },
          { from: 'release', to: 'dev' },
        ],
      },
    ],
  ],
  branches: [
    {
      name: MAIN_BRANCH,
      prerelease: false,
    },
    {
      name: '+([0-9])?(.{+([0-9]),x}).x',
    },
    {
      name: 'release',
      prerelease: 'RC',
      options: { tagFormat: `v\${version}`, debug: true },
    },
    {
      name: 'dev',
      prerelease: 'dev',
      options: { tagFormat: `v\${version}`, debug: true },
    },
  ],
};

if (config.branches.some((it) => it.name === REF_NAME && !it.prerelease)) {
  config.plugins.push(
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}',
      },
    ]
  );
}

module.exports = config;
