
var switchButton = document.querySelector('.switch-button');
var switchBtnRight = document.querySelector('.switch-button-case.right');
var switchBtnLeft = document.querySelector('.switch-button-case.left');
var activeSwitch = document.querySelector('.active');
var mode=0;//encode
function switchLeft(){
	switchBtnRight.classList.remove('active-case');
	switchBtnLeft.classList.add('active-case');
	activeSwitch.style.left = '0%';
    mode=0;
}

function switchRight(){
	switchBtnRight.classList.add('active-case');
	switchBtnLeft.classList.remove('active-case');
	activeSwitch.style.left = '50%';
    mode=1;
}

switchBtnLeft.addEventListener('click', function(){
	switchLeft();
    if(document.getElementById("key").value.trim()!=""&&
        document.getElementById("password").value.trim()!=""){
        processFormData();
    }
}, false);

switchBtnRight.addEventListener('click', function(){
	switchRight();
    processFormData();
    if(document.getElementById("key").value.trim()!=""&&
        document.getElementById("password").value.trim()!=""){
        processFormData();
    }

}, false);


function processFormData() {
  const key = Number(document.getElementById("key").value.trim())
  const password = document.getElementById("password").value.trim()

  if (mode === 0) {
    encoding(key, password)
  } else {
    decoding(key, password)
  }
}

function encoding(key, password) {
  var result = shuffle(key, transform(password))
  document.getElementById("result").value = add_noise(Number(key), result)
}

function decoding(key, str) {
  var str_list = str.split('')
  var amount = random_table[key % random_table.length] % 5 + 1
  for (let i = amount - 1; i >= 0; --i) {
    str_list.splice(random_table[(key + i) % random_table.length] % (str_list.length), 1)
  }
  var loop = key % 10 + str_list.length * 3
  for (let i = loop - 1; i >= 0; --i) {
    let p1 = random_table[key % random_table.length] % str_list.length
    let p2 = random_table[(key + i + 3) % random_table.length] % str_list.length
    let temp = str_list[p1]
    str_list[p1] = str_list[p2]
    str_list[p2] = temp
  }

  document.getElementById("result").value = transform(str_list.join(""),1)
}

function transform(password, inverse = 0) {
  var result = ""
  var trans_function = {}
  if (inverse) { trans_function = inverse_dict }
  else { trans_function = dict }
  for (let i = 0; i < password.length; ++i) {
    result += trans_function[password[i]]
  }
  return result
}

function shuffle(key, str) {
  var str_list = str.split('')
  var loop = key % 10 + str.length * 3
  for (let i = 0; i < loop; ++i) {
    let p1 = random_table[key % random_table.length] % str.length
    let p2 = random_table[(key + i + 3) % random_table.length] % str.length
    let temp = str_list[p1]
    str_list[p1] = str_list[p2]
    str_list[p2] = temp
  }
  return str_list
}

function add_noise(key, str) {

  var amount = random_table[key % random_table.length] % 5 + 1
  for (let i = 0; i < amount; ++i) {
    str.splice(random_table[(key + i) % random_table.length] % (str.length + 1), 0, dict[str[i % str.length]])
  }
  return str.join("")
}

function getRandom(x) {
  return Math.floor(Math.random() * x)
}

document.getElementById("send").addEventListener('click',()=>{
    if(document.getElementById("key").value.trim()!=""&&
        document.getElementById("password").value.trim()!=""){
        processFormData();
    }
    else{
        alert(`Input or key can't be blank!`);
    }
});
