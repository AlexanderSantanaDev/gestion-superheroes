module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require.resolve('@angular-devkit/build-angular/plugins/karma'),
            'karma-jasmine',
            'karma-chrome-launcher'
        ],
        client: {
            clearContext: false // leave Jasmine spec runner output visible in browser
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true,
    });
};