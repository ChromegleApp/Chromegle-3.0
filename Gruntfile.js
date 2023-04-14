module.exports = function (grunt) {

    grunt.initConfig({
        open: {
            dev: {
                path: 'http://reload.extensions/',
                app: 'Google Chrome'
            }
        }
    })

    grunt.loadNpmTasks('grunt-open');
    grunt.registerTask('default', ['open']);

};
