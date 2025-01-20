import * as vscode from "vscode";
import * as path from "path"; 
import * as fs from "fs";
import * as child_process from "child_process";

export function runTestCases() {  
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        // Get the file name from the active editor
        const fileName = editor.document.fileName;

        // Create terminal for running tests
        const terminal = vscode.window.createTerminal("Test Runner");

        // Get the current working directory (where test cases were saved)
        const workingDirectory = process.cwd();

        // Paths to the test inputs and outputs saved in the working directory
        const testInputFilePath = path.join(workingDirectory, 'test_cases', 'test_inputs.txt');
        const expectedOutputFilePath = path.join(workingDirectory, 'test_cases', 'test_outputs.txt');


        // Check if expected_output.txt exists
        let expectedOutput = '';
        try {
            expectedOutput = fs.readFileSync(expectedOutputFilePath, 'utf8');
        } catch (err) {
            console.error('Failed to read expected_output.txt:', err);
        }

        // Clean the expected output by removing extra newlines and unnecessary spaces
        expectedOutput = expectedOutput.replace(/\r?\n|\r/g, ' ').trim();

        // Run the appropriate command based on the file type
        if (fileName.endsWith(".cpp")) {
            // If it is a C++ file, compile and run the C++ file
            const compileAndRunCommand = `g++ -std=c++17 "${fileName}" -o solution && .\\solution < "${testInputFilePath}"`;

            // Get the actual output of the program
            child_process.exec(compileAndRunCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error running the C++ code: ${stderr}`);
                    return;
                }

                // Clean the actual output by removing extra newlines and unnecessary spaces
                const actualOutput = stdout.replace(/\r?\n|\r/g, ' ').trim();

                // Print actual output in terminal
                terminal.sendText(` "Actual Output: ${actualOutput}"`);
                
                // Print expected output in terminal
                terminal.sendText(` "Expected Output: ${expectedOutput}"`);

                // Compare actual output with expected output
                if (actualOutput === expectedOutput) {
                    terminal.sendText('"PASS - Output matches"');
                } else {
                    terminal.sendText('"FAIL - Output doesn\'t match"');
                }
            });
        } else if (fileName.endsWith(".py")) {
            // If it is a Python file, directly run the Python file and get input from test_inputs.txt
            const runPythonCommand = `python "${fileName}" < "${testInputFilePath}"`;

            // Get the output of the Python program
            child_process.exec(runPythonCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error running the Python code: ${stderr}`);
                    return;
                }

                // Clean the actual output by removing extra newlines and unnecessary spaces
                const actualOutput = stdout.replace(/\r?\n|\r/g, ' ').trim();

                // Print actual output in terminal
                terminal.sendText(` "Actual Output: ${actualOutput}"`);
                
                // Print expected output in terminal
                terminal.sendText(` "Expected Output: ${expectedOutput}"`);

                // Compare actual output with expected output
                if (actualOutput === expectedOutput) {
                    terminal.sendText(' "PASS - Output matches"');
                } else {
                    terminal.sendText(' "FAIL - Output doesn\'t match"');
                }
            });
        } else {
            vscode.window.showErrorMessage('The active file is neither a C++ nor a Python file.');
            return;  // Exit if it is neither a C++ file nor a Python file
        }

        terminal.show();
        console.log("Running the code new");

    } else {
        vscode.window.showErrorMessage('No active file detected.');
    }
}
