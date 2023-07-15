const REF_NAME = process.env.GITHUB_REF_NAME;
const MAIN_BRANCH = 'main';

let config = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
  ],
  branches: [
    {
      name: MAIN_BRANCH,
      prerelease: false,
    },
    {
      name: 'release',
      prerelease: 'RC',
    },
    {
      name: 'dev',
      prerelease: 'dev',
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
