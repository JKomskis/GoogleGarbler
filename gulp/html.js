const { src, dest } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const paths = require('./paths');

function copyHtml() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest));
}

function minifyHtml() {
    return src(`${paths.dest}/**/*.html`)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(paths.dest));
}

exports.copyHtml = copyHtml;
exports.minifyHtml = minifyHtml;