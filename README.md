# README.md

## Jason's Markdown

This extension provides a unified, modified Markdown experience for Visual Studio Code, tailored for a specific workflow. It is highly opinionated but based on the original VS Code Markdown extension. Its primary purpose is to make parsing nested code blocks easier by using a different fence character.

To use this extension, you may need to configure VS Code to associate it with `.md` files, as it now uses a unique language identifier (`jason-markdown`) to avoid conflicts with the built-in Markdown support. You can do this in your `settings.json`:

```json
"files.associations": {
  "*.md": "jason-markdown"
}
```

## Features

* **Custom Code Fence Syntax**: Uses `'''` for fenced code blocks instead of ` ``` `.
* **Custom Comment Syntax**: Uses `//` for line comments.
* **Rich Markdown Preview**: Live preview of your Markdown files that scrolls in sync with the editor.
* **Math Rendering**: Inline and block-level mathematical notation rendering using KaTeX.
* **Smart Link Handling**: Automatic path completion, link validation, and updates on file rename.
* **Full Language Support**: Powered by a dedicated language server providing diagnostics, outlining, and more.

## Configuration

The extension merges the standard VS Code Markdown settings. You can configure it via the settings UI under "Jason's Markdown". Key settings include:

* `jason-markdown.math.enabled`: Enable or disable KaTeX math rendering.
* `jason-markdown.math.macros`: Define custom KaTeX macros.
* `jason-markdown.styles`: Provide custom CSS to style the Markdown preview.
