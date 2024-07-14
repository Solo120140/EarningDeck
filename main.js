const puppeteer = require('puppeteer');

const runAutomation = async () => {
    const browser = await puppeteer.launch({
        headless: true, // Run in headless mode
        executablePath: '/usr/bin/chromium-browser', // Path to Chromium executable
        args: [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });

    const page = await browser.newPage();
    await page.goto('https://nextsatern.pythonanywhere.com'); // Updated URL

    // Wait for 3 seconds on the main page before clicking
    await page.waitForTimeout(3000);

    // Get the size of the window
    const viewport = await page.viewport();
    const windowHeight = viewport.height;
    const windowWidth = viewport.width;

    // Define the area to click (top 20% of the page)
    const clickHeight = random(0, Math.floor(windowHeight * 0.2));
    const clickWidth = random(0, windowWidth);

    // Click on the specified location
    await page.mouse.click(clickWidth, clickHeight);
    console.log(`Clicked on the position (${clickWidth}, ${clickHeight}) within the top 20% of the page.`);

    // Wait for a new window or tab to open
    const [newPage] = await Promise.all([
        browser.waitForTarget(target => target.url() !== page.url()).then(target => target.page()),
        page.click('selector-for-link') // Adjust this selector to trigger a new tab
    ]);

    if (newPage) {
        console.log("New window or tab detected.");

        // Wait for 5 seconds to view the new page
        await newPage.waitForTimeout(5000);
        console.log("Viewed the new page for 5 seconds.");

        // Close the new window/tab
        await newPage.close();
        console.log("Closed the new window/tab.");
    }

    // Close the original page
    await page.close();
    console.log("Closed the original page.");

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
