import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 1. Generate Invoice PDF
    console.log("Navigating to App...");
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

    // Wait for React to mount
    await page.waitForSelector('nav');

    console.log("Generating Invoice PDF...");
    await page.pdf({
        path: 'invoice.pdf',
        format: 'A4',
        printBackground: true
    });

    // 2. Generate Brochure PDF
    console.log("Switching to Rate Card...");
    // Click the 'Rate Card' button. We need to find it clearly.
    // It has text "Rate Card".
    const [button] = await page.$x("//button[contains(., 'Rate Card')]");
    if (button) {
        await button.click();
        // Wait for Brochure to render
        await new Promise(r => setTimeout(r, 1000)); // Simple wait for state update

        console.log("Generating Brochure PDF...");
        await page.pdf({
            path: 'brochure.pdf',
            format: 'A4',
            printBackground: true
        });
    } else {
        console.error("Rate Card button not found!");
    }

    await browser.close();
    console.log("Done! Saved invoice.pdf and brochure.pdf");
})();
