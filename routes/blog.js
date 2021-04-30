// route to handle : blog/{blog_id}
// the blog route contains : GET to show the blogs as /blog/blog:id1 , PUT to edit as /blog/blog:id1/edit or POST to post a blog as /blog/create 

const express = require("express");
const router  = express.Router();

router.get("/", (req, res, next)=> {
    res.status(200).json({"message" : "show all blogs"})
});

router.get("/:blogId", (req, res, next)=> {
    //getting the id
    const blogID = req.params.blogId;
    res.status(200).json({"message" : `Blog ID is : ${blogID}`});
});


router.put("/edit", (req, res, next)=> {
    res.status(200).json({"message" : "edit a blog"});
});

router.post("/", (req, res, next)=> {
    res.status(200).json({"message" : "post a new blog"})
});



module.exports = router;