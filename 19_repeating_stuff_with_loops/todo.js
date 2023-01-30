// COLT CODE
// let input=prompt('What whould you like to do?');
// const todos=['Collect Chicken Eggs','Clean Litter Box'];
// while(input!=='quit'){
//     if(input==='list'){
//         console.log('*****************');
//         for(let i=0;i<todos.length;i++){
//             console.log(`${i}: ${todos[i]}`);
//         }
//         console.log('*****************');
//     } else if(input==='new'){
//         const newTodo=prompt('Ok, What is the new todo?')
//         todos.push(newTodo);
//         console.log(`${newTodo} add to the list`);
//     } else if(input==='delete'){
//         const index=parseInt(prompt('Ok, Enter an index to delete:'));
//         if(!Number.isNaN(index)){
//             const deleted = todos.splice(index,1);
//             console.log(`Ok, deleted ${deleted[0]}`);
//         }else{
//             console.log('Unkown Index');
//         }

//     }
//     input = prompt('What whould you like to do?');
// }
// console.log("Ok, Quit the App!");



// MY CODE

let command = prompt("What you wanna do?");
const todoList = ["go for run", " wash car"];

while (command !== "quit") {
    if (command == "list") {
        console.log("******************");
        let i = 0;
        for (const task of todoList) {
            console.log(`${i} -> ${task}`);
            i++;
        }
        console.log("******************");
        command = prompt("What you wanna do?");
    } else if (command == "delete") {
        let index = parseInt(prompt("Enter the index"));
        let deleted = todoList.splice(index, 1);
        console.log(`${deleted} is deleted from the list`);
        command = prompt("What you wanna do?");
    } else if (command == "new") {
        let newTask = prompt("What you want to add");
        todoList.push(newTask);
        console.log(`${newTask} added to Todo List`);
        command = prompt("What you wanna do?");
    } else {
        command = prompt("Only show commands works \n What you wanna do?");
    }
}

console.log("Successfully saved list and quitted");