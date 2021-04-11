# Adistodo - NodeJS CLI App

Adistodo is a task management NodeJS cli-app.

## Getting Started

## Installing
```
npm install adistodo
```

### Usage Guide

Argument format:

```
adistodo <add|edit|list|delete|help> <index> [task] [{true|false}]
```

Available commands:
```
<add> <task>...                       # Add task. Add 1 or more tasks, separated by strings, 
                                      # for each task to be saved separately.
                                      # Default completion status is false.  

<edit> <index> [task] [{true|false}]  # Edit task. Provide index number of task to edit. 
                                      # Provide a new task description to replace with, 
                                      # and/or optional completion status.
    
<list>                                # List all tasks.
    
<delete> <index>                      # Delete task. Provide index number of task to delete.
    
<help>                                # Opens command line usage guide. 
```

Examples:
```
$ adistodo add "buy green apples"
$ adistodo add "buy green apples" "check mail"
$ adistodo edit 1 "buy red apples" 
$ adistodo edit 1 true
$ adistodo delete 1
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


