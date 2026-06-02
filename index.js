#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DB = path.join(__dirname, "tasks.json");

const load = () => {
  if (!fs.existsSync(DB)) return [];
  return JSON.parse(fs.readFileSync(DB, "utf8"));
};

const save = (tasks) => fs.writeFileSync(DB, JSON.stringify(tasks, null, 2));

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
};

const c = (color, text) => `${colors[color]}${text}${colors.reset}`;

const tags = ["bug", "feat", "refactor", "test", "docs", "chore"];

const printHelp = () => {
  console.log(`
${c("bold", "devtodo")} — a to-do list for programmers

  ${c("cyan", "node index.js add <task> [tag]")}     add a task (tags: ${tags.join(", ")})
  ${c("cyan", "node index.js list")}                 list all tasks
  ${c("cyan", "node index.js done <id>")}            mark task as done
  ${c("cyan", "node index.js remove <id>")}          remove a task
  ${c("cyan", "node index.js clear")}                clear all done tasks
`);
};

const printList = (tasks) => {
  if (tasks.length === 0) {
    console.log(c("dim", "\n  no tasks yet. add one with: node index.js add <task>\n"));
    return;
  }
  console.log();
  tasks.forEach((t) => {
    const status = t.done ? c("green", "✔") : c("yellow", "○");
    const id = c("dim", `#${t.id}`);
    const tag = t.tag ? c("cyan", `[${t.tag}]`) : "";
    const text = t.done ? c("dim", t.text) : t.text;
    console.log(`  ${status} ${id} ${tag} ${text}`);
  });
  const done = tasks.filter((t) => t.done).length;
  console.log(c("dim", `\n  ${done}/${tasks.length} done\n`));
};

const [,, cmd, ...args] = process.argv;

const tasks = load();

switch (cmd) {
  case "add": {
    const text = args.filter((a) => !tags.includes(a)).join(" ");
    const tag = args.find((a) => tags.includes(a)) || null;
    if (!text) { console.log(c("red", "  error: task text required")); break; }
    const id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    tasks.push({ id, text, tag, done: false, created: new Date().toISOString() });
    save(tasks);
    console.log(c("green", `  ✔ added: ${text}`) + (tag ? c("cyan", ` [${tag}]`) : ""));
    break;
  }
  case "list":
    printList(tasks);
    break;
  case "done": {
    const id = parseInt(args[0]);
    const t = tasks.find((t) => t.id === id);
    if (!t) { console.log(c("red", `  error: task #${id} not found`)); break; }
    t.done = true;
    save(tasks);
    console.log(c("green", `  ✔ done: ${t.text}`));
    break;
  }
  case "remove": {
    const id = parseInt(args[0]);
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) { console.log(c("red", `  error: task #${id} not found`)); break; }
    const [removed] = tasks.splice(idx, 1);
    save(tasks);
    console.log(c("red", `  removed: ${removed.text}`));
    break;
  }
  case "clear": {
    const before = tasks.length;
    const remaining = tasks.filter((t) => !t.done);
    save(remaining);
    console.log(c("dim", `  cleared ${before - remaining.length} done tasks`));
    break;
  }
  default:
    printHelp();
}
