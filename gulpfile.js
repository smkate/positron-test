const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const svgSprite = require("gulp-svg-sprite");
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");

const css_style = (done) => {
  gulp
    .src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errorLogToConsole: true,
        outputStyle: "compressed",
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());

  done();
};

const sync = (done) => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
  });
  done();
};

const browserReload = (done) => {
  browserSync.reload();
  done();
};

const watchSass = () => {
  gulp.watch("./scss/**/*", css_style);
};

const watchFiles = () => {
  gulp.watch("./scss/**/*", css_style);
  gulp.watch("./**/*.html", browserReload);
  gulp.watch("./**/*.js", browserReload);
};

const spriteSVG = () => {
  return gulp
    .src("img/svg/*.svg")
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest("img"));
};

// exports.default = gulp.parallel(watchFiles, sync);
exports.default = gulp.parallel(watchFiles, sync, spriteSVG);
// gulp.task(sync);
