const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('@rollup/plugin-babel')
const json = require('rollup-plugin-json')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const inputPath = path.resolve(__dirname,'./src/index.js')
const outPath = path.relative(__dirname,'./dist/imooc.datav.js')
module.exports = {
    input:inputPath,
    output:[
        {
            file:outPath,
            name:'imoocDatav',
            format:'umd',
            globals:{
                vue:'Vue'
            }
        }
    ],
    plugins:[
        vue(),
        resolve({preferBuiltins: true}),
        commonjs(),
        babel({
            exclude:'node_mudules/**'
        }),
        json(),
        postcss({
            plugins:[]
        })
    ],
    
    external:['vue','echarts']
}