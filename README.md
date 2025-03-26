# Decap Theme for Hugo

This is a reusable **Decap Hugo theme**, designed to give your static site instant access to the Decap CMS using an authentication gateway built by ```https://jmcl.co```.

It includes:

- **Templates** – A library templates for the /admin pages that handle the authentication and managing of content in the CMS.   
- **JS** – Modular JavaScript (ES Modules) for accessing the authentication portal. 

---

## Prerequisites

- **Hugo extended** ≥ `0.145.0`
- **Node.js + npm** (for building assets with Webpack)
- **JMCL license** (For accessing the authentication gateway)

---

## Getting Started
There are a number of steps for you to complete to import this into your hugo website.
### 1. Integrate the repo into your project
```bash
    git submodule add https://github.com/J-Morgan-Consulting/gohugo-theme-decap.git themes/decap
```

### 2. Set Up Webpack Build (from Theme)
Copy build-related files into your project root:
```bash
cp themes/bootstrap/build/webpack.config.js .
cp themes/bootstrap/build/package.template.json .
```
Then:
```bash
# Merge package.template.json into your root package.json
npm install
npm run build
```
### 3. Build out your config.yml file
In line with the Decap guidelines found here: ```https://decapcms.org/```

### 6. Build Your Templates & Content
Continue building your Hugo site in the root project directory:
- Layouts
- Pages

---
## Other Notes
- The theme supports theme stacking – you can layer another override theme on top.
- All reusable components are modular and overridable from the root project.