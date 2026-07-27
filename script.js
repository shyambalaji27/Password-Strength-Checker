// ======================
// Select Elements
// ======================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");
const crackTime = document.getElementById("crackTime");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const themeBtn = document.getElementById("themeBtn");

const lengthItem = document.getElementById("length");
const upperItem = document.getElementById("upper");
const lowerItem = document.getElementById("lower");
const numberItem = document.getElementById("number");
const specialItem = document.getElementById("special");

// ======================
// Show / Hide Password
// ======================

togglePassword.addEventListener("click", () => {

    if(password.type==="password"){
        password.type="text";
        togglePassword.innerHTML='<i class="fa-solid fa-eye-slash"></i>';
    }else{
        password.type="password";
        togglePassword.innerHTML='<i class="fa-solid fa-eye"></i>';
    }

});

// ======================
// Password Checker
// ======================

password.addEventListener("input",checkStrength);

function checkStrength(){

    let pass=password.value;

    let score=0;

    let hasLength=pass.length>=8;
    let hasUpper=/[A-Z]/.test(pass);
    let hasLower=/[a-z]/.test(pass);
    let hasNumber=/[0-9]/.test(pass);
    let hasSpecial=/[^A-Za-z0-9]/.test(pass);

    updateItem(lengthItem,hasLength);
    updateItem(upperItem,hasUpper);
    updateItem(lowerItem,hasLower);
    updateItem(numberItem,hasNumber);
    updateItem(specialItem,hasSpecial);

    if(hasLength) score++;
    if(hasUpper) score++;
    if(hasLower) score++;
    if(hasNumber) score++;
    if(hasSpecial) score++;

    updateStrength(score);

}

// ======================
// Requirement UI
// ======================

function updateItem(item,valid){

    const icon=item.querySelector("i");

    if(valid){

        item.classList.add("valid");

        icon.className="fa-solid fa-circle-check";

    }else{

        item.classList.remove("valid");

        icon.className="fa-solid fa-circle-xmark";

    }

}

// ======================
// Strength Meter
// ======================

function updateStrength(score){

    let text="";
    let color="";
    let width="";

    switch(score){

        case 0:
            text="Strength : None";
            color="#9ca3af";
            width="0%";
            crackTime.innerText="—";
            break;

        case 1:
            text="Very Weak";
            color="#ef4444";
            width="20%";
            crackTime.innerText="Few Seconds";
            break;

        case 2:
            text="Weak";
            color="#f97316";
            width="40%";
            crackTime.innerText="Few Minutes";
            break;

        case 3:
            text="Medium";
            color="#facc15";
            width="60%";
            crackTime.innerText="Several Hours";
            break;

        case 4:
            text="Strong";
            color="#22c55e";
            width="80%";
            crackTime.innerText="Several Years";
            break;

        case 5:
            text="Very Strong";
            color="#16a34a";
            width="100%";
            crackTime.innerText="Centuries";
            break;

    }

    strengthText.innerText=text;
    strengthFill.style.width=width;
    strengthFill.style.background=color;

}

// ======================
// Password Generator
// ======================

generateBtn.addEventListener("click",()=>{

const chars=
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]<>?/";

let generated="";

for(let i=0;i<16;i++){

generated+=chars.charAt(
Math.floor(Math.random()*chars.length)
);

}

password.value=generated;

checkStrength();

});

// ======================
// Copy Password
// ======================

copyBtn.addEventListener("click",()=>{

if(password.value===""){

alert("Generate or enter a password first.");

return;

}

navigator.clipboard.writeText(password.value);

copyBtn.innerHTML='<i class="fa-solid fa-check"></i> Copied';

setTimeout(()=>{

copyBtn.innerHTML='<i class="fa-solid fa-copy"></i> Copy Password';

},2000);

});

// ======================
// Theme Toggle
// ======================

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("light");

const icon=themeBtn.querySelector("i");

if(document.body.classList.contains("light")){

icon.className="fa-solid fa-sun";

}else{

icon.className="fa-solid fa-moon";

}

});

// ======================
// Initial State
// ======================

checkStrength();
