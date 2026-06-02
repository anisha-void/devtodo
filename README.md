```
 ██████╗ ███████╗██╗   ██╗████████╗ ██████╗ ██████╗  ██████╗ 
 ██╔══██╗██╔════╝██║   ██║╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
 ██║  ██║█████╗  ██║   ██║   ██║   ██║   ██║██║  ██║██║   ██║
 ██║  ██║██╔══╝  ╚██╗ ██╔╝   ██║   ██║   ██║██║  ██║██║   ██║
 ██████╔╝███████╗ ╚████╔╝    ██║   ╚██████╔╝██████╔╝╚██████╔╝
 ╚═════╝ ╚══════╝  ╚═══╝     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 
```

> A minimal CLI to-do app built for programmers. No GUI. No fluff. Just tasks.

## Usage

```bash
node index.js add "fix auth bug" bug
node index.js add "write unit tests" test
node index.js list
node index.js done 1
node index.js remove 2
node index.js clear
```

## Tags

| Tag | Use for |
|-----------|------------------------|
| `feat` | new feature |
| `bug` | something broken |
| `refactor` | cleanup / restructure |
| `test` | writing tests |
| `docs` | documentation |
| `chore` | misc tasks |

## Example

```
  ○ #1 [bug]  fix auth token expiry
  ○ #2 [feat] add dark mode toggle
  ✔ #3 [docs] update README

  1/3 done
```

## Roadmap

- [ ] priority levels
- [ ] due dates
- [ ] filter by tag
- [ ] export to markdown

---

*Started June 2026. Built with Node.js. No dependencies.*
