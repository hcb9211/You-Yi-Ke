(function($){
$.fn.wsform=function(options){
	if(!this.length)return;
	var defaults = {hotelID:1002, langID:1, enviro:'UAT'};
	var opts = $.extend(defaults, options);
	var zzz=0;
	if(opts.enviro!='PRD')opts.enviro='UAT';
	return this.each(function(){
		if(zzz++>=1)return;
		var dv=$(this);
		dv.css('position','relative');
		dv.append('<div class="cnWsItin"><span class="spWsDates"><span class="buWsDates"></span><b class="ws-icon icnWsDates" data-icon="&#xf073;"></b></span><span class="spWsOccupancy"><span class="buWsOccupancy"></span></span><span class="spWsRate"><input type="text" class="txWsRate" /></span><span class="spWsSubmit"><input type="button" class="buWsSubmit" value="SEARCH" /></span></div>');
		dv.append('<div class="cnWsCal"><div class="dvWsCalendar"><div class="cnWsCalMonths"><div class="dvWsCalMonths"></div></div></div><div class="calprev"><a href="#"><b class="ws-icon" data-icon="&#xe001;"><span>Prev</span></b></a></div><div class="calnext"><a href="#"><b class="ws-icon" data-icon="&#xe004;"><span>Next</span></b></a></div><div class="dvWsClear"><a class="buWsClear" href="#">Clear Dates</a></div></div>');
		dv.append('<div class="cnWsOcc"><div class="dvWsOcc"><div class="dvWsOccRooms"><label class="lbWsRooms">Rooms</label><div class="cbWsRooms"></div></div><div class="dvWsOccAdults"><label class="lbWsAdults">Adults/Room</label><div class="cbWsAdults"></div></div><div class="dvWsOccChildren"><label class="lbWsChildren">Children</label><div class="cbWsChildren"></div></div></div></div>');
		WsMulti.Init(opts.langID);
		var itn=new WsItinerary(dv, opts.hotelID, opts.langID, opts.enviro);
		var cal=new WsCalendar(dv, opts.hotelID, opts.langID, opts.enviro);
		var occ=new WsOccupancy(dv, opts.hotelID, opts.langID);

		dv.on('Alert',function(e,msg){
			if(opts.onAlert!==undefined){
				opts.onAlert(msg);
			}else{
				itn.Go();
			}
		});
		$(document).mouseup(function(e){
			if($(e.target).parents('.cnWsCal').length==0&&$(e.target).parents('.spWsDates').length==0)cal.Hide();
			if($(e.target).parents('.cnWsOcc').length==0&&$(e.target).parents('.buWsOccupancy').length==0)occ.Hide();
		});
	});
};
function WsItinerary(cn,h,l,env){
	var _cn=cn;
	var _hid=h;
	var _lid=l;
	var _env=env;
	_txRates=_cn.find('.txWsRate').filter(':first');
	_buSubmit=_cn.find('.buWsSubmit').filter(':first');
	_txRates.attr('placeholder',WsMulti['RateCorpPromo']);
	_buSubmit.val(WsMulti['Search'].toUpperCase());
	_buSubmit.click(function(){
		var cal=_cn.data('MyCal');
		var occ=_cn.data('MyOcc');
		var dt=Utils.ToLocale(cal.GetArrival(),_lid);
		var nights=cal.GetNights();
		if(nights<=0){
			_cn.trigger('Alert',[WsMulti['SelectDates']]);
			return false;
		};
		var surl=Utils.Format('https://uat.windsurfercrs.com/ibe/index.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}', _hid,_lid,dt,nights,occ.GetQuery());
		if(_env=='PRD'){
			surl=Utils.Format('https://res.windsurfercrs.com/ibe/index.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}', _hid,_lid,dt,nights,occ.GetQuery());
		};
		if(_txRates.val().length>0){
			surl+='&corp='+_txRates.val()
		};
		location.href=surl;
		return false;
	});
	this.Go=function(){
		var cal=_cn.data('MyCal');
		var occ=_cn.data('MyOcc');
		var dt=Utils.ToLocale(cal.GetArrival(),_lid);
		var nights=cal.GetNights();
		var surl=Utils.Format('https://uat.windsurfercrs.com/ibe/index.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}', _hid,_lid,dt,nights,occ.GetQuery());
		if(_env=='PRD'){
			surl=Utils.Format('https://res.windsurfercrs.com/ibe/index.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}', _hid,_lid,dt,nights,occ.GetQuery());
		};
		if(_txRates.val().length>0){
			surl+='&corp='+_txRates.val()
		};
		location.href=surl;
	};
}
function WsOccupancy(cn,h,l){
	cn.data('MyOcc',this);
	var me=this;
	var _cn=cn;
	var _dv=null;
	var _hid=h;
	var _lid=l;
	var _rooms=1,_adults=1,_children=0;
	var _setHtml=function(){
		_dv=_cn.find('.cnWsOcc').filter(':first');
		_cbRooms=_cn.find('.cbWsRooms').filter(':first');
		_cbAdults=_cn.find('.cbWsAdults').filter(':first');
		_cbChildren=_cn.find('.cbWsChildren').filter(':first');
		_buOccupancy=_cn.find('.buWsOccupancy').filter(':first');
		_cn.find('.lbWsRooms').html(WsMulti['Rooms'].toUpperCase());
		_cn.find('.lbWsAdults').html(WsMulti['AdultsPerRoom'].toUpperCase());
		_cn.find('.lbWsChildren').html(WsMulti['Children'].toUpperCase());
		
		var sss='<span class="selected">1</span>';
		for(var i=2;i<=4;i++){
			sss += Utils.Format('<span>{0}</span>', i);
		};
		_cbRooms.append(sss);
		_cbAdults.append(sss);

		sss='<span class="selected">0</span>';
		for(i=1;i<=4;i++){
			sss += Utils.Format('<span>{0}</span>', i);
		};
		_cbChildren.append(sss);
		_showOccupancy();
		
		_buOccupancy.click(function(){
			me.Show();return false;
		});
		_cbRooms.find('span').click(function(){
			if($(this).hasClass('selected')==true)return;
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');
			_rooms=Number($(this).html());
			_showOccupancy();
		});
		_cbAdults.find('span').click(function(){
			if($(this).hasClass('selected')==true)return;
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');
			_adults=Number($(this).html());
			_showOccupancy();
		});
		_cbChildren.find('span').click(function(){
			if($(this).hasClass('selected')==true)return;
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');
			_children=Number($(this).html());
			_showOccupancy();
		});
	};
	var _showOccupancy=function(){
		var sss=_adults + ' ' + WsMulti['Adults'];
		if(_adults==1)sss='1 ' + WsMulti['Adult'];
		if(_children>0){
			if(_children==1){
				sss += ', 1 ' + WsMulti['Child'];
			}else{
				sss += ', ' + _children + ' ' + WsMulti['Children'];
			};
		};
		if(_rooms>1){
			sss = _rooms + ' ' + WsMulti['Rooms'] + ', ' + sss;
		};
		_buOccupancy.html(sss);
	};
	this.GetQuery=function(){
		return '&rooms=' + _rooms + '&adults=' + _adults + '&children=' + _children;
	};
	this.Hide=function(){
		if(_dv!=null)_dv.hide();
	};
	this.Show=function(){
		_dv.show();
	};
	_setHtml();
};
function WsCalendar(cn,h,l,env){
	cn.data('MyCal',this);
	var me=this;
	var _cn=cn;
	var _hid=h;
	var _lid=l;
	var _env=env;
	var _init=false,_ix=0,MOS=10,_dv=null,_tgt,_buDates,_buPrev,_buNext,_ix1=-1,_ix2=-1,_nights=0,_dts=[],_daily=[],_rts=[],_curr='$';

	_buDates=_cn.find('.buWsDates').filter(':first').html(WsMulti['SelectDates']);
	_buDates.click(function(){
		me.Show();
		return false;
	});
	_cn.find('.icnWsDates').filter(':first').click(function(){
		_buDates.click();
	});

	var _today=new Date();
	_today=new Date(_today.getFullYear(),_today.getMonth(),_today.getDate());
	var DTTODAY=Utils.DateFormat(_today,'M/d/yyyy');
	var IXTODAY=Utils.GetIndexFromY2K(_today);
	var IXFIRST=Utils.GetIndexFromY2K(new Date(_today.getFullYear(),_today.getMonth(),1));
	var IXLAST=Utils.GetIndexFromY2K(new Date(_today.getFullYear(),_today.getMonth()+12,0));

	for(var i=IXTODAY;i<=IXLAST;i++)_daily[i]=0;
	var _getDaily=function(){
		var surl='https://uat.windsurfercrs.com/bbe/xml/getratecalendar.aspx?hotelID='+_hid+'&dt1='+DTTODAY+'&ix='+_ix;
		if(_env=='PRD'){
			surl='https://res.windsurfercrs.com/bbe/xml/getratecalendar.aspx?hotelID='+_hid+'&dt1='+DTTODAY+'&ix='+_ix;
		};
		$.ajax({url:surl,dataType:'jsonp',jsonpCallback:'cbSetDaily',
			success:function(d){_setDaily(d)},
			error:function(){}
		});
	};
	var _setDaily=function(d){
		var rates,tmpRt;
		var idx=Number(d.Ix1);
		for(var i=idx;i<(idx+62);i++){
			_daily[i]=0;
		};
		for(i=0;i<d.RoomTypes.length;i++){
			rates=d.RoomTypes[i].Rates.split(',');
			for(var j=0;j<=rates.length;j++){
				tmpRt=Number(rates[j]);
				if(tmpRt>9 && (_daily[j+idx]==0 || tmpRt<_daily[j+idx])){
					_daily[j+idx] = tmpRt;
				};
			};
		};
		if(d.CSymbol!=null)_curr=d.CSymbol;
		for(i=idx;i<(idx+62);i++){
			if(_daily[i]>0){
				_rts[i].html(Utils.GetWsRndAmt(_curr,_daily[i]));
			}else{
				_rts[i].html('');
			};
		};
	};
	var _setHtml=function(){
		var tmp,html='';
		_dv=_cn.find('.cnWsCal').filter(':first');
		_tgt=_cn.find('.dvWsCalMonths').filter(':first');
		_buPrev=_cn.find('.calprev a').filter(':first');
		_buNext=_cn.find('.calnext a').filter(':first');
		_buPrev.click(function(){if(_ix > 0){_ix--;_repos();};return false;});
		_buNext.click(function(){if(_ix < MOS){_ix++;_repos();};return false;});
		_cn.find('.buWsClear').html(WsMulti['ClearDates']).click(function(){_resetDates();return false;});

		_ix=Utils.MonthDiff(_today,Utils.GetDateFromY2K(_ix1));
		if(_ix<0)_ix=0;
		if(_ix>MOS)_ix=MOS;

		for(var i=0;i<12;i++){
			tmp=new WsMonth(_today,i,_lid);
			html+=tmp.GetHtml();
		};
		_tgt.append(html);

		for(i=IXFIRST;i<IXTODAY;i++){
			_dts[i]=$('#dv_'+i);
			_dts[i].addClass('blocked');
		};
		for(i=IXTODAY;i<=IXLAST;i++){
			_dts[i]=$('#dv_'+i);
			_dts[i].addClass('pointer');
			_dts[i].click(function(){_setDates(Number($(this).attr('ref')));return false;});
			_rts[i]=$('#dv_'+i+' span');
		};
		_dts[IXTODAY].addClass('today');
	};
	var _setDates=function(xx){
		if(_ix1<=0){
			_ix1=_ix2=xx;
		}else if(xx==_ix1){
			if(_ix1==_ix2){
				_ix1=_ix2=-1;
			}else{
				_ix1++;
			};
		}else if(xx==_ix2){
			_ix2--;
		}else if(xx<_ix1){
			_ix1=xx;
		}else if(xx>_ix2){
			_ix2=xx;
		}else{
			if(xx-_ix1>_ix2-xx){
				_ix2=xx;
			}else{
				_ix1=xx;
			};
		};
		_nights=_ix2-_ix1;
		_update();
	};
	var _resetDates=function(){
		_ix1=_ix2=_nights=0;
		_update();
	};
	var _repos=function(){
		if (_ix <= 0){_buPrev.css({visibility:'hidden'});}else{_buPrev.css({visibility:'visible'});};
		if (_ix >= MOS){_buNext.css({visibility:'hidden'});}else{_buNext.css({visibility:'visible'});}
		var posX = -308*_ix;
		_tgt.animate({left:posX},500);
		_getDaily();
	};
	var _update=function(){
		for(var i=IXTODAY;i<=IXLAST;i++){_dts[i].removeClass('dtSelected dtCheckout');};
		if(_ix1>0){
			for(i=_ix1;i<_ix2;i++)_dts[i].addClass('dtSelected');
			if(_nights>0){
				_dts[_ix2].addClass('dtCheckout');
			}else{
				_dts[_ix1].addClass('dtSelected');
			};
			_buDates.html(Utils.ToCustom(_ix1, _ix2, _lid));
		}else{
			_buDates.html(WsMulti['SelectDates']);
		}
	};
	this.GetArrival=function(){
		return _ix1;
	};
	this.GetNights=function(){
		return _nights;
	};
	this.Hide=function(){
		if(_dv!=null)_dv.hide();
	};
	this.Show=function(){
		if(_init==false){
			_setHtml();
			_update();
			_repos();
			_init=true;
		};
		_dv.show();
	};
};
function WsMonth(today,id,langID){
	var _dt=Utils.MonthAdd(today,id);
	var _ix=Utils.GetIndexFromY2K(_dt);
	var _dts=[];
	this.GetHtml=function(){
		var offset=_dt.getDay()+1;
		var dtNext=Utils.MonthAdd(_dt,1);
		var last=Math.round(offset+((dtNext-_dt)/86400000)-1);
		var slots=Math.ceil(last/7)*7;
		var html=Utils.Format('<div id="dvMonth_{0}" class="calMonth">',id);
		html+=Utils.Format('<div class="calHead">{0}</div>',Utils.ToMMMMYYYY(_dt,langID));
		if(langID==7){
			html+='<div class="calDay"><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div><div>日</div></div><div class="calDays">';
		}else if(langID==9){
			html+='<div class="calDay"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div><div class="calDays">';
		}else if(langID==2||langID==3){
			html+='<div class="calDay"><div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div><div>D</div></div><div class="calDays">';
		}else if(langID==11){
			html+='<div class="calDay"><div>S</div><div>M</div><div>D</div><div>M</div><div>D</div><div>F</div><div>S</div></div><div class="calDays">';
		}else if(langID==6){
			html+='<div class="calDay"><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div></div><div class="calDays">';
		}else{
			html+='<div class="calDay"><div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div></div><div class="calDays">';
		};
		if(langID!=1&&langID!=9&&langID!=11){
			offset=_dt.getDay();
			if(offset==0)offset=7;
			last=Math.round(offset+((dtNext-_dt)/86400000)-1);
			slots=Math.ceil(last/7)*7;
		};
		for(var i=1,day=1;i<=slots;i++){
			if(i>=offset&&i<=last){
				var tmp=new WsDate(_ix++);
				_dts.push(tmp);
				html+=tmp.GetHtml();
				day++;
			}else{
				html+='<div>&nbsp;</div>';
			};
		};
		html+='</div></div>';
		return html;
	};
};
function WsDate(ix){
	var _ix=ix;
	var _dt=Utils.GetDateFromY2K(ix);
	this.GetHtml=function(){
		var html=Utils.Format('<div id="dv_{0}" ref="{0}">{1}<span></span></div>',_ix,_dt.getDate());
		return html;
	};
};
/**/
var WsMulti={};
WsMulti.Init=function(lid){
	this.Rooms='rooms';
	this.Adult='adult';
	this.Adults='adults';
	this.AdultsPerRoom='adults/room';
	this.Child='child';
	this.Children='children';
	this.SelectDates='Select the dates of your stay';
	this.RateCorpPromo='Corp/Promo Code';
	this.Search='Check Availability';
	this.ClearDates='Clear Dates';
	if(lid==7){
		this.Rooms='客房';
		this.Adult='成人';
		this.Adults='成人';
		this.AdultsPerRoom='成人/房';
		this.Child='孩子';
		this.Children='孩子';
		this.SelectDates='选择您的住宿日期';
		this.RateCorpPromo='优惠/合作代码';
		this.Search='查看客房供应';
		this.ClearDates='重设日期';
	};
};
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
Utils.ToLocale=function(ix,langID){
	var dt=Utils.GetDateFromY2K(ix);
	if(langID==7||langID==10||langID==13){
		return Utils.DateFormat(dt,'yyyy-MM-dd');
	}else if(langID==1||langID==16){
		return Utils.DateFormat(dt,'M/d/yyyy');
	};
	return Utils.DateFormat(dt,'d/M/yyyy');
};
Utils.ToMMMMYYYY=function(dt,langID){
	var mos=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
	if(langID==7){
		return dt.getFullYear()+'年'+(dt.getMonth()+1)+'月';
	}else if(langID==9){
		return dt.getFullYear()+'年'+(dt.getMonth()+1)+'月';
	}else if(langID==2){
		mos=['JANVIER','FÉVRIER','MARS','AVRIL','MAI','JUIN','JUILLET','AOÛT','SEPTEMBRE','OCTOBRE','NOVEMBRE','DÉCEMBRE']
	}else if(langID==3){
		mos=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
	}else if(langID==11){
		mos=['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO','JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO']
	};
	return mos[dt.getMonth()]+' '+dt.getFullYear();
};
Utils.ToMMMD=function(dt,langID){
	var mos=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	if(langID==1){
		return mos[dt.getMonth()]+' '+dt.getDate();
	}else if(langID==7){
		return (dt.getMonth()+1)+'月'+dt.getDate()+'日';
	}else if(langID==9){
		return (dt.getMonth()+1)+'月'+dt.getDate()+'日';
	}else if(langID==2){
		mos=['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc']
	}else if(langID==3){
		mos=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
	}else if(langID==11){
		mos=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
	};
	return dt.getDate() + ' ' + mos[dt.getMonth()];
};
Utils.ToCustom=function(ix1,ix2,langID){
	var dt1=Utils.GetDateFromY2K(ix1);
	var dt2=Utils.GetDateFromY2K(ix2);
	var wkd=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	if(langID==7||langID==9){
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
Utils.GetWsRndAmt=function(curr,a){
	return curr+Math.round(a/100);
};

})(jQuery);
