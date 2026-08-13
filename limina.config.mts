import { defineConfig } from 'limina';

export default defineConfig({
  config: {
    checkers: {
      typescript: {
        preset: 'tsgo',
        include: [
          '**/tsconfig.json',
          '.meta-updater/tsconfig.json',
        ],
        exclude: [
          'pnpm11/__utils__/tsconfig/tsconfig.json',
          'pnpm11/__typecheck__/tsconfig.json'
        ],
      },
    },

    source: {
      exclude: [
        '...',
        'nx.json',
        'vercel.json',
        'project.json',
        'tsconfig.json',
        '**/tsconfig.*.json',
        'limina.config.mts',
        'pnpm11/pnpm/artifacts/exe/**',

        'pnpm11/pnpm/*.ts',
        'pnpm11/fetching/binary-fetcher/scripts/*.ts',

        'pnpm/npm/napi/*.d.ts'
      ],
    },
  },

  source: {
    declarations: {
      ambient: [
        {
          include: [
            'pnpm11/__typings__/{index,local,typed}.d.ts',
          ],
          allowSharedAcrossOwners: true,
          allowTripleSlashReferences: true,
          reason:
            'These repository-wide declaration files are intentionally shared by multiple pnpm packages and referenced through triple-slash directives.',
        },
      ],
    },

    importAuthority: {
      allow: {
        '@pnpm/engine.pm.commands': [
          {
            include: ['pnpm11/engine/pm/commands/test/**/*.ts'],
            workspaceRootDependencies: ['@pnpm/tgz-fixtures'],
            reason:
              'These tests intentionally resolve tarball fixtures provided by the workspace root.',
          },
        ],
        '@pnpm/resolving.local-resolver': [
          {
            include: ['pnpm11/resolving/local-resolver/test/*.ts'],
            workspaceRootDependencies: ['@pnpm/tgz-fixtures'],
            reason:
              'These resolver tests intentionally consume tarball fixtures provided by the workspace root.',
          },
        ],
      },
    },
  },
});
