const source = require("vinyl-source-stream");

const gulp = require("gulp");

const browserify = require("browserify");
const vueify = require("vueify");
const csvify = require("node-csvify");
const babelify = require("babelify");

// js (browserify, vueify, babelify)
gulp.task("js", () => {
    return browserify("src/js/main.js", { debug: true })
        .transform(vueify)
        .transform(csvify)
        .transform(babelify)
        .bundle()
        .pipe(source("build.js"))
        .pipe(gulp.dest("dest/js/"));
});

// copy html
gulp.task("html", () => {
    return gulp.src("src/index.html")
        .pipe(gulp.dest("dest/"));
});

gulp.task("resource", () => {
    return gulp.src("src/img/**", { since: gulp.lastRun("resource") })
        .pipe(gulp.dest("dest/img/"));
});

gulp.task("watch", () => {
    gulp.watch(["src/js/**", "src/components/**", "src/data/**"], gulp.series("js"));
    gulp.watch("src/index.html", gulp.series("html"));
});

gulp.task("default", gulp.parallel("js", "html", "resource"));