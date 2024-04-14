const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const replace = require('gulp-replace');

function scripts() {
    return src([
        'src/js/*.js',
        '!src/js/main.min.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}

function scriptsMin() {
    return src([
        'src/js/*.js',
        '!src/js/main.min.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('src/styles/styles.scss')
        .pipe(concat('style.css'))
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            optimization: false
        }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function stylesMin() {
    return src('src/styles/styles.scss')
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(replace('/*!', '/*'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            optimization: false
        }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['src/styles/*/*.scss'], parallel(styles, stylesMin))
    watch([
        'src/js/*.js',
        '!src/js/main.min.js'
    ], parallel(scripts, scriptsMin))
    watch(['src/*.html']).on('change', browserSync.reload)
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src(
        [
            'src/css/style.min.css',
            'src/css/style.css',
            'src/js/main.min.js',
            'src/js/main.js',
            'src/**/*.html'
        ], {base: 'app'})
        .pipe(dest('dist'))
}

exports.stylesMin = stylesMin;
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, stylesMin, scripts, browsersync, watching);