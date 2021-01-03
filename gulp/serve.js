const { watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const { assets } = require('./assets');
const { css } = require('./css');
const { copyHtml } = require('./html')
const { ts } = require('./ts')

function watchFiles() {
    watch("./web/**/*.html", copyHtml);
    watch("./web/css/**/*.scss", css);
    watch("./web/assets/**/*", assets);
    watch("./web/ts/**/*.ts", ts);
}

function serve() {
    browserSync.init({
        server: "./_site",
        watch: true
    });
}

exports.serve = parallel(watchFiles, serve);