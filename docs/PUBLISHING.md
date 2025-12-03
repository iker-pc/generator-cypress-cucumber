# 📦 Release & Publishing Guide

This document explains how the automated publishing system works when creating version tags (e.g., `v1.0.0`).

---

## 🚀 How Publishing Works

Publishing is triggered automatically when you push a Git tag that starts with **`v`**:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Only tags matching `vX.X.X` will start the publish workflow.

---

## 📝 Version Matching

Before publishing, the workflow verifies:

```
package.json version === tag version
```

If they don’t match, publishing is stopped.

---

## 🔧 Publish Workflow Steps

When a valid tag is pushed:

1. Dependencies are installed using `npm ci`.
2. Test are executed (if exists)
3. The project is built.
4. The package is published to npm (NPM_TOKEN secret is required for this action)

---

## 🔁 Releasing a New Version

To update the version and tag automatically:

```bash
npm version patch   # or minor / major
git push --follow-tags
```

This updates the version, creates a tag, and triggers the publish workflow.

---

## 🛑 Removing a Tag

If you need to undo a release tag:

**Local:**

```bash
git tag -d v1.0.0
```

**Remote:**

```bash
git push origin --delete v1.0.0
```

---

## ✔️ Summary

| Action                               | Result              |
| ------------------------------------ | ------------------- |
| Push to `master`/`main`              | No publish          |
| Push a tag `vX.X.X`                  | 🚀 Publishes to npm |
| Tag version ≠ `package.json` version | ❌ Publish blocked  |
