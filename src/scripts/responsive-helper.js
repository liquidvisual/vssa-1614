/*
    Responsive Helper - Last updated: 04.05.15

    - Usage -

    Reference JS file before closing </body>. Remove ".dev-mode" near body on prod.
    Wrap all contents into <div class="lv-super"></div>
*/
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

(function() {

    //==================================================
    // Variables
    //==================================================

    var small  = 640;
    var medium = 768;
    var large  = 980;
    // var xlarge = 981;

    //==================================================
    // Responsive Helper
    //==================================================

    if ($('.dev-mode-enabled').length) { // place .dev-mode on body or near

        function responsiveHelper() {
            var lvSuper = $('.lv-super');

            if ($('.lv-screen-data').length != 1) {
                lvSuper.append('<div class="lv-screen-data"></div>');
            }
            var screenWidth = $(window).width();
            var screenHeight = $(window).height();
            var device;

            if (screenWidth <= small) device = "Small";
            if (screenWidth > small) device = "Medium";
            if (screenWidth >= large) device = "Large";

            // if (screenWidth > small && screenWidth <= medium) device = "Medium";
            // if (screenWidth > medium && screenWidth <= large) device = "Large";
            // if (screenWidth > medium && screenWidth > large) device = "Large";
            // if (screenWidth > large && screenWidth <= xlarge) device = "xLarge";
            // if (screenWidth > xlarge) device = "xxLarge";

            $('.lv-screen-data').html(screenWidth+" x "+screenHeight+"<br>"+device)
                .css({
                    'position': 'fixed',
                    'top': 0,
                    'padding': '10px 20px',
                    'background': 'rgba(0,0,0,0.5)',
                    'font-family': 'Helvetica Neue',
                    'font-size': '14px',
                    'color': 'white',
                    'z-index': 9999
                })
                .click(function(){
                    lvSuper.toggleClass('developer');
                });
        }

        // Launch it
        responsiveHelper();

        //==================================================
        // Resize
        //==================================================

        $(window).resize(function(){
            responsiveHelper();
        });
    }
})();