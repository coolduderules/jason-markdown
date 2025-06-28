#!/bin/bash

# Release script for Jason's Markdown Extension
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Default to patch if no argument provided
BUMP_TYPE=${1:-patch}

echo "🚀 Starting release process with '$BUMP_TYPE' version bump..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must be run from the repository root"
    exit 1
fi

# Check if git is clean
if [ ! -z "$(git status --porcelain)" ]; then
    echo "❌ Error: Git working directory is not clean. Please commit or stash changes."
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📦 Current version: $CURRENT_VERSION"

# Bump version in package.json
echo "⬆️  Bumping version..."
NEW_VERSION=$(npm version $BUMP_TYPE --no-git-tag-version)

echo "📦 New version: $NEW_VERSION"

# Update the version in the main package.json as well
echo "📝 Updating package.json files..."

# Commit the version changes
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"

# Create and push the tag
TAG_NAME="v${NEW_VERSION#v}"
echo "🏷️  Creating tag: $TAG_NAME"
git tag -a "$TAG_NAME" -m "Release $TAG_NAME"

echo "📤 Pushing changes and tag..."
git push origin main
git push origin "$TAG_NAME"

echo "✅ Release process complete!"
echo "🔗 GitHub Actions will now build and create the release automatically."
echo "🔗 Visit: https://github.com/$(git config remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/actions" 
