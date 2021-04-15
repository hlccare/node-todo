const { program } = require('commander');
const api = require('./index.js')

program
    .option('-x, --xxx', 'xxxxxxx')


program
    .command('add <names...>')
    .description('add a task')
    .action((names) => {
        console.log(names.join(' '));
        api.add(names)
    });

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear()
    });

program.parse(process.argv);

console.log(process.argv)

if(process.argv.length === 2){
    api.showAll()
}


