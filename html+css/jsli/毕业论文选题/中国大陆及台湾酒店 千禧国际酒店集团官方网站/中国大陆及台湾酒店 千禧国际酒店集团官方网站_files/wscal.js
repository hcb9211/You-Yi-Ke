var WSCAL={Ix:0,MOS:10,Tgt:null,Ix1:-1,Ix2:-1,Nights:0,dts:[],daily:[],rts:[],IsOut:true,
	Today:0,IXTODAY:0,IXFIRST:0,IXLAST:0,
	Init:function(d,n){
		if(d>0 && n>0){
			this.Ix1=d;
			this.Nights=n;
			this.Ix2=this.Ix1+this.Nights;
		};
		this.Today=Utils.GetDate(WsVars.DtLocal,'MM/dd/yyyy');
		this.IXTODAY=Utils.GetIndexFromY2K(this.Today);
		this.IXFIRST=Utils.GetIndexFromY2K(new Date(this.Today.getFullYear(),this.Today.getMonth(),1));
		this.IXLAST=Utils.GetIndexFromY2K(new Date(this.Today.getFullYear(),this.Today.getMonth()+12,0));
		for(var i=this.IXTODAY;i<=this.IXLAST;i++)this.daily[i]=0;
		this.setHtml();
		this.update(true);
		this.repos();
	},
	getDaily:function(){
		var me=this;
		$.ajax({url:'xml/getratecalendar.aspx?hotelID='+WsVars.HotelID+'&dt1='+WsVars.DtLocal+'&ix='+me.Ix,dataType:'json',cache:true,
			success:function(d){me.setDaily(d)},
			error:function(){}
		});
	},
	setDaily:function(d){
		var rates,tmpRt;
		var idx=Number(d.Ix1);
		for(var i=idx;i<(idx+62);i++){
			this.daily[i]=0;
		};
		for(i=0;i<d.RoomTypes.length;i++){
			rates=d.RoomTypes[i].Rates.split(',');
			for(var j=0;j<=rates.length;j++){
				tmpRt=Number(rates[j]);
				if(tmpRt>9 && (this.daily[j+idx]==0 || tmpRt<this.daily[j+idx])){
					this.daily[j+idx] = tmpRt;
				}
			}
		};
		for(i=idx;i<(idx+62);i++){
			this.rts[i].html(Utils.GetWsRndAmt(WsVars.CSymbol,this.daily[i]));
		};
	},
	setHtml:function(){
		var me=this,tmp,html='';
		this.Tgt=$('#dvCalMonths');
		this.buPrev=$('#calprev a');
		this.buNext=$('#calnext a');
		this.buPrev.click(function(){if(me.Ix > 0){me.Ix--;me.repos();};return false;});
		this.buNext.click(function(){if(me.Ix < me.MOS){me.Ix++;me.repos();};return false;});
		$('#buClear').click(function(){me.ResetDates();return false;});

		this.Ix=Utils.MonthDiff(this.Today,Utils.GetDateFromY2K(this.Ix1));
		if(this.Ix<0)this.Ix=0;
		if(this.Ix>this.MOS)this.Ix=this.MOS;

		for(var i=0;i<12;i++){
			tmp=new WsMonth(this.Today,i,WsVars.LangID);
			html+=tmp.GetHtml();
		};
		this.Tgt.append(html);

		for(i=this.IXFIRST;i<this.IXTODAY;i++){
			this.dts[i]=$('#dv_'+i);
			this.dts[i].addClass('blocked');
		};
		for(i=this.IXTODAY;i<=this.IXLAST;i++){
			this.dts[i]=$('#dv_'+i);
			this.dts[i].addClass('pointer');
			this.dts[i].click(function(){me.SetDates(Number($(this).attr('ref')));return false;});
			this.rts[i]=$('#dv_'+i+' span');
		};
		this.dts[this.IXTODAY].addClass('today');
		/*for(i=0;i<=disabledIdxs.length;i++){
			if(this.dts[disabledIdxs[i]]!=null)this.dts[disabledIdxs[i]].addClass('closed');
		};*/
	},
	SetDates:function(ix){
		if(this.IsOut){
			this.Ix1=this.Ix2=ix;
			this.IsOut=false;
		}else{
			if(ix>this.Ix1){
				this.Ix2=ix;
			}else if(ix<this.Ix1){
				this.Ix2=this.Ix1;
				this.Ix1=ix;
			}else{
				return;
			};
			this.IsOut=true;
		};
		this.Nights=this.Ix2-this.Ix1;
		this.update();
	},
	ResetDates:function(){
		this.Ix1=this.Ix2=this.Nights=0;
		this.IsOut=true;
		this.update();
	},
	repos:function(){
		if (this.Ix <= 0){this.buPrev.css({visibility:'hidden'});}else{this.buPrev.css({visibility:'visible'});};
		if (this.Ix >= this.MOS){this.buNext.css({visibility:'hidden'});}else{this.buNext.css({visibility:'visible'});}
		$('.calMonth').removeClass('visible');
		$('#dvMonth_'+this.Ix).addClass('visible');
		$('#dvMonth_'+(this.Ix+1)).addClass('visible');
		//this.getDaily();
	},
	update:function(init){
		var me=this;
		for(var i=this.IXTODAY;i<=this.IXLAST;i++){this.dts[i].removeClass('dtSelected dtCheckout');};
		if(this.Ix1>0){
			for(i=this.Ix1;i<this.Ix2;i++)this.dts[i].addClass('dtSelected');
			if(this.Nights>0){
				this.dts[this.Ix2].addClass('dtCheckout');
			}else{
				this.dts[this.Ix1].addClass('dtSelected');
			};
		};
		if(init==null)WSCNTR.OnDatesChanged({Dt1:me.Ix1,Nights:me.Nights});
	}
};
var WSITIN={Rooms:1,Adults:1,Child1:0,Child2:0,Child3:0,Child4:0,
	Init:function(rm,ad,c1,c2,c3,c4){
		var me=this;
		this.Rooms=rm;this.Adults=ad;this.Child1=c1;this.Child2=c2;this.Child3=c3;this.Child4=c4;
		$('#cbRooms').val(rm).change(function(){
			me.Rooms=Number($(this).val());
			me.update();
		});
		$('#cbAdults').val(ad).change(function(){
			me.Adults=Number($(this).val());
			me.update();
		});
		$('#cbChild1').val(c1).change(function(){
			me.Child1=Number($(this).val());
			me.update();
		});
	},
	update:function(){
		var me=this;
		WSCNTR.OnOccsChanged({Rooms:me.Rooms,Adults:me.Adults,Child1:me.Child1,Child2:me.Child2,Child3:me.Child3,Child4:me.Child4});
	}
};
var WSMORE={Promo:'',Group:'',Iata:'',Rate:'',RateCat:'',BedType:0,Ns:0,
	Init:function(promo,iata,rate,ratecat,bedtype,ns){
		var me=this;
		this.Promo=promo;this.Iata=iata;this.Rate=rate;this.RateCat=ratecat;this.BedType=bedtype;this.Ns=ns;
		$('#txPromo').val(promo).change(function(){
			me.Promo=$(this).val();
			me.update();
		});
		$('#txIata').val(iata).change(function(){
			me.Iata=$(this).val();
			me.update();
		});
		$('#txGroup').change(function(){
			me.Group=$(this).val();
			me.update();
		});
		$('#cbBedType').val(bedtype);
		if(ns>0)$('#chkNoSmoking').attr('checked','checked');
		
		$('input[name="chRateCat"]').click(function(){
			var items=[];
			$('input[name="chRateCat"]:checked').each(function(){items.push($(this).val());});
			me.RateCat=items.join(',');			
			me.update();
		});
		$('#cbRateCat').change(function(){
			me.RateCat=$(this).val();
			me.update();
		});
		$('input[name="chRate"]').click(function(){
			var items=[];
			$('input[name="chRate"]:checked').each(function(){items.push($(this).val());});
			me.Rate=items.join(',');			
			me.update();
		});
		$('#cbRate').change(function(){
			me.Rate=$(this).val();
			me.update();
		});
		$('#cbBedType').change(function(){
			me.BedType=Number($(this).val());
			me.update();
		});
		$('#chkNoSmoking').click(function(){
			if($(this).prop('checked')==true){
				me.Ns=1;
			}else{
				me.Ns=0;
			}
			me.update();
		});
	},
	update:function(){
		var me=this;
		WSCNTR.OnMoreChanged({Promo:me.Promo,Iata:me.Iata,Group:me.Group,Rate:me.Rate,RateCat:me.RateCat});
	},
	HasRateInput:function(){
		if(this.Promo.length>0||this.Rate.length>0||this.RateCat.length>0)return true;
		return false;
	},
	Show:function(){
		$('#ws-options-select').addClass('ws-show-this');
	},
	Hide:function(){
		$('#ws-options-select').removeClass('ws-show-this');
	}
};
var WSCNTR={
	observers:[],
	AddObserver:function(o){this.observers.push(o);},
	RemoveObserver:function(o){for(var i=0;i<this.observers.length;i++){if(this.observers[i]==o){this.observers.splice(i,1);break;}}},
	BroadcastEvent:function(evt){for(var i=0;i<this.observers.length;i++)this.observers[i].OnEvent(evt);},
	OnDatesChanged:function(obj){this.BroadcastEvent(new WsEvent('DatesChanged',obj));},
	OnOccsChanged:function(obj){this.BroadcastEvent(new WsEvent('OccsChanged',obj));},
	OnMoreChanged:function(obj){this.BroadcastEvent(new WsEvent('MoreChanged',obj));},
	OnResultsSuccess:function(){this.BroadcastEvent(new WsEvent('ResultsSuccess',null));}
};
