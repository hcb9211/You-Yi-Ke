/*! Improved jQuery.cookie plugin by @mathias: http://mths.be/cookie */
(function(a,b){b.cookie=function(g,h,f){var c="",e,d;if(typeof h!="undefined"){f||(f={});if(!h){h="";f.expires=-1}if(f.expires&&(typeof f.expires=="number"||f.expires.toUTCString)){e=new Date;if(typeof f.expires=="number"){e.setTime(+new Date()+(f.expires*86400000))}else{e=f.expires}c="; expires="+e.toUTCString()}a.cookie=[g,"=",encodeURIComponent(h),c,f.path?"; path="+f.path:"",f.domain?"; domain="+f.domain:"",f.secure?"; secure":""].join("")}else{d=a.cookie.match(new RegExp("(?:^|;)\\s?"+g.replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")+"=(.*?)(?:;|$)","i"));return d&&unescape(d[1])}}}(document,jQuery));

var Utils={};
Utils.Format=function(){
	if(arguments.length==0)return '';
	var s=arguments[0];
	for(var i=1;i<arguments.length;i++){
		var r=new RegExp('\\{'+(i-1)+'\\}','gm');
		s=s.replace(r,arguments[i]);
	};
	return s;
};
Utils.IsValidEmail=function(s){
	var EMAIL_REGEX=/((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?/;	/* http://projects.scottsplayground.com/email_address_validation/ */
	return Boolean(s.match(EMAIL_REGEX));
};
Utils.DateFormat=function(dt,fm){
	var i_format=0,result='',c='',token='';
	var y=dt.getFullYear()+'',M=dt.getMonth()+1,d=dt.getDate();
	var va={};
	va['y']=va['yy']=va['yyyy']=y;
	va['M']=M;
	va['d']=d;
	va['MM']=(M >= 10) ? M:'0'+M;
	va['dd']=(d >= 10) ? d:'0'+d;
	while(i_format < fm.length){
		c=fm.charAt(i_format);
		token='';
		while((fm.charAt(i_format) == c) && (i_format < fm.length)){
			token += fm.charAt(i_format++);
		};
		if(va[token] != null){ 
			result += va[token]; 
		}else{
			result += token; 
		};
	};
	return result;
};
Utils.GetDate=function(ss,fm){
	var dtYear, dtMonth, dtDate;
	var delims = ['/', '-', '.', ' '];
	var delim = '/';
	for(var i=0; i<delims.length; i++){
		if(fm.indexOf(delims[i]) >= 0){
			delim = delims[i];
			break;
		};
	};
	var dts = ss.split(delim);
	var fms = fm.split(delim);

	try{
		if(dts.length != 3 || fms.length != 3){
			throw 'length';
		};
		if(Utils.ArrayFind(fms, 'yyyy') >= 0){
			dtYear = dts[Utils.ArrayFind(fms, 'yyyy')]
		}else if (Utils.ArrayFind(fms,'yy') >= 0){
			dtYear = '20' + dts[Utils.ArrayFind(fms, 'yy')]
		}else if (Utils.ArrayFind('y') >= 0){
			dtYear = '20' + dts[Utils.ArrayFind(fms, 'y')]
		}else{
			throw 'year';
		};
		if(Utils.ArrayFind(fms, 'MM') >= 0){
			dtMonth = Number(dts[Utils.ArrayFind(fms, 'MM')]) - 1;
		}else if (Utils.ArrayFind(fms, 'M') >= 0){
			dtMonth = Number(dts[Utils.ArrayFind(fms, 'M')]) - 1;
		}else{
			throw 'month';
		};
		if(Utils.ArrayFind(fms, 'dd') >= 0){
			dtDate = dts[Utils.ArrayFind(fms, 'dd')]
		}else if (Utils.ArrayFind(fms, 'd') >= 0){
			dtDate = dts[Utils.ArrayFind(fms, 'd')]
		}else {
			throw 'day';
		};
		return new Date(dtYear, dtMonth, dtDate);
	}catch(err){
		var tmp = new Date();
		tmp.setDate(tmp.getDate()+1);
		return tmp;
	};
};
Utils.DateAdd=function(d,i){
	var dt=new Date(d.getTime());
	dt.setDate(dt.getDate()+i);
	return dt;
};
Utils.DateDiff=function(d1,d2){
	return Math.round((d2-d1)/86400000);
};
Utils.MonthAdd=function(dt,mos){
	return new Date(dt.getFullYear(),dt.getMonth()+mos,1);
};
Utils.MonthDiff=function(dt1,dt2){
	return Number(12*(dt2.getFullYear()-dt1.getFullYear())+(dt2.getMonth()-dt1.getMonth()));
};
Utils.GetIndexFromY2K=function(dt){
	var Y2K=new Date(2000,0,1);
	return Math.round((dt-Y2K)/86400000);
};
Utils.GetDateFromY2K=function(ix){
	return new Date(2000,0,1+ix);
};
Utils.GetIndex=function(s){
	var tmp=s.split('/');
	if(tmp.length==3){
		var dt = new Date(Number(tmp[2]),Number(tmp[0])-1,Number(tmp[1]));
		return this.GetIndexFromY2K(dt);
	};
	return -1;
};
Utils.ToMMMMYYYY=function(dt,langID){
	var mos=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
	if(langID=='7'){
		return dt.getFullYear()+'年'+(dt.getMonth()+1)+'月';
	}else if(langID=='9'){
		return dt.getFullYear()+'年'+(dt.getMonth()+1)+'月';
	}else if(langID=='2'){
		mos=['JANVIER','FÉVRIER','MARS','AVRIL','MAI','JUIN','JUILLET','AOÛT','SEPTEMBRE','OCTOBRE','NOVEMBRE','DÉCEMBRE']
	}else if(langID=='3'){
		mos=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
	}else if(langID=='11'){
		mos=['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO','JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO']
	};
	return mos[dt.getMonth()]+' '+dt.getFullYear();
};
Utils.ToCust2=function(ix){
	var dt = this.GetDateFromY2K(ix);
	var tmp=['SUN','MON','TUE','WED','THU','FRI','SAT'];
	var mos=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
	return  tmp[dt.getDay()]+' '+dt.getDate()+', '+mos[dt.getMonth()]+' '+dt.getFullYear();
};
Utils.GetWsRndAmt=function(curr,a){
	return curr+Math.round(a/100);
};
Utils.GetRndAmt=function(curr,amt){
	var sym=curr;
	if(curr=='USD')sym='$';
	else if(curr=='EUR')sym='€';
	else if(curr=='GBP')sym='£';
	else if(curr=='CNY')sym='¥';
	else if(curr=='JPY')sym='¥';
	return sym+Math.round(amt);
};

Utils.ArrayFind=function(aaa, tmp){
	for(var i=0; i<aaa.length; i++)if (tmp==aaa[i]) return i;
	return -1;
};
Utils.ToNumberFormat=function(amt,curr){
	amt=Math.round(amt*100)/100;
	var ss=amt.toString();
	var la=ss.indexOf('.')+1;
	var lb=ss.length;
	var df=lb-la;
	if(la==0){
		ss+='.00';
	}else if(df==0){
		ss+='00';
	}else if(df==1){
		ss+='0';
	}else if(df>2){
		ss=ss.substr(0,la+2);
	};
	var aTemp=ss.split('.');
	if(aTemp.length==1||curr=='JPY')return aTemp[0];
	return aTemp[0]+'.'+aTemp[1];
};
Utils.GetAmount=function(amt,curr){
	var sym=curr;
	if(curr=='USD')sym='$';
	else if(curr=='EUR')sym='€';
	else if(curr=='GBP')sym='£';
	else if(curr=='CNY')sym='¥';
	else if(curr=='JPY')sym='¥';
	if(amt>=0){
		if(sym.length==1){
			return sym+this.ToNumberFormat(amt,curr);
		}else{
			return sym+' '+this.ToNumberFormat(amt,curr);
		};
	}else{
		return '-'+sym+this.ToNumberFormat(Math.abs(amt),curr);
	};
};
Utils.GetParam=function(paramName){
	var val;
	var params = window.location.search.substring(1).split('&');
	for(var i=0;i<params.length;i++){
		val = params[i].split('=');
		if(val[0]==paramName){
			return decodeURIComponent(val[1]);
		};
	};
	return null;
};
Utils.CheckSum=function(s){
	var sum=0,cnt=0,n=s.length;
	while(n>=1){
		cnt++;n--;
		if(cnt%2>0){
			sum+=parseInt(s.charAt(n));
		}else if(2*parseInt(s.charAt(n))>9){
			sum+=((2*parseInt(s.charAt(n)))-9);
		}else{
			sum+=(2*parseInt(s.charAt(n)));
		};
	};
	return (sum%10==0);
};
Utils.GetCardID=function(s){
	var len=s.length;
	if (len<12)return 0;
	var first1=parseInt(s.charAt(0));
	var first2=parseInt(s.substring(0,2));
	var first3=parseInt(s.substring(0,3));
	var first4=parseInt(s.substring(0,4));
	var first6=parseInt(s.substring(0,6));
	if(this.CheckSum(s)){
		if((len==16||len==13)&&first1==4){
			return 145;
		}else if(len==16&&(first2>=51&&first2<=55)){
			return 92;
		}else if(len==15&&(first2==34||first2==37)){
			return 15;
		}else if(len==16&&(first4==6011||first2==65||(first6>=622126&&first6<=622925)||(first3>=644&&first3<=649))){
			return 63;
		}else if(len==14&&(first3>=300&&first3<=305)){
			return 44;
		}else if((len==14&&first2==36)||(len==16&&(first2==55||first2==54))){
			return 62;
		}else if(len==16&&(first4>=3528&&first4<=3589)){
			return 83;
		}else if((len>=16&&len<=19)&&(first2==62)){
			return 149;
		};
	}else{
		if((len>=16&&len<=19)&&(first2==62)){
			return 149;
		};
	};
	return 0;
};
Utils.CardType=function(cardID){
	if(cardID==145){
		return 'Visa';
	}else if(cardID==92){
		return 'Mastercard';
	}else if(cardID==15){
		return 'American Express';
	}else if(cardID==63){
		return 'Discover';
	}else if(cardID==44){
		return 'Carte Blanche';
	}else if(cardID==62){
		return 'Diners Club';
	}else if(cardID==83){
		return 'JCB';
	}else if(cardID==149){
		return 'Union Pay';
	};
	return '';
};

Utils.ToMMMD=function(dt,langID){
	var mos=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	if(langID==1){
		return mos[dt.getMonth()]+' '+dt.getDate();
	}else if(langID==7){
		return dt.getFullYear()+'年'+(dt.getMonth()+1)+'月'+dt.getDate()+'日';
	}else if(langID==9){
		return dt.getFullYear()+'年'+(dt.getMonth()+1)+'月'+dt.getDate()+'日';
	}else if(langID==2){
		mos=['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc']
	}else if(langID==3){
		mos=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
	}else if(langID==11){
		mos=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
	};
	return dt.getDate() + ' ' + mos[dt.getMonth()];
};
Utils.ToCustom1=function(ix1,nights,langID){
	var ix2=ix1+nights;
	var dt1=Utils.GetDateFromY2K(ix1);
	var dt2=Utils.GetDateFromY2K(ix2);
	var wkd=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	if(langID==7||langID==10||langID==9){
		wkd=['日', '一', '二', '三', '四', '五', '六'];
	}else if(langID==2||langID==3){
		wkd=['D','L','M','M','J','V','S'];
	}else if(langID==11){
		wkd=['S','M','D','M','D','F','S'];
	};
	if(ix1==ix2){
		return wkd[dt1.getDay()] + ', ' + Utils.ToMMMD(dt1,langID);
	};
	return wkd[dt1.getDay()] + ', ' + Utils.ToMMMD(dt1,langID) + ' - ' + wkd[dt2.getDay()] + ', ' + Utils.ToMMMD(dt2,langID);
};
Utils.ToCustom2=function(ix1,nights,langID){
	var ix2=ix1+nights;
	var dt1=Utils.GetDateFromY2K(ix1);
	var dt2=Utils.GetDateFromY2K(ix2);
	var wkd=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	if(langID==7||langID==10||langID==9){
		wkd=['日', '一', '二', '三', '四', '五', '六'];
	}else if(langID==2||langID==3){
		wkd=['D','L','M','M','J','V','S'];
	}else if(langID==11){
		wkd=['S','M','D','M','D','F','S'];
	};
	if(ix1==ix2){
		return wkd[dt1.getDay()] + ', ' + Utils.ToMMMD(dt1,langID);
	};

	var SNIGHT=' night';
	if(nights>1)SNIGHT=' nights';
	switch(langID){
		case 2:
			SNIGHT=' nuit';
			break;
		case 3:
			SNIGHT=' noche';
			break;
		case 4:
			SNIGHT=' Nacht';
			break;
		case 5:
			SNIGHT=' notti';
			break;
		case 7:
		case 9:
		case 10:
			SNIGHT='夜';
			break;
		case 8:
			SNIGHT=' ночь';
			break;
		case 11:
			SNIGHT=' noite';
			break;
	}

	return wkd[dt1.getDay()] + ', ' + Utils.ToMMMD(dt1,langID) + ' - ' + wkd[dt2.getDay()] + ', ' + Utils.ToMMMD(dt2,langID) + ', ' + nights + SNIGHT;
};
