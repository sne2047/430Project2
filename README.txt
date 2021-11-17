This is my project 2 for IGME 430.
Use this document to keep track of plans, bugs i have to deal with but are tabling for now, etc

Current task: 
Get the basics of creating an account and logging into one copied from previous.
Components to this task:
App.js get redis set up properly and all redis associated stuff <- I think this the most important for next task
Add stylesheets under /assets/style.css
replace placeholder images
sections for react to play with in main.handlebars

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