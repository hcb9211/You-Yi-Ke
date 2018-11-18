var tbody=document.querySelector("tbody");
var add=document.querySelector(".add");
// 添加
add.onclick=function(){
    var data=getData();
    data.push({name:"",sex:"",age:""})
    saveData(data);
    reWrite();
}
//  获取本地存储
function getData(){
    var data=JSON.parse(localStorage.getItem("table"));
    return data||[];
}
// 保存
function saveData(newdata){
    localStorage.setItem("table",JSON.stringify(newdata));
}
// 删除
function delData(index){
    var data=getData();
    data.splice(index,1);
    saveData(data);
    reWrite();
}
// 修改
function changeData(index,item,content){
    var data=getData();
    data[index][item]=content;
    saveData(data);
}
// 重写整个页面(对文档的操作)
function reWrite(){
    var data=getData();
    var str="";
    data.forEach(function(value,i){
        str+="<tr><td id=active>"+(i+1)+"</td><td contenteditable=true onblur=changeData("+i+",'name',this.innerHTML)>"+value.name+"</td><td contenteditable=true onblur=changeData("+i+",'sex',this.innerHTML)>"+value.sex+"</td><td contenteditable=true onblur=changeData("+i+",'age',this.innerHTML)>"+value.age+"</td><td  onclick=delData("+i+") style=color:red;'fontWeight:bold';cursor:pointer;>删除</td></tr>"
    })
    tbody.innerHTML=str;
}
reWrite();