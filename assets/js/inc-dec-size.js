$(document).ready(function () {
    let plus5Max = '22px';
    let minus5Min = '16px';
    let decrease = document.querySelector(".decremet-js");
    let increase = document.querySelector(".increment-js");
    let autoSizeInvisible = document.querySelector(".auto-size-in-visible-js");
    let currentSize = document.getElementById("current-size-js");
    var curFontSize = localStorage["FontSize"];
    var multipleTextBefore = 'Saytda font o\'lchovi';
    var multipleBefore = '<span class="bg-primary-dark text-light p-1 mx-2 rounded-3 d-flex align-items-center justify-content-center" style="width: 37px; height: 37px;font-size: 16px;">' + '1x' + '</span>';
    var multipleTextAfter = 'karra kattalashtirildi';
    if (curFontSize) {
        //set to previously saved fontsize if available
        $('.dataFont').css('font-size', curFontSize);
        if (curFontSize === '16px') {
            multipleTextAfter = ' dastlabki holatga qaytarildi!';
            multipleBefore = '1x';
        }
        if (curFontSize === '17px') {
            // multiple = '1.0625x';
            multipleBefore = '1.1x';
        }
        if (curFontSize === '18px') {
            // multiple = '1.125x';
            multipleBefore = '1.2x';
        }
        if (curFontSize === '19px') {
            // multiple = '1.1875x';
            multipleBefore = '1.3x';
        }
        if (curFontSize === '20px') {
            // multiple = '1.25x';
            multipleBefore = '1.4x';
        }
        if (curFontSize === '21px') {
            // multiple = '1.3125x';
            multipleBefore = '1.5x';
        }
        if (curFontSize === '22px') {
            // multiple = '1.375x';
            multipleBefore = '1.6x';
        }
        currentSize.innerHTML = '<span class="bg-primary-dark text-light p-1 mx-2 rounded-3 d-flex align-items-center justify-content-center" style="width: 37px; height: 37px; font-size: 16px;">' + multipleBefore + '</span>';
        // currentSize.innerHTML = ' <span class="bg-white text-primary p-1 mx-2 rounded-3">' + multiple + '</span> ';
        if (curFontSize === '22px') {
            increase.classList.add('active-last');
            increase.classList.add('visibile-hide');
            decrease.classList.remove('active-last');
            decrease.classList.add('visibile');
            autoSizeInvisible.classList.add('visibile');


        } else if (curFontSize === '16px') {
            decrease.classList.remove('active-last');
            decrease.classList.remove('visibile');
            autoSizeInvisible.classList.remove('visibile');
        } else {
            decrease.classList.add('active-last');
            decrease.classList.add('visibile');
            autoSizeInvisible.classList.add('visibile');

        }

    }
    $(".increase-font-js,.decrease-font-js,.reset-font-js").click(function () {
        var type = $(this).val();
        curFontSize = $('.dataFont').css('font-size');
        if (type === 'increase') {
            decrease.classList.remove('active-last');
            decrease.classList.add('visibile');

            autoSizeInvisible.classList.add('visibile');

            if (curFontSize !== plus5Max) {
                $('.dataFont').css('font-size', parseInt(curFontSize) + 1 + "px");
                curFontSize = parseInt(curFontSize) + 1 + "px";
                if (curFontSize === plus5Max) {
                    increase.classList.add('active-last');
                    increase.classList.add('visibile-hide');
                    autoSizeInvisible.classList.add('visibile');
                }
            } else {
                increase.classList.add('active-last');
                increase.classList.add('visibile-hide');
                autoSizeInvisible.classList.add('visibile');
            }
        } else if (type === 'decrease') {
            increase.classList.remove('active-last');
            increase.classList.remove('visibile-hide');

            if (curFontSize !== minus5Min) {
                $('.dataFont').css('font-size', parseInt(curFontSize) - 1 + "px");
                curFontSize = parseInt(curFontSize) - 1 + "px";
                if (curFontSize === minus5Min) {
                    autoSizeInvisible.classList.remove('visibile');
                    decrease.classList.add('active-last');
                    decrease.classList.remove('visibile');
                }

            } else {
                decrease.classList.add('active-last');
                decrease.classList.remove('visibile');

            }
        } else if (type === 'resetFont') {
            decrease.classList.remove('active-last');
            decrease.classList.remove('visibile');
            increase.classList.remove('active-last');
            increase.classList.remove('visibile-hide');
            autoSizeInvisible.classList.remove('visibile');

            $('.dataFont').css('font-size', "16px");
            curFontSize = "16px";
        }

        localStorage.setItem('FontSize', curFontSize);

        var multipleTextBefore = 'Saytda font o\'lchovi';
        var multiple = '16px';
        var multipleTextAfter = 'karra kattalashtirildi';

        if (curFontSize === '16px') {
            multipleTextAfter = ' dastlabki holatga qaytarildi!';
            multiple = '1x';
        }
        if (curFontSize === '17px') {
            // multiple = '1.0625x';
            multiple = '1.1x';
        }
        if (curFontSize === '18px') {
            // multiple = '1.125x';
            multiple = '1.2x';
        }
        if (curFontSize === '19px') {
            // multiple = '1.1875x';
            multiple = '1.3x';
        }
        if (curFontSize === '20px') {
            // multiple = '1.25x';
            multiple = '1.4x';
        }
        if (curFontSize === '21px') {
            // multiple = '1.3125x';
            multiple = '1.5x';
        }
        if (curFontSize === '22px') {
            // multiple = '1.375x';
            multiple = '1.6x';
        }
        // currentSize.innerText = curFontSize;
        currentSize.innerHTML = ' <span class="bg-primary-dark text-light p-1 mx-2 rounded-3  d-flex align-items-center justify-content-center" style="width: 37px; height: 37px;font-size: 16px;">' + multiple + '</span> ';
        $.notify({
            // options
            icon: 'bx bx-font-size bx-sm,',
            title: 'Font o\'lchovi',
            message: '<div class="d-flex align-items-center justify-content-start">' + multipleTextBefore + ' ' + ' <span class="bg-primary-dark text-light p-2 mx-2 rounded-3 d-flex align-items-center justify-content-center" style="width: 37px; height: 37px;font-size: 16px;">' + multiple + '</span> ' + ' ' + multipleTextAfter + '</div>', //curFontSize 
            // url: 'https://github.com/mouse0270/bootstrap-notify',
            // target: '_blank'
        }, {
            // settings
            element: 'body',
            // position: null,
            type: "info",
            // allow_dismiss: true,
            // newest_on_top: false,
            showProgressbar: true,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 9999,
            delay: 3500,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown shadow border-white  bg-primary-mode text-white',
                exit: 'animated fadeOutRight'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
        });
    });
});