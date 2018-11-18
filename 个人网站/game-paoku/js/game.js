/* 人物 */
function person(canvas,cobj,runimg,jumpimg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runimg=runimg;
    this.jumpimg=jumpimg;
    this.x=0;
    this.y=400;
    this.width=193;
    this.height=197;
    this.state="runimg";
    this.status=0;
    this.life=3;
}

person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.state],0,0,193,197,0,0,this.width,this.height);
        this.cobj.restore();
    }
}

/* 障碍物 */
function hinder(canvas,cobj,hinderimg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderimg=hinderimg;
    this.x=this.canvas.width-40;
    this.y=490;
    this.width=135;
    this.height=85;
    this.status=Math.floor(hinderimg.length*Math.random());
}
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderimg[this.status],0,0,135,85,0,0,this.width,this.height);
        this.cobj.restore();
    }   
}
/* 粒子 */
function lizi(canvas,cobj,x,y) {
    this.canvas=canvas;
    this.cobj=cobj;
    this.x=x;
    this.y=y;
    this.r=3+3*Math.random();
    this.time=2;
    this.speedx=3-6*Math.random();
    this.speedy=3-6*Math.random();
    // this.zhongli=0.3;
}
lizi.prototype={
    draw:function () {
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.beginPath();
        this.cobj.fillStyle="red";
        this.cobj.arc(0,0,this.r,0,2*Math.PI);
        this.cobj.fill();
        this.cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.y+=this.speedy
        this.time-=0.2;
        this.r-=0.2;
        // this.speedy+=this.zhongli;
    }
}

function xue(canvas,cobj,x,y){
    var num=10+parseInt(10*Math.random());
    var arr=[];
    for(var i=0;i<num;i++){
        arr.push(new lizi(canvas,cobj,x,y))
    }
    var t=setInterval(function () {
        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            arr[i].update();
            if(arr[i].time<0||arr[i].r<0){
                arr.splice(i,1);
            }
        }
    },50)
}


/* play方法 */
function play(canvas,cobj,runimg,jumpimg,hinderimg,life){
    this.person=new person(canvas,cobj,runimg,jumpimg,life);
    this.hinderimg=hinderimg;
    this.canvas=canvas;
    this.cobj=cobj;
    this.speed=15;
    this.backpos=0;
    this.hinderimgArr=[];
    this.score=0;
    this.juli=0;
    this.life=3;
}

play.prototype={
    play:function(){
        var that=this;
        var num=0;
        var num2=50;
        var step=3000+Math.floor(6*(Math.random()))*1000;
        var life=document.querySelector(".lifeText");
        life.innerHTML=3;
        var lifearr=[];
        for(var i=0;i<life.length;i++){
            lifearr.push(life[i]);
        }
        
        setInterval(function(){
            that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
            num++;
            num2+=50;
            //  人物
            if(that.person.state=="jumpimg"){
                that.person.status=0;
            }else{
                that.person.x+=that.speed;
                // that.person.status=num%8;
                //  人物在画布中的位置
                if(that.person.x>that.canvas.width/3){
                    that.person.x=that.canvas.width/3;

                }
            }
            that.person.draw();
            //  障碍物
            if(num2%step==0){
                step=3000+(Math.floor(Math.random()*6))*1000;
                num2=0;

                var hinderobj=new hinder(that.canvas,that.cobj,that.hinderimg);
                hinderobj.status=Math.floor(Math.random()*that.hinderimg.length);
                that.hinderimgArr.push(hinderobj);

                if(that.hinderimgArr.length>5){
                    that.hinderimgArr.shift();
                }
            }
            for(var i=0;i<that.hinderimgArr.length;i++){
                that.hinderimgArr[i].x-=that.speed;
                that.hinderimgArr[i].draw();
                if(hitPix(that.canvas,that.cobj,that.person,that.hinderimgArr[i])){
                if(!that.hinderimgArr[i].flag1){
                    that.person.life--;
                    lifearr.pop();
                    that.hinderimgArr[i].flag1=true;
                    life.innerHTML=that.person.life;
                    xue(that.canvas,that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2)
                }
                    if(that.person.life<1){
                        // alert(1);
                        location.reload();
                    }
                }
            }
            that.canvas.style.backgroundPositionX=(that.backpos-=that.speed)+"px";
        },50)
    },
    key:function() {
        var that = this;
        var flag = true;
        document.onkeydown = function (e) {
            if (e.keyCode == 32) {
                if (!flag) {
                    return;
                }
                that.person.state = "jumpimg";
                flag = false;
                var inita = 0;
                var speeda = 5;
                var r = 100;
                var inity = that.person.y;
                var zhongli = 0.3;
                var t = setInterval(function () {
                    inita += speeda;
                    that.person.y = inity - Math.sin(inita * Math.PI / 180) * r;  //   不太懂
                    if (inita > 180) {
                        clearInterval(t);
                        that.person.y = inity;
                        flag = true;
                        that.person.state = "jumpimg";
                        inity+=zhongli;
                    }
                }, 50)
            }
        }
    }
}
