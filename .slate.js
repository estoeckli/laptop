/*  Configuration file for Slate, a Mac OS X window manager
 *
 *  Slate Fork:
 * 	https://github.com/mattr-/slate
 *
 *  Configuration Documentation:
 *  	https://github.com/jigish/slate/wiki/JavaScript-Configs
 */

// Setup Window hints
slate.configAll({
    "windowHintsIgnoreHiddenWindows": false,
    "windowHintsShowIcons": true,
    "windowHintsSpread": true,
    "windowHintsSpreadSearchHeight": 120,
    "windowHintsSpreadSearchWidth": 120,
});

// Browser position (Default)
var browser = function(win) {
    var width = 1000;
    win.doOperation(slate.operation("move", {
        "x": "screenOriginX",
        "y": "screenOriginY",
        "width": width,
        "height": "screenSizeY",
    }));
}

// Browser position (Tablet, Reading)
var tabletSize = slate.operation("move", {
  "x": "screenOriginX",
  "y": "screenOriginY",
  "width": 720,
  "height": "screenSizeY"
});

// Browser position (Phone)
var phoneSize = slate.operation("move", {
   "x": "screenOriginX",
   "y": "screenOriginY",
   "width": 320,
   "height": "screenSizeY",
});

// Editor position (Default)
var editor = function(win) {
    if (win.screen().rect().width == 1920) {
        var x = 1000;
    }
    else {
        var x = 765;
    }
    win.doOperation(slate.operation("move", {
        "x": x,
        "y": "screenOriginY",
        "width": "screenSizeX-"+x,
        "height": "screenSizeY*0.75",
    }));
};

// Editor position (Tall)
var editorTall = function(win) {
    if (win.screen().rect().width == 1920) {
        var x = 1000;
    }
    else {
        var x = 765;
    }
    win.doOperation(slate.operation("move", {
        "x": x,
        "y": "screenOriginY",
        "width": "screenSizeX-"+x,
        "height": "screenSizeY",
    }));
};

// Terminal position
var terminal = function(win) {
    if (win.screen().rect().width == 1920) {
        var x = 1000;
    }
    else {
        var x = 765;
    }
    win.doOperation(slate.operation("move", {
        "x": x,
        "y": "screenSizeY*0.75+22",
        "width": "screenSizeX-"+x,
        "height": "screenSizeY*0.25",
    }));
}

// Fullscreen
var fullscreen = slate.operation("move", {
    "x": "screenOriginX",
    "y": "screenOriginY",
    "width": "screenSizeX",
    "height": "screenSizeY",
});

// Half Screen Left
var halfScreenLeft = slate.operation("move", {
    "x": "screenOriginX",
    "y": "screenOriginY",
    "width": "screenSizeX/2",
    "height": "screenSizeY",
});

// Half Screen Right
var halfScreenRight = slate.operation("move", {
    "x": "screenSizeX/2",
    "y": "screenOriginY",
    "width": "screenSizeX/2",
    "height": "screenSizeY",
});

// Move window to the upper half
var upperHalf = slate.operation("move", {
    "x": "screenOriginX",
    "y": "screenOriginY",
    "width": "screenSizeX",
    "height": "screenSizeY/2",
});

// Move window to the bottom half
var bottomHalf = slate.operation("move", {
    "x": "screenOriginX",
    "y": "screenSizeY/2+22",
    "width": "screenSizeX",
    "height": "screenSizeY/2",
});

// Main Layout
var myLayout = slate.layout("myLayout", {
    "_before_": { "operations": [
        slate.operation("hide", { "app": [
            "Calendar",
            "FaceTime",
            "Finder",
            "iBooks",
            "iPhoto",
            "iTunes",
            "Mail",
            "Messages",
            "Microsoft Excel",
            "Navicat Premium",
            "Numbers",
            "Photoshop",
            "Preview",
            "Things",
            "Transmission",
            "VirtualBox",
            "VirtualBox VM",
            "X-Lite",
        ]}),
        slate.operation("show", { "app": [
            "Safari",
            "MacVim",
            "Terminal",
        ]}),
        slate.operation("focus", { "app": "Safari" })
    ]},
    "_after_":  { "operations": [
        slate.operation("focus", { "app": "Terminal" }),
        slate.operation("focus", { "app": "MacVim" }),
    ]},
    "Safari":   { "operations": browser },
    "MacVim":   { "operations": editor },
    "Terminal": { "operations": terminal },
});

var growRight =  slate.operation("resize", { "width"  : "+10%", "height" : "+0" });
var growBottom =  slate.operation("resize", { "width"  : "+0", "height" : "+10%" });
var growLeft =  slate.operation("resize", {
  "width"  : "+10%",
  "height" : "+0",
  "anchor" : "bottom-right"
});
var growTop =  slate.operation("resize", {
  "width"  : "+0",
  "height" : "-10%",
  "anchor" : "bottom-left"
});

var shrinkRight =  slate.operation("resize", { "width" : "-10%", "height" : "+0" });
var shrinkBottom =  slate.operation("resize", { "width" : "+0", "height" : "-10%" });
var shrinkLeft =  slate.operation("resize", {
  "width"  : "-10%",
  "height" : "+0",
  "anchor" : "bottom-right"
});
var shrinkTop =  slate.operation("resize", {
  "width"  : "+0",
  "height" : "-10%",
  "anchor" : "bottom-right"
});

/*
 * ALL Key Bindings
 * ----------------------------------------------------------------------------
 */
S.bindAll({
  "up:ctrl,alt" : 	    fullscreen,
  "left:ctrl,alt" : 	halfScreenLeft,
  "right:ctrl,alt" :    halfScreenRight,
  "return:shift;cmd" : 	slate.operation("layout", { "name": myLayout }),
  "right:shift,ctrl" : 	growRight,
  "up:shift,ctrl" : 	growBottom,
  "down:shift,ctrl" : 	shrinkBottom,
  "left:shift,ctrl" : 	shrinkRight,
  "q:shift;cmd" : 	    browser,
  "t:ctrl,alt" :	    tabletSize,
  "p:ctrl,alt" :	    phoneSize,
  "i:shift;cmd":        editor,
  "o:shift;cmd":        editorTall,
  "m:shift;cmd":        terminal,
  "u:shift;cmd":        upperHalf,
  "n:shift;cmd":        bottomHalf
});
