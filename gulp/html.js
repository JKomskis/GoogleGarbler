const { src, dest } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const paths = require('./paths');

function copyHtml() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest));
}

function minifyHtml() {
    return src('_site/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('_site'));
}

exports.copyHtml = copyHtml;
exports.minifyHtml = minifyHtml;