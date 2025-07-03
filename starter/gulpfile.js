import gulp from "gulp";
import shell from "gulp-shell";

gulp.task("build", shell.task("parcel build index.html"));
gulp.task("parcel server", shell.task("parcel index.html"));
gulp.task("test", shell.task("npm test"));
gulp.task("cypress", shell.task("npx cypress run"));

gulp.task("default", gulp.series("build", "parcel server"));
