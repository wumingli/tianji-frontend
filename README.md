# The directory structure of tianji front-end
===
## The directory like bellow: 
──tianji-frontend/<br />
   ├─compress/<br />
   ├─dist/<br />
   ├─gallery/<br />
   ├─modules/<br />
   │  ├─public/<br />
   │  ├─msPick/<br />
   │  │  ├─css/<br />
   │  │  ├─images/<br />
   │  │  ├─src/<br />
   │  │  ├─checkBox.html<br />
   │  │  ├─checkBoxNo.html<br />
   │  │  ├─radio.html<br />
   │  │  └─radioNo.html<br />
   │  └─test1/<br />
   │<br />
   └─node_modules/<br />
       ├─grunt/<br />
       ├─grunt-cmd-concat/<br />
       ├─grunt-cmd-transport/<br />
       ├─grunt-contrib-clean/<br />
       ├─grunt-contrib-compress/<br />
       └─grunt-contrib-uglify/<br />

## Instructions
    * "compress" contains .zip&.tar files with their version.
    * "dist" is a local dir and created automatic,contains files be concated and uglified.
    * "gallery" folder will be containing seajs and other libary like jquery etc.
    * "modules" will be containing the independent module of ourselfs,like msPickPlugin developed by zhiwei;
      and it will be contains their css/images/pages/source.
      ** "public" contains public plugins and sources.
      ** "msPick"&"test1" is demo modules.
    * node_modules contains plugins of grunt.
