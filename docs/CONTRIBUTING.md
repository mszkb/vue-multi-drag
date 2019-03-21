# Contributing

## What to do

- Look at issues
- Let me know what issue you gonna resolve
- Fork the repository
- Make your changes in a seperate branch
- Create a pull request and set the **base** to the **dev** branch <sup><a href="#fn1">1</a></sup>

Thank you <3

## Starting point

To fix bugs in the vue-multi-drag plugin logic, check **index.js** and **vue-multi-drag-behaviour.js**.

TODO: own plugin creation

## How this vue plugin is structured

````
/assets
/demo
/docs
/public             " contains #app entrypoint for the dev server
/src                " plugin sources
-- /assets          " your place for images, css and vendor stuff
-- /components      " containing components to make your tests, those can be used for the demo
-- App.vue          " this file will be injected into /public/index.html - tis can be used for the demo
-- index.js         " THIS IS THE MAIN VUE-PLUGIN FILE, contains the Vue.install method to register the plugin for use
-- main.js          " new Vue() and also does 'import ./plugin.js' to call Vue.use
-- plugin.js        " you can create default options here, this will be also used for plugin development of this plugin
````



<span id="fn1">1</span>: https://stackoverflow.com/questions/9135913/merge-pull-request-to-a-different-branch-than-default-in-github
