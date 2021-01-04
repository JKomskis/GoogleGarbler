const { watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const { assets } = require('./assets');
const { css } = require('./css');
const { copyHtml } = require('./html');
const { ts } = require('./ts');
const paths = require('./paths');

function watchFiles() {
    watch(paths.html.src, copyHtml);
    watch(paths.css.src, css);
    watch(paths.assets.src, assets);
    watch(paths.ts.src, ts);
}

function serve() {
    browserSync.init({
        server: "./_site",
        watch: true
    });
}

exports.serve = parallel(watchFiles, serve);