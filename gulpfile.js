var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var concat = require("gulp-concat");
var cleancss = require("gulp-clean-css");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false,
  })
});

gulp.task("styles", function() {
  return gulp.src("app/scss/main.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", notify.onError()))
    .pipe(rename({ suffix: ".min", prefix : "" }))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream())
});

gulp.task("js", function() {
  return gulp.src([
    "app/js/script.js"
  ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("scripts.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("app/js"))

    .pipe(browserSync.reload({ stream: true }))
});

gulp.task("watch", ["styles", "js", "browser-sync"], function() {
  gulp.watch("app/scss/**/*.scss", ["styles"]);
  gulp.watch(["js/**/*.js", "app/js/script.js"], ["js"]);
  gulp.watch("app/*.html", browserSync.reload)
});

gulp.task("default", ["watch"]);