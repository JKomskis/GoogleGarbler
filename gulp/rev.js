const { src, dest, series } = require('gulp');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const { readFileSync } = require('fs');
var revdel = require('gulp-rev-delete-original');

function revision() {
    return src('_site/assets/**/*.{css,js,woff,woff2,jpg,png,svg}')
        .pipe(rev())
        .pipe(revdel())
        .pipe(dest('_site/assets'))
        .pipe(rev.manifest())
        .pipe(dest('_site/assets'));
}

function rewrite() {
    const manifest = readFileSync('_site/assets/rev-manifest.json');

    return src('_site/**/*.{html,css}')
        .pipe(revRewrite({ manifest }))
        .pipe(dest('_site'));
}

exports.rev = series(revision, rewrite);