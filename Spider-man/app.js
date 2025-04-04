let p = document.createElement('p');
p.innerText ="Hey I'm red";
document.querySelector('body').append(p);
p.style.color = "red";

let h3 = document.createElement('h3');
h3.innerText = "I'm a blue h3!";
document.querySelector('body').append(h3);
h3.style.color = 'blue';


let div = document.createElement('div');
document.querySelector('body').append(div);
div.style.backgroundColor = 'pink';
div.style.border = '2px solid black';
let h1 = document.createElement('h1');
h1.innerText = "I'm in a div."
div.appendChild(h1);
let para = document.createElement('p');
para.innerText = "ME TOO!";
div.appendChild(para);
