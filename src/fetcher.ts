import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

export async function fetchTestCases(url: string) {
    let browser;
    let testCases: { inputs: any[]; outputs: any[] } = { inputs: [], outputs: [] };
    try {
        // Launching the Puppeteer through browser
        browser = await puppeteer.launch({ headless: false }); // Opens browser 
        const page = await browser.newPage();

        // visiting the provided URL
        console.log("Fetching test cases from URL:", url);
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        //checking the problem statement div
        await page.waitForSelector('.elfjS');

        testCases = await page.evaluate(() => {
    function cleanInput(rawData: string): string[] {
        // Split the input at any variable followed by = and remove the empty parts
        let cleaned = rawData
            .split(/\b[a-zA-Z_0-9]+\s*=\s*/) // Split at variable
            .filter(part => part.trim() !== "") // Removes empty parts
            .map(part => part.trim()) // Trims each part
            .map(part => part
                .replace(/"/g, '') // Removes double quotes
                .replace(/[\[\]]/g, '') // Removes brackets
                .replace(/,/g, ' ') // Replaces commas with spaces
            );

        return cleaned; // Returns the cleaned up input
    }

    // @ts-ignore - Ignore TypeScript errors for document
    const problemText: string = document.querySelector('.elfjS')?.innerText || '';

    // Split text to extract multiple example cases
    const examples: string[] = problemText.split("Example").slice(1);

    let inputs: any[] = [];
    let outputs: any[] = [];

    examples.forEach((example: string) => {
        const inputMatch = example.match(/Input:\s*([\s\S]*?)\nOutput:/);
        const outputMatch = example.match(/Output:\s*([\s\S]*?)\n/);

        if (inputMatch && outputMatch) {
            // Clean inputs using the cleanInput function
            const cleanedInput = cleanInput(inputMatch[1].trim());
            const cleanedOutput = cleanInput(outputMatch[1].trim());


            // Push cleaned input and output
            inputs.push(cleanedInput);
            outputs.push(cleanedOutput);
        }
    });

    return { inputs, outputs };
});

        // set the output folder for test cases in the working directory
        const outputFolder = path.join(process.cwd(), 'test_cases');

        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }

        // Write inputs to test_inputs.txt with elements separated by spaces and an empty line after each test case
        const inputText = testCases.inputs.map(input => {
            return input.join(' ') + '\n';  // Join numbers with space and add empty line after each test case
        }).join('\n');  // Separate different test cases by a new line

        const inputFilePath = path.join(outputFolder, 'test_inputs.txt');
        fs.writeFileSync(inputFilePath, inputText);

        // Write outputs to test_outputs.txt with elements separated by new lines and an empty line after last element
        const outputText = testCases.outputs.map(output => {
            return output.join('\n') + '\n';  // Join numbers with newline and add empty line after each test case
        }).join('\n');  // Separate different outputs by a new line

        const outputFilePath = path.join(outputFolder, 'test_outputs.txt');
        fs.writeFileSync(outputFilePath, outputText);

        console.log('Test cases saved successfully in .txt files at:', outputFolder);

    } catch (error) {
        console.error("An error occurred while fetching test cases:", error);
    } finally {
        // to ensure that the browser is closed if an error occurred
        if (browser) {
            await browser.close();
        }
    }

    return testCases;
}
