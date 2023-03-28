const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const sass = require("gulp-sass")(require("sass"));

const config = {
  root: "./src/",
  html: {
    src: "index.html",
  },
  css: {
    watch: "styles/**/*.scss",
    dest: "css",
  },
};

function html() {
  return gulp
    .src(config.root + config.html.src)
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return gulp
    .src(config.root + config.css.watch)
    .pipe(sass().on("error", sass.logError))
    .pipe(gcmq())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest(config.root + config.css.dest))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: config.root,
    },
  });

  gulp.watch(config.root + config.css.watch, gulp.series(css));
  // gulp.watch(config.root + config.html.src, browserSync.reload);
  gulp.watch(config.root + config.html.src, gulp.series(html));

  return cb();
}

exports.default = serve;
