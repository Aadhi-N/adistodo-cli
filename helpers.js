
/* Provide usage instructions */
function help() {
  return console.log(`
  Usage
  $ adistodo <add|edit|list|delete|help>  [task]

  Commands:
  <add> <task [...tasks]> - must wrap in strings
  <edit> [task index number] [task description] [check: true | false] - edit task description
  <delete>
  <list>
  <help>

  Examples
  $ adistodo add "pick up groceries"

  `)
};

module.exports = {help};