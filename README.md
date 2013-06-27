# gistslide

## About

Inspired from https://github.com/nzoschke/gistdeck.

## Usage

+ Drag this link to bookmark bar.
    + [gistslide](%28function%28%29%7Bvar%20e%3Ddocument.createElement%28%22script%22%29%3Be.setAttribute%28%22src%22%2C%22https%3A//raw.github.com/1000ch/gistslide/master/src/js/gistdeck.js%22%29%3Bdocument.querySelector%28%22head%22%29.appendChild%28e%29%7D%29%28%29)
+ Visit gist which you want to present.
+ Click bookmarklet.

    javascript: (function() {
        var s = document.createElement('script');
        s.setAttribute('src', 'https://raw.github.com/1000ch/gistslide/master/src/js/gistdeck.js');
        document.querySelector('head').appendChild(s);
    })();

## Problem?

Please report [issues](https://github.com/1000ch/gistslide/issues).  

## Lisence

Copyright 1000ch  
Lisenced under the GPL Lisence version 3.  