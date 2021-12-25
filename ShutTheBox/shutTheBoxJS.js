/*  To meet with game ending second codition, there was recursion required
    (or tree data structure) which is not studied yet. So i just took one piece of code from
    net i.e. (find all possible combinations of array elements in c++) and convert it 
    into javascript by myself and modified it according to my requirement(not as it is used).*/


let roll = document.getElementById('roll');
let submit = document.getElementById('submit');
submit.disabled = true;
let roll1;
let roll2;
let check=0;
let rollSum = 0;
let remainingSum = 7;
let score=0;
function getResult(){
    check=0;
    roll1 = Math.ceil(Math.random()*6);
    document.getElementById('rollResult1').innerHTML = roll1;
    if(remainingSum >= 6)
    {
        roll2 = Math.ceil(Math.random()*6);
        document.getElementById('rollResult2').innerHTML = " , " + roll2;
    }
    else{
        document.getElementById('rollResult2').innerHTML = "";
        roll2 = 0;
    }
    roll.disabled = true;
    submit.disabled = false;
    rollSum = roll1 + roll2;
    //ending scenerio and score
    let vect=[];
    let a=[];
    let checkk=[];
    for(let i=0;i<allButtons.length;i++){
        if(allButtons[i].disabled==false){
            a.push(parseInt(allButtons[i].value));
            checkk.push(false);
        }
    }
    let end = true;
    for (let i = 1; i <= a.length; i++) {
        Combi(a, i, 0, 0, checkk, a.length);
    }
    for(let i=0;i<vect.length;i++){
        if(vect[i]==rollSum){
            end=false;
        }
    }
    if(end==true){
    roll.disabled=true;
    submit.disabled=true;
    score = 0;
    for(let i=0;i< allButtons.length;i++)
    {
        if(allButtons[i].disabled == true){
            score = score + parseInt(allButtons[i].value);
        }
    }
    let overGame = document.getElementById("over");
    overGame.innerHTML = "GAME ENDED!! because checkboxes values are not enough to become equal to the sum of rolled dices values i.e."+ roll1 +" and "+ roll2+ ". SO! Your SCORE : " + score;
    alert(overGame.innerHTML);
    check=1;
    }
    //copied
    function Combi(a, reqLen, s, currLen, checkk, l)
    {
        if (currLen > reqLen)
            return;
        else if (currLen == reqLen) {
            let sum = 0;
            for (let i = 0; i < l; i++) {
                if (checkk[i] == true) {
                    sum = sum + a[i];
                }
            }
            vect.push(sum);
            return;
        }
        if (s == l) {
            return;
        }
        checkk[s] = true;
        Combi(a, reqLen, s + 1, currLen + 1, checkk, l);
        checkk[s] = false;
        Combi(a, reqLen, s + 1, currLen, checkk, l);
}

}

let giveup = document.getElementById('giveup');
giveup.onclick=function(){
    check=0;
    score = 0;
    for(let i=0;i< allButtons.length;i++)
    {
        if(allButtons[i].disabled == true){
            score = score + parseInt(allButtons[i].value);
        }
    }
    roll.disabled=true;
    submit.disabled=true;
    let overGame = document.getElementsByClassName("over");
    overGame.innerHTML = "GAME ENDED!! because You gave up. Your SCORE : " + score;
    alert(overGame.innerHTML);
    check=1;
}

document.getElementById('roll').onclick = getResult;

let allButtons = document.getElementsByClassName('checkBox');
submit.onclick = function(){
    score = 0;
    for(let i=0;i< allButtons.length;i++)
    {
        if(allButtons[i].disabled == true){
            score = score + parseInt(allButtons[i].value);
        }
    }
    check=0;
    let sumOfCheckboxes = 0;
    for(let i=0;i< allButtons.length;i++)
    {
        if(allButtons[i].checked == true && allButtons[i].disabled==false){
            sumOfCheckboxes = sumOfCheckboxes + parseInt(allButtons[i].value);
        }
    }
    rollSum = roll1 + roll2;
    remainingSum = 0;
    for(let i=0;i< allButtons.length;i++)
    {
        if(allButtons[i].checked == false && allButtons[i].disabled==false){
            remainingSum = remainingSum + parseInt(allButtons[i].value);
        }
    }
    if(rollSum == sumOfCheckboxes)
    {
        check=1;
        for(let i=0;i < allButtons.length;i++)
        {
            if(allButtons[i].checked == true){
                allButtons[i].disabled = true;
            }
        }
        submit.disabled=true;
        roll.disabled=false;

        var allDisabled = true;
    for(let i=0;i<allButtons.length;i++)
    {
        if(allButtons[i].disabled == false)     //enable
        {
            allDisabled = false;
        }
    }
    if(allDisabled == true){
        roll.disabled=true;
        submit.disabled=true;
        let overGame = document.getElementsByClassName("over");
        overGame.innerHTML = "GAME ENDED!! because You have all disabled checkboxes. Your SCORE : " + score;
        alert(overGame.innerHTML);
        check=1;
    }

    }
    if(check==0){
        alert("The total of the boxes you selected does not match the dice roll. Please make another selection and try again");
    }
}



