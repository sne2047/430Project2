This is my project 2 for IGME 430.
Use this document to keep track of plans, bugs i have to deal with but are tabling for now, etc

To-Dos
get dragon art in there and workig
get premium locks working
Feedback that changing password did work
better css and some html design 
    -Forms need a lot of html work
    -proper spacing on sections
    -thinking central column w/ nice background image?
add a user page
    -can get premium

Stretchier Goals
ability to look at a user's dragons without avtually being logged in as them
    -a page for each user, perhaps /username shows their public page?
Make error messages less domo-like, appear in center rather than sliding in from edge

Done:
Change password WORKS
Account controller and models
Account is in index.js
Most of app.js, minus the redis
Added a favicon
Added login logo
middleware set up
router got account stuff in there
handlebars exists
Error messages working

notes- 
    -For the basics, just have text descriptions over actual art for the time being
    -REMEMBER THE PASSWORD CHANGE THINGY hint- send old password, verify using same function, and use same function as in create account to make a new one