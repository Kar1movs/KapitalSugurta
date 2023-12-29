function autumn() {
    /* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */
    /* userAgent.match(/chrome|chromium|crios/i) || userAgent.match(/firefox|fxios/i) || userAgent.match(/opr\//i) || userAgent.match(/edg/i) */
    /* userAgent.match(/safari/i) */
    var falling = true;
// TweenLite.set("#container",{perspective:600})
// TweenLite.set("img",{xPercent:"-50%",yPercent:"-50%"})
    /**/
    var total = 20;
    var container = document.getElementById("container"), w = window.innerWidth, h = window.innerHeight;

    for (i = 0; i < total; i++) {
        var Div = document.createElement('div');
        TweenLite.set(Div, {attr: {class: 'dot'}, x: R(0, w), y: R(-200, -150), z: R(-200, 200)});
        container.appendChild(Div);
        animm(Div);

    }
//var style = window.getComputedStyle($('#container').get(0));  // Need the DOM object
// var matrix = new WebKitCSSMatrix(style.webkitTransform);
// console.log(matrix.m41);  // -770
//if (userAgent.match(/safari/i)) {
    function animm(elm) {
        TweenMax.to(elm, R(6, 15), {y: h + 100, ease: Linear.easeNone, repeat: -1, delay: -15});
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

//}
    function R(min, max) {
        return min + Math.random() * (max - min)
    };
}


function fnBrowserDetect2() {
    let userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.match(/chrome|chromium/i)) {
        autumn();
        console.log("chrome2");
    } else if (userAgent.match(/firefox/i)) {
        autumn();
        console.log("firefox2");
    } else if (userAgent.match(/opr\//i)) {
        autumn();
        console.log("opera2");
    } else if (userAgent.match(/edg/i)) {
        autumn();
        console.log("edge2");
    } else if (userAgent.match(/safari|crios|fxios/i)) {
        console.log("safari2");
    } else {

    }
}


/* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */