
const { src, dest,watch,parallel} = require('gulp');
//const gulp = import('gulp')
const scss = require('gulp-sass')(require('sass'));
const concat =require('gulp-concat');
const autoprefixer =require('gulp-autoprefixer');
const unglify =require('gulp-uglify');
const browserSync =require('browser-sync').create();
const imagemin = import('gulp-imagemin')
exports.imagemin= imagemin;
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify:false
    })
}

function styles() {
    return src('app/scss/style.scss' )   
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version']
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
} 

function scripts(){
    return src ([
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(unglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())

}

function images(){
    return src('app/images/**/*.*')
  //  .pipe(imagemin())
    .pipe(dest('dist/images'))
}
function watching() {
    watch(['app/scss**/*.scss'],styles);
    watch(['app/js/**.js', '!app/js/main.min.js'],scripts)
    watch(['app/**/*.html']).on('change',browserSync.reload);
}
exports.styles=styles;
exports.scripts=scripts;
exports.images=images;
exports.browsersync=browsersync;
exports.watching=watching;

exports.default= parallel(styles,scripts,images,browsersync,watching);