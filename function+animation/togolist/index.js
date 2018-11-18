/**
 * Created by Administrator on 2016/6/2.
 */
var sub=document.querySelector("#sub");
var input=document.querySelector("#content");
var now=document.querySelector(".now ul");
var before=document.querySelector(".before ul");
var nownum=document.querySelector(".now .num");
var beforenum=document.querySelector(".before .num");
var clear=document.querySelector("#clear");


//网页加载获取localStorage本地存储的数据，获取数据之后要返回。不能处理undefined.返回空数组。或者有内容的数据。     获取数组之后要保存数据。保存为字符串的。
//获取本地存储的数据
function  getData() {
    //JSON.parse   接收字符串。转换为对象或数组。但是undefined是处理不了的；
    var data=JSON.parse(localStorage.getItem("todo"));
    return data||[];
}

//保存数据
function saveData(data) {
    //保存为字符串
    localStorage.setItem("todo",JSON.stringify(data));
}

//点击提交需要保存数据，之后重写数据
sub.onclick=function () {
    if(input.value==""){
        return;
    }
    var data=getData();
    //得到数据，然后给数组里面放数据；
    data.push({con:input.value,done:false});
    input.value="";
    saveData(data);
    reWrite();
}

//修改数据。之后需要保存
function changeData(index,content) {
    var data=getData();
    data[index].con=content;
    saveData(data);
}
//删除数据需要重写
function  delData(index) {
    var data=getData();
    data.splice(index,1);
    saveData(data);
    reWrite();
}

//修改状态。数据存放位置这个需要重写
function changeState(index) {
    var data=getData();
    data[index].done=!data[index].done;
    // if(data[index].done){
    //     data[index].done=false;
    // }else{
    //     data[index].done=true;
    // }
    saveData(data);
    reWrite()
}

function reWrite() {
    var data=getData();
    var str1="",str2="",num1=0,num2=0;
    data.forEach(function (value,index){
        //||value.done==false
       if(!value.done){
           str1+="<li><input type='checkbox' onfocus=changeState("+index+")><i>"+(index+1)+"</i><div contenteditable='true' onblur='changeData("+index+",this.innerHTML)' class='con'>"+value.con+"</div><span onclick='delData("+index+")'>删除</span></li>";
           num1++;
       }else{
           str2+="<li><input type='checkbox' onfocus=changeState("+index+")><i>"+(index+1)+"</i><div class='con'>"+value.con+"</div><span onclick='delData("+index+")'>删除</span></li>";
           num2++;
       }
    });


    now.innerHTML=str1;
    before.innerHTML=str2;
    nownum.innerHTML=num1;
    beforenum.innerHTML=num2;
}
clear.onclick=function () {
    var data=[];
    saveData(data);
    reWrite();
}

reWrite();