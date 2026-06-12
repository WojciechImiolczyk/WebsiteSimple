const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const srcDir = path.join(workspaceRoot, 'src');
const partialsDir = path.join(srcDir, 'partials');
const outDir = path.join(workspaceRoot, 'dist');

function readPartial(name){
  return fs.readFileSync(path.join(partialsDir, name), 'utf8');
}

function ensureDir(dir){
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});
}

function computePrefix(filePath){
  const rel = path.relative(srcDir, filePath).split(path.sep);
  // depth = segments.length - 1
  const depth = Math.max(0, rel.length - 1);
  let prefix = '';
  for(let i=0;i<depth;i++) prefix += '../';
  return prefix;
}

function processFile(filePath){
  const content = fs.readFileSync(filePath, 'utf8');
  const prefix = computePrefix(filePath);
  let out = content;

  const meta = readPartial('meta.html').replace(/%ROOT%/g, prefix);
  const header = readPartial('header.html').replace(/%ROOT%/g, prefix);
  const footer = readPartial('footer.html').replace(/%ROOT%/g, prefix);

  out = out.replace(/<!--\s*META\s*-->/i, meta);
  out = out.replace(/<!--\s*HEADER\s*-->/i, header);
  out = out.replace(/<!--\s*FOOTER\s*-->/i, footer);

  // remove runtime header/footer script includes if present
  out = out.replace(/<script[^>]*js\/header\.js[^>]*>\s*<\/script>\s*/i, '');
  out = out.replace(/<script[^>]*js\/footer\.js[^>]*>\s*<\/script>\s*/i, '');

  // write to dist
  const rel = path.relative(srcDir, filePath);
  const targetPath = path.join(outDir, rel);
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, out, 'utf8');
  console.log('Written', targetPath);
}

function walk(dir){
  const entries = fs.readdirSync(dir, {withFileTypes:true});
  for(const e of entries){
    const full = path.join(dir, e.name);
    if(e.isDirectory()){
      if(e.name === 'dist' || e.name === 'node_modules') continue;
      walk(full);
    } else if(e.isFile() && full.endsWith('.html')){
      processFile(full);
    }
  }
}

ensureDir(outDir);
walk(workspaceRoot);
// Copy static asset folders and root assets into dist
function copyDir(src, dest){
  if(!fs.existsSync(src)) return;
  ensureDir(dest);
  const entries = fs.readdirSync(src, {withFileTypes:true});
  for(const e of entries){
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if(e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

['css','images','js','gallery'].forEach(name => {
  const s = path.join(workspaceRoot, name);
  const d = path.join(outDir, name);
  copyDir(s, d);
});

['favicon.ico'].forEach(name => {
  const s = path.join(workspaceRoot, name);
  const d = path.join(outDir, name);
  if(fs.existsSync(s)) fs.copyFileSync(s, d);
});

console.log('Build complete. Output in dist/');
