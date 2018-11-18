$(function(){
  
  var
  // 表格dom
  $table = $('.table'),
  // 和数据库中的student表映射的一个数组
  database,
  // 各个请求的url地址
  stuRestful = {
    select:'/php/selectStudent.php',
    delete:'/php/deleteStudent.php',
    update:'/php/updateStudent.php',
    insert:'/php/addStudent.php'
  }

  $table.bind('xuanruan',function(){
    $(this).find('tbody').empty().html(database.map(function(v){
      return '<tr align="center"><th scope="row"><input type="text" name="xuehao" data-role="'+v.id+'" value="'+v.xuehao+'"></th> <td><input   data-role="'+v.id+'" type="text" name="name" value="'+v.name+'"></td> <td><input style="width: 120px"  data-role="'+v.id+'" type="text" name="xingbie" value="'+v.xingbie+'"></td> <td><input style="width: 120px"  data-role="'+v.id+'" type="text" name="age" value="'+v.age+'"></td> <td><input style="width: 120px"  data-role="'+v.id+'" type="text" name="zhuangye" value="'+v.zhuangye+'"></td> <td><input style="width: 120px"  data-role="'+v.id+'" type="text" name="chengji" value="'+v.chengji+'"></td> <td><input class="xuanze" name="item" value="'+v.id+'" type="checkbox"></td> </tr>';
    }).join('') );
  });

  var getData = function(){
    $.ajax({
      url:stuRestful.select,
      dataType:'json'
    })
    .done(function(json){
      database = json;
      $table.trigger('xuanruan',{data:database});
    });
  }
  setTimeout(function(){
    getData();
  },0);
  //新增数据
  $('#add').click(function(){
    $.get(stuRestful.insert).done(function(){
      getData();
    })
  })

  //每行数据删除
  var $xuanze=$('.quanxuan')
  $('#shanchu').click(function () {
    var ids = $table.find('input[name=item]:checked').map(function () {
      return $(this).val();
    }).get();
    $.ajax({
      url:stuRestful.delete,
      type:'post',
      data:{x:ids}
    }).done(function () {
      $xuanze.prop('checked',false);
      // $table.find('input[name=item]:checked')
      // .parent().parent().detach();
      database = database.filter(function(v){
        return  $.inArray(v.id,ids) == -1;
      })
      $table.trigger('xuanruan');
    })
   
    /*if( !$(':checked').length ){
      alert('选中后删除')
      return;
    }
    var id = $(':checked').parent().parent().children().first().text()
    $.get(stuRestful.delete+'?id='+id).done(function(){
      database = database.filter(function(value,index){
        return value.id != id;
      })
      $table.trigger('xuanruan',{data:database})
    })*/
  
  })

  //指定位置，修改数据
  var time;
  $table.delegate('input[name=name],input[name=xuehao],input[name=xingbie],input[name=age],input[name=zhuangye],input[name=chengji]','keyup',function(){
    var that =  this;
    var id = $(this).attr('data-role');
    clearTimeout(time);
    timerId = setTimeout(function(){
      $.ajax({
        url:stuRestful.update,
        type:'post',
        data:{shuxing:$(that).prop('name'),value:$(that).val(),id:id}
      }).done(function(){
      })
    },1000)
  })

  /*$table.delegate('input[name=sex]','click',function(){
    var id = $(this).attr('data-role');
    $.ajax({
      url:stuRestful.u,
      type:'post',
      data:{shuxing:$(this).prop('name'),value:$(this).val(),id:id}
    }).done(function(){
    })
  })*/

  //轮循
 /* setInterval(function () {
    $.ajax({
      url:stuRestful.select,
      dataType:'json'
    }).done(function (data) {
      if( database.length == data.length ){
        return;
      }
      database = data;
      $table.trigger('xuanruan',{data:database});
    })
  },1000)*/

  $(document).ajaxSend(function(){
    $('#tongbu').text('同步中.....')
  })
  $(document).ajaxSuccess(function(){
    $('#tongbu').text('同步完成')
  })
  //选择的优化
  $xuanze.click(function () {
    $table.find('input[name=item]')
    .prop('checked',$(this).prop('checked'));
  })

  $table.delegate('input[name=item]','click',function(){
    if($table.find('input[name=item]:checked').length == database.length){
      $xuanze.prop('checked',true);
    }
    if( !$(this).prop('checked') ){
      $xuanze.prop('checked',false);
    }
  })

  $('.chengji').slimScroll({
    
    size: '10px',
    position: 'right',
    color: '#ffcc00',
    
  });
  $('.slimScrollDiv').css({height:'470px'});
  $('.chengji').css({height:'470px'});
})
