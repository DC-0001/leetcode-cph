import { fetchTestCases } from "./fetcher";
import { saveTestCases } from "./utils";
import { runTestCases } from "./runner";
import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
    console.log("Extension Activated!");
    let fetchCommand = vscode.commands.registerCommand("leetcode-cph.fetchTestCases", async () => {
        const url = await vscode.window.showInputBox({ prompt: "Enter LeetCode Problem URL" });
        if (url) {
            vscode.window.showInformationMessage(`Fetching test cases from: ${url}`);
            const testCases = await fetchTestCases(url);
            saveTestCases("leetcode_problem", testCases);
        }
    });
    let runCommand = vscode.commands.registerCommand("leetcode-cph.runTestCases", () => {
        runTestCases();
    });
    context.subscriptions.push(fetchCommand, runCommand);
}
export function deactivate() {}