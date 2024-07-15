var webpage = require('webpage').create();
var system = require('system');

webpage.viewportSize = { width: 1280, height: 1024 };

webpage.open('https://nextsatern.pythonanywhere.com', function(status) {
    if (status !== 'success') {
        console.log('Unable to access network');
        slimer.exit();
    } else {
        console.log('Page loaded');

        // Wait for 3 seconds
        setTimeout(function() {
            // Get the size of the viewport
            var height = webpage.evaluate(function() {
                return window.innerHeight;
            });
            var width = webpage.evaluate(function() {
                return window.innerWidth;
            });

            // Define the area to click (top 20% of the page)
            var clickHeight = Math.floor(Math.random() * (height * 0.2));
            var clickWidth = Math.floor(Math.random() * width);

            // Click on the specified location
            webpage.sendEvent('click', clickWidth, clickHeight);
            console.log('Clicked on position (' + clickWidth + ', ' + clickHeight + ') within the top 20% of the page.');

            // Wait for 5 seconds to simulate viewing the new page
            setTimeout(function() {
                console.log('Viewed the new page for 5 seconds.');
                slimer.exit();
            }, 5000);
        }, 3000);
    }
});
