import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default {
  entry: 'app/index.js',
  format: 'umd',
  dest: 'dist/rollup.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    nodeResolve({
      //jsnext: true,
      browser: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': '"development"',
    }),
  ],
}
