import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export function saveTestCases(problemName: string, testCases: { inputs: string[], outputs: string[] }) {
    const testDir = path.join(vscode.workspace.rootPath || "", "test_cases", problemName);
    console.log("testdir",testDir);
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
    }

    testCases.inputs.forEach((input, index) => {
        fs.writeFileSync(path.join(testDir, `input_${index + 1}.txt`), input);
    });

    testCases.outputs.forEach((output, index) => {
        fs.writeFileSync(path.join(testDir, `output_${index + 1}.txt`), output);
    });

    vscode.window.showInformationMessage(`Test cases saved for ${problemName}`);
}