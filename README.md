# ContestHub App
ContestHub provides a way to create and join groups, and participate in challenges, hackathons, etc. Event organizers can also publish their contests to spread them.

## Setting up the development environment

### Requirements
- nodejs
- npm (usually included in nodejs installation)

### Steps

#### Ionic project

1. Clone this repository

`git clone https://github.com/xavierfigueroav/contesthub`

2. Enter the project

`cd contesthub`

3. Install the project dependencies (npm will use *package.json* to get this done, do not worry about which dependencies there are). Just

`npm install`

4. You are ready to run the project and continue the development

`ionic serve`


## Take into account

- In case you need a new dependency, it is recommended to make use of `npm install <package_name>`, instead of CDNs. Also, remember uninstall them `npm uninstall <package_name>`, in case you no longer need it.

- Remember to always modify the file *.gitignore* to inclide any directory or file that your IDE or code editor generates (e.g., Visual Studio Code generates the directory .vscode), or any temporal file that only makes sense to you and the team is not interested in. Verify that by using `git status`.

- It is recommended to follow the Github workflow throughout the project development. In a nutshell
  - Create a new branch (from master) for any new feature that you add `git checkout -b <nueva_rama> master`.

  - After adding changes, push the new branch `git push origin <nueva_rama>`.

  - DO NOT push changes to master. Eventually, use `git merge` or `git rebase` to merge the changes into master, as long as they are production-ready.
