const { chromium } = require('playwright');

const runAutomation = async () => {
    const browser = await chromium.launch({ executablePath: '/usr/bin/chromium/ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://nextsatern.pythonanywhere.com');

    // Wait for 3 seconds on the main page
    await page.waitForTimeout(3000);

    // Get the size of the viewport
    const viewport = await page.evaluate(() => {
        return {
            height: window.innerHeight,
            width: window.innerWidth
        };
    });

    // Define the area to click (top 20% of the page)
    const clickHeight = Math.floor(Math.random() * (viewport.height * 0.2));
    const clickWidth = Math.floor(Math.random() * viewport.width);

    // Click on the specified location
    await page.mouse.click(clickWidth, clickHeight);
    console.log(`Clicked on position (${clickWidth}, ${clickHeight}) within the top 20% of the page.`);

    // Wait for a new page or tab to open
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.waitForNavigation()
    ]);

    if (newPage) {
        console.log("New page or tab detected.");

        // Wait for 5 seconds to view the new page
        await newPage.waitForTimeout(5000);
        console.log("Viewed the new page for 5 seconds.");

        // Close the new page
        await newPage.close();
        console.log("Closed the new page.");
    }

    // Close the browser
    await browser.close();
    console.log("Browser closed.");
};

const startAutomation = async () => {
    while (true) {
        try {
            await runAutomation();
        } catch (error) {
            console.error(`Error during automation: ${error}`);
        }
        console.log("Restarting the task...");
        // Wait a bit before restarting the task
        await new Promise(resolve => setTimeout(resolve, 10000)); // Adjust the delay as needed
    }
};

startAutomation();
