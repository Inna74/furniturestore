const project_folder = 'dist';
const source_folder = 'src';

const path = {
  build: {
    html: project_folder + '/',
    php: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/',
  },
  src: {
    html: source_folder + '/*.html',
    php: source_folder + '/*.php',
    css: source_folder + '/scss/main.scss',
    js: source_folder + '/js/*.js',
    jsVendor: source_folder + '/js/vendor/**/*.js',
    img: source_folder + '/img/*.{jpg,png,svg,gif,ico,webp}',
    fonts: source_folder + '/fonts/*.{woff,woff2}',
  },
  watch: {
    html: source_folder + '/**/*.html',
    php: source_folder + '/**/*.php',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
  },
  clean: project_folder
}

const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const browsersync = require('browser-sync').create();
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const group_media = require('gulp-group-css-media-queries');
const clean_css = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');

const clean = () => {
  return del(path.clean);
}

const html = () => {
  return src(path.src.html)
    .pipe(htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

const htmlDev = () => {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

const php = () => {
  return src(path.src.php)
    .pipe(dest(path.build.php))
    .pipe(browsersync.stream())
}

const css = () => {
  return src(path.src.css)
    .pipe(
      scss({
        style: 'compact',
      })
    )
    .pipe(
      group_media()
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: false
      })
    )
    .pipe(clean_css({
      level: 2
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

const cssDev = () => {
  return src(path.src.css)
    .pipe(sourcemaps.init())
    .pipe(
      scss()
    )
    .pipe(
      group_media()
    )
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

const js = () => {
  return src(path.src.js)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

const jsDev = () => {
  return src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

const jsVendor = () => {
  return src(path.src.jsVendor)
    .pipe(concat('vendor.js'))
    .pipe(dest(path.build.js))
}

const images = () => {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 80
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

const imagesDev = () => {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

const fonts = () => {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

const svgSprites = () => {
  return src([source_folder + '/img/svg/**/*.svg'])
    .pipe(svgSprite({
      mode: {
        stack: {
            sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest(path.build.img))
}

const svgSpritesDev = () => {
  return src([source_folder + '/img/svg/**/*.svg'])
    .pipe(svgSprite({
      mode: {
        stack: {
            sprite: '../sprite.svg',
            example: true
        }
      }
    }))
    .pipe(dest(path.build.img))
}

const browserSync = () => {
  browsersync.init({
    server: {
      baseDir: project_folder,
    },
    notify: false,
    browser: 'chrome'
  })
}

watch(path.watch.html, htmlDev);
watch(path.watch.php, php);
watch(path.watch.css, cssDev);
watch(path.watch.js, jsDev);
watch(path.watch.img, imagesDev);

exports.build = series(clean, html, php, css, jsVendor, js, images, fonts, svgSprites, browserSync);

exports.dev = series(clean, htmlDev, php, cssDev, jsVendor, jsDev, imagesDev, fonts, svgSpritesDev, browserSync);

exports.clean = clean;
exports.svgSprites = svgSprites;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.default = series(clean, htmlDev, php, cssDev, jsVendor, jsDev, imagesDev, fonts, svgSpritesDev, browserSync);
