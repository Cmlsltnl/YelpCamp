var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var User = require("../models/user")
var passport = require("passport");

router.get("/",function(req,res){
    // res.send("this will be the landing page");

    res.render("landing");
})


// //====================================
// // COMMENTS ROUTES
// //=====================================

// router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
//     Campground.findById(req.params.id,function(err,campground){
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.render("comments/new",{campground:campground});
//         }
//     })
// })


// router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
//   Campground.findById(req.params.id,function(err,campground){
//       if (err){
//           console.log(err);
//           res.redirect("/campgrounds");
//       } else {
//           Comment.create(req.body.comment,function(err,comment){
//               if (err) {
//                   console.log(err);
//               }
//               else {
//                   campground.comments.push(comment);
//                   campground.save();
//                   res.redirect("/campgrounds/"+campground._id);
//               }
//           })
//       }
//   })
// })



//===================================
//AUTH ROUTES

router.get("/register",function(req,res){
    res.render("register");
});


router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if (err) {
            req.flash("error",err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp "+user.username);
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){

});


router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you Out!")
    res.redirect("/campgrounds");
});


function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
