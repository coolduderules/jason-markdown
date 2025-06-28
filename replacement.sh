#!/bin/bash
# This script automates the replacement of Markdown fenced code block syntax.
# It changes the syntax from ``` and ~~~ to '''.
# A backup of each modified file will be created with a .bak extension.
# This and adding the comment changes are the only changes to the original extensions
# that I made besides modifying scripts and the build process to bundle them together.

set -e
echo "Starting syntax update for Markdown extensions..."

# --- Define File Paths ---
SYNTAX_FILE="markdown-basics/syntaxes/markdown.tmLanguage.json"
SNIPPETS_FILE="markdown-basics/snippets/markdown.code-snippets"
NOTEBOOK_RENDERER_FILE="markdown-language-features/notebook/index.ts"

# Use a consistent backup extension for sed -i for portability between macOS and Linux.
BAK_EXT=".bak"

# --- 1. Modify Syntax Grammar File (markdown.tmLanguage.json) ---
# We use a 'here document' (<<'SED_SCRIPT') to pass commands to sed.
# This avoids complex shell quoting issues with backticks and backslashes.
echo "Updating syntax grammar: $SYNTAX_FILE"
sed -i$BAK_EXT -E -f - "$SYNTAX_FILE" <<'SED_SCRIPT_JSON'
s/`{3,}\|~{3,}/'{3,}/g
s/\[`~\]/[']/g
s/\[\^`]/[^']/g
SED_SCRIPT_JSON

# --- 2. Modify Snippets File (markdown.code-snippets) ---
echo "Updating snippets: $SNIPPETS_FILE"
sed -i$BAK_EXT -f - "$SNIPPETS_FILE" <<'SED_SCRIPT_SNIPPETS'
s/```/'''/g
SED_SCRIPT_SNIPPETS

# --- 3. Modify Notebook Renderer File (index.ts) ---
echo "Updating notebook renderer: $NOTEBOOK_RENDERER_FILE"
sed -i$BAK_EXT -f - "$NOTEBOOK_RENDERER_FILE" <<'SED_SCRIPT_TS'
s/```/'''/g
SED_SCRIPT_TS

echo ""
echo "Update complete. Backups created with the '$BAK_EXT' extension."