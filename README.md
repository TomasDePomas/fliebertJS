## FliebertJS

_What do you do when you want to make a simulation sandbox to play around with evolving creatures and be all god-like and stuff, because you just have those kinds of hobbies? 
That's right, you start building your own Unity/Processing framework tingemejingy in JavaScript._ 


This library runs a node server that simulates elements in your world and stores the data in a firebase database. It also includes a frontend renderer which can then display the results. For now it is quite restricted. This project is still very much under construction.

# Todo:
1. ~~Think of a better name~~
2. Write a better Readme
    1. ~~Oke, slight improvement~~
    2. Do more improvement
    
    
# Getting it running

1. Run `npm install` in the project folder
2. Run `bower install` in the project folder
3. Add a `serviceAccountCredentials.json` to the root of the project folder. [Read the official documentation on how to do that](https://firebase.google.com/docs/server/setup),
4. Add your firebase credentials to a `/resources/config.js`, have a look at `/resources/config.js.example` to see how to set it up.
5. Run `gulp`
6. Open the `resources` folder in your terminal and run `node app.js`
7. Open the `app/index.html` in your browser.
8. Be confused, because this readme does not tell you at all what you just installed..

__Optional__
9. create a vhost called mobs.dev and point it to the `app/index.html`
10. instead of `gulp` run `gulp watch`. This wil automatically update the script when you make changes. You know, in case you want to mess around with stuff.
