import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
    input: `src/index.ts`,
    output: [
      { file: "dist/index.js", name: "test", format: 'iife' }
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: 'src/**',
    },
    plugins: [
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      resolve(),
      serve({
        openPage: '/index.html'
      }),
      livereload()
    ],
  }