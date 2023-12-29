'use strict';
if ($('#welcomePaymentTourPolice').length) {
    (function () {
        let shepherdStorage = localStorage.getItem("shepherd_storage");

        function init() {
            localStorage.setItem("shepherd_storage", "enabled");
            var shepherd = setupShepherd();

            if (shepherdStorage === null) {
                setTimeout(function () {
                    shepherd.start();
                }, 500);
            }
        }

        function setupShepherd() {
            var shepherd_title_1 = $('#shepherd_title_1').val();
            var shepherd_1 = $('#shepherd_1').val();
            var shepherd_title_2 = $('#shepherd_title_2').val();
            var shepherd_2 = $('#shepherd_2').val();
            var shepherd_title_3 = $('#shepherd_title_3').val();
            var shepherd_3 = $('#shepherd_3').val();
            var shepherd_back = $('#shepherd_prev').val();
            var shepherd_next = $('#shepherd_next').val();
            var shepherd_cancel = $('#shepherd_cancel').val();
            var shepherd_confirm = $('#shepherd_confirm').val();


            var shepherd = new Shepherd.Tour({
                defaultStepOptions: {
                    cancelIcon: {
                        enabled: false
                    },
                    classes: 'class-1 class-2',
                    scrollTo: {
                        behavior: 'smooth',
                        block: 'center'
                    }
                },
                // This should add the first tour step
                steps: [{
                    title: shepherd_title_1,
                    text: shepherd_1 + ' <a href="https://t.me/kapital_call_center" target="_blank" style="text-decoration: underline" data-test-popper-link>Call center</a>',
                    attachTo: {
                        element: '.hero-welcome',
                        on: 'bottom'
                    },
                    buttons: [
                        {
                            action() {
                                return this.cancel();
                            },
                            secondary: true,
                            text: shepherd_cancel
                        },
                        {
                            action() {
                                return this.next();
                            },
                            text: shepherd_next
                        }
                    ],
                    id: 'welcome'
                }],
                useModalOverlay: true
            });
            const element = document.createElement('p');
            element.innerText = 'Police sotib olishda uchun ushbu tolov tizimlaridan birini ustiga Bosing !';
            // These steps should be added via `addSteps`
            const steps = [{
                title: shepherd_title_2,
                text: shepherd_2,
                attachTo: {
                    element: '.hero-including',
                    on: 'bottom'
                },
                buttons: [{
                    action() {
                        return this.back();
                    },
                    secondary: true,
                    text: shepherd_back
                },
                    {
                        action() {
                            return this.next();
                        },
                        text: shepherd_next
                    }
                ],
                id: 'including'
            },
                {
                    title: shepherd_title_3,
                    text: shepherd_3,
                    attachTo: {
                        element: '.hero-example',
                        on: 'bottom'
                    },
                    buttons: [
                        {
                            action() {
                                return this.back();
                            },
                            secondary: true,
                            text: shepherd_back
                        },

                        {

                            action() {
                                return this.next();
                            },
                            text: shepherd_confirm
                        }
                    ],
                    id: 'creating'
                },
            ];
            shepherd.addSteps(steps);
            // This should add steps after the ones added with `addSteps`

            return shepherd;
        }

        function ready() {
            if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
                init();
            } else {
                document.addEventListener('DOMContentLoaded', init);
            }
        }

        ready();
    }).call(void 0);
}