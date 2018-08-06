const sass  = require('node-sass');
const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

const compileSass = (options={}) => {
    // set default options
    options = Object.assign({
        style: 'expanded'
    }, options);

    // render the result
    const result = sass.renderSync({
        file: options.src,
        outputStyle: options.style
    });

    // write the result to file
    mkdirp(getDirName(options.dest), err => {
        if (err) return cb(err);
        fs.writeFile(options.dest, result.css, err => {
            if (err) return cb(err);
        });
    });

    // log successful compilation to terminal
    console.log(' ' + options.dest + ' built.');
};

// Expanded
compileSass({
    src: 'src/scss/style.scss',
    dest: 'dist/css/style.css'
});

// Minified
compileSass({
    src: 'src/scss/style.scss',
    dest: 'dist/css/style.min.css',
    style: 'compressed'
});
