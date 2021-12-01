This is my project 2 for IGME 430.
Use this document to keep track of plans, bugs i have to deal with but are tabling for now, etc

To-Dos
replace placeholder image on Nav (upscaled/nicer ver of favicon?)
get dragon art in there and workig
get premium locks working
get error messages working
better css and some html design 
    -thinking central column w/ nice background image?
    -actually get own color scheme, thinking reds/pinks with a lot of yellow details?
add a user page
    -/user
    -need log in to access
    -can get premium
    -can change password

Stretchier Goals
ability to look at a user's dragons without avtually being logged in as them
    -a page for each user, perhaps /username shows their public page?

Done:
Account controller and models
Account is in index.js
Most of app.js, minus the redis
Added a favicon
middleware set up
router got account stuff in there
handlebars exists

notes- 
    -For the basics, just have text descriptions over actual art for the time being
    -REMEMBER THE PASSWORD CHANGE THINGY hint- send old password, verify using same function, and use same function as in create account to make a new one