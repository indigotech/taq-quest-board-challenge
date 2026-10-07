# Quest Board — Taqtile Challenge

## About

This project is an incomplete fullstack Quest Board application (backend API + React frontend) with a fantasy RPG theme: quests, each with a difficulty and an XP reward. Your task is to complete the missing pieces, connecting both layers.

The main purpose of this challenge is not to evaluate your prior knowledge of any specific framework, but to show us how you solve a problem, how you study for it, and how you use AI tools as part of your workflow.

Think of this challenge as your first task working at Taqtile: what you deliver here is what we would expect from your work in a real project given the same constraints.

## TODOs

- [ ] Download or clone this repository and push it to a new **private** repository under your own GitHub account. Do not push commits or open pull requests against this repository — your work happens entirely in your own copy.
- [ ] **Quest difficulty** — every quest is currently created with the `normal` difficulty. Let the user choose the difficulty (`easy`, `normal` or `high`) when creating a quest: add it to the creation form and make `POST /quests` accept it. The XP reward already follows from the difficulty.
- [ ] **Quest editing** — quests can't be changed after they are created, and moving a quest to the next column only changes the board in the browser, so progress is lost on reload. Add a `PATCH /quests/:id` endpoint that partially updates a quest — any of its `title`, `description`, `difficulty` and `status` — and wire the frontend to it: moving a quest between columns should persist its status, and the user should be able to edit a quest's fields from the board.
- [ ] Fill in [`REFERENCES.md`](REFERENCES.md) and commit it together with your OpenCode session log (see [Using OpenCode](#using-opencode)).

## General guidelines

Your solution does not need to be visually polished — we care more about how you approached the problem than about pixel-perfect UI.

Please do *not* share your final code with classmates or ask others for the solution to this challenge. You are more than welcome to send us any doubts, discuss possible approaches with colleagues, and share interesting references with each other.

Send us your final solution as a link to your private GitHub repository, shared with us. Email [carreiras@taqtile.com.br](mailto:carreiras@taqtile.com.br) to ask which GitHub accounts to give access to.

Complete the [`REFERENCES.md`](REFERENCES.md) file with the references you used to complete the challenge. A solution without references will be considered incomplete.

## Using OpenCode

This challenge should be completed with the help of **OpenCode**, a CLI coding agent. It comes preconfigured in this repository with a tracking plugin — no additional setup is needed besides installing the tool itself.

**1. Install OpenCode**

```bash
npm install -g opencode-ai
# or:
curl -fsSL https://opencode.ai/install | bash
```

**2. Run it inside the project folder**

```bash
cd <your-repository-folder>
opencode
```

This opens OpenCode's terminal interface. From there, talk to it as you normally would to ask for help, generate code, or review your changes — this is how we expect you to work throughout the challenge.

**3. Confirm tracking is active**

The tracking plugin is already registered at `.opencode/plugin/tracking.ts` and runs automatically every session. You can confirm it's working by checking that `.opencode/logs/session.jsonl` is being created and updated as you use the tool.

- **Do not delete, edit, or disable the tracking plugin.** It's part of the evaluation — we want to understand how you use AI as a work tool, not just the final result.
- **Commit `.opencode/logs/session.jsonl` to your repository.** It is part of your delivery: without it, we can't see how you worked.
- You're welcome to consult other sources (documentation, Stack Overflow, another AI) as occasional support, but the actual development should go through OpenCode so your usage history gets recorded.

## Tips

- Think about what the API should do with invalid or missing fields — on creation and on a partial update — before implementing it.
- Test the endpoint independently (e.g. with `curl` or an HTTP client) before wiring it up to the frontend — it's easier to isolate bugs that way.

## How to run the project

- **Backend** — Elysia REST API + PostgreSQL, at the root of this repo (`apps/`, `packages/`). Setup (Docker, migrations, env vars), running, testing and architecture: [`BACKEND.md`](BACKEND.md).
- **Frontend** — React/Vite web app, at `apps/web`. Setup (env vars), running and architecture: [`FRONTEND.md`](FRONTEND.md).

## What will be evaluated

- Whether the TODOs were solved correctly;
- Code quality and clarity (naming, organization, error handling);
- How you used AI: specific vs. generic prompts, whether generated code was tested before being accepted, whether you understand what the code does;
- Your ability to explain your decisions during the technical interview.

Good luck! If you have any doubts about the scope, email us at [carreiras@taqtile.com.br](mailto:carreiras@taqtile.com.br).
