const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('@rollup/plugin-babel')
const json = require('rollup-plugin-json')
const terser = require('@rollup/plugin-terser')

const inputPath = path.resolve(__dirname,'./src/index.js')
const outPath = path.relative(__dirname,'./dist/imooc.datav.prod.js')
module.exports = {
    input:inputPath,
    output:[
        {
            file:outPath,
            name:'imooc-datav',
            format:'umd'
        }
    ],
    plugins:[
        resolve(),
        commonjs(),
        json(),
        babel({
            exclude:'node_mudules/**'
        }),
        terser()
    ],
    
    external:['vue']
}