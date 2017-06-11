var gulp=require("gulp");
var htmlmin = require('gulp-htmlmin');
var minify=require("gulp-minify-css")
var uglify = require('gulp-uglify')
var concat=require("gulp-concat")
 var webserver = require('gulp-webserver')
var browserify=require("gulp-browserify")
var url=require("url")
// var rev=require("rev")

gulp.task("minify",function(){
	setTimeout(function(){
		gulp.src("src/html/index.html")
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest("src/clonehtml/"))
	},0)
	
})
gulp.task("minjs",function(){
 	gulp.src("src/js/*.js")
	     //.pipe(concat("all.js"))
	       .pipe(browserify({
           insertGlobals : true,
          debug : !gulp.env.production
        }))
 	     .pipe(uglify())
 	     .pipe(gulp.dest("src/clonehtml/"))
 })
gulp.task("mincss",function(){
 	gulp.src("src/css/*.css")
 	    .pipe(minify())
 	    .pipe(gulp.dest("src/clonehtml/"))
 })
//  gulp.task("minsass",function(){
//  	gulp.src("src/sass/style.sass")
//   	    .pipe(sass())
//         .pipe(gulp.dest("src/clonehtml/"))
//   })
 gulp.task("webserver",["minify","minjs","mincss"],function(){
	
   gulp.src("src")
	    .pipe(webserver({
           livereload: true,
          directoryListing: true,
          middleware:function(req,res,next){
          	  console.log(req.url)
          	  var datas={
          	  	  name:	"1504a"
          	  	  
          	  }
          	  res.writeHead(200,{
          	  	   "Content-type":"aapplication/json;charset=UTF-8",
          	  	   "Access-Control-Allow-Origin":"*"
          	  });
          	  res.write(JSON.stringify(datas))
          	  res.end()
          	// var pathName=url.parse(req.url).pathname
          	// data.forEach(function(i){
          	// 	switch(i.route){
          	// 		case pathName:
          	// 		{
          	// 		   i.handle(req,res,next,url)	
          	// 		}
          	// 		break;
          	// 	}

          	// })
          	// res          		 

          },
           open: "/html/index.html"
         }));
	
	

})