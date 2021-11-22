This is my project 2 for IGME 430.
Use this document to keep track of plans, bugs i have to deal with but are tabling for now, etc

To-Dos
fix redirect on dragon creation
replace placeholder images
get dragon art in there and workig
actual css and some html design 
    -thinking central column w/ nice background image?
    -actually get own color scheme, thinking reds/pinks with a lot of yellow details?
ability to look at a user's dragons without avtually being logged in as them
    -a page for each user, perhaps /username shows their public page?
add a user page
    -log in to access
    -can get premium
    -can change password

Done:
Account controller and models
Account is in index.js
Most of app.js, minus the redis
Added a favicon
middleware set up
router got account stuff in there
handlebars exists

notes- 
    -instead of /maker, send people to /dragons, the page that will show the user their created dragons
    -For the basics, just have text descriptions over actual art for the time being
    -REMEMBER THE PASSWORD CHANGE THINGY hint- send old password, verify using same function, and use same function as in create account to make a new one