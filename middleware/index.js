//all the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership= function(req,res,next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id,function(err,foundCampground){
            if (err) {
                res.redirect("back")
            }
            else {
                //Does user own the campground?
                // campground.author.id is mongoose object
                // req.user._id is String, could not use === directly
                //if (campground.author.id === req.user._id)
                if (foundCampground.author.id.equals (req.user._id)) {
                    next();
                    // res.render("campgrounds/edit",{campground: foundCampground});
                } else {
                    req.flash("error","Permission denied");
                    res.redirect("back");
                }

            }
        });
    }
    else {
        req.flash("error","YOu need to logged in to further");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership=  function(req,res,next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if (err) {
                req.flash("error","Campground not found");
                res.redirect("back")
            }
            else {
                //Does user own the comment?
                // campground.author.id is mongoose object
                // req.user._id is String, could not use === directly
                //if (campground.author.id === req.user._id)
                if (foundComment.author.id.equals (req.user._id)) {
                    next();
                    // res.render("campgrounds/edit",{campground: foundCampground});
                } else {
                    req.flash("error","Permission denied");
                    res.redirect("back");
                }

            }
        });
    }
    else {
        req.flash("error","YOu need to logged in to further");
        res.redirect("back");
    }
}



middlewareObj.isLoggedIn=function(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;
