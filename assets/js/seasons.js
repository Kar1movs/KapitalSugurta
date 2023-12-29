function autumn() {
    /* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */
    var falling = true;
    // TweenLite.set("#container",{perspective:600})
    // TweenLite.set("img",{xPercent:"-50%",yPercent:"-50%"})

    var total = 16;
    var container = document.getElementById("container"),
        w = window.innerWidth,
        h = window.innerHeight;

    for (var i = 0; i < total; i++) {
        var Div = document.createElement('div');
        Div.style.backgroundImage = 'url(/themes/v1/assets/img/seasons/autumn/fall.png)';
        TweenLite.set(Div, {
            force3D: true,
            rotation: "+=0.01",
            attr: {
                class: 'seasons',
            },
            x: R(0, w),
            y: R(-200, -150),
            z: R(-200, 200),
            /* onUpdate: applyProps() */
        });
        var proxy = parseMatrix(Div.style.transform);
        var vars = parseMatrix("matrix3d(0.613582, -0.090278754224, 0, -0.00205016, -0.211713, 0.7803832528079999, 0, -0.00323228, 0, 0, 1, 0, 0, 0, 0, 1)");

        vars.onUpdate = function () {
            Div.style.transform = "matrix3d(" + proxy.join(",") + ")";
        }

        TweenMax.to(proxy, 2, vars);

        function parseMatrix(matrix) {
            return matrix.match(/(?:\-|\.|\b)(\d|\.|e\-)+/g).map(function (v) {
                return +v;
            });
        }

        /* function applyProps() {
            Div.style.WebkitTransform = "translate3d(" + Div.x + "px, " + Div.y + "px, " + Div.z + ")";
            Div.style.Transform = "translate3d(" + Div.x + "px, " + Div.y + "px, " + Div.z + ")";
        } */

        container.appendChild(Div);
        animm(Div);

    }
    //var style = window.getComputedStyle($('#container').get(0));  // Need the DOM
    // var matrix = new WebKitCSSMatrix(style.webkitTransform);
    // console.log(matrix.m41);  // -770
    function animm(elm) {
        TweenMax.to(elm, R(6, 15), {
            y: h + 100,
            ease: Linear.easeNone,
            repeat: -1,
            delay: -15
        });
        TweenMax.to(elm, R(4, 8), {
            x: '+=100',
            rotationZ: R(0, 360),
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut
        });
        TweenMax.to(elm, R(2, 8), {
            rotationX: R(0, 360),
            rotationY: R(0, 360),
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut,
            delay: -5
        });
    };

    function R(min, max) {
        return min + Math.random() * (max - min)
    };
}

function iosAutumn() {
    (function ($, window, document, undefined) {

        var SnowFlake = function (expireCallback) {
            var that = this;
            var vector = [0, 0];
            var position = [0, 0];
            var isOnscreen = false;
            var $element = $('<div class="seasons"></div>'); //style="background:url(dist/img / fall.png);"
            //$(".seasons").appendTo(document).css("background-image", "url(dist/img/fall.png)"); NOT WORKING
            //style="position: fixed; color:#fff; text-shadow: rgba(0, 0, 0, 0.7) 1px 1px 2px;" &#10052;
            // <img class="w-100 h-100" src="dist/img/fall.png" alt="fall">
            var updatePosition = function () {
                $element.css({
                    WebkitTransform: 'rotate(' + position[0] + 'deg)',
                    left: position[0],
                    top: position[1],
                    backgroundImage: 'url(/themes/v1/assets/img/seasons/autumn/fall.png)',
                });
            };

            var updateAttributes = function (size, opacity) {
                $element.css({
                    "font-size": size,
                    opacity: opacity,
                    /* backgroundImage: 'url(dist/img/fall.png)', */
                });
            };

            var checkExpired = function (bounds) {
                if (position[0] > bounds.x || position[1] > bounds.y) {
                    isOnscreen = false;
                    $element.remove();
                    expireCallback(that);
                }
            };

            this.spawn = function (newVector, startPos, size, opacity) {
                vector = newVector;
                position = startPos;
                updateAttributes(size, opacity);
                updatePosition();
                $('#container').append($element);
                isOnscreen = true;
            };

            this.render = function (interval, bounds) {
                if (isOnscreen) {
                    position[0] = position[0] + (interval * vector[0]);
                    position[1] = position[1] + (interval * vector[1]);
                    checkExpired(bounds);
                    updatePosition();
                }
            };
        };


        var SnowFlakeEmitter = function (settings) {
            var flakes = [];
            var reclaimedFlakes = [];
            var lastTime = 0;

            var shouldSpawnNewFlake = function () {
                return (Math.random() * 100) < settings.intensity;
            };

            var getScreenBounds = function () {
                return {
                    x: $(window).width(),
                    y: $(window).height()
                };
            };

            var randomBetween = function (min, max) {
                return Math.random() * (max - min + 1) + min;
            };

            var newFlakeVector = function () {
                var x = randomBetween(settings.driftRange[0], settings.driftRange[1]);
                var y = randomBetween(settings.speedRange[0], settings.speedRange[1]);
                return [x, y];
            };

            var newFlakePosition = function (bounds) {
                var x = randomBetween(-20, bounds.x + 20);
                var y = -20;
                return [x, y];
            };

            var reclaimFlake = function (flake) {
                reclaimedFlakes.push(flake);
            };

            var getFlake = function () {
                var flake;
                if (reclaimedFlakes.length) {
                    flake = reclaimedFlakes.pop();
                } else {
                    flake = new SnowFlake(reclaimFlake);
                    flakes.push(flake);
                }
                return flake;
            };

            var spawnNewFlake = function (bounds) {
                var flake = getFlake();
                flake.spawn(
                    newFlakeVector(),
                    newFlakePosition(bounds),
                    randomBetween(settings.sizeRange[0], settings.sizeRange[1]),
                    randomBetween(settings.opacityRange[0], settings.opacityRange[1])
                );
            };

            var getInterval = function () {
                var time = Date.now();
                var interval = 0;

                if (lastTime) {
                    interval = (time - lastTime) / 1000;
                }

                lastTime = time;
                return interval;
            };

            this.render = function () {
                var i, l = flakes.length;
                var interval = getInterval();
                var bounds = getScreenBounds();

                if (shouldSpawnNewFlake()) {
                    spawnNewFlake(bounds);
                }

                for (i = 0; i < l; ++i) {
                    flakes[i].render(interval, bounds);
                }
            };
        };

        // Create the defaults once
        var pluginName = "iosFall",
            defaults = {
                intensity: 10,
                sizeRange: [10, 20],
                opacityRange: [0.5, 1],
                driftRange: [-2, 2],
                speedRange: [25, 80]
            };

        // The actual plugin constructor
        function Plugin(element, options) {
            this.element = element;
            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don't want to alter the default options for
            // future instances of the plugin
            this.settings = $.extend({}, defaults, options);
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend(Plugin.prototype, {
            init: function () {
                var iosFall = new SnowFlakeEmitter(this.settings);
                if (window.requestAnimationFrame) {
                    function render() {
                        iosFall.render();
                        window.requestAnimationFrame(render);
                    }

                    window.requestAnimationFrame(render);
                } else {
                    setInterval(function () {
                        iosFall.render();
                    }, 1 / 60);
                }
            }
        });

        $.fn[pluginName] = function (options) {
            this.each(function () {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName, new Plugin(this, options));
                }
            });
            return this;
        };

    })(jQuery, window, document);
    jQuery(function () {
        jQuery("#container").iosFall({
            intensity: 2,
            sizeRange: [12, 30],
            opacityRange: [0.4, 1],
            driftRange: [10, 20],
            speedRange: [55, 120]
        });
    });
}

function winter2() {
    /** @license
     * DHTML Snowstorm! JavaScript-based snow for web pages
     * Making it snow on the internets since 2003. You're welcome.
     * -----------------------------------------------------------
     * Version 1.44.20131208 (Previous rev: 1.44.20131125)
     * Copyright (c) 2007, Scott Schiller. All rights reserved.
     * Code provided under the BSD License
     * http://schillmania.com/projects/snowstorm/license.txt
     */
    /*jslint nomen: true, plusplus: true, sloppy: true, vars: true, white: true */
    /*global window, document, navigator, clearInterval, setInterval */
    var snowStorm = (function (window, document) {
        // --- common properties ---
        this.autoStart = true; // Whether the snow should start automatically or not.
        this.excludeMobile = true; // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) Enable at your own risk.
        this.flakesMax = 512; // Limit total amount of snow made (falling + sticking)
        this.flakesMaxActive = 128; // Limit amount of snow falling at once (less = lower CPU use)
        this.animationInterval = 50; // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
        this.useGPU = true; // Enable transform-based hardware acceleration, reduce CPU load.
        this.className = null; // CSS class name for further customization on snow elements
        this.excludeMobile = true; // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
        this.flakeBottom = null; // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
        this.followMouse = true; // Snow movement can respond to the user's mouse
        this.snowColor = '#b4d0ff'; // Don't eat (or use?) yellow snow.
        this.snowCharacter = '*'; // &bull; = bullet, &middot; is square on some systems etc.
        this.snowStick = true; // Whether or not snow should "stick" at the bottom. When off, will never collect.
        this.targetElement = null; // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
        this.useMeltEffect = true; // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
        this.useTwinkleEffect = false; // Allow snow to randomly "flicker" in and out of view while falling
        this.usePositionFixed = false; // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported
        this.usePixelPosition = false; // Whether to use pixel values for snow top/left vs. percentages. Auto-enabled if body is position:relative or targetElement is specified.
        // --- less-used bits ---
        this.freezeOnBlur = false; // Only snow when the window is in focus (foreground.) Saves CPU.
        this.flakeLeftOffset = 0; // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
        this.flakeRightOffset = 0; // Right margin/gutter space on edge of container
        this.flakeWidth = 20; // Max pixel width reserved for snow element
        this.flakeHeight = 20; // Max pixel height reserved for snow element
        this.vMaxX = 2; // Maximum X velocity range for snow
        this.vMaxY = 2; // Maximum Y velocity range for snow
        this.zIndex = 0; // CSS stacking order applied to each snowflake
        // --- "No user-serviceable parts inside" past this point, yadda yadda ---
        var storm = this,
            features,
            // UA sniffing and backCompat rendering mode checks for fixed position, etc.
            isIE = navigator.userAgent.match(/msie/i),
            isIE6 = navigator.userAgent.match(/msie 6/i),
            isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
            isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
            noFixed = (isBackCompatIE || isIE6),
            screenX = null,
            screenX2 = null,
            screenY = null,
            scrollY = null,
            docHeight = null,
            vRndX = null,
            vRndY = null,
            windOffset = 1,
            windMultiplier = 2,
            flakeTypes = 6,
            fixedForEverything = false,
            targetElementIsRelative = false,
            opacitySupported = (function () {
                try {
                    document.createElement('div').style.opacity = '0.5';
                } catch (e) {
                    return false;
                }
                return true;
            }()),
            didInit = false,
            docFrag = document.createDocumentFragment();
        features = (function () {
            var getAnimationFrame;

            /**
             * hat tip: paul irish
             * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
             * https://gist.github.com/838785
             */
            function timeoutShim(callback) {
                window.setTimeout(callback, 1000 / (storm.animationInterval || 20));
            }

            var _animationFrame = (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                timeoutShim);
            // apply to window, avoid "illegal invocation" errors in Chrome
            getAnimationFrame = _animationFrame ? function () {
                return _animationFrame.apply(window, arguments);
            } : null;
            var testDiv;
            testDiv = document.createElement('div');

            function has(prop) {
                // test for feature support
                var result = testDiv.style[prop];
                return (result !== undefined ? prop : null);
            }

            // note local scope.
            var localFeatures = {
                transform: {
                    ie: has('-ms-transform'),
                    moz: has('MozTransform'),
                    opera: has('OTransform'),
                    webkit: has('webkitTransform'),
                    w3: has('transform'),
                    prop: null // the normalized property value
                },
                getAnimationFrame: getAnimationFrame
            };
            localFeatures.transform.prop = (
                localFeatures.transform.w3 ||
                localFeatures.transform.moz ||
                localFeatures.transform.webkit ||
                localFeatures.transform.ie ||
                localFeatures.transform.opera
            );
            testDiv = null;
            return localFeatures;
        }());
        this.timer = null;
        this.flakes = [];
        this.disabled = false;
        this.active = false;
        this.meltFrameCount = 20;
        this.meltFrames = [];
        this.setXY = function (o, x, y) {
            if (!o) {
                return false;
            }
            if (storm.usePixelPosition || targetElementIsRelative) {
                o.style.left = (x - storm.flakeWidth) + 'px';
                o.style.top = (y - storm.flakeHeight) + 'px';
            } else if (noFixed) {
                o.style.right = (100 - (x / screenX * 100)) + '%';
                // avoid creating vertical scrollbars
                o.style.top = (Math.min(y, docHeight - storm.flakeHeight)) + 'px';
            } else {
                if (!storm.flakeBottom) {
                    // if not using a fixed bottom coordinate...
                    o.style.right = (100 - (x / screenX * 100)) + '%';
                    o.style.bottom = (100 - (y / screenY * 100)) + '%';
                } else {
                    // absolute top.
                    o.style.right = (100 - (x / screenX * 100)) + '%';
                    o.style.top = (Math.min(y, docHeight - storm.flakeHeight)) + 'px';
                }
            }
        };
        this.events = (function () {
            var old = (!window.addEventListener && window.attachEvent),
                slice = Array.prototype.slice,
                evt = {
                    add: (old ? 'attachEvent' : 'addEventListener'),
                    remove: (old ? 'detachEvent' : 'removeEventListener')
                };

            function getArgs(oArgs) {
                var args = slice.call(oArgs),
                    len = args.length;
                if (old) {
                    args[1] = 'on' + args[1]; // prefix
                    if (len > 3) {
                        args.pop(); // no capture
                    }
                } else if (len === 3) {
                    args.push(false);
                }
                return args;
            }

            function apply(args, sType) {
                var element = args.shift(),
                    method = [evt[sType]];
                if (old) {
                    element[method](args[0], args[1]);
                } else {
                    element[method].apply(element, args);
                }
            }

            function addEvent() {
                apply(getArgs(arguments), 'add');
            }

            function removeEvent() {
                apply(getArgs(arguments), 'remove');
            }

            return {
                add: addEvent,
                remove: removeEvent
            };
        }());

        function rnd(n, min) {
            if (isNaN(min)) {
                min = 0;
            }
            return (Math.random() * n) + min;
        }

        function plusMinus(n) {
            return (parseInt(rnd(2), 10) === 1 ? n * -1 : n);
        }

        this.randomizeWind = function () {
            var i;
            vRndX = plusMinus(rnd(storm.vMaxX, 0.2));
            vRndY = rnd(storm.vMaxY, 0.2);
            if (this.flakes) {
                for (i = 0; i < this.flakes.length; i++) {
                    if (this.flakes[i].active) {
                        this.flakes[i].setVelocities();
                    }
                }
            }
        };
        this.scrollHandler = function () {
            var i;
            // "attach" snowflakes to bottom of window if no absolute bottom value was given
            scrollY = (storm.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || (noFixed ? document.body.scrollTop : 0), 10));
            if (isNaN(scrollY)) {
                scrollY = 0; // Netscape 6 scroll fix
            }
            if (!fixedForEverything && !storm.flakeBottom && storm.flakes) {
                for (i = 0; i < storm.flakes.length; i++) {
                    if (storm.flakes[i].active === 0) {
                        storm.flakes[i].stick();
                    }
                }
            }
        };
        this.resizeHandler = function () {
            if (window.innerWidth || window.innerHeight) {
                screenX = window.innerWidth - 16 - storm.flakeRightOffset;
                screenY = (storm.flakeBottom || window.innerHeight);
            } else {
                screenX = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (!isIE ? 8 : 0) - storm.flakeRightOffset;
                screenY = storm.flakeBottom || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
            }
            docHeight = document.body.offsetHeight;
            screenX2 = parseInt(screenX / 2, 10);
        };
        this.resizeHandlerAlt = function () {
            screenX = storm.targetElement.offsetWidth - storm.flakeRightOffset;
            screenY = storm.flakeBottom || storm.targetElement.offsetHeight;
            screenX2 = parseInt(screenX / 2, 10);
            docHeight = document.body.offsetHeight;
        };
        this.freeze = function () {
            // pause animation
            if (!storm.disabled) {
                storm.disabled = 1;
            } else {
                return false;
            }
            storm.timer = null;
        };
        this.resume = function () {
            if (storm.disabled) {
                storm.disabled = 0;
            } else {
                return false;
            }
            storm.timerInit();
        };
        this.toggleSnow = function () {
            if (!storm.flakes.length) {
                // first run
                storm.start();
            } else {
                storm.active = !storm.active;
                if (storm.active) {
                    storm.show();
                    storm.resume();
                } else {
                    storm.stop();
                    storm.freeze();
                }
            }
        };
        this.stop = function () {
            var i;
            this.freeze();
            for (i = 0; i < this.flakes.length; i++) {
                this.flakes[i].o.style.display = 'none';
            }
            storm.events.remove(window, 'scroll', storm.scrollHandler);
            storm.events.remove(window, 'resize', storm.resizeHandler);
            if (storm.freezeOnBlur) {
                if (isIE) {
                    storm.events.remove(document, 'focusout', storm.freeze);
                    storm.events.remove(document, 'focusin', storm.resume);
                } else {
                    storm.events.remove(window, 'blur', storm.freeze);
                    storm.events.remove(window, 'focus', storm.resume);
                }
            }
        };
        this.show = function () {
            var i;
            for (i = 0; i < this.flakes.length; i++) {
                this.flakes[i].o.style.display = 'block';
            }
        };
        this.SnowFlake = function (type, x, y) {
            var s = this;
            this.type = type;
            this.x = x || parseInt(rnd(screenX - 20), 10);
            this.y = (!isNaN(y) ? y : -rnd(screenY) - 12);
            this.vX = null;
            this.vY = null;
            this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8]; // "amplification" for vX/vY (based on flake size/type)
            this.vAmp = this.vAmpTypes[this.type] || 1;
            this.melting = false;
            this.meltFrameCount = storm.meltFrameCount;
            this.meltFrames = storm.meltFrames;
            this.meltFrame = 0;
            this.twinkleFrame = 0;
            this.active = 1;
            this.fontSize = (18 + (this.type / 5) * 10);
            this.o = document.createElement('div');
            this.o.className = 'snowFall z-index-99';
            this.o.innerHTML = storm.snowCharacter;
            if (storm.className) {
                this.o.setAttribute('class', storm.className);
            }
            this.o.style.color = storm.snowColor;
            this.o.style.position = (fixedForEverything ? 'fixed' : 'absolute');
            if (storm.useGPU && features.transform.prop) {
                // GPU-accelerated snow.
                this.o.style[features.transform.prop] = 'translate3d(0px, 0px, 0px)';
            }
            this.o.style.width = storm.flakeWidth + 'px';
            this.o.style.height = storm.flakeHeight + 'px';
            this.o.style.fontFamily = 'arial,verdana';
            this.o.style.cursor = 'default';
            this.o.style.overflow = 'hidden';
            this.o.style.fontSize = '20px';
            this.o.style.fontWeight = 'normal';
            this.o.style.zIndex = storm.zIndex;
            this.o.style.userSelect = 'none';
            docFrag.appendChild(this.o);
            this.refresh = function () {
                if (isNaN(s.x) || isNaN(s.y)) {
                    // safety check
                    return false;
                }
                storm.setXY(s.o, s.x, s.y);
            };
            this.stick = function () {
                if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
                    s.o.style.top = (screenY + scrollY - storm.flakeHeight) + 'px';
                } else if (storm.flakeBottom) {
                    s.o.style.top = storm.flakeBottom + 'px';
                } else {
                    s.o.style.display = 'none';
                    s.o.style.bottom = '0%';
                    s.o.style.position = 'fixed';
                    s.o.style.display = 'block';
                }
            };
            this.vCheck = function () {
                if (s.vX >= 0 && s.vX < 0.2) {
                    s.vX = 0.2;
                } else if (s.vX < 0 && s.vX > -0.2) {
                    s.vX = -0.2;
                }
                if (s.vY >= 0 && s.vY < 0.2) {
                    s.vY = 0.2;
                }
            };
            this.move = function () {
                var vX = s.vX * windOffset,
                    yDiff;
                s.x += vX;
                s.y += (s.vY * s.vAmp);
                if (s.x >= screenX || screenX - s.x < storm.flakeWidth) { // X-axis scroll check
                    s.x = 0;
                } else if (vX < 0 && s.x - storm.flakeLeftOffset < -storm.flakeWidth) {
                    s.x = screenX - storm.flakeWidth - 1; // flakeWidth;
                }
                s.refresh();
                yDiff = screenY + scrollY - s.y + storm.flakeHeight;
                if (yDiff < storm.flakeHeight) {
                    s.active = 0;
                    if (storm.snowStick) {
                        s.stick();
                    } else {
                        s.recycle();
                    }
                } else {
                    if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random() > 0.998) {
                        // ~1/1000 chance of melting mid-air, with each frame
                        s.melting = true;
                        s.melt();
                        // only incrementally melt one frame
                        // s.melting = false;
                    }
                    if (storm.useTwinkleEffect) {
                        if (s.twinkleFrame < 0) {
                            if (Math.random() > 0.97) {
                                s.twinkleFrame = parseInt(Math.random() * 8, 10);
                            }
                        } else {
                            s.twinkleFrame--;
                            if (!opacitySupported) {
                                s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 'hidden' : 'visible');
                            } else {
                                s.o.style.opacity = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 0 : 1);
                            }
                        }
                    }
                }
            };
            this.animate = function () {
                // main animation loop
                // move, check status, die etc.
                s.move();
            };
            this.setVelocities = function () {
                s.vX = vRndX + rnd(storm.vMaxX * 0.12, 0.1);
                s.vY = vRndY + rnd(storm.vMaxY * 0.12, 0.1);
            };
            this.setOpacity = function (o, opacity) {
                if (!opacitySupported) {
                    return false;
                }
                o.style.opacity = opacity;
            };
            this.melt = function () {
                if (!storm.useMeltEffect || !s.melting) {
                    s.recycle();
                } else {
                    if (s.meltFrame < s.meltFrameCount) {
                        s.setOpacity(s.o, s.meltFrames[s.meltFrame]);
                        s.o.style.fontSize = s.fontSize - (s.fontSize * (s.meltFrame / s.meltFrameCount)) + 'px';
                        s.o.style.lineHeight = storm.flakeHeight + 2 + (storm.flakeHeight * 0.75 * (s.meltFrame / s.meltFrameCount)) + 'px';
                        s.meltFrame++;
                    } else {
                        s.recycle();
                    }
                }
            };
            this.recycle = function () {
                s.o.style.display = 'none';
                s.o.style.position = (fixedForEverything ? 'fixed' : 'absolute');
                s.o.style.bottom = 'auto';
                s.setVelocities();
                s.vCheck();
                s.meltFrame = 0;
                s.melting = false;
                s.setOpacity(s.o, 1);
                s.o.style.padding = '0px';
                s.o.style.margin = '0px';
                s.o.style.fontSize = s.fontSize + 'px';
                s.o.style.lineHeight = (storm.flakeHeight + 2) + 'px';
                s.o.style.textAlign = 'center';
                s.o.style.verticalAlign = 'baseline';
                s.x = parseInt(rnd(screenX - storm.flakeWidth - 20), 10);
                s.y = parseInt(rnd(screenY) * -1, 10) - storm.flakeHeight;
                s.refresh();
                s.o.style.display = 'block';
                s.active = 1;
            };
            this.recycle(); // set up x/y coords etc.
            this.refresh();
        };
        this.snow = function () {
            var active = 0,
                flake = null,
                i, j;
            for (i = 0, j = storm.flakes.length; i < j; i++) {
                if (storm.flakes[i].active === 1) {
                    storm.flakes[i].move();
                    active++;
                }
                if (storm.flakes[i].melting) {
                    storm.flakes[i].melt();
                }
            }
            if (active < storm.flakesMaxActive) {
                flake = storm.flakes[parseInt(rnd(storm.flakes.length), 10)];
                if (flake.active === 0) {
                    flake.melting = true;
                }
            }
            if (storm.timer) {
                features.getAnimationFrame(storm.snow);
            }
        };
        this.mouseMove = function (e) {
            if (!storm.followMouse) {
                return true;
            }
            var x = parseInt(e.clientX, 10);
            if (x < screenX2) {
                windOffset = -windMultiplier + (x / screenX2 * windMultiplier);
            } else {
                x -= screenX2;
                windOffset = (x / screenX2) * windMultiplier;
            }
        };
        this.createSnow = function (limit, allowInactive) {
            var i;
            for (i = 0; i < limit; i++) {
                storm.flakes[storm.flakes.length] = new storm.SnowFlake(parseInt(rnd(flakeTypes), 10));
                if (allowInactive || i > storm.flakesMaxActive) {
                    storm.flakes[storm.flakes.length - 1].active = -1;
                }
            }
            storm.targetElement.appendChild(docFrag);
        };
        this.timerInit = function () {
            storm.timer = true;
            storm.snow();
        };
        this.init = function () {
            var i;
            for (i = 0; i < storm.meltFrameCount; i++) {
                storm.meltFrames.push(1 - (i / storm.meltFrameCount));
            }
            storm.randomizeWind();
            storm.createSnow(storm.flakesMax); // create initial batch
            storm.events.add(window, 'resize', storm.resizeHandler);
            storm.events.add(window, 'scroll', storm.scrollHandler);
            if (storm.freezeOnBlur) {
                if (isIE) {
                    storm.events.add(document, 'focusout', storm.freeze);
                    storm.events.add(document, 'focusin', storm.resume);
                } else {
                    storm.events.add(window, 'blur', storm.freeze);
                    storm.events.add(window, 'focus', storm.resume);
                }
            }
            storm.resizeHandler();
            storm.scrollHandler();
            if (storm.followMouse) {
                storm.events.add(isIE ? document : window, 'mousemove', storm.mouseMove);
            }
            storm.animationInterval = Math.max(20, storm.animationInterval);
            storm.timerInit();
        };
        this.start = function (bFromOnLoad) {
            if (!didInit) {
                didInit = true;
            } else if (bFromOnLoad) {
                // already loaded and running
                return true;
            }
            if (typeof storm.targetElement === 'string') {
                var targetID = storm.targetElement;
                storm.targetElement = document.getElementById(targetID);
                if (!storm.targetElement) {
                    throw new Error('Snowstorm: Unable to get targetElement "' + targetID + '"');
                }
            }
            if (!storm.targetElement) {
                storm.targetElement = (document.body || document.documentElement);
            }
            if (storm.targetElement !== document.documentElement && storm.targetElement !== document.body) {
                // re-map handler to get element instead of screen dimensions
                storm.resizeHandler = storm.resizeHandlerAlt;
                //and force-enable pixel positioning
                storm.usePixelPosition = true;
            }
            storm.resizeHandler(); // get bounding box elements
            storm.usePositionFixed = (storm.usePositionFixed && !noFixed && !storm.flakeBottom); // whether or not position:fixed is to be used
            if (window.getComputedStyle) {
                // attempt to determine if body or user-specified snow parent element is relatlively-positioned.
                try {
                    targetElementIsRelative = (window.getComputedStyle(storm.targetElement, null).getPropertyValue('position') === 'relative');
                } catch (e) {
                    // oh well
                    targetElementIsRelative = false;
                }
            }
            fixedForEverything = storm.usePositionFixed;
            if (screenX && screenY && !storm.disabled) {
                storm.init();
                storm.active = true;
            }
        };

        function doDelayedStart() {
            window.setTimeout(function () {
                storm.start(true);
            }, 20);
            // event cleanup
            storm.events.remove(isIE ? document : window, 'mousemove', doDelayedStart);
        }

        function doStart() {
            if (!storm.excludeMobile || !isMobile) {
                doDelayedStart();
            }
            // event cleanup
            storm.events.remove(window, 'load', doStart);
        }

        // hooks for starting the snow
        if (storm.autoStart) {
            storm.events.add(window, 'load', doStart, false);
        }
        return this;
    }(window, document));
}

function rain() {
    var body = document.body;
    body.classList.add("rain");
    let hrElement;
    let counter = 30;
    for (let i = 0; i < counter; i++) {
        hrElement = document.createElement("HR");
        hrElement.classList.add('hrrain');
        hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
        hrElement.style.animationDuration = 0.2 + Math.random() * 0.9 + "s";
        hrElement.style.animationDelay = Math.random() * 0.5 + "s";

        document.body.appendChild(hrElement);
    }
}

// function winter() {
//
//     var falling = true;
//     // TweenLite.set("#container",{perspective:600})
//     // TweenLite.set("img",{xPercent:"-50%",yPercent:"-50%"})
//     var total = 4;
//     var container = document.getElementById("container"),
//         w = window.innerWidth,
//         h = window.innerHeight;
//
//     for (var i = 0; i < total; i++) {
//         var Div = document.createElement('div');
//         Div.style.backgroundImage = 'url(/themes/v1/assets/img/seasons/winter/snow1.png)';
//         var Div2 = document.createElement('div');
//         Div2.style.backgroundImage = 'url(/themes/v1/assets/img/seasons/winter/snow2.png))';
//         var Div3 = document.createElement('div');
//         Div3.style.backgroundImage = 'url(/themes/v1/assets/img/seasons/winter/snow3.png)';
//         var Div4 = document.createElement('div');
//         Div4.style.backgroundImage = 'url(/themes/v1/assets/img/seasons/winter/snow4.png)';
//         var Div5 = document.createElement('div');
//         Div5.style.backgroundImage = 'url(/themes/v1/assets/img/seasons/winter/snow5.png)';
//         TweenLite.set(Div, {
//             attr: {
//                 class: 'seasons'
//             },
//             x: R(0, w),
//             y: R(-200, -150),
//             z: R(-200, 200)
//         });
//         TweenLite.set(Div2, {
//             attr: {
//                 class: 'seasons'
//             },
//             x: R(0, w),
//             y: R(-200, -150),
//             z: R(-200, 200),
//             xPercent: "-50%",
//             yPercent: "-50%"
//         });
//         TweenLite.set(Div3, {
//             attr: {
//                 class: 'seasons'
//             },
//             x: R(0, w),
//             y: R(-200, -150),
//             z: R(-200, 200),
//             xPercent: "-50%",
//             yPercent: "-50%"
//         });
//         TweenLite.set(Div4, {
//             attr: {
//                 class: 'seasons'
//             },
//             x: R(0, w),
//             y: R(-200, -150),
//             z: R(-200, 200),
//             xPercent: "-50%",
//             yPercent: "-50%"
//         });
//         TweenLite.set(Div5, {
//             attr: {
//                 class: 'seasons'
//             },
//             x: R(0, w),
//             y: R(-200, -150),
//             z: R(-200, 200),
//             xPercent: "-50%",
//             yPercent: "-50%"
//         });
//         container.appendChild(Div);
//         container.appendChild(Div2);
//         container.appendChild(Div3);
//         container.appendChild(Div4);
//         container.appendChild(Div5);
//         animm(Div);
//         animm2(Div2);
//         animm3(Div3);
//         animm4(Div4);
//         animm5(Div5);
//
//     }
//
//     function animm(elm) {
//         TweenMax.to(elm, R(6, 15), {
//             y: h + 100,
//             ease: Linear.easeNone,
//             repeat: -1,
//             delay: -15
//         });
//         TweenMax.to(elm, R(4, 8), {
//             x: '+=100',
//             rotationZ: R(0, 180),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut
//         });
//         TweenMax.to(elm, R(2, 8), {
//             rotationX: R(0, 360),
//             rotationY: R(0, 360),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut,
//             delay: -5
//         });
//     };
//
//     function animm2(elm) {
//         TweenMax.to(elm, R(6, 15), {
//             y: h + 100,
//             ease: Linear.easeNone,
//             repeat: -1,
//             delay: -25
//         });
//         TweenMax.to(elm, R(4, 8), {
//             x: '+=100',
//             rotationZ: R(0, 180),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut
//         });
//         TweenMax.to(elm, R(2, 8), {
//             rotationX: R(0, 360),
//             rotationY: R(0, 360),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut,
//             delay: -5
//         });
//     };
//
//     function animm3(elm) {
//         TweenMax.to(elm, R(6, 15), {
//             y: h + 100,
//             ease: Linear.easeNone,
//             repeat: -1,
//             delay: -5
//         });
//         TweenMax.to(elm, R(4, 8), {
//             x: '+=100',
//             rotationZ: R(0, 180),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut
//         });
//         TweenMax.to(elm, R(2, 8), {
//             rotationX: R(0, 360),
//             rotationY: R(0, 360),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut,
//             delay: -5
//         });
//     };
//
//     function animm4(elm) {
//         TweenMax.to(elm, R(6, 15), {
//             y: h + 100,
//             ease: Linear.easeNone,
//             repeat: -1,
//             delay: -5
//         });
//         TweenMax.to(elm, R(4, 8), {
//             x: '+=100',
//             rotationZ: R(0, 180),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut
//         });
//         TweenMax.to(elm, R(2, 8), {
//             rotationX: R(0, 360),
//             rotationY: R(0, 360),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut,
//             delay: -5
//         });
//     };
//
//     function animm5(elm) {
//         TweenMax.to(elm, R(6, 15), {
//             y: h + 100,
//             ease: Linear.easeNone,
//             repeat: -1,
//             delay: -5
//         });
//         TweenMax.to(elm, R(4, 8), {
//             x: '+=100',
//             rotationZ: R(0, 180),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut
//         });
//         TweenMax.to(elm, R(2, 8), {
//             rotationX: R(0, 360),
//             rotationY: R(0, 360),
//             repeat: -1,
//             yoyo: true,
//             ease: Sine.easeInOut,
//             delay: -5
//         });
//     }
//
//     function R(min, max) {
//         return min + Math.random() * (max - min)
//     };
// }

function santaFollowingTheCursor() {
    let ghost = document.querySelector("#ghost");
    ghost.style.display = 'block';
    let headerFloatie = document.querySelector(".floatie");
    headerFloatie.style.display = 'block';
    let headerFloatieSVG = document.querySelector(".floatie svg");
    let permanentlyHideFloatie = false;
    let santaForUnlock = document.querySelector(".d-flex.align-items-center.santaForUnlock");
    santaForUnlock.classList.remove("santaForUnlock");
    let isFiring = false;

    let mouseX = 0;
    let mouseY = 0;

    let dX = 0;
    let dY = 0;

    let xPos = 0;
    let yPos = 0;

    let ghostTimeElapsed = 0;
    let ghostVisibility = true;


    function throttleEvent(event) {
        if (isFiring === false) {
            requestAnimationFrame(() => {
                setGhostPosition(event);
                isFiring = false;
            });
        }
        isFiring = true;
    }

    function setInitialGhostPosition() {
        if (permanentlyHideFloatie === true) {
            console.log("Ghost shouldn't be shown at all!");
            ghost.style.opacity = 0;
            return;
        }
        let initialXPos = localStorage.getItem("ghostInitialX");
        let initialYPos = localStorage.getItem("ghostInitialY");

        if (initialXPos) {
            ghost.style.setProperty("--ghostXPos", initialXPos + "px");
            xPos = Number(initialXPos);
            mouseX = Number(localStorage.getItem("ghostMouseX"));
        }

        if (initialYPos) {
            ghost.style.setProperty("--ghostYPos", initialYPos + "px");
            yPos = Number(initialYPos);
            mouseY = Number(localStorage.getItem("ghostMouseY"));
        }

        console.log(mouseX + " " + initialXPos + ", " + mouseY + " " + initialYPos);
    }

    setInitialGhostPosition();

    function setGhostPosition(event) {
        if (permanentlyHideFloatie === false) {
            ghostTimeElapsed = 0;
            ghostVisibility = true;
            showFloatie();
        } else {
            hideFloatie();
        }

        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function moveGhost() {
        if (permanentlyHideFloatie === false) {
            dX = mouseX - xPos;
            dY = mouseY - yPos;

            xPos += (dX / 100);
            yPos += (dY / 100);

            ghost.style.setProperty("--ghostXPos", xPos + "px");
            ghost.style.setProperty("--ghostYPos", yPos + "px");

            localStorage.setItem("ghostInitialX", xPos);
            localStorage.setItem("ghostInitialY", yPos);

            localStorage.setItem("ghostMouseX", xPos);
            localStorage.setItem("ghostMouseY", yPos);

            ghostTimeElapsed++;


            if ((ghostTimeElapsed > 300) && (ghostVisibility === true)) {
                hideFloatie();
                ghostVisibility = false;
            }
        }

        requestAnimationFrame(moveGhost);
    }

    moveGhost();

    function showFloatie() {
        ghost.style.opacity = 1;
    }

    function hideFloatie() {
        ghost.style.opacity = 0;
    }

    headerFloatie.addEventListener("click", toggleFloatieVisibility, false);

    function getFloatieVisbility() {
        // var floatieStatus = localStorage.setItem("floatieVisbility","show");
        var floatieStatus = localStorage.getItem("floatieVisbility");

        if (floatieStatus === "show") {
            permanentlyHideFloatie = false;
            headerFloatieSVG.classList.add("enabled");
        } else if (floatieStatus === "hide") {
            permanentlyHideFloatie = true;
            headerFloatieSVG.classList.remove("enabled");
        } else {
            permanentlyHideFloatie = false;
            headerFloatieSVG.classList.remove("enabled");
        }
    }

    getFloatieVisbility();

    function kickOffFloatie() {
        if (permanentlyHideFloatie === true) {
            hideFloatie();
        } else {
            document.body.addEventListener("mousemove", throttleEvent, false);
            headerFloatieSVG.classList.add("enabled");
            showFloatie();
        }
    }

    kickOffFloatie();

    function toggleFloatieVisibility(event) {
        var floatieStatus = localStorage.getItem("floatieVisbility");
        if (permanentlyHideFloatie === false) {
            localStorage.setItem("floatieVisbility", "hide");
            permanentlyHideFloatie = true;
            kickOffFloatie();
            headerFloatieSVG.classList.remove("enabled");
        }
        if (floatieStatus === null) {
            //localStorage.getItem("floatieVisbility");
            // localStorage.setItem("floatieVisbility", "show");
        }
        if (floatieStatus === undefined) {
            console.log("No stored value!");
            localStorage.setItem("floatieVisbility", "hide");
            permanentlyHideFloatie = true;
            // console.log("No stored value!");
            // console.log("Nima boldi");
            // localStorage.getItem("floatieVisbility");
            // localStorage.setItem("floatieVisbility", "show");
            // permanentlyHideFloatie = true;

            headerFloatieSVG.classList.remove("enabled");
        }

        if (floatieStatus === "show") {
            localStorage.setItem("floatieVisbility", "hide");
            permanentlyHideFloatie = true;

            headerFloatieSVG.classList.remove("enabled");
        }

        if (floatieStatus === "hide") {
            localStorage.setItem("floatieVisbility", "show");
            permanentlyHideFloatie = false;

            kickOffFloatie();

            headerFloatieSVG.classList.add("enabled");
        }
        console.log(permanentlyHideFloatie);
    }

}

function brandWithHat() {
    //let mainHeader = $('.main-header__brand');
    let mainHeader = document.querySelector('.main-header-hat');
    // create div element by javascript with class
    let span = document.createElement('span');
    //span.className = "hatSanta"; // js da
    span.classList.add('hatSanta');
    mainHeader.appendChild(span);

}

function springFestival() {
    $('.main-header__brand').addClass('spring');
    $('.main-header-hat').html('<img class="header-logo spring" src="/themes/v1/assets/img/logo/logobahor.png" alt="Kapital Sug’urtada Bahor">');
}

function summerFestival() {
    $('.main-header__brand').addClass('summer');
    $('.main-header-hat').html('<img class="header-logo summer" src="/themes/v1/assets/img/logo/logoyoz.png" alt="Kapital Sug’urtada Yoz">');
}

function holidayFireworks() {

    let minute = 60 * 1000;

    let hour = 60 * 60 * 1000;

    let fourHour = 4 * 60 * 60 * 1000; // 14400000

    let day = 24 * 60 * 60 * 1000;

    let intervalFireworks = localStorage.getItem('holidayFireworks');

    // localStorage.setItem('holidayFireworks', 'enabled', 5000);
    localStorage.setItem('holidayFireworks', 'enabled');

    /*setTimeout(() => {

        localStorage.removeItem('holidayFireworks');

    }, fourHour);*/

    if (intervalFireworks === 'enabled') {
        // disconected
        // localStorage.getItem('holidayFireworks');
    } else {
        if ($('.holidayFireworks').length) {
            let body = document.querySelector('.holidayFireworks');
            let underTheBody = document.createElement('div');
            underTheBody.classList.add('fireworksBody');
            body.prepend(underTheBody);

            $('.fireworksBody').fireworks();

            setTimeout(function () {

                $('.fireworksBody').fadeTo("slow", 0);

                setTimeout(function () {

                    $('.fireworksBody').fireworks('destroy').remove();

                    /*$('.fireworksBody').remove();*/

                }, 500);

            }, 4500);

        }
    }
    //span.className = "hatSanta"; // js da


}

function iosWinter2Old() {
    /** @license
     * DHTML Snowstorm! JavaScript-based snow for web pages
     * Making it snow on the internets since 2003. You're welcome.
     * -----------------------------------------------------------
     * Version 1.44.20131208 (Previous rev: 1.44.20131125)
     * Copyright (c) 2007, Scott Schiller. All rights reserved.
     * Code provided under the BSD License
     * http://schillmania.com/projects/snowstorm/license.txt
     */
    /*jslint nomen: true, plusplus: true, sloppy: true, vars: true, white: true */
    /*global window, document, navigator, clearInterval, setInterval */
    var snowStorm = (function (window, document) {
        // --- common properties ---
        this.autoStart = true; // Whether the snow should start automatically or not.
        this.excludeMobile = true; // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) Enable at your own risk.
        this.flakesMax = 512; // Limit total amount of snow made (falling + sticking)
        this.flakesMaxActive = 128; // Limit amount of snow falling at once (less = lower CPU use)
        this.animationInterval = 50; // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
        this.useGPU = true; // Enable transform-based hardware acceleration, reduce CPU load.
        this.className = null; // CSS class name for further customization on snow elements
        this.excludeMobile = true; // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
        this.flakeBottom = null; // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
        this.followMouse = true; // Snow movement can respond to the user's mouse
        this.snowColor = '#b4d0ff'; // Don't eat (or use?) yellow snow.
        this.snowCharacter = '*'; // &bull; = bullet, &middot; is square on some systems etc.
        this.snowStick = true; // Whether or not snow should "stick" at the bottom. When off, will never collect.
        this.targetElement = null; // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
        this.useMeltEffect = true; // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
        this.useTwinkleEffect = false; // Allow snow to randomly "flicker" in and out of view while falling
        this.usePositionFixed = false; // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported
        this.usePixelPosition = false; // Whether to use pixel values for snow top/left vs. percentages. Auto-enabled if body is position:relative or targetElement is specified.
        // --- less-used bits ---
        this.freezeOnBlur = false; // Only snow when the window is in focus (foreground.) Saves CPU.
        this.flakeLeftOffset = 0; // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
        this.flakeRightOffset = 0; // Right margin/gutter space on edge of container
        this.flakeWidth = 20; // Max pixel width reserved for snow element
        this.flakeHeight = 20; // Max pixel height reserved for snow element
        this.vMaxX = 2; // Maximum X velocity range for snow
        this.vMaxY = 2; // Maximum Y velocity range for snow
        this.zIndex = 0; // CSS stacking order applied to each snowflake
        // --- "No user-serviceable parts inside" past this point, yadda yadda ---
        var storm = this,
            features,
            // UA sniffing and backCompat rendering mode checks for fixed position, etc.
            isIE = navigator.userAgent.match(/msie/i),
            isIE6 = navigator.userAgent.match(/msie 6/i),
            isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
            isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
            noFixed = (isBackCompatIE || isIE6),
            screenX = null,
            screenX2 = null,
            screenY = null,
            scrollY = null,
            docHeight = null,
            vRndX = null,
            vRndY = null,
            windOffset = 1,
            windMultiplier = 2,
            flakeTypes = 6,
            fixedForEverything = false,
            targetElementIsRelative = false,
            opacitySupported = (function () {
                try {
                    document.createElement('div').style.opacity = '0.5';
                } catch (e) {
                    return false;
                }
                return true;
            }()),
            didInit = false,
            docFrag = document.createDocumentFragment();
        features = (function () {
            var getAnimationFrame;

            /**
             * hat tip: paul irish
             * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
             * https://gist.github.com/838785
             */
            function timeoutShim(callback) {
                window.setTimeout(callback, 1000 / (storm.animationInterval || 20));
            }

            var _animationFrame = (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                timeoutShim);
            // apply to window, avoid "illegal invocation" errors in Chrome
            getAnimationFrame = _animationFrame ? function () {
                return _animationFrame.apply(window, arguments);
            } : null;
            var testDiv;
            testDiv = document.createElement('div');

            function has(prop) {
                // test for feature support
                var result = testDiv.style[prop];
                return (result !== undefined ? prop : null);
            }

            // note local scope.
            var localFeatures = {
                transform: {
                    ie: has('-ms-transform'),
                    moz: has('MozTransform'),
                    opera: has('OTransform'),
                    webkit: has('webkitTransform'),
                    w3: has('transform'),
                    prop: null // the normalized property value
                },
                getAnimationFrame: getAnimationFrame
            };
            localFeatures.transform.prop = (
                localFeatures.transform.w3 ||
                localFeatures.transform.moz ||
                localFeatures.transform.webkit ||
                localFeatures.transform.ie ||
                localFeatures.transform.opera
            );
            testDiv = null;
            return localFeatures;
        }());
        this.timer = null;
        this.flakes = [];
        this.disabled = false;
        this.active = false;
        this.meltFrameCount = 20;
        this.meltFrames = [];
        this.setXY = function (o, x, y) {
            if (!o) {
                return false;
            }
            if (storm.usePixelPosition || targetElementIsRelative) {
                o.style.left = (x - storm.flakeWidth) + 'px';
                o.style.top = (y - storm.flakeHeight) + 'px';
            } else if (noFixed) {
                o.style.right = (100 - (x / screenX * 100)) + '%';
                // avoid creating vertical scrollbars
                o.style.top = (Math.min(y, docHeight - storm.flakeHeight)) + 'px';
            } else {
                if (!storm.flakeBottom) {
                    // if not using a fixed bottom coordinate...
                    o.style.right = (100 - (x / screenX * 100)) + '%';
                    o.style.bottom = (100 - (y / screenY * 100)) + '%';
                } else {
                    // absolute top.
                    o.style.right = (100 - (x / screenX * 100)) + '%';
                    o.style.top = (Math.min(y, docHeight - storm.flakeHeight)) + 'px';
                }
            }
        };
        this.events = (function () {
            var old = (!window.addEventListener && window.attachEvent),
                slice = Array.prototype.slice,
                evt = {
                    add: (old ? 'attachEvent' : 'addEventListener'),
                    remove: (old ? 'detachEvent' : 'removeEventListener')
                };

            function getArgs(oArgs) {
                var args = slice.call(oArgs),
                    len = args.length;
                if (old) {
                    args[1] = 'on' + args[1]; // prefix
                    if (len > 3) {
                        args.pop(); // no capture
                    }
                } else if (len === 3) {
                    args.push(false);
                }
                return args;
            }

            function apply(args, sType) {
                var element = args.shift(),
                    method = [evt[sType]];
                if (old) {
                    element[method](args[0], args[1]);
                } else {
                    element[method].apply(element, args);
                }
            }

            function addEvent() {
                apply(getArgs(arguments), 'add');
            }

            function removeEvent() {
                apply(getArgs(arguments), 'remove');
            }

            return {
                add: addEvent,
                remove: removeEvent
            };
        }());

        function rnd(n, min) {
            if (isNaN(min)) {
                min = 0;
            }
            return (Math.random() * n) + min;
        }

        function plusMinus(n) {
            return (parseInt(rnd(2), 10) === 1 ? n * -1 : n);
        }

        this.randomizeWind = function () {
            var i;
            vRndX = plusMinus(rnd(storm.vMaxX, 0.2));
            vRndY = rnd(storm.vMaxY, 0.2);
            if (this.flakes) {
                for (i = 0; i < this.flakes.length; i++) {
                    if (this.flakes[i].active) {
                        this.flakes[i].setVelocities();
                    }
                }
            }
        };
        this.scrollHandler = function () {
            var i;
            // "attach" snowflakes to bottom of window if no absolute bottom value was given
            scrollY = (storm.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || (noFixed ? document.body.scrollTop : 0), 10));
            if (isNaN(scrollY)) {
                scrollY = 0; // Netscape 6 scroll fix
            }
            if (!fixedForEverything && !storm.flakeBottom && storm.flakes) {
                for (i = 0; i < storm.flakes.length; i++) {
                    if (storm.flakes[i].active === 0) {
                        storm.flakes[i].stick();
                    }
                }
            }
        };
        this.resizeHandler = function () {
            if (window.innerWidth || window.innerHeight) {
                screenX = window.innerWidth - 16 - storm.flakeRightOffset;
                screenY = (storm.flakeBottom || window.innerHeight);
            } else {
                screenX = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (!isIE ? 8 : 0) - storm.flakeRightOffset;
                screenY = storm.flakeBottom || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
            }
            docHeight = document.body.offsetHeight;
            screenX2 = parseInt(screenX / 2, 10);
        };
        this.resizeHandlerAlt = function () {
            screenX = storm.targetElement.offsetWidth - storm.flakeRightOffset;
            screenY = storm.flakeBottom || storm.targetElement.offsetHeight;
            screenX2 = parseInt(screenX / 2, 10);
            docHeight = document.body.offsetHeight;
        };
        this.freeze = function () {
            // pause animation
            if (!storm.disabled) {
                storm.disabled = 1;
            } else {
                return false;
            }
            storm.timer = null;
        };
        this.resume = function () {
            if (storm.disabled) {
                storm.disabled = 0;
            } else {
                return false;
            }
            storm.timerInit();
        };
        this.toggleSnow = function () {
            if (!storm.flakes.length) {
                // first run
                storm.start();
            } else {
                storm.active = !storm.active;
                if (storm.active) {
                    storm.show();
                    storm.resume();
                } else {
                    storm.stop();
                    storm.freeze();
                }
            }
        };
        this.stop = function () {
            var i;
            this.freeze();
            for (i = 0; i < this.flakes.length; i++) {
                this.flakes[i].o.style.display = 'none';
            }
            storm.events.remove(window, 'scroll', storm.scrollHandler);
            storm.events.remove(window, 'resize', storm.resizeHandler);
            if (storm.freezeOnBlur) {
                if (isIE) {
                    storm.events.remove(document, 'focusout', storm.freeze);
                    storm.events.remove(document, 'focusin', storm.resume);
                } else {
                    storm.events.remove(window, 'blur', storm.freeze);
                    storm.events.remove(window, 'focus', storm.resume);
                }
            }
        };
        this.show = function () {
            var i;
            for (i = 0; i < this.flakes.length; i++) {
                this.flakes[i].o.style.display = 'block';
            }
        };
        this.SnowFlake = function (type, x, y) {
            var s = this;
            this.type = type;
            this.x = x || parseInt(rnd(screenX - 20), 10);
            this.y = (!isNaN(y) ? y : -rnd(screenY) - 12);
            this.vX = null;
            this.vY = null;
            this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8]; // "amplification" for vX/vY (based on flake size/type)
            this.vAmp = this.vAmpTypes[this.type] || 1;
            this.melting = false;
            this.meltFrameCount = storm.meltFrameCount;
            this.meltFrames = storm.meltFrames;
            this.meltFrame = 0;
            this.twinkleFrame = 0;
            this.active = 1;
            this.fontSize = (18 + (this.type / 5) * 10);
            this.o = document.createElement('div');
            this.o.className = 'snowFall z-index-99';
            this.o.innerHTML = storm.snowCharacter;
            if (storm.className) {
                this.o.setAttribute('class', storm.className);
            }
            this.o.style.color = storm.snowColor;
            this.o.style.position = (fixedForEverything ? 'fixed' : 'absolute');
            if (storm.useGPU && features.transform.prop) {
                // GPU-accelerated snow.
                this.o.style[features.transform.prop] = 'translate3d(0px, 0px, 0px)';
            }
            this.o.style.width = storm.flakeWidth + 'px';
            this.o.style.height = storm.flakeHeight + 'px';
            this.o.style.fontFamily = 'arial,verdana';
            this.o.style.cursor = 'default';
            this.o.style.overflow = 'hidden';
            this.o.style.fontSize = '20px';
            this.o.style.fontWeight = 'normal';
            this.o.style.zIndex = storm.zIndex;
            this.o.style.userSelect = 'none';
            docFrag.appendChild(this.o);
            this.refresh = function () {
                if (isNaN(s.x) || isNaN(s.y)) {
                    // safety check
                    return false;
                }
                storm.setXY(s.o, s.x, s.y);
            };
            this.stick = function () {
                if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
                    s.o.style.top = (screenY + scrollY - storm.flakeHeight) + 'px';
                } else if (storm.flakeBottom) {
                    s.o.style.top = storm.flakeBottom + 'px';
                } else {
                    s.o.style.display = 'none';
                    s.o.style.bottom = '0%';
                    s.o.style.position = 'fixed';
                    s.o.style.display = 'block';
                }
            };
            this.vCheck = function () {
                if (s.vX >= 0 && s.vX < 0.2) {
                    s.vX = 0.2;
                } else if (s.vX < 0 && s.vX > -0.2) {
                    s.vX = -0.2;
                }
                if (s.vY >= 0 && s.vY < 0.2) {
                    s.vY = 0.2;
                }
            };
            this.move = function () {
                var vX = s.vX * windOffset,
                    yDiff;
                s.x += vX;
                s.y += (s.vY * s.vAmp);
                if (s.x >= screenX || screenX - s.x < storm.flakeWidth) { // X-axis scroll check
                    s.x = 0;
                } else if (vX < 0 && s.x - storm.flakeLeftOffset < -storm.flakeWidth) {
                    s.x = screenX - storm.flakeWidth - 1; // flakeWidth;
                }
                s.refresh();
                yDiff = screenY + scrollY - s.y + storm.flakeHeight;
                if (yDiff < storm.flakeHeight) {
                    s.active = 0;
                    if (storm.snowStick) {
                        s.stick();
                    } else {
                        s.recycle();
                    }
                } else {
                    if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random() > 0.998) {
                        // ~1/1000 chance of melting mid-air, with each frame
                        s.melting = true;
                        s.melt();
                        // only incrementally melt one frame
                        // s.melting = false;
                    }
                    if (storm.useTwinkleEffect) {
                        if (s.twinkleFrame < 0) {
                            if (Math.random() > 0.97) {
                                s.twinkleFrame = parseInt(Math.random() * 8, 10);
                            }
                        } else {
                            s.twinkleFrame--;
                            if (!opacitySupported) {
                                s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 'hidden' : 'visible');
                            } else {
                                s.o.style.opacity = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 0 : 1);
                            }
                        }
                    }
                }
            };
            this.animate = function () {
                // main animation loop
                // move, check status, die etc.
                s.move();
            };
            this.setVelocities = function () {
                s.vX = vRndX + rnd(storm.vMaxX * 0.12, 0.1);
                s.vY = vRndY + rnd(storm.vMaxY * 0.12, 0.1);
            };
            this.setOpacity = function (o, opacity) {
                if (!opacitySupported) {
                    return false;
                }
                o.style.opacity = opacity;
            };
            this.melt = function () {
                if (!storm.useMeltEffect || !s.melting) {
                    s.recycle();
                } else {
                    if (s.meltFrame < s.meltFrameCount) {
                        s.setOpacity(s.o, s.meltFrames[s.meltFrame]);
                        s.o.style.fontSize = s.fontSize - (s.fontSize * (s.meltFrame / s.meltFrameCount)) + 'px';
                        s.o.style.lineHeight = storm.flakeHeight + 2 + (storm.flakeHeight * 0.75 * (s.meltFrame / s.meltFrameCount)) + 'px';
                        s.meltFrame++;
                    } else {
                        s.recycle();
                    }
                }
            };
            this.recycle = function () {
                s.o.style.display = 'none';
                s.o.style.position = (fixedForEverything ? 'fixed' : 'absolute');
                s.o.style.bottom = 'auto';
                s.setVelocities();
                s.vCheck();
                s.meltFrame = 0;
                s.melting = false;
                s.setOpacity(s.o, 1);
                s.o.style.padding = '0px';
                s.o.style.margin = '0px';
                s.o.style.fontSize = s.fontSize + 'px';
                s.o.style.lineHeight = (storm.flakeHeight + 2) + 'px';
                s.o.style.textAlign = 'center';
                s.o.style.verticalAlign = 'baseline';
                s.x = parseInt(rnd(screenX - storm.flakeWidth - 20), 10);
                s.y = parseInt(rnd(screenY) * -1, 10) - storm.flakeHeight;
                s.refresh();
                s.o.style.display = 'block';
                s.active = 1;
            };
            this.recycle(); // set up x/y coords etc.
            this.refresh();
        };
        this.snow = function () {
            var active = 0,
                flake = null,
                i, j;
            for (i = 0, j = storm.flakes.length; i < j; i++) {
                if (storm.flakes[i].active === 1) {
                    storm.flakes[i].move();
                    active++;
                }
                if (storm.flakes[i].melting) {
                    storm.flakes[i].melt();
                }
            }
            if (active < storm.flakesMaxActive) {
                flake = storm.flakes[parseInt(rnd(storm.flakes.length), 10)];
                if (flake.active === 0) {
                    flake.melting = true;
                }
            }
            if (storm.timer) {
                features.getAnimationFrame(storm.snow);
            }
        };
        this.mouseMove = function (e) {
            if (!storm.followMouse) {
                return true;
            }
            var x = parseInt(e.clientX, 10);
            if (x < screenX2) {
                windOffset = -windMultiplier + (x / screenX2 * windMultiplier);
            } else {
                x -= screenX2;
                windOffset = (x / screenX2) * windMultiplier;
            }
        };
        this.createSnow = function (limit, allowInactive) {
            var i;
            for (i = 0; i < limit; i++) {
                storm.flakes[storm.flakes.length] = new storm.SnowFlake(parseInt(rnd(flakeTypes), 10));
                if (allowInactive || i > storm.flakesMaxActive) {
                    storm.flakes[storm.flakes.length - 1].active = -1;
                }
            }
            storm.targetElement.appendChild(docFrag);
        };
        this.timerInit = function () {
            storm.timer = true;
            storm.snow();
        };
        this.init = function () {
            var i;
            for (i = 0; i < storm.meltFrameCount; i++) {
                storm.meltFrames.push(1 - (i / storm.meltFrameCount));
            }
            storm.randomizeWind();
            storm.createSnow(storm.flakesMax); // create initial batch
            storm.events.add(window, 'resize', storm.resizeHandler);
            storm.events.add(window, 'scroll', storm.scrollHandler);
            if (storm.freezeOnBlur) {
                if (isIE) {
                    storm.events.add(document, 'focusout', storm.freeze);
                    storm.events.add(document, 'focusin', storm.resume);
                } else {
                    storm.events.add(window, 'blur', storm.freeze);
                    storm.events.add(window, 'focus', storm.resume);
                }
            }
            storm.resizeHandler();
            storm.scrollHandler();
            if (storm.followMouse) {
                storm.events.add(isIE ? document : window, 'mousemove', storm.mouseMove);
            }
            storm.animationInterval = Math.max(20, storm.animationInterval);
            storm.timerInit();
        };
        this.start = function (bFromOnLoad) {
            if (!didInit) {
                didInit = true;
            } else if (bFromOnLoad) {
                // already loaded and running
                return true;
            }
            if (typeof storm.targetElement === 'string') {
                var targetID = storm.targetElement;
                storm.targetElement = document.getElementById(targetID);
                if (!storm.targetElement) {
                    throw new Error('Snowstorm: Unable to get targetElement "' + targetID + '"');
                }
            }
            if (!storm.targetElement) {
                storm.targetElement = (document.body || document.documentElement);
            }
            if (storm.targetElement !== document.documentElement && storm.targetElement !== document.body) {
                // re-map handler to get element instead of screen dimensions
                storm.resizeHandler = storm.resizeHandlerAlt;
                //and force-enable pixel positioning
                storm.usePixelPosition = true;
            }
            storm.resizeHandler(); // get bounding box elements
            storm.usePositionFixed = (storm.usePositionFixed && !noFixed && !storm.flakeBottom); // whether or not position:fixed is to be used
            if (window.getComputedStyle) {
                // attempt to determine if body or user-specified snow parent element is relatlively-positioned.
                try {
                    targetElementIsRelative = (window.getComputedStyle(storm.targetElement, null).getPropertyValue('position') === 'relative');
                } catch (e) {
                    // oh well
                    targetElementIsRelative = false;
                }
            }
            fixedForEverything = storm.usePositionFixed;
            if (screenX && screenY && !storm.disabled) {
                storm.init();
                storm.active = true;
            }
        };

        function doDelayedStart() {
            window.setTimeout(function () {
                storm.start(true);
            }, 20);
            // event cleanup
            storm.events.remove(isIE ? document : window, 'mousemove', doDelayedStart);
        }

        function doStart() {
            if (!storm.excludeMobile || !isMobile) {
                doDelayedStart();
            }
            // event cleanup
            storm.events.remove(window, 'load', doStart);
        }

        // hooks for starting the snow
        if (storm.autoStart) {
            storm.events.add(window, 'load', doStart, false);
        }
        return this;
    }(window, document));
}

function iosWinter2() {
    /** @license
     * DHTML Snowstorm! JavaScript-based snow for web pages
     * Making it snow on the internets since 2003. You're welcome.
     * -----------------------------------------------------------
     * Version 1.44.20131208 (Previous rev: 1.44.20131125)
     * Copyright (c) 2007, Scott Schiller. All rights reserved.
     * Code provided under the BSD License
     * http://schillmania.com/projects/snowstorm/license.txt
     */
    /*jslint nomen: true, plusplus: true, sloppy: true, vars: true, white: true */
    /*global window, document, navigator, clearInterval, setInterval */
    var snowStorm = (function (window, document) {
        // --- common properties ---
        this.autoStart = true; // Whether the snow should start automatically or not.
        this.excludeMobile = true; // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) Enable at your own risk.
        this.flakesMax = 512; // Limit total amount of snow made (falling + sticking)
        this.flakesMaxActive = 128; // Limit amount of snow falling at once (less = lower CPU use)
        this.animationInterval = 50; // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
        this.useGPU = true; // Enable transform-based hardware acceleration, reduce CPU load.
        this.className = null; // CSS class name for further customization on snow elements
        this.excludeMobile = true; // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
        this.flakeBottom = null; // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
        this.followMouse = true; // Snow movement can respond to the user's mouse
        this.snowColor = '#b4d0ff'; // Don't eat (or use?) yellow snow.
        this.snowCharacter = '*'; // &bull; = bullet, &middot; is square on some systems etc.
        this.snowStick = true; // Whether or not snow should "stick" at the bottom. When off, will never collect.
        this.targetElement = null; // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
        this.useMeltEffect = true; // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
        this.useTwinkleEffect = false; // Allow snow to randomly "flicker" in and out of view while falling
        this.usePositionFixed = false; // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported
        this.usePixelPosition = false; // Whether to use pixel values for snow top/left vs. percentages. Auto-enabled if body is position:relative or targetElement is specified.
        // --- less-used bits ---
        this.freezeOnBlur = false; // Only snow when the window is in focus (foreground.) Saves CPU.
        this.flakeLeftOffset = 0; // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
        this.flakeRightOffset = 0; // Right margin/gutter space on edge of container
        this.flakeWidth = 20; // Max pixel width reserved for snow element
        this.flakeHeight = 20; // Max pixel height reserved for snow element
        this.vMaxX = 2; // Maximum X velocity range for snow
        this.vMaxY = 2; // Maximum Y velocity range for snow
        this.zIndex = 0; // CSS stacking order applied to each snowflake
        // --- "No user-serviceable parts inside" past this point, yadda yadda ---
        var storm = this,
            features,
            // UA sniffing and backCompat rendering mode checks for fixed position, etc.
            isIE = navigator.userAgent.match(/msie/i),
            isIE6 = navigator.userAgent.match(/msie 6/i),
            isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
            isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
            noFixed = (isBackCompatIE || isIE6),
            screenX = null,
            screenX2 = null,
            screenY = null,
            scrollY = null,
            docHeight = null,
            vRndX = null,
            vRndY = null,
            windOffset = 1,
            windMultiplier = 2,
            flakeTypes = 6,
            fixedForEverything = false,
            targetElementIsRelative = false,
            opacitySupported = (function () {
                try {
                    document.createElement('div').style.opacity = '0.5';
                } catch (e) {
                    return false;
                }
                return true;
            }()),
            didInit = false,
            docFrag = document.createDocumentFragment();
        features = (function () {
            var getAnimationFrame;

            /**
             * hat tip: paul irish
             * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
             * https://gist.github.com/838785
             */
            function timeoutShim(callback) {
                window.setTimeout(callback, 1000 / (storm.animationInterval || 20));
            }

            var _animationFrame = (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                timeoutShim);
            // apply to window, avoid "illegal invocation" errors in Chrome
            getAnimationFrame = _animationFrame ? function () {
                return _animationFrame.apply(window, arguments);
            } : null;
            var testDiv;
            testDiv = document.createElement('div');

            function has(prop) {
                // test for feature support
                var result = testDiv.style[prop];
                return (result !== undefined ? prop : null);
            }

            // note local scope.
            var localFeatures = {
                transform: {
                    ie: has('-ms-transform'),
                    moz: has('MozTransform'),
                    opera: has('OTransform'),
                    webkit: has('webkitTransform'),
                    w3: has('transform'),
                    prop: null // the normalized property value
                },
                getAnimationFrame: getAnimationFrame
            };
            localFeatures.transform.prop = (
                localFeatures.transform.w3 ||
                localFeatures.transform.moz ||
                localFeatures.transform.webkit ||
                localFeatures.transform.ie ||
                localFeatures.transform.opera
            );
            testDiv = null;
            return localFeatures;
        }());
        this.timer = null;
        this.flakes = [];
        this.disabled = false;
        this.active = false;
        this.meltFrameCount = 20;
        this.meltFrames = [];
        this.setXY = function (o, x, y) {
            if (!o) {
                return false;
            }
            if (storm.usePixelPosition || targetElementIsRelative) {
                o.style.left = (x - storm.flakeWidth) + 'px';
                o.style.top = (y - storm.flakeHeight) + 'px';
            } else if (noFixed) {
                o.style.right = (100 - (x / screenX * 100)) + '%';
                // avoid creating vertical scrollbars
                o.style.top = (Math.min(y, docHeight - storm.flakeHeight)) + 'px';
            } else {
                if (!storm.flakeBottom) {
                    // if not using a fixed bottom coordinate...
                    o.style.right = (100 - (x / screenX * 100)) + '%';
                    o.style.bottom = (100 - (y / screenY * 100)) + '%';
                } else {
                    // absolute top.
                    o.style.right = (100 - (x / screenX * 100)) + '%';
                    o.style.top = (Math.min(y, docHeight - storm.flakeHeight)) + 'px';
                }
            }
        };
        this.events = (function () {
            var old = (!window.addEventListener && window.attachEvent),
                slice = Array.prototype.slice,
                evt = {
                    add: (old ? 'attachEvent' : 'addEventListener'),
                    remove: (old ? 'detachEvent' : 'removeEventListener')
                };

            function getArgs(oArgs) {
                var args = slice.call(oArgs),
                    len = args.length;
                if (old) {
                    args[1] = 'on' + args[1]; // prefix
                    if (len > 3) {
                        args.pop(); // no capture
                    }
                } else if (len === 3) {
                    args.push(false);
                }
                return args;
            }

            function apply(args, sType) {
                var element = args.shift(),
                    method = [evt[sType]];
                if (old) {
                    element[method](args[0], args[1]);
                } else {
                    element[method].apply(element, args);
                }
            }

            function addEvent() {
                apply(getArgs(arguments), 'add');
            }

            function removeEvent() {
                apply(getArgs(arguments), 'remove');
            }

            return {
                add: addEvent,
                remove: removeEvent
            };
        }());

        function rnd(n, min) {
            if (isNaN(min)) {
                min = 0;
            }
            return (Math.random() * n) + min;
        }

        function plusMinus(n) {
            return (parseInt(rnd(2), 10) === 1 ? n * -1 : n);
        }

        this.randomizeWind = function () {
            var i;
            vRndX = plusMinus(rnd(storm.vMaxX, 0.2));
            vRndY = rnd(storm.vMaxY, 0.2);
            if (this.flakes) {
                for (i = 0; i < this.flakes.length; i++) {
                    if (this.flakes[i].active) {
                        this.flakes[i].setVelocities();
                    }
                }
            }
        };
        this.scrollHandler = function () {
            var i;
            // "attach" snowflakes to bottom of window if no absolute bottom value was given
            scrollY = (storm.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || (noFixed ? document.body.scrollTop : 0), 10));
            if (isNaN(scrollY)) {
                scrollY = 0; // Netscape 6 scroll fix
            }
            if (!fixedForEverything && !storm.flakeBottom && storm.flakes) {
                for (i = 0; i < storm.flakes.length; i++) {
                    if (storm.flakes[i].active === 0) {
                        storm.flakes[i].stick();
                    }
                }
            }
        };
        this.resizeHandler = function () {
            if (window.innerWidth || window.innerHeight) {
                screenX = window.innerWidth - 16 - storm.flakeRightOffset;
                screenY = (storm.flakeBottom || window.innerHeight);
            } else {
                screenX = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (!isIE ? 8 : 0) - storm.flakeRightOffset;
                screenY = storm.flakeBottom || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
            }
            docHeight = document.body.offsetHeight;
            screenX2 = parseInt(screenX / 2, 10);
        };
        this.resizeHandlerAlt = function () {
            screenX = storm.targetElement.offsetWidth - storm.flakeRightOffset;
            screenY = storm.flakeBottom || storm.targetElement.offsetHeight;
            screenX2 = parseInt(screenX / 2, 10);
            docHeight = document.body.offsetHeight;
        };
        this.freeze = function () {
            // pause animation
            if (!storm.disabled) {
                storm.disabled = 1;
            } else {
                return false;
            }
            storm.timer = null;
        };
        this.resume = function () {
            if (storm.disabled) {
                storm.disabled = 0;
            } else {
                return false;
            }
            storm.timerInit();
        };
        this.toggleSnow = function () {
            if (!storm.flakes.length) {
                // first run
                storm.start();
            } else {
                storm.active = !storm.active;
                if (storm.active) {
                    storm.show();
                    storm.resume();
                } else {
                    storm.stop();
                    storm.freeze();
                }
            }
        };
        this.stop = function () {
            var i;
            this.freeze();
            for (i = 0; i < this.flakes.length; i++) {
                this.flakes[i].o.style.display = 'none';
            }
            storm.events.remove(window, 'scroll', storm.scrollHandler);
            storm.events.remove(window, 'resize', storm.resizeHandler);
            if (storm.freezeOnBlur) {
                if (isIE) {
                    storm.events.remove(document, 'focusout', storm.freeze);
                    storm.events.remove(document, 'focusin', storm.resume);
                } else {
                    storm.events.remove(window, 'blur', storm.freeze);
                    storm.events.remove(window, 'focus', storm.resume);
                }
            }
        };
        this.show = function () {
            var i;
            for (i = 0; i < this.flakes.length; i++) {
                this.flakes[i].o.style.display = 'block';
            }
        };
        this.SnowFlake = function (type, x, y) {
            var s = this;
            this.type = type;
            this.x = x || parseInt(rnd(screenX - 20), 10);
            this.y = (!isNaN(y) ? y : -rnd(screenY) - 12);
            this.vX = null;
            this.vY = null;
            this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8]; // "amplification" for vX/vY (based on flake size/type)
            this.vAmp = this.vAmpTypes[this.type] || 1;
            this.melting = false;
            this.meltFrameCount = storm.meltFrameCount;
            this.meltFrames = storm.meltFrames;
            this.meltFrame = 0;
            this.twinkleFrame = 0;
            this.active = 1;
            this.fontSize = (18 + (this.type / 5) * 10);
            this.o = document.createElement('div');
            this.o.className = 'snowFall z-index-99';
            this.o.innerHTML = storm.snowCharacter;
            if (storm.className) {
                this.o.setAttribute('class', storm.className);
            }
            this.o.style.color = storm.snowColor;
            this.o.style.position = (fixedForEverything ? 'fixed' : 'absolute');
            if (storm.useGPU && features.transform.prop) {
                // GPU-accelerated snow.
                this.o.style[features.transform.prop] = 'translate3d(0px, 0px, 0px)';
            }
            this.o.style.width = storm.flakeWidth + 'px';
            this.o.style.height = storm.flakeHeight + 'px';
            this.o.style.fontFamily = 'arial,verdana';
            this.o.style.cursor = 'default';
            this.o.style.overflow = 'hidden';
            this.o.style.fontSize = '20px';
            this.o.style.fontWeight = 'normal';
            this.o.style.zIndex = storm.zIndex;
            this.o.style.userSelect = 'none';
            docFrag.appendChild(this.o);
            this.refresh = function () {
                if (isNaN(s.x) || isNaN(s.y)) {
                    // safety check
                    return false;
                }
                storm.setXY(s.o, s.x, s.y);
            };
            this.stick = function () {
                if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
                    s.o.style.top = (screenY + scrollY - storm.flakeHeight) + 'px';
                } else if (storm.flakeBottom) {
                    s.o.style.top = storm.flakeBottom + 'px';
                } else {
                    s.o.style.display = 'none';
                    s.o.style.bottom = '0%';
                    s.o.style.position = 'fixed';
                    s.o.style.display = 'block';
                }
            };
            this.vCheck = function () {
                if (s.vX >= 0 && s.vX < 0.2) {
                    s.vX = 0.2;
                } else if (s.vX < 0 && s.vX > -0.2) {
                    s.vX = -0.2;
                }
                if (s.vY >= 0 && s.vY < 0.2) {
                    s.vY = 0.2;
                }
            };
            this.move = function () {
                var vX = s.vX * windOffset,
                    yDiff;
                s.x += vX;
                s.y += (s.vY * s.vAmp);
                if (s.x >= screenX || screenX - s.x < storm.flakeWidth) { // X-axis scroll check
                    s.x = 0;
                } else if (vX < 0 && s.x - storm.flakeLeftOffset < -storm.flakeWidth) {
                    s.x = screenX - storm.flakeWidth - 1; // flakeWidth;
                }
                s.refresh();
                yDiff = screenY + scrollY - s.y + storm.flakeHeight;
                if (yDiff < storm.flakeHeight) {
                    s.active = 0;
                    if (storm.snowStick) {
                        s.stick();
                    } else {
                        s.recycle();
                    }
                } else {
                    if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random() > 0.998) {
                        // ~1/1000 chance of melting mid-air, with each frame
                        s.melting = true;
                        s.melt();
                        // only incrementally melt one frame
                        // s.melting = false;
                    }
                    if (storm.useTwinkleEffect) {
                        if (s.twinkleFrame < 0) {
                            if (Math.random() > 0.97) {
                                s.twinkleFrame = parseInt(Math.random() * 8, 10);
                            }
                        } else {
                            s.twinkleFrame--;
                            if (!opacitySupported) {
                                s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 'hidden' : 'visible');
                            } else {
                                s.o.style.opacity = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 0 : 1);
                            }
                        }
                    }
                }
            };
            this.animate = function () {
                // main animation loop
                // move, check status, die etc.
                s.move();
            };
            this.setVelocities = function () {
                s.vX = vRndX + rnd(storm.vMaxX * 0.12, 0.1);
                s.vY = vRndY + rnd(storm.vMaxY * 0.12, 0.1);
            };
            this.setOpacity = function (o, opacity) {
                if (!opacitySupported) {
                    return false;
                }
                o.style.opacity = opacity;
            };
            this.melt = function () {
                if (!storm.useMeltEffect || !s.melting) {
                    s.recycle();
                } else {
                    if (s.meltFrame < s.meltFrameCount) {
                        s.setOpacity(s.o, s.meltFrames[s.meltFrame]);
                        s.o.style.fontSize = s.fontSize - (s.fontSize * (s.meltFrame / s.meltFrameCount)) + 'px';
                        s.o.style.lineHeight = storm.flakeHeight + 2 + (storm.flakeHeight * 0.75 * (s.meltFrame / s.meltFrameCount)) + 'px';
                        s.meltFrame++;
                    } else {
                        s.recycle();
                    }
                }
            };
            this.recycle = function () {
                s.o.style.display = 'none';
                s.o.style.position = (fixedForEverything ? 'fixed' : 'absolute');
                s.o.style.bottom = 'auto';
                s.setVelocities();
                s.vCheck();
                s.meltFrame = 0;
                s.melting = false;
                s.setOpacity(s.o, 1);
                s.o.style.padding = '0px';
                s.o.style.margin = '0px';
                s.o.style.fontSize = s.fontSize + 'px';
                s.o.style.lineHeight = (storm.flakeHeight + 2) + 'px';
                s.o.style.textAlign = 'center';
                s.o.style.verticalAlign = 'baseline';
                s.x = parseInt(rnd(screenX - storm.flakeWidth - 20), 10);
                s.y = parseInt(rnd(screenY) * -1, 10) - storm.flakeHeight;
                s.refresh();
                s.o.style.display = 'block';
                s.active = 1;
            };
            this.recycle(); // set up x/y coords etc.
            this.refresh();
        };
        this.snow = function () {
            var active = 0,
                flake = null,
                i, j;
            for (i = 0, j = storm.flakes.length; i < j; i++) {
                if (storm.flakes[i].active === 1) {
                    storm.flakes[i].move();
                    active++;
                }
                if (storm.flakes[i].melting) {
                    storm.flakes[i].melt();
                }
            }
            if (active < storm.flakesMaxActive) {
                flake = storm.flakes[parseInt(rnd(storm.flakes.length), 10)];
                if (flake.active === 0) {
                    flake.melting = true;
                }
            }
            if (storm.timer) {
                features.getAnimationFrame(storm.snow);
            }
        };
        this.mouseMove = function (e) {
            if (!storm.followMouse) {
                return true;
            }
            var x = parseInt(e.clientX, 10);
            if (x < screenX2) {
                windOffset = -windMultiplier + (x / screenX2 * windMultiplier);
            } else {
                x -= screenX2;
                windOffset = (x / screenX2) * windMultiplier;
            }
        };
        this.createSnow = function (limit, allowInactive) {
            var i;
            for (i = 0; i < limit; i++) {
                storm.flakes[storm.flakes.length] = new storm.SnowFlake(parseInt(rnd(flakeTypes), 10));
                if (allowInactive || i > storm.flakesMaxActive) {
                    storm.flakes[storm.flakes.length - 1].active = -1;
                }
            }
            storm.targetElement.appendChild(docFrag);
        };
        this.timerInit = function () {
            storm.timer = true;
            storm.snow();
        };
        this.init = function () {
            var i;
            for (i = 0; i < storm.meltFrameCount; i++) {
                storm.meltFrames.push(1 - (i / storm.meltFrameCount));
            }
            storm.randomizeWind();
            storm.createSnow(storm.flakesMax); // create initial batch
            storm.events.add(window, 'resize', storm.resizeHandler);
            storm.events.add(window, 'scroll', storm.scrollHandler);
            if (storm.freezeOnBlur) {
                if (isIE) {
                    storm.events.add(document, 'focusout', storm.freeze);
                    storm.events.add(document, 'focusin', storm.resume);
                } else {
                    storm.events.add(window, 'blur', storm.freeze);
                    storm.events.add(window, 'focus', storm.resume);
                }
            }
            storm.resizeHandler();
            storm.scrollHandler();
            if (storm.followMouse) {
                storm.events.add(isIE ? document : window, 'mousemove', storm.mouseMove);
            }
            storm.animationInterval = Math.max(20, storm.animationInterval);
            storm.timerInit();
        };
        this.start = function (bFromOnLoad) {
            if (!didInit) {
                didInit = true;
            } else if (bFromOnLoad) {
                // already loaded and running
                return true;
            }
            if (typeof storm.targetElement === 'string') {
                var targetID = storm.targetElement;
                storm.targetElement = document.getElementById(targetID);
                if (!storm.targetElement) {
                    throw new Error('Snowstorm: Unable to get targetElement "' + targetID + '"');
                }
            }
            if (!storm.targetElement) {
                storm.targetElement = (document.body || document.documentElement);
            }
            if (storm.targetElement !== document.documentElement && storm.targetElement !== document.body) {
                // re-map handler to get element instead of screen dimensions
                storm.resizeHandler = storm.resizeHandlerAlt;
                //and force-enable pixel positioning
                storm.usePixelPosition = true;
            }
            storm.resizeHandler(); // get bounding box elements
            storm.usePositionFixed = (storm.usePositionFixed && !noFixed && !storm.flakeBottom); // whether or not position:fixed is to be used
            if (window.getComputedStyle) {
                // attempt to determine if body or user-specified snow parent element is relatlively-positioned.
                try {
                    targetElementIsRelative = (window.getComputedStyle(storm.targetElement, null).getPropertyValue('position') === 'relative');
                } catch (e) {
                    // oh well
                    targetElementIsRelative = false;
                }
            }
            fixedForEverything = storm.usePositionFixed;
            if (screenX && screenY && !storm.disabled) {
                storm.init();
                storm.active = true;
            }
        };

        function doDelayedStart() {
            window.setTimeout(function () {
                storm.start(true);
            }, 20);
            // event cleanup
            storm.events.remove(isIE ? document : window, 'mousemove', doDelayedStart);
        }

        function doStart() {
            if (!storm.excludeMobile || !isMobile) {
                doDelayedStart();
            }
            // event cleanup
            storm.events.remove(window, 'load', doStart);
        }

        // hooks for starting the snow
        if (storm.autoStart) {
            storm.events.add(window, 'load', doStart, false);
        }
        return this;
    }(window, document));
}

// function iosWinter() {
//     (function ($, window, document, undefined) {
//
//         var SnowFlake = function (expireCallback) {
//             var that = this;
//             var vector = [0, 0];
//             var position = [0, 0];
//             var isOnscreen = false;
//             var $element = $('<div class="seasons"></div>');
//             var $element2 = $('<div class="seasons"></div>');
//             var $element3 = $('<div class="seasons"></div>');
//             //<style="position: fixed; color:#fff; text-shadow: rgba(0, 0, 0, 0.7) 1px 1px 2px;" &#10052;">
//             //<img class="w-100 h-100" src="dist/img/fall.png" alt="fall">
//             var updatePosition = function () {
//                 $element.css({
//                     WebkitTransform: 'rotate(' + position[0] + 'deg)',
//                     backgroundImage: 'url(/themes/v1/assets/img/seasons/winter/snow1.png)',
//                     left: position[0] + 160,
//                     top: position[1],
//                 });
//                 $element2.css({
//                     WebkitTransform: 'rotate(' + position[1] + 'deg)',
//                     backgroundImage: 'url(/themes/v1/assets/img/seasons/winter/snow2.png)',
//                     right: position[0] + 160,
//                     top: position[1],
//                 });
//                 $element3.css({
//                     WebkitTransform: 'rotate(' + position[1] + 'deg)',
//                     backgroundImage: 'url(/themes/v1/assets/img/seasons/winter/snow3.png)',
//                     right: position[0] - 160,
//                     top: position[1],
//                 })
//             };
//
//             var updateAttributes = function (size, opacity) {
//                 $element.css({
//                     WebkitTransform: 'rotate(' + position[1] + 'deg)',
//                     "font-size": size,
//                     opacity: opacity,
//                 });
//                 $element2.css({
//                     WebkitTransform: 'rotate(' + position[0] + 'deg)',
//                     "font-size": size,
//                     opacity: opacity,
//                 });
//                 $element3.css({
//                     WebkitTransform: 'rotate(' + position[0] + 'deg)',
//                     "font-size": size,
//                     opacity: opacity,
//                 });
//             };
//
//             var checkExpired = function (bounds) {
//                 if (position[0] > bounds.x || position[1] > bounds.y) {
//                     isOnscreen = false;
//                     $element.remove();
//                     $element2.remove();
//                     $element3.remove();
//                     expireCallback(that);
//                 }
//             };
//
//             this.spawn = function (newVector, startPos, size, opacity) {
//                 vector = newVector;
//                 position = startPos;
//                 updateAttributes(size, opacity);
//                 updatePosition();
//                 $('#container').append($element);
//                 $('#container').append($element2);
//                 $('#container').append($element3);
//                 isOnscreen = true;
//             };
//
//             this.render = function (interval, bounds) {
//                 if (isOnscreen) {
//                     position[0] = position[0] + (interval * vector[0]);
//                     position[1] = position[1] + (interval * vector[1]);
//                     checkExpired(bounds);
//                     updatePosition();
//                 }
//             };
//         };
//
//
//         var SnowFlakeEmitter = function (settings) {
//             var flakes = [];
//             var reclaimedFlakes = [];
//             var lastTime = 0;
//
//             var shouldSpawnNewFlake = function () {
//                 return (Math.random() * 200) < settings.intensity;
//             };
//
//             var getScreenBounds = function () {
//                 return {
//                     x: $(window).width(),
//                     y: $(window).height()
//                 };
//             };
//
//             var randomBetween = function (min, max) {
//                 return Math.random() * (max - min + 1) + min;
//             };
//
//             var newFlakeVector = function () {
//                 var x = randomBetween(settings.driftRange[0], settings.driftRange[1]);
//                 var y = randomBetween(settings.speedRange[0], settings.speedRange[1]);
//                 return [x, y];
//             };
//
//             var newFlakePosition = function (bounds) {
//                 var x = randomBetween(-20, bounds.x + 20);
//                 var y = -20;
//                 return [x, y];
//             };
//
//             var reclaimFlake = function (flake) {
//                 reclaimedFlakes.push(flake);
//             };
//
//             var getFlake = function () {
//                 var flake;
//                 if (reclaimedFlakes.length) {
//                     flake = reclaimedFlakes.pop();
//                 } else {
//                     flake = new SnowFlake(reclaimFlake);
//                     flakes.push(flake);
//                 }
//                 return flake;
//             };
//
//             var spawnNewFlake = function (bounds) {
//                 var flake = getFlake();
//                 flake.spawn(
//                     newFlakeVector(),
//                     newFlakePosition(bounds),
//                     randomBetween(settings.sizeRange[0], settings.sizeRange[1]),
//                     randomBetween(settings.opacityRange[0], settings.opacityRange[1])
//                 );
//             };
//
//             var getInterval = function () {
//                 var time = Date.now();
//                 var interval = 0;
//
//                 if (lastTime) {
//                     interval = (time - lastTime) / 1000;
//                 }
//
//                 lastTime = time;
//                 return interval;
//             };
//
//             this.render = function () {
//                 var i, l = flakes.length;
//                 var interval = getInterval();
//                 var bounds = getScreenBounds();
//
//                 if (shouldSpawnNewFlake()) {
//                     spawnNewFlake(bounds);
//                 }
//
//                 for (i = 0; i < l; ++i) {
//                     flakes[i].render(interval, bounds);
//                 }
//             };
//         };
//
//         // Create the defaults once
//         var pluginName = "winter",
//             defaults = {
//                 intensity: 10,
//                 sizeRange: [10, 20],
//                 opacityRange: [0.5, 1],
//                 driftRange: [-2, 2],
//                 speedRange: [25, 80]
//             };
//
//         // The actual plugin constructor
//         function Plugin(element, options) {
//             this.element = element;
//             // jQuery has an extend method which merges the contents of two or
//             // more objects, storing the result in the first object. The first object
//             // is generally empty as we don't want to alter the default options for
//             // future instances of the plugin
//             this.settings = $.extend({}, defaults, options);
//             this._defaults = defaults;
//             this._name = pluginName;
//             this.init();
//         }
//
//         // Avoid Plugin.prototype conflicts
//         $.extend(Plugin.prototype, {
//             init: function () {
//                 var winter = new SnowFlakeEmitter(this.settings);
//                 if (window.requestAnimationFrame) {
//                     function render() {
//                         winter.render();
//                         window.requestAnimationFrame(render);
//                     }
//
//                     window.requestAnimationFrame(render);
//                 } else {
//                     setInterval(function () {
//                         winter.render();
//                     }, 1 / 60);
//                 }
//             }
//         });
//
//         $.fn[pluginName] = function (options) {
//             this.each(function () {
//                 if (!$.data(this, "plugin_" + pluginName)) {
//                     $.data(this, "plugin_" + pluginName, new Plugin(this, options));
//                 }
//             });
//             return this;
//         };
//
//     })(jQuery, window, document);
//     jQuery(function () {
//         jQuery("#container").winter({
//             intensity: 2,
//             sizeRange: [12, 30],
//             opacityRange: [0.4, 1],
//             driftRange: [10, 20],
//             speedRange: [55, 120]
//         });
//     });
// }

function spring() {

    var falling = true;
    // TweenLite.set("#container",{perspective:600})
    // TweenLite.set("img",{xPercent:"-50%",yPercent:"-50%"})
    var total = 5;
    var container = document.getElementById("container"),
        w = window.innerWidth,
        h = window.innerHeight;

    for (var i = 0; i < total; i++) {
        var Div = document.createElement('div');
        Div.style.backgroundImage = 'url(/themes/v1/assets/img/seasons/spring/flowerColor1.png)';
        var Div2 = document.createElement('div');
        Div2.style.backgroundImage = 'url(/themes/v1/assets/img/seasons/spring/flowerColor2.png)';
        var Div3 = document.createElement('div');
        Div3.style.backgroundImage = 'url(/themes/v1/assets/img/seasons/spring/flowerColor3.png)';

        TweenLite.set(Div, {
            attr: {
                class: 'seasons'
            },
            x: R(0, w),
            y: R(-200, -150),
            z: R(-200, 200)
        });
        TweenLite.set(Div2, {
            attr: {
                class: 'seasons'
            },
            x: R(0, w),
            y: R(-200, -150),
            z: R(-200, 200)
        });
        TweenLite.set(Div3, {
            attr: {
                class: 'seasons'
            },
            x: R(0, w),
            y: R(-200, -150),
            z: R(-200, 200)
        });

        container.appendChild(Div);
        container.appendChild(Div2);
        container.appendChild(Div3);

        animm(Div);
        animm2(Div2);
        animm3(Div3);

    }

    function animm(elm) {
        TweenMax.to(elm, R(6, 15), {
            y: h + 100,
            ease: Linear.easeNone,
            repeat: -1,
            delay: -15
        });
        TweenMax.to(elm, R(4, 8), {
            x: '+=100',
            rotationZ: R(0, 180),
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut
        });
        TweenMax.to(elm, R(2, 8), {
            rotationX: R(0, 360),
            rotationY: R(0, 360),
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut,
            delay: -5
        });
    };

    function animm2(elm) {
        TweenMax.to(elm, R(6, 15), {
            y: h + 100,
            ease: Linear.easeNone,
            repeat: -1,
            delay: -25
        });
        TweenMax.to(elm, R(4, 8), {
            x: '+=100',
            rotationZ: R(0, 180),
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut
        });
        TweenMax.to(elm, R(2, 8), {
            rotationX: R(0, 360),
            rotationY: R(0, 360),
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut,
            delay: -5
        });
    };

    function animm3(elm) {
        TweenMax.to(elm, R(6, 15), {
            y: h + 100,
            ease: Linear.easeNone,
            repeat: -1,
            delay: -5
        });
        TweenMax.to(elm, R(4, 8), {
            x: '+=100',
            rotationZ: R(0, 180),
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut
        });
        TweenMax.to(elm, R(2, 8), {
            rotationX: R(0, 360),
            rotationY: R(0, 360),
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut,
            delay: -5
        });
    };

    function R(min, max) {
        return min + Math.random() * (max - min)
    };
}

function iosSpring() {
    (function ($, window, document, undefined) {

        var SnowFlake = function (expireCallback) {
            var that = this;
            var vector = [0, 0];
            var position = [0, 0];
            var isOnscreen = false;
            var $element = $('<div class="seasons"></div>');
            var $element2 = $('<div class="seasons"></div>');
            var $element3 = $('<div class="seasons"></div>');
            //style="position: fixed; color:#fff; text-shadow: rgba(0, 0, 0, 0.7) 1px 1px 2px;" &#10052;
            // <img class="w-100 h-100" src="dist/img/fall.png" alt="fall">
            var updatePosition = function () {
                $element.css({
                    WebkitTransform: 'rotate(' + position[0] + 'deg)',
                    backgroundImage: 'url(/themes/v1/assets/img/seasons/spring/flowerColor1.png)',
                    left: position[0] + 140,
                    top: position[1]
                });
                $element2.css({
                    WebkitTransform: 'rotate(' + position[1] + 'deg)',
                    backgroundImage: 'url(/themes/v1/assets/img/seasons/spring/flowerColor2.png)',
                    right: position[0] + 140,
                    top: position[1]
                });
                $element3.css({
                    WebkitTransform: 'rotate(' + position[1] + 'deg)',
                    backgroundImage: 'url(/themes/v1/assets/img/seasons/spring/flowerColor3.png)',
                    right: position[0] - 140,
                    top: position[1]
                })
            };

            var updateAttributes = function (size, opacity) {
                $element.css({
                    WebkitTransform: 'rotate(' + position[1] + 'deg)',
                    "font-size": size,
                    opacity: opacity
                });
                $element2.css({
                    WebkitTransform: 'rotate(' + position[0] + 'deg)',
                    "font-size": size,
                    opacity: opacity
                });
                $element3.css({
                    WebkitTransform: 'rotate(' + position[0] + 'deg)',
                    "font-size": size,
                    opacity: opacity
                });
            };

            var checkExpired = function (bounds) {
                if (position[0] > bounds.x || position[1] > bounds.y) {
                    isOnscreen = false;
                    $element.remove();
                    $element2.remove();
                    $element3.remove();
                    expireCallback(that);
                }
            };

            this.spawn = function (newVector, startPos, size, opacity) {
                vector = newVector;
                position = startPos;
                updateAttributes(size, opacity);
                updatePosition();
                $('#container').append($element);
                $('#container').append($element2);
                $('#container').append($element3);
                isOnscreen = true;
            };

            this.render = function (interval, bounds) {
                if (isOnscreen) {
                    position[0] = position[0] + (interval * vector[0]);
                    position[1] = position[1] + (interval * vector[1]);
                    checkExpired(bounds);
                    updatePosition();
                }
            };
        };


        var SnowFlakeEmitter = function (settings) {
            var flakes = [];
            var reclaimedFlakes = [];
            var lastTime = 0;

            var shouldSpawnNewFlake = function () {
                return (Math.random() * 200) < settings.intensity;
            };

            var getScreenBounds = function () {
                return {
                    x: $(window).width(),
                    y: $(window).height()
                };
            };

            var randomBetween = function (min, max) {
                return Math.random() * (max - min + 1) + min;
            };

            var newFlakeVector = function () {
                var x = randomBetween(settings.driftRange[0], settings.driftRange[1]);
                var y = randomBetween(settings.speedRange[0], settings.speedRange[1]);
                return [x, y];
            };

            var newFlakePosition = function (bounds) {
                var x = randomBetween(-20, bounds.x + 20);
                var y = -20;
                return [x, y];
            };

            var reclaimFlake = function (flake) {
                reclaimedFlakes.push(flake);
            };

            var getFlake = function () {
                var flake;
                if (reclaimedFlakes.length) {
                    flake = reclaimedFlakes.pop();
                } else {
                    flake = new SnowFlake(reclaimFlake);
                    flakes.push(flake);
                }
                return flake;
            };

            var spawnNewFlake = function (bounds) {
                var flake = getFlake();
                flake.spawn(
                    newFlakeVector(),
                    newFlakePosition(bounds),
                    randomBetween(settings.sizeRange[0], settings.sizeRange[1]),
                    randomBetween(settings.opacityRange[0], settings.opacityRange[1])
                );
            };

            var getInterval = function () {
                var time = Date.now();
                var interval = 0;

                if (lastTime) {
                    interval = (time - lastTime) / 1000;
                }

                lastTime = time;
                return interval;
            };

            this.render = function () {
                var i, l = flakes.length;
                var interval = getInterval();
                var bounds = getScreenBounds();

                if (shouldSpawnNewFlake()) {
                    spawnNewFlake(bounds);
                }

                for (i = 0; i < l; ++i) {
                    flakes[i].render(interval, bounds);
                }
            };
        };

        // Create the defaults once
        var pluginName = "spring",
            defaults = {
                intensity: 10,
                sizeRange: [10, 20],
                opacityRange: [0.5, 1],
                driftRange: [-2, 2],
                speedRange: [25, 80]
            };

        // The actual plugin constructor
        function Plugin(element, options) {
            this.element = element;
            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don't want to alter the default options for
            // future instances of the plugin
            this.settings = $.extend({}, defaults, options);
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend(Plugin.prototype, {
            init: function () {
                var spring = new SnowFlakeEmitter(this.settings);
                if (window.requestAnimationFrame) {
                    function render() {
                        spring.render();
                        window.requestAnimationFrame(render);
                    }

                    window.requestAnimationFrame(render);
                } else {
                    setInterval(function () {
                        spring.render();
                    }, 1 / 60);
                }
            }
        });

        $.fn[pluginName] = function (options) {
            this.each(function () {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName, new Plugin(this, options));
                }
            });
            return this;
        };

    })(jQuery, window, document);
    jQuery(function () {
        jQuery("#container").spring({
            intensity: 2,
            sizeRange: [12, 30],
            opacityRange: [0.4, 1],
            driftRange: [10, 20],
            speedRange: [55, 120]
        });
    });
}


function getSeason() {
    var date = new Date();
    var month = (date.getMonth() + 1).toString();
    var season = '';
    switch (month) {
        case '12':
        case '1':
        case '2':
            season = 'winter';
            break;
        case '3':
        case '4':
        case '5':
            season = 'spring';
            break;
        case '6':
        case '7':
        case '8':
            season = 'summer';
            break;
        case '9':
        case '10':
        case '11':
            season = 'autumn';
            break;
    }
    return season;
}

function getMonth() {
    var date = new Date();
    var month = (date.getMonth() + 1).toString();
    var monthNamesInLetters = '';
    switch (month) {
        case '1':
            month = 'january';
            break;
        case '2':
            month = 'february';
            break;
        case '3':
            month = 'march';
            break;
        case '4':
            month = 'april';
            break;
        case '5':
            month = 'may';
            break;
        case '6':
            month = 'june';
            break;
        case '7':
            month = 'july';
            break;
        case '8':
            month = 'august';
            break;
        case '9':
            month = 'september';
            break;
        case '10':
            month = 'october';
            break;
        case '11':
            month = 'november';
            break;
        case '12':
            month = 'december';
            break;
    }
    return month;
}

function getDay() {
    var date = new Date();
    var dayOfMonth = (date.getDate()).toString();
    var dayNameInLetters = '';
    switch (dayOfMonth) {
        case '1':
            dayOfMonth = '1';
            break;
        case '2':
            dayOfMonth = '2';
            break;
        case '3':
            dayOfMonth = '3';
            break;
        case '4':
            dayOfMonth = '4';
            break;
        case '5':
            dayOfMonth = '5';
            break;
        case '6':
            dayOfMonth = '6';
            break;
        case '7':
            dayOfMonth = '7';
            break;
        case '8':
            dayOfMonth = '8';
            break;
        case '9':
            dayOfMonth = '9';
            break;
        case '10':
            dayOfMonth = '10';
            break;
        case '11':
            dayOfMonth = '11';
            break;
        case '12':
            dayOfMonth = '12';
            break;
        case '13':
            dayOfMonth = '13';
            break;
        case '14':
            dayOfMonth = '14';
            break;
        case '15':
            dayOfMonth = '15';
            break;
        case '16':
            dayOfMonth = '16';
            break;
        case '17':
            dayOfMonth = '17';
            break;
        case '18':
            dayOfMonth = '18';
            break;
        case '19':
            dayOfMonth = '19';
            break;
        case '20':
            dayOfMonth = '20';
            break;
        case '21':
            dayOfMonth = '21';
            break;
        case '22':
            dayOfMonth = '22';
            break;
        case '23':
            dayOfMonth = '23';
            break;
        case '24':
            dayOfMonth = '24';
            break;
        case '25':
            dayOfMonth = '25';
            break;
        case '26':
            dayOfMonth = '26';
            break;
        case '27':
            dayOfMonth = '27';
            break;
        case '28':
            dayOfMonth = '28';
            break;
        case '29':
            dayOfMonth = '29';
            break;
        case '30':
            dayOfMonth = '30';
            break;
        case '31':
            dayOfMonth = '31';
            break;

    }
    return dayOfMonth;
}

function getRightNowHour() {
    var date = new Date();
    var hour = (date.getHours()).toString();
    var hourNameInLetters = '';
    switch (hour) {
        case '1':
            hour = '1';
            break;
        case '2':
            hour = '2';
            break;
        case '3':
            hour = '3';
            break;
        case '4':
            hour = '4';
            break;
        case '5':
            hour = '5';
            break;
        case '6':
            hour = '6';
            break;
        case '7':
            hour = '7';
            break;
        case '8':
            hour = '8';
            break;
        case '9':
            hour = '9';
            break;
        case '10':
            hour = '10';
            break;
        case '11':
            hour = '11';
            break;
        case '12':
            hour = '12';
            break;
        case '13':
            hour = '13';
            break;
        case '14':
            hour = '14';
            break;
        case '15':
            hour = '15';
            break;
        case '16':
            hour = '16';
            break;
        case '17':
            hour = '17';
            break;
        case '18':
            hour = '18';
            break;
        case '19':
            hour = '19';
            break;
        case '20':
            hour = '20';
            break;
        case '21':
            hour = '21';
            break;
        case '22':
            hour = '22';
            break;
        case '23':
            hour = '23';
            break;
        case '00':
            hour = '00';
            break;
    }
    return hour;
}

function fnBrowserDetect2() {
    let userAgent = navigator.userAgent;
    let browserName;
    let ifThSeasonIsWinter = getSeason() === 'winter';
    let ifThSeasonIsSpring = getSeason() === 'spring';
    let ifThSeasonIsSummer = getSeason() === 'summer';
    let ifThSeasonIsAutumn = getSeason() === 'autumn';
    let isFirstEnterDate31 = localStorage.getItem('isFirstEnterDate31');
    let isFirstEnterDate1 = localStorage.getItem('isFirstEnterDate1');
    let isFirstEnterDate2 = localStorage.getItem('isFirstEnterDate2');
    let matchChrome = userAgent.match(/chrome|chromium/i);
    let matchFireFox = userAgent.match(/firefox/i);
    let matchOpera = userAgent.match(/opr\//i);
    let matchEdgeAndIExplore = userAgent.match(/edg/i);
    let matchIosSafariIosChromeIosFireFox = userAgent.match(/safari|crios|fxios/i);

    if (matchChrome) {

        if (ifThSeasonIsWinter) {

            winter2();

            if (getMonth() === 'december') {


                if (getDay() >= 15 && getDay() <= 31) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }

                // this is true
                localStorage.setItem('isFirstEnterDate1', 'true');
                localStorage.setItem('isFirstEnterDate2', 'true');
                //
                if (getDay() === '31' && isFirstEnterDate31 == null || getDay() === '31' && isFirstEnterDate31 === 'true') {
                    localStorage.setItem('holidayFireworks', null);

                    localStorage.setItem('isFirstEnterDate31', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });
                }
            }

            if (getMonth() === 'january') { //january
                if (getDay() >= 1 && getDay() <= 15) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }

                // this is true
                localStorage.setItem('isFirstEnterDate31', 'true');

                if (getDay() === '1' && isFirstEnterDate1 == null || getDay() === '1' && isFirstEnterDate1 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate1', 'disabled');
                    localStorage.setItem('isFirstEnterDate2', 'true');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }

                if (getDay() === '2' && isFirstEnterDate2 == null || getDay() === '2' && isFirstEnterDate2 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate31', 'true');
                    localStorage.setItem('isFirstEnterDate1', 'true');
                    localStorage.setItem('isFirstEnterDate2', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }

            }

        } else if (ifThSeasonIsSpring) {

            // spring();

            // tripleflapInit();
            // tripleflapInit2();
            // tripleflapInit3();
            // tripleflapInit4();

            if (getMonth() === 'march') {

                if (getDay() >= 7) {

                    springFestival();

                }
            }
            if (getMonth() === 'april' || getMonth() === 'may') {

                summerFestival();
                // springFestival();

            }

            if (getMonth() === 'june' || getMonth() === 'july' || getMonth() === 'august') {
                summerFestival();
            }


        } else if (ifThSeasonIsSummer) {

            // yoz uchun hech nima yoq

        } else if (ifThSeasonIsAutumn) {

            if (getMonth() === 'september') {
                autumn();
            }
            if(getMonth() === 'october') {
                autumn();
            }
            if (getMonth() === 'october' || getMonth() === 'november') {
                rain();
            }

        }
        console.log("chrome");

    } else if (matchFireFox) {

        if (ifThSeasonIsWinter) {

            winter2();

            if (getMonth() === 'december') {

                if (getDay() >= 15 && getDay() <= 31) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }

                // this is true
                localStorage.setItem('isFirstEnterDate1', 'true');
                localStorage.setItem('isFirstEnterDate2', 'true');
                //
                if (getDay() === '31' && isFirstEnterDate31 == null || getDay() === '31' && isFirstEnterDate31 === 'true') {
                    localStorage.setItem('holidayFireworks', null);

                    localStorage.setItem('isFirstEnterDate31', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });
                }
            }

            if (getMonth() === 'january') {

                if (getDay() >= 1 && getDay() <= 15) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }

                // this is true
                localStorage.setItem('isFirstEnterDate31', 'true');

                if (getDay() === '1' && isFirstEnterDate1 == null || getDay() === '1' && isFirstEnterDate1 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate1', 'disabled');
                    localStorage.setItem('isFirstEnterDate2', 'true');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }

                if (getDay() === '2' && isFirstEnterDate2 == null || getDay() === '2' && isFirstEnterDate2 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate31', 'true');
                    localStorage.setItem('isFirstEnterDate1', 'true');
                    localStorage.setItem('isFirstEnterDate2', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }
            }

        } else
            if (ifThSeasonIsSpring) {

            // spring();

            // tripleflapInit();
            // tripleflapInit2();
            // tripleflapInit3();
            // tripleflapInit4();

            if (getMonth() === 'march') {

                if (getDay() >= 7) {

                    springFestival();

                }
            }
            if (getMonth() === 'april' || getMonth() === 'may') {

                summerFestival();
                // springFestival();

            }

            if (getMonth() === 'june' || getMonth() === 'july' || getMonth() === 'august') {
                summerFestival();
            }

        } else
            if (ifThSeasonIsSummer) {

            // yoz uchun hech nima yoq

        } else
            if (ifThSeasonIsAutumn) {
            if (getMonth() === 'september') {
                autumn();
            }
            if (getMonth() === 'october' || getMonth() === 'november') {
                rain();
            }

        }
        console.log("firefox");

    } else if (matchOpera) {

        if (ifThSeasonIsWinter) {

            winter2();

            if (getMonth() === 'december') {

                if (getDay() >= 15 && getDay() <= 31) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }

                // this is true
                localStorage.setItem('isFirstEnterDate1', 'true');
                localStorage.setItem('isFirstEnterDate2', 'true');
                //
                if (getDay() === '31' && isFirstEnterDate31 == null || getDay() === '31' && isFirstEnterDate31 === 'true') {
                    localStorage.setItem('holidayFireworks', null);

                    localStorage.setItem('isFirstEnterDate31', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });
                }
            }

            if (getMonth() === 'january') {

                if (getDay() >= 1 && getDay() <= 15) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }


                // this is true
                localStorage.setItem('isFirstEnterDate31', 'true');

                if (getDay() === '1' && isFirstEnterDate1 == null || getDay() === '1' && isFirstEnterDate1 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate1', 'disabled');
                    localStorage.setItem('isFirstEnterDate2', 'true');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }

                if (getDay() === '2' && isFirstEnterDate2 == null || getDay() === '2' && isFirstEnterDate2 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate31', 'true');
                    localStorage.setItem('isFirstEnterDate1', 'true');
                    localStorage.setItem('isFirstEnterDate2', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }
            }

        } else if (ifThSeasonIsSpring) {

            // spring();

            // tripleflapInit();
            // tripleflapInit2();
            // tripleflapInit3();
            // tripleflapInit4();

            if (getMonth() === 'march') {

                if (getDay() >= 7) {

                    springFestival();

                }
            }
            if (getMonth() === 'april' || getMonth() === 'may') {

                summerFestival();
                // springFestival();

            }

            if (getMonth() === 'june' || getMonth() === 'july' || getMonth() === 'august') {
                summerFestival();
            }

        } else if (ifThSeasonIsSummer) {

            // yoz uchun hech nima yoq

        } else if (ifThSeasonIsAutumn) {

            if (getMonth() === 'september') {
                autumn();
            }
            if (getMonth() === 'october' || getMonth() === 'november') {
                rain();
            }

        }
        console.log("opera");

    } else if (matchEdgeAndIExplore) {

        if (ifThSeasonIsWinter) {

            winter2();

            if (getMonth() === 'december') {

                if (getDay() >= 15 && getDay() <= 31) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }

                // this is true
                localStorage.setItem('isFirstEnterDate1', 'true');
                localStorage.setItem('isFirstEnterDate2', 'true');
                //
                if (getDay() === '31' && isFirstEnterDate31 == null || getDay() === '31' && isFirstEnterDate31 === 'true') {
                    localStorage.setItem('holidayFireworks', null);

                    localStorage.setItem('isFirstEnterDate31', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });
                }
            }

            if (getMonth() === 'january') {

                if (getDay() >= 1 && getDay() <= 15) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }


                // this is true
                localStorage.setItem('isFirstEnterDate31', 'true');

                if (getDay() === '1' && isFirstEnterDate1 == null || getDay() === '1' && isFirstEnterDate1 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate1', 'disabled');
                    localStorage.setItem('isFirstEnterDate2', 'true');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }

                if (getDay() === '2' && isFirstEnterDate2 == null || getDay() === '2' && isFirstEnterDate2 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate31', 'true');
                    localStorage.setItem('isFirstEnterDate1', 'true');
                    localStorage.setItem('isFirstEnterDate2', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }
            }

        } else if (ifThSeasonIsSpring) {

            // spring();

            // tripleflapInit();
            // tripleflapInit2();
            // tripleflapInit3();
            // tripleflapInit4();

            if (getMonth() === 'march') {

                if (getDay() >= 7) {

                    springFestival();

                }
            }
            if (getMonth() === 'april' || getMonth() === 'may') {

                summerFestival();
                // springFestival();

            }

            if (getMonth() === 'june' || getMonth() === 'july' || getMonth() === 'august') {
                summerFestival();
            }

        } else if (ifThSeasonIsSummer) {

            // yoz uchun hech nima yoq

        } else if (ifThSeasonIsAutumn) {
            if (getMonth() === 'september') {
                autumn();
            }
            if (getMonth() === 'october' || getMonth() === 'november') {
                rain();
            }

        }
        console.log("edge");

    } else if (matchIosSafariIosChromeIosFireFox) {

        if (ifThSeasonIsWinter) {

            iosWinter2();    // bu funcsiya ioc qurilmalari uchun ishlaydi

            if (getMonth() === 'december') {
                if (getDay() >= 15 && getDay() <= 31) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }


                // this is true
                localStorage.setItem('isFirstEnterDate1', 'true');
                localStorage.setItem('isFirstEnterDate2', 'true');
                //
                if (getDay() === '31' && isFirstEnterDate31 == null || getDay() === '31' && isFirstEnterDate31 === 'true') {
                    localStorage.setItem('holidayFireworks', null);

                    localStorage.setItem('isFirstEnterDate31', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });
                }
            }

            if (getMonth() === 'january') {

                if (getDay() >= 1 && getDay() <= 15) {
                    brandWithHat();
                    santaFollowingTheCursor();
                }

                // this is true
                localStorage.setItem('isFirstEnterDate31', 'true');

                if (getDay() === '1' && isFirstEnterDate1 == null || getDay() === '1' && isFirstEnterDate1 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate1', 'disabled');
                    localStorage.setItem('isFirstEnterDate2', 'true');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }

                if (getDay() === '2' && isFirstEnterDate2 == null || getDay() === '2' && isFirstEnterDate2 === 'true') {
                    localStorage.setItem('holidayFireworks', null);
                    localStorage.setItem('isFirstEnterDate31', 'true');
                    localStorage.setItem('isFirstEnterDate1', 'true');
                    localStorage.setItem('isFirstEnterDate2', 'disabled');

                    window.addEventListener("load", function () {
                        holidayFireworks();
                    });

                }
            }

        } else if (ifThSeasonIsSpring) {

            //iosSpring();
            // bu funcsiya ioc qurilmalari uchun ishlaydi

            // tripleflapInit();
            // tripleflapInit2();
            // tripleflapInit3();
            // tripleflapInit4();

            if (getMonth() === 'march') {

                if (getDay() >= 7) {

                    springFestival();

                }
            }
            if (getMonth() === 'april' || getMonth() === 'may') {

                summerFestival();
                // springFestival();

            }

            if (getMonth() === 'june' || getMonth() === 'july' || getMonth() === 'august') {
                summerFestival();
            }

        } else if (ifThSeasonIsSummer) {

            // yoz uchun hech nima yoq ammo bu yerda qollanilgan funksiya ioc qurilmalarida ishlaydi

        } else if (ifThSeasonIsAutumn) {
            if (getMonth() === 'september') {
                iosAutumn();    // bu funcsiya ioc qurilmalari uchun ishlaydi
            }
            if (getMonth() === 'october' || getMonth() === 'november') {
                rain();  // unique
            }


        }
        console.log("safari/ios");

    } else {
        // bu yerga kirgan qurilimaning va browserni aniqlaydigan kutibxona ulanishi kerak
    }
}

fnBrowserDetect2();