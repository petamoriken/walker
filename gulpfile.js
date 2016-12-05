const path = require("path");

const source = require("vinyl-source-stream");

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

const browserify = require("browserify");
const vueify = require("vueify");
const babelify = require("babelify");


// js (browserify, vueify, babelify)
gulp.task(`js`, () => {
    return gulp.src("src/js/main.js")
        .pipe($.foreach((stream, file) => {
            
            const filePath = file.path;

            return browserify(filePath)
                .transform(vueify)
                .transform(babelify)
                .bundle()
                .pipe(source(path.basename(filePath)));

        })).pipe(gulp.dest("dest/"));
});

gulp.task("default", gulp.parallel("js"));