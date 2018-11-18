// 事件流方式

$(function() {

	var table = $('table')[0];
	table.onclick = function(e) {
		var ev = e || window.event;
		var obj = ev.target || ev.src.Element;
		if (obj.nodeName == 'TH') {
			return
		}
		if (obj.nodeName == 'TD') {

			var objv = obj.innerHTML;

			obj.innerHTML = '';

			var input = $('<input>');
;
			input.type = 'text';

			input.value = objv;

			obj.appendChild(input);

			input.focus();

			input.onkeyup = input.ondblclick = input.onblur = function(e) {
				var ev = e || window.event;
				if (ev.type == 'blur' || ev.type == 'dblclick') {

					var newobj = input.value;

					obj.removeChild(input);

					input = null;

					obj.innerHTML = newobj;

				} 
				// else if (ev.type == 'keyup') {

			// 		if (ev.keyCode == 13 && ev.ctrlKey) {

			// 			var newobj = input.value;

			// 			obj.removeChild(input)

			// 			input = null;

			// 			obj.innerHTML = newobj;
			// 		}
			// 	}
			}
		}

	}
	var add = $('#add');
	add.onclick = function() {
		var tr = $('<tr>');
		tr.innerHTML = "<td></td><td></td><td></td><td></td><td></td>"
		table.appendChild(tr)
	}



	

})