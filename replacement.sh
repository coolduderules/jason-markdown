#!/bin/bash
# This script automates the replacement of Markdown fenced code block syntax.
# It changes the syntax from ``` and ~~~ to '''.
# A backup of each modified file will be created with a .bak extension.
# This script is designed to be more robust than the original.

set -e
echo "Starting syntax update for Jason's Markdown extensions..."

# --- Define File Paths ---
SYNTAX_FILE="markdown-basics/syntaxes/markdown.tmLanguage.json"
SNIPPETS_FILE="markdown-basics/snippets/markdown.code-snippets"

# Use a consistent backup extension for sed -i for portability between macOS and Linux.
BAK_EXT=".bak"

# --- 1. Modify Syntax Grammar File (markdown.tmLanguage.json) ---
# This is a multi-step process to correctly handle JSON strings and regex complexities.
echo "Updating syntax grammar: $SYNTAX_FILE"

# Step 1.1: Replace the core fence definition.
# Changes (`{
  3,
}|~{
  3,
}) to ('{
  3,
})
# Note the double escaping for backslashes needed for the final JSON string.
sed -i$BAK_EXT "s/(\`{3,}\|~{3,})/'('{3,})/g""$SYNTAX_FILE"

# Step 1.2: Correct the 'while' clauses in fenced code blocks.
# The original script could produce invalid regex like (?!\\s*(['
]{
  3,
})\\s*$).
# We are fixing that to be (?!\\s*'{
  3,
}\\s*$) which is a valid lookahead for '''
sed -i$BAK_EXT "s/\(\?!\\\\s\*\(\[']\{3,}\)\\\\s\*\$\)/\(?!\\\\s*'{3,}\\\\s*\$\)/g""$SYNTAX_FILE"

# Step 1.3: Fix the raw inline code pattern which may have been broken by a blind replace.
# This ensures `inline code` (using backticks) is not affected by the ' fence change.
# It changes "((?:[^']|... to "((?: [^`
]|...
sed -i$BAK_EXT 's/"match": "\(`\+\)\(\(\?:\[\^''\]\|/\"match\": \"\\(\`\\+\\)\\(\\(\?:\[\^`\]\|/g' "$SYNTAX_FILE"

# --- 2. Modify Snippets File (markdown.code-snippets) ---
echo "Updating snippets: $SNIPPETS_FILE"
# This simply replaces the backtick fence with the single-quote fence in the snippet body.
sed -i$BAK_EXT "s/\"'''\$/\"'''\"/g""$SNIPPETS_FILE"


echo ""
echo "Update complete. Backups created with the '$BAK_EXT' extension."
echo "Please manually review the changed files for correctness."