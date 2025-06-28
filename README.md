# README.md

## Jason's Markdown

This extension provides a unified modified Markdown experience for Visual Studio Code to suit my own personal needs, it is highly opinionated but extremely close to the original vscode markdown experience. It integrates core syntax highlighting, advanced language features like preview and intellisense, and KaTeX-powered math rendering into a single package with the goal of making it easier to parse nested code blocks with certain proprietary software.

## Features

* **Custom Code Fence Syntax**: Uses `'''` for fenced code blocks for a cleaner aesthetic.
* **Rich Markdown Preview**: Live preview of your Markdown files that scrolls in sync with the editor.
* **Math Rendering**: Inline and block-level mathematical notation rendering using KaTeX.
* **Smart Link Handling**: Automatic path completion, link validation, and updates on file rename.
* **Full Language Support**: Powered by a dedicated language server providing diagnostics, outlining, and more.

## Configuration

The extension merges the standard VS Code Markdown settings. You can configure it via the settings UI under "Markdown". Key settings include:

* `markdown.math.enabled`: Enable or disable KaTeX math rendering.
* `markdown.math.macros`: Define custom KaTeX macros.
* `markdown.styles`: Provide custom CSS to style the Markdown preview.
