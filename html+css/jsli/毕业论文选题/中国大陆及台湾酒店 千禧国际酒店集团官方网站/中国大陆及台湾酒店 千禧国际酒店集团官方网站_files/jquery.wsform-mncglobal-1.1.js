/*!
 * jquery.customSelect() - v0.3.3
 * http://adam.co/lab/jquery/customselect/
 * 2013-03-04
 *
 * Copyright 2013 Adam Coulombe
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License
 */
(function(a){a.fn.extend({customSelect:function(b){var c={customClass:null,mapClass:true,mapStyle:true},d=function(f,i){var e=f.find(":selected"),h=i.children(":first"),g=e.html()||"&nbsp;";h.html(g);setTimeout(function(){i.removeClass("customSelectOpen")},60)};if(typeof document.body.style.maxHeight==="undefined"){return this}b=a.extend(c,b);return this.each(function(){var e=a(this),g=a('<span class="customSelectInner" />'),f=a('<span class="customSelect" />');f.append(g);e.after(f);if(b.customClass){f.addClass(b.customClass)}if(b.mapClass){f.addClass(e.attr("class"))}if(b.mapStyle){f.attr("style",e.attr("style"))}e.addClass("hasCustomSelect").on("update",function(){d(e,f);var i=parseInt(e.outerWidth(),10)-(parseInt(f.outerWidth(),10)-parseInt(f.width(),10));f.css({display:"inline-block"});var h=f.outerHeight();if(e.attr("disabled")){f.addClass("customSelectDisabled")}else{f.removeClass("customSelectDisabled")}g.css({display:"inline-block"});e.css({"-webkit-appearance":"menulist-button",position:"absolute",opacity:0,fontSize:f.css("font-size")})}).on("change",function(){f.addClass("customSelectChanged");d(e,f)}).on("keyup",function(){e.blur();e.focus()}).on("mousedown",function(){f.removeClass("customSelectChanged").addClass("customSelectOpen")}).focus(function(){f.removeClass("customSelectChanged").addClass("customSelectFocus")}).blur(function(){f.removeClass("customSelectFocus customSelectOpen")}).hover(function(){f.addClass("customSelectHover")},function(){f.removeClass("customSelectHover")}).trigger("update")})}})})(jQuery);

jQuery.support.placeholder = (function(){
	var i = document.createElement('input');
	return 'placeholder' in i;
})();

(function($){
$.fn.comboMnc=function(options){
	if(!this.length)return;
	var defaults = {region:'global', hotelData:null, label:'Enter hotel name or destination', ph:'Destination'};
	var opts = $.extend(defaults, options);
	if(opts.hotelData==null){
		alert('There is no data.');
		return;
	};
	if(opts.region!='global'&&opts.region!='Asia'){
		var firstItem=null;
		for(var i=0;i<opts.hotelData.regions.length;i++){
			if(opts.hotelData.regions[i].name==opts.region){
				firstItem=opts.hotelData.regions.splice(i,1);
				break;
			};
		};
		if(firstItem!=null){
			opts.hotelData.regions.splice(0,0,firstItem[0]);
		};
	}
	return this.each(function(){
		var dv=$(this);
		var wrapper = $('<div></div>').appendTo(dv).addClass('chzn-container chzn-container-single').css('width','100%').attr('title','Choose Your Hotel');
		var anchor = $('<a/>').appendTo(wrapper).addClass('anWsDestination')
		.attr('href','javascript:void(0)').attr('tabindex','-1')
		.append('<label>&nbsp;</label><span>' + opts.label + '</span><div class="icnWsDestination"></div>')
		.click(function(){
			if(wrapper.hasClass('chzn-container-active')){
				wrapper.removeClass('chzn-container-active');
			}else{
				wrapper.addClass('chzn-container-active');
				input.focus().val('').keyup();
			};
			return false;
		});
		var myWidth=wrapper.width();
		var txAnchor=anchor.find('span').filter(':first');
		var cnDrop = $('<div></div>').appendTo(wrapper).addClass('chzn-drop').css('width',myWidth+'px');
		var cnSearch = $('<div></div>').appendTo(cnDrop).addClass('chzn-search');
		var input = $('<input/>').appendTo(cnSearch).keyup(function(){
			var term=$(this).val();
			if(term.length==0){
				liItems.css('display','block');
				grpItems.css('display','block');
				return;
			};
			
			var matcher = new RegExp(term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
			grpItems.css('display','none');
			liItems.each(function(){
				var text = $(this).html();
				var id = $(this).attr('ref');
				if (matcher.test(text)){
					$(this).css('display','block');
					$(this).prevAll('.level2').filter(':first').css('display','block');
				}else{
					$(this).css('display','none');
				}
			});
		});
		var reg,city,sss='';
		for(var i=0;i<opts.hotelData.regions.length;i++){
			reg=opts.hotelData.regions[i];
			sss+=Utils.Format('<li class="group-result level1">{0}</li>', reg.name);
			for(var j=0;j<reg.cities.length;j++){
				city=reg.cities[j];
				sss+=Utils.Format('<li class="group-result level2">{0}</li>', city.name);
				for(var k=0;k<city.hotels.length;k++){
					sss+=Utils.Format('<li class="active-result group-option" ref="{0}">{1}</li>', city.hotels[k].id, city.hotels[k].name);
				}
			};
		};
		var ulDrop = $('<ul></ul>').appendTo(cnDrop).addClass('chzn-results').html(sss);
		var grpItems=ulDrop.find('li.group-result').css('display','block');
		var liItems=ulDrop.find('li.group-option').click(function(){
			var tx=$(this).html();
			var id=$(this).attr('ref');
			txAnchor.html(tx);
			anchor.click();
			if(opts.onSelect!==undefined){
				opts.onSelect(id);
			}
		});

		$(document).bind('mouseup', function(e){
			if($(e.target).parents('.chzn-container').length==0)
				wrapper.removeClass('chzn-container-active');
		});
	});
};

$.wsformMncGlobal = {};
$.wsformMncGlobal.open=function($obj){
	$obj.find('a.chzn-single').filter(':first').click();
}
$.fn.wsformMncGlobal=function(options){
	if(!this.length)return;
	var defaults = {langID:1, enviro:'PRD', fade:true, getrate:true, fmFont:'', hotelData:null, region:'global'};
	var opts = $.extend(defaults, options);
	var zzz=0;
	if(opts.enviro!='UAT')opts.enviro='PRD';
	return this.each(function(){
		if(zzz++>=1)return;
		var dv=$(this);
		var lid=opts.langID;
		var enviro=opts.enviro;
		dv.css('position','relative');
		dv.addClass(Utils.Format('wsLang{0}',lid));
		if(lid!=14){
			dv.addClass('wsLtr');
		}else{
			dv.addClass('wsRtl');
		};
		dv.append('<div class="cnWsHotels"><span class="spWsHotels"></span><span class="spWsSubmit"><input type="button" class="buWsSubmit" value="SEARCH" /></span></div>');
		dv.append('<div class="cnWsItin"><span class="spWsCheckin"><a href="#" class="anWsCheckin"><label class="lbWsCheckin"></label><span class="buWsCheckin"></span><b class="ws-icon icnWsCheckin" data-icon="&#xf073;"></b></a></span><span class="spWsCheckout"><a href="#" class="anWsCheckout"><label class="lbWsCheckout"></label><span class="buWsCheckout"></span><b class="ws-icon icnWsCheckout" data-icon="&#xf073;"></b></a></span><span class="spWsOccupancy"><a href="#" class="anWsOccupancy"><label class="lbWsOccupancy"></label><span class="buWsOccupancy"></span><b class="ws-icon icnWsOccupancy" data-icon="&#xe600;"></b></a></span></div>');
		dv.append('<div class="cnWsPrompt"><a href="#" class="buWsPrompt"></span></a></div>');
		dv.append('<div class="cnWsCal"><div class="dvWsCalendar"><div class="hdWsCalendar">Please select a check-in date.</div><div class="cnWsCalMonths"><div class="dvWsCalMonths"></div></div></div><div class="calprev"><a href="#"><b class="ws-icon" data-icon="&#xe001;"><span>Prev</span></b></a></div><div class="calnext"><a href="#"><b class="ws-icon" data-icon="&#xe004;"><span>Next</span></b></a></div><div class="dvWsClear"><div class="dvWsDisclaimer"></div></div></div>');
		dv.append('<div class="cnWsOcc"><div class="dvWsOcc"><div class="dvWsOccRooms"><label class="lbWsRooms"></label><select class="custom cbWsRooms"></select></div><div class="dvWsOccAdults"><label class="lbWsAdults"></label><select class="custom cbWsAdults"></select></div><div class="dvWsOccChildren"><label class="lbWsChildren"></label><select class="custom cbWsChildren"></select></div><div class="dvWsOccChild2"><label class="lbWsChild2"></label><select class="custom cbWsChild2"></select></div><div class="dvWsOccChild3"><label class="lbWsChild3"></label><select class="custom cbWsChild3"></select></div><div class="dvWsOccChild4"><label class="lbWsChild4"></label><select class="custom cbWsChild4"></select></div></div></div>');
		dv.append('<div class="cnWsOpt"><div class="dvWsOpt"><div class="dvWsOptRate"><label class="lbWsRate"></label><input type="text" class="txWsRate" /></div><div class="dvWsOptGroup"><label class="lbWsGroup"></label><input type="text" class="txWsGroup" /></div><div class="dvWsOptIata"><label class="lbWsIata"></label><input type="text" class="txWsIata" /></div><p class="ws-close"><a href="#" class="buOptionsClose"><b class="ws-icon" data-icon="&#xf057;">&nbsp;</b></a></p></div></div>');
		WsMulti.Init(opts.langID);
		var itn=new WsItinerary(dv, opts.langID, opts.enviro, opts.fade, opts.hotelData, opts.region);
		var cal=new WsCalendar(dv, opts.langID, opts.enviro, opts.fade, opts.getrate);
		var occ=new WsOccupancy(dv, opts.langID, opts.fade);
		var opt=new WsOptions(dv, opts.langID, opts.fade);
		if(opts.fmFont.length>0){
			dv.find('input').css('font-family',opts.fmFont);
			dv.find('select').css('font-family',opts.fmFont);
		};
		dv.find('.custom').customSelect();
		
		dv.on('Alert',function(e,msg){
			if(opts.onAlert!==undefined){
				opts.onAlert(msg);
			}else{
				itn.Go();
			}
		});
		dv.on('DepartureSelected',function(e,msg){
			cal.Hide();
		});
		dv.on('HotelChange',function(e,hid){
			if(hid>0){
				occ.SetHotel(hid);
				opt.SetHotel(hid);
				cal.SetHotel(hid);
				var surl='https://uat.windsurfercrs.com/ibe/xml/getsettings.aspx?hotelID='+hid+'&langID='+lid;
				if(enviro=='PRD'){
					surl='https://reservations.millenniumhotels.com/ibe/xml/getsettings.aspx?hotelID='+hid+'&langID='+lid;
				};
				$.ajax({url:surl,dataType:'jsonp',jsonpCallback:'cbSettings',
					success:function(d){
						WsMulti.Set(d);
						occ.Reset(d);
						opt.Reset(d);
					},
					error:function(){}
				});
			}
		});
		$(document).bind('mouseup',function(e){
			if($(e.target).parents('.cnWsOpt').length==0)opt.Hide();
			if($(e.target).parents('.cnWsCal').length==0&&$(e.target).parents('.spWsCheckin').length==0&&$(e.target).parents('.spWsCheckout').length==0)cal.Hide();
			if($(e.target).parents('.cnWsOcc').length==0&&$(e.target).parents('.spWsOccupancy').length==0)occ.Hide();
		});
		if(opts.langID==14){
			dv.find('.chzn-container-single .chzn-search input').css('direction','rtl');
			dv.find('.chzn-container .chzn-results').css('direction','rtl');
			dv.find('div.chzn-container.chzn-container-single a').css({'text-align':'right', 'padding-right':'10px'});

			$('.spWsCheckin').css('padding-left','10px');
			$('.spWsOccupancy').css('padding-left','0');
			$('.cnWsItin .ws-icon').css({'left':'8px', 'right':'auto'});
			$('.cnWsItin label').css({'left':'auto', 'right':'6px'});
			$('.buWsCheckin,.buWsCheckout,.buWsOccupancy').css('padding','0 6px 0 28px');
			$('.dvWsOpt label,.dvWsOcc label').css('text-align','right');
			$('.buWsSubmit').css({'padding':'0 10px 0 20px', 'border-radius':'15px 0 0 15px', 'font-size':'14px'});
			$('.spWsSubmit').addClass('spWsSubmit14').css('padding', '0 10px 0 0');
			$('.dvWsOcc>div').css('text-align','right');
		};
	});
};
function WsItinerary(cn,l,env,fd,hotelData,region){
	var _cn=cn;
	var _hid=0;
	var _lid=l;
	var _env=env;
	var _fade=fd;
	var _dv=_cn.find('.cnWsItin').filter(':first');
	var _dvHotels=_cn.find('.cnWsHotels').filter(':first');
	var _spHotels=_dvHotels.find('.spWsHotels').filter(':first');
	var _buSubmit=_dvHotels.find('.buWsSubmit').filter(':first');
	_spHotels.comboMnc({
		hotelData:hotelData,
		region:region,
		label:WsMulti['EnterHotelDestination'],
		ph:WsMulti['Destination'],
		onSelect:function(hid){
			_hid=hid;
			if(hid>0){
				if(_fade){
					_dv.slideDown('fast');
				}else{
					_dv.show();
				};
				_cn.find('.cnWsPrompt').show();
			};
			_cn.trigger('HotelChange',[hid]);
		}
	});

	_buSubmit.val(WsMulti['Search'].toUpperCase());
	_buSubmit.click(function(){
		if(_hid<=0){
			_cn.trigger('Alert',[WsMulti['SelectHotel']]);
			return false;
		};
		var cal=_cn.data('MyCal');
		var occ=_cn.data('MyOcc');
		var opt=_cn.data('MyOpt');
		var dt=Utils.ToLocale(cal.GetArrival(),_lid);
		var nights=cal.GetNights();
		if(nights<=0){
			if(cal.GetArrival() > 0){
				nights=1;
			}else{
				_cn.trigger('Alert',[WsMulti['SelectDates']]);
				return false;
			};
		};
		var surl='';
		var groupCode=opt.GetGroup();
		if(_env=='PRD'){
			if(groupCode.length==0){
				surl=Utils.Format('https://reservations.millenniumhotels.com/ibe/index.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}{5}', _hid,_lid,dt,nights,occ.GetQuery(),opt.GetQuery());
			}else{
				surl=Utils.Format('https://reservations.millenniumhotels.com/ibe/details.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}{5}', _hid,_lid,dt,nights,occ.GetQuery(),opt.GetQuery());
			}
		}else{
			if(groupCode.length==0){
				surl=Utils.Format('https://uat.windsurfercrs.com/ibe/index.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}{5}', _hid,_lid,dt,nights,occ.GetQuery(),opt.GetQuery());
			}else{
				surl=Utils.Format('https://uat.windsurfercrs.com/ibe/details.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}{5}', _hid,_lid,dt,nights,occ.GetQuery(),opt.GetQuery());
			}
		};
		location.href=surl;
		return false;
	});
	this.Go=function(){
		var cal=_cn.data('MyCal');
		var occ=_cn.data('MyOcc');
		var opt=_cn.data('MyOpt');
		var dt=Utils.ToLocale(cal.GetArrival(),_lid);
		var nights=cal.GetNights();
		var surl='';
		var groupCode=opt.GetGroup();
		if(_env=='PRD'){
			if(groupCode.length==0){
				surl=Utils.Format('https://reservations.millenniumhotels.com/ibe/index.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}{5}', _hid,_lid,dt,nights,occ.GetQuery(),opt.GetQuery());
			}else{
				surl=Utils.Format('https://reservations.millenniumhotels.com/ibe/details.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}{5}', _hid,_lid,dt,nights,occ.GetQuery(),opt.GetQuery());
			}
		}else{
			if(groupCode.length==0){
				surl=Utils.Format('https://uat.windsurfercrs.com/ibe/index.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}{5}', _hid,_lid,dt,nights,occ.GetQuery(),opt.GetQuery());
			}else{
				surl=Utils.Format('https://uat.windsurfercrs.com/ibe/details.aspx?hotelid={0}&langid={1}&checkin={2}&nights={3}{4}{5}', _hid,_lid,dt,nights,occ.GetQuery(),opt.GetQuery());
			}
		};
		location.href=surl;
	};
}
function WsOccupancy(cn,l,fd){
	cn.data('MyOcc',this);
	var me=this;
	var _cn=cn;
	var _dv=null;
	var _hid=0;
	var _lid=l;
	var _fade=fd;
	var _lbOccupancy,_txOccupancy,_buOccupancy;
	var _cbRooms,_cbAdults,_cbChildren,_cbChild2,_cbChild3,_cbChild4;
	var _dvChild2,_dvChild3,_dvChild4;
	var _lbChildren,_lbChild2,_lbChild3,_lbChild4;
	var _rooms=1,_adults=1,_children=0,_child2=0,_child3=0,_child4=0;
	var _setHtml=function(){
		_dv=_cn.find('.cnWsOcc').filter(':first');

		_lbOccupancy=_cn.find('.lbWsOccupancy').filter(':first').html(WsMulti['Occupancy']);
		_txOccupancy=_cn.find('.buWsOccupancy').filter(':first');
		_buOccupancy=_cn.find('.spWsOccupancy').filter(':first');
		_cbRooms=_dv.find('.cbWsRooms').filter(':first');
		_cbAdults=_dv.find('.cbWsAdults').filter(':first');
		_cbChildren=_dv.find('.cbWsChildren').filter(':first');
		_cbChild2=_dv.find('.cbWsChild2').filter(':first');
		_cbChild3=_dv.find('.cbWsChild3').filter(':first');
		_cbChild4=_dv.find('.cbWsChild4').filter(':first');
		_dvChild2=_dv.find('.dvWsOccChild2').filter(':first');
		_dvChild3=_dv.find('.dvWsOccChild3').filter(':first');
		_dvChild4=_dv.find('.dvWsOccChild4').filter(':first');
		_dv.find('.lbWsRooms').html(WsMulti['Rooms']);
		_dv.find('.lbWsAdults').html(WsMulti['AdultsPerRoom']);
		_lbChildren=_dv.find('.lbWsChildren').html(WsMulti['ChildPerRoom']);
		_lbChild2=_dv.find('.lbWsChild2');
		_lbChild3=_dv.find('.lbWsChild3');
		_lbChild4=_dv.find('.lbWsChild4');
		
		var sss='<option value="1">1</option>';
		for(var i=2;i<=4;i++){
			sss += Utils.Format('<option value="{0}">{0}</option>', i);
		};
		_cbRooms.html(sss);

		sss='';
		for(i=1;i<=9;i++){
			sss += Utils.Format('<option value="{0}">{0}</option>', i);
		};
		_cbAdults.html(sss);

		sss='';
		for(i=0;i<=9;i++){
			sss += Utils.Format('<option value="{0}">{0}</option>', i);
		};
		_cbChildren.html(sss);
		_cbChild2.html(sss);
		_cbChild3.html(sss);
		_cbChild4.html(sss);
		_showOccupancy();
		
		_buOccupancy.click(function(){
			me.Toggle();return false;
		});
		_cbRooms.change(function(){
			_rooms=Number($(this).val());
			_showOccupancy();
		});
		_cbAdults.change(function(){
			_adults=Number($(this).val());
			_showOccupancy();
		});
		_cbChildren.change(function(){
			_children=Number($(this).val());
			_showOccupancy();
		});
		_cbChild2.change(function(){
			_child2=Number($(this).val());
			_showOccupancy();
		});
		_cbChild3.change(function(){
			_child3=Number($(this).val());
			_showOccupancy();
		});
		_cbChild4.change(function(){
			_child4=Number($(this).val());
			_showOccupancy();
		});
	};
	var _showOccupancy=function(){
		var sss=_adults + ' ' + WsMulti['Adults'];
		if(_adults==1)sss='1 ' + WsMulti['Adult'];
		
		var tmpCh=_children+_child2+_child3+_child4;
		if(tmpCh>0){
			if(tmpCh==1){
				sss += ', 1 ' + WsMulti['Child'];
			}else{
				sss += ', ' + tmpCh + ' ' + WsMulti['Children'];
			};
		};
		if(_rooms>1){
			sss = _rooms + ' ' + WsMulti['Rooms'] + ', ' + sss;
		};
		_txOccupancy.html(sss);
	};
	this.SetHotel=function(hid){
		_hid=hid;
	};
	this.Reset=function(sss){
		_dvChild2.css('display','none');
		_dvChild3.css('display','none');
		_dvChild4.css('display','none');
		_lbChildren.removeClass('wsShortLine');
		_lbChildren.html(WsMulti['ChildPerRoom']);
		_lbChild2.html(WsMulti['ChildPerRoom']);
		_lbChild3.html(WsMulti['ChildPerRoom']);
		_lbChild4.html(WsMulti['ChildPerRoom']);
		if(sss.ChildAgeGroups>=1&&WsMulti.ChildAge1.length>0){
			_lbChildren.html(WsMulti['ChildPerRoom']+'<br/>'+WsMulti.ChildAge1);
			_lbChildren.addClass('wsShortLine');
		};
		if(sss.ChildAgeGroups>=2&&WsMulti.ChildAge2.length>0){
			_dvChild2.css('display','inline-block');
			_lbChild2.html(WsMulti['ChildPerRoom']+'<br/>'+WsMulti.ChildAge2);
		};
		if(sss.ChildAgeGroups>=3&&WsMulti.ChildAge3.length>0){
			_dvChild3.css('display','inline-block');
			_lbChild3.html(WsMulti['ChildPerRoom']+'<br/>'+WsMulti.ChildAge3);
		};
		if(sss.ChildAgeGroups>=4&&WsMulti.ChildAge4.length>0){
			_dvChild4.css('display','inline-block');
			_lbChild4.html(WsMulti['ChildPerRoom']+'<br/>'+WsMulti.ChildAge4);
		};
	};
	this.GetQuery=function(){
		var ret='&rooms=' + _rooms + '&adults=' + _adults;
		if(_children>0)
			ret+='&children=' + _children;
		if(_child2>0)
			ret+='&child2=' + _child2;
		if(_child3>0)
			ret+='&child3=' + _child3;
		if(_child4>0)
			ret+='&child4=' + _child4;
		return ret;
	};
	this.Hide=function(){
		_buOccupancy.removeClass('ws-active')
		if(_dv!=null){
			if(_fade){
				_dv.slideUp('fast');
			}else{
				_dv.hide();
			}
		}
	};
	this.Toggle=function(){
		if(_dv.is(':visible')){
			_buOccupancy.removeClass('ws-active')
			if(_fade){
				_dv.slideUp('fast');
			}else{
				_dv.hide();
			}
		}else{
			_buOccupancy.addClass('ws-active')
			if(_fade){
				_dv.slideDown('fast');
			}else{
				_dv.show();
			}
		}
	};
	_setHtml();
};
function WsOptions(cn,l,fd){
	cn.data('MyOpt',this);
	var me=this;
	var _cn=cn;
	var _dv=null,_buPrompt,_buClose;
	var _dvRates,_dvGroup,_dvIata;
	var _txRates,_txGroup,_txIata;
	var _hid=0;
	var _lid=l;
	var _fade=fd;
	var _rates='',_group='',_iata='';
	var _setHtml=function(){
		_dv=_cn.find('.cnWsOpt').filter(':first');
		_buPrompt=_cn.find('.buWsPrompt').filter(':first');
		_buClose=_dv.find('.buOptionsClose').filter(':first');
		_dvRates=_dv.find('.dvWsOptRate').filter(':first');
		_dvGroup=_dv.find('.dvWsOptGroup').filter(':first');
		_dvIata=_dv.find('.dvWsOptIata').filter(':first');
		_txRates=_dv.find('.txWsRate').filter(':first');
		_txGroup=_dv.find('.txWsGroup').filter(':first');
		_txIata=_dv.find('.txWsIata').filter(':first');
		_dv.find('.lbWsRate').html(WsMulti['RateCorpPromo']);
		_dv.find('.lbWsGroup').html(WsMulti['Group']);
		_dv.find('.lbWsIata').html(WsMulti['Iata']);
		_buPrompt.html(Utils.Format('{0} <span>{1}</span>',WsMulti['EnterCodePrompt'],WsMulti['EnterItNow']));
		_buPrompt.click(function(){
			me.Show();
			return false;
		});
		_buClose.click(function(){
			me.Hide();
			return false;
		});
	};
	this.SetHotel=function(hid){
		_hid=hid;
	};
	this.Reset=function(sss){
		if(sss.UseGroup){
			_dvGroup.css('display','inline-block');
		}else{
			_dvGroup.css('display','none');
		};
		if(sss.UseIata){
			_dvIata.css('display','inline-block');
		}else{
			_dvIata.css('display','none');
		};
		this.Hide();
	};
	this.GetGroup=function(){
		return _txGroup.val();
	};
	this.GetQuery=function(){
		var ret='';
		if(_txRates.val().length>0)
			ret+='&corp=' + _txRates.val();
		if(_txGroup.val().length>0)
			ret+='&group=' + _txGroup.val();
		if(_txIata.val().length>0)
			ret+='&iata=' + _txIata.val();
		return ret;
	};
	this.Hide=function(){
		if(_dv==null)return;
		if(_fade){
			_dv.slideUp('fast');
		}else{
			_dv.hide();
		}
	};
	this.Show=function(){
		if(_fade){
			_dv.slideDown('fast');
		}else{
			_dv.show();
		}
	};
	_setHtml();
};
function WsCalendar(cn,l,env,fd,getrate){
	cn.data('MyCal',this);
	var me=this;
	var _cn=cn;
	var _hid=0;
	var _lid=l;
	var _env=env;
	var _fade=fd;
	var _getrate=getrate;
	var _init=false,_ix=0,MOS=11,_dv=null,_tgt,_lbCheckin,_lbCheckout,_txCheckin,_txCheckout,_buCheckin,_buCheckout,_buPrev,_buNext,_txDisclaim,_hdCal,_ix1=-1,_ix2=-1,_nights=0,_dts=[],_daily=[],_rts=[],_curr='$',_sel=0;

	_lbCheckin=_cn.find('.lbWsCheckin').filter(':first').html(WsMulti['CheckIn']);
	_lbCheckout=_cn.find('.lbWsCheckout').filter(':first').html(WsMulti['CheckOut']);
	_txCheckin=_cn.find('.buWsCheckin').filter(':first').html('&nbsp;');
	_txCheckout=_cn.find('.buWsCheckout').filter(':first').html('&nbsp;');
	_buCheckin=_cn.find('.spWsCheckin').filter(':first');
	_buCheckout=_cn.find('.spWsCheckout').filter(':first');
	_buCheckin.click(function(){
		me.Show(1);
		return false;
	});
	_buCheckout.click(function(){
		me.Show(2);
		return false;
	});

	var _today=new Date();
	_today=new Date(_today.getFullYear(),_today.getMonth(),_today.getDate());
	var DTTODAY=Utils.DateFormat(_today,'M/d/yyyy');
	var IXTODAY=Utils.GetIndexFromY2K(_today);
	var IXFIRST=Utils.GetIndexFromY2K(new Date(_today.getFullYear(),_today.getMonth(),1));
	var IXLAST=Utils.GetIndexFromY2K(new Date(_today.getFullYear(),_today.getMonth()+MOS+2,0));

	for(var i=IXTODAY;i<=IXLAST;i++)_daily[i]=0;
	var _getDaily=function(){
		var surl='https://uat.windsurfercrs.com/ibe/xml/getratecalendar.aspx?hotelID='+_hid+'&dt1='+DTTODAY+'&ix='+_ix;
		if(_env=='PRD'){
			surl='https://reservations.millenniumhotels.com/ibe/xml/getratecalendar.aspx?hotelID='+_hid+'&dt1='+DTTODAY+'&ix='+_ix;
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
				_rts[i].html(Utils.GetWsRndAmt('',_daily[i]));
			}else{
				_rts[i].html('');
			};
		};
		_txDisclaim.html(Utils.Format(WsMulti.Disclaimer, d.Currency));
		if(d.RoomTypes.length>0){
			_txDisclaim.show();
		}else{
			_txDisclaim.hide();
		};
	};
	var _setHtml=function(){
		var tmp,html='';
		_dv=_cn.find('.cnWsCal').filter(':first');
		_tgt=_cn.find('.dvWsCalMonths').filter(':first');
		_buPrev=_cn.find('.calprev a').filter(':first');
		_buNext=_cn.find('.calnext a').filter(':first');
		_txDisclaim=_cn.find('.dvWsDisclaimer').filter(':first');
		_hdCal=_cn.find('.hdWsCalendar').filter(':first');
		if(_lid!=14){
			_buPrev.click(function(){if(_ix > 0){_ix--;_repos();};return false;});
			_buNext.click(function(){if(_ix < MOS){_ix++;_repos();};return false;});
		}else{
			_buNext.click(function(){if(_ix > 0){_ix--;_repos();};return false;});
			_buPrev.click(function(){if(_ix < MOS){_ix++;_repos();};return false;});
		};

		_ix=Utils.MonthDiff(_today,Utils.GetDateFromY2K(_ix1));
		if(_ix<0)_ix=0;
		if(_ix>MOS)_ix=MOS;

		for(var i=0;i<(MOS+2);i++){
			tmp=new WsMonth(_today,i,_lid);
			html+=tmp.GetHtml();
		};
		_tgt.append(html);
		if(_lid!=14){
			_tgt.css({'width':'4004px'});
		}else{
			_tgt.css({'width':'616px'});
			$('.calDay div, .calDays div, .calMonth').css('float', 'right');
		};

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
		if(_sel==1){
			_ix1=xx;
			if(_ix2<=xx){
				_ix2=xx+1;
			};
		}else{
			_ix2=xx;
			if(_ix1>=xx || _ix1==-1){
				_ix1=xx-1;
			};
			if(_ix1<IXTODAY){
				_ix1=IXTODAY;
			};
		};
		_nights=_ix2-_ix1;
		_update();
		if(_nights>=1)_cn.trigger('DepartureSelected',[_nights]);
	};
	var _repos=function(){
		if(_lid!=14){
			if(_ix <= 0){_buPrev.hide();}else{_buPrev.show();};
			if(_ix >= MOS){_buNext.hide();}else{_buNext.show();}
		}else{
			if(_ix <= 0){_buNext.hide();}else{_buNext.show();};
			if(_ix >= MOS){_buPrev.hide();}else{_buPrev.show();}
		};
		if(_lid!=14){
			var posX = -308*_ix;
			_tgt.animate({left:posX},500);
		}else{
			$('.calMonth').hide();
			$('#dvMonth_'+_ix).show();
			$('#dvMonth_'+(_ix+1)).show();
		};
		if(_getrate)_getDaily();
	};
	var _update=function(){
		for(var i=IXTODAY;i<=IXLAST;i++){_dts[i].removeClass('dtSelected dtCheckout dtCheckin');};
		if(_ix1>0){
			for(i=_ix1;i<_ix2;i++)_dts[i].addClass('dtSelected');
			if(_nights>0){
				_dts[_ix1].addClass('dtCheckin');
				_dts[_ix2].addClass('dtCheckout');
			};
			_txCheckin.html(Utils.ToCustom(_ix1, _ix1, _lid));
			_txCheckout.html(Utils.ToCustom(_ix2, _ix2, _lid));
		}else{
			_txCheckin.html('&nbsp;');
			_txCheckout.html('&nbsp;');
		}
	};
	this.SetHotel=function(hid){
		_hid=hid;
		if(_init==true){
			for(i=IXTODAY;i<=IXLAST;i++){
				_rts[i].html('');
			};
			if(_getrate)_getDaily();
		};
	};
	this.GetArrival=function(){
		return _ix1;
	};
	this.GetNights=function(){
		return _nights;
	};
	this.Hide=function(){
		_buCheckin.removeClass('ws-active')
		_buCheckout.removeClass('ws-active')
		if(_dv!=null){
			if(_fade){
				_dv.slideUp('fast');
			}else{
				_dv.hide();
			}
		}
	};
	this.Toggle=function(sel){
		if(_dv.is(':visible')){
			_buCheckin.removeClass('ws-active')
			_buCheckout.removeClass('ws-active')
			if(_fade){
				_dv.slideUp('fast');
			}else{
				_dv.hide();
			}
		}else{
			if(sel==1)_buCheckin.addClass('ws-active')
			if(sel==2)_buCheckout.addClass('ws-active')
			if(_fade){
				_dv.slideDown('fast');
			}else{
				_dv.show();
			}
		}
	};
	this.Show=function(sel){
		if(_init==false){
			_setHtml();
			_update();
			_init=true;
		};

		if(sel==2){
			_hdCal.html(WsMulti['SelectCheckOut']);
			_ix=Utils.MonthDiff(_today,Utils.GetDateFromY2K(_ix2));
			if(_sel!=2){
				_buCheckin.removeClass('ws-active')
				_buCheckout.addClass('ws-active')
				if(_fade){
					_dv.slideDown('fast');
				}else{
					_dv.show();
				}
			}else{
				this.Toggle(2);
			}
		}else{
			_hdCal.html(WsMulti['SelectCheckIn']);
			_ix=Utils.MonthDiff(_today,Utils.GetDateFromY2K(_ix1));
			if(_sel!=1){
				_buCheckin.addClass('ws-active')
				_buCheckout.removeClass('ws-active')
				if(_fade){
					_dv.slideDown('fast');
				}else{
					_dv.show();
				}
			}else{
				this.Toggle(1);
			}
		};
		_sel=sel;

		if(_ix<0)_ix=0;
		if(_ix>MOS)_ix=MOS;
		_repos();

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
		if(langID==7||langID==10){
			html+='<div class="calDay"><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div><div>日</div></div><div class="calDays">';
		}else if(langID==9){
			html+='<div class="calDay"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div><div class="calDays">';
		}else if(langID==2||langID==3){
			html+='<div class="calDay"><div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div><div>D</div></div><div class="calDays">';
		}else if(langID==11){
			html+='<div class="calDay"><div>S</div><div>M</div><div>D</div><div>M</div><div>D</div><div>F</div><div>S</div></div><div class="calDays">';
		}else if(langID==6){
			html+='<div class="calDay"><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div></div><div class="calDays">';
		}else if(langID==14){
			html+='<div class="calDay"><div>الأحد</div><div>الإثنين</div><div>الثلاثاء</div><div>الأربعاء</div><div>الخميس</div><div>الجمعة</div><div>السبت</div></div><div class="calDays">';
		}else{
			html+='<div class="calDay"><div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div></div><div class="calDays">';
		};
		if(langID!=1&&langID!=9&&langID!=11&&langID!=14){
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
	this.ChildPerRoom='children/room';
	this.EnterHotelDestination='Enter Destination or Hotel Name';
	this.Destination='Destination';
	this.SelectHotel='Please select a hotel';
	this.SelectDates='Check-in and Check-out';
	this.SelectCheckIn='Please select an arrival date.';
	this.SelectCheckOut='Please select a departure date.';
	this.EnterCodePrompt='Have a Promo or Group Code?';
	this.EnterItNow='Enter it now.';
	this.CheckIn='Check in';
	this.CheckOut='Check out';
	this.Occupancy='Occupancy';
	this.RateCorpPromo='Promo Code';
	this.Search='Book';
	this.ClearDates='Clear Dates';
	this.Group='Group Code';
	this.Iata='Travel Agent IATA';
	this.Disclaimer='Rates shown are in {0}.';
	this.ChildAge1='';
	this.ChildAge2='';
	this.ChildAge3='';
	this.ChildAge4='';
	if(lid==7){
		this.Rooms='客房';
		this.Adult='成人';
		this.Adults='成人';
		this.AdultsPerRoom='成人/间';
		this.Child='孩子';
		this.Children='孩子';
		this.ChildPerRoom='儿童/间';
		this.EnterHotelDestination='输入酒店名称或目的地';
		this.Destination='目的地';
		this.SelectHotel='请选择一家酒店';
		this.SelectDates='选择您的住宿日期';
		this.SelectCheckIn='请选择您的入住日期';
		this.SelectCheckOut='请选择您的退房日期';
		this.EnterCodePrompt='如有促销或公司代码，';
		this.EnterItNow='请点击输入。';
		this.CheckIn='入住时间';
		this.CheckOut='退房时间';
		this.Occupancy='入住人数';
		this.RateCorpPromo='活动促销代码';
		this.Search='预订';
		this.ClearDates='重设日期';
		this.Group='公司或团体代码';
		this.Iata='旅行社IATA号';
		this.Disclaimer='所显示价格为{0}';
	}else if(lid==14){
		this.Rooms='الغرف';
		this.Adult='بالغ';
		this.Adults='البالغين';
		this.AdultsPerRoom='البالغين';
		this.Child='الأطفال';
		this.Children='الأطفال';
		this.ChildPerRoom='الأطفال/غرفة';
		this.EnterHotelDestination='أدخل اسم الفندق أو جهة';
		this.Destination='غاية';
		this.SelectHotel='الرجاء اختيار فندق';
		this.SelectDates='قم بتحديد مواعيد الوصول والمغادرة';
		this.SelectCheckIn='يرجى تحديد موعد وصوله';
		this.SelectCheckOut='يرجى تحديد تاريخ رحيل';
		this.EnterCodePrompt='لديك العرض الترويجي أو رمز المجموعة؟';
		this.EnterItNow='ادخله الآن.';
		this.CheckIn='تسجيل الدخول';
		this.CheckOut='تسجيل الخروج';
		this.Occupancy='الإشغال';
		this.RateCorpPromo='أدخل الكود/الرمز الترويجى';
		this.Search='بحث';
		this.ClearDates='إعادة تعيين';
		this.Group='رمز الفوج';
		this.Iata='رقم IATA';
		this.Disclaimer='{0} أسعار المعروضة هي في';
	};
};
WsMulti.Set=function(sss){
	if(sss.MultiLabels==null||sss.MultiLabels.length==0)return;
	var s=sss.MultiLabels;
	for(var i=0;i<s.length;i++){
		this[s[i].Name]=s[i].Desc;
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
	var mos=['January','February','March','April','May','June','July','August','September','October','November','December'];
	if(langID==7){
		return dt.getFullYear()+'年'+(dt.getMonth()+1)+'月';
	}else if(langID==9){
		return dt.getFullYear()+'年'+(dt.getMonth()+1)+'月';
	}else if(langID==2){
		mos=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
	}else if(langID==3){
		mos=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	}else if(langID==11){
		mos=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
	}else if(langID==14){
		mos=['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
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
		mos=['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'];
	}else if(langID==3){
		mos=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
	}else if(langID==11){
		mos=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
	}else if(langID==14){
		mos=['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
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
	}else if(langID==14){
		wkd=['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
	};
	if(ix1==ix2){
		return wkd[dt1.getDay()] + ', ' + Utils.ToMMMD(dt1,langID);
	};
	if(langID==14){
		return wkd[dt1.getDay()] + ' ' + Utils.ToMMMD(dt1,langID) + ' - ' + wkd[dt2.getDay()] + ' ' + Utils.ToMMMD(dt2,langID);
	};
	return wkd[dt1.getDay()] + ', ' + Utils.ToMMMD(dt1,langID) + ' - ' + wkd[dt2.getDay()] + ', ' + Utils.ToMMMD(dt2,langID);
};
Utils.GetWsRndAmt=function(curr,a){
	return curr+Math.round(a/100);
};

})(jQuery);
