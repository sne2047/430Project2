This is my project 2 for IGME 430.
Use this document to keep track of plans, bugs i have to deal with but are tabling for now, etc

To-Dos
FIX pREMIUM CHECK
get dragon art in there and workig
check that premium unlocks options appropriately
Feedback that changing password did work
better css design
    -Forms need a lot of css work
    -proper spacing on sections
add a user page
    -can get premium

Stretchier Goals
ability to look at a user's dragons without avtually being logged in as them
    -a page for each user, perhaps /username shows their public page?
Make error messages less domo-like, appear in center rather than sliding in from edge
Some visual indication of having premium or not

Done:
Premium lock is in there
Nice background img
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