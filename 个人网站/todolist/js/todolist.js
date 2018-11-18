angular.module("myapp",[])
    .controller("ctrl",["$scope","$filter",function ($scope,$filter) {
        // 开关
        $scope.isshow=true;

        $scope.show=function () {
            $scope.isshow=false;
        }
        // 数据
        $scope.data=localStorage.message?JSON.parse(localStorage.message):[];

        // 当前的id当前的数据
        $scope.currentIndex=0;
        $scope.currentArr=$scope.data[$scope.currentIndex]?$scope.data[$scope.currentIndex]:[{son:[]}];

        // 过滤
        $scope.$watch("search",function () {
            var arr=$filter("filter")($scope.data,{title:$scope.search})?$filter("filter")($scope.data,{title:$scope.search}):[];
            $scope.currentIndex=getIndex(arr[0].id);
            $scope.currentArr=$scope.data[$scope.currentIndex];
        })
        // 新建事项
        $scope.addList=function () {
            $scope.isshow=true;
            var obj={};
            obj.title="新建事项";
            obj.id=getMaxId();
            obj.time=new Date().getDate();
            obj.son=[];
            $scope.data.push(obj);
            $scope.currentIndex=$scope.data.length-1;
            $scope.currentArr=$scope.data[$scope.currentIndex];
            localStorage.message=JSON.stringify($scope.data);
        }

        // 删除事项
        $scope.delList=function (id) {
            $scope.isshow=true;
            var index=getIndex(id);
            $scope.data.splice(index,1);
            var len=$scope.data.length-1;
            if(len<0){
                $scope.currentArr=[];
            }else{
                if(index==0){
                    $scope.currentIndex=0;
                    $scope.currentArr=$scope.data[$scope.currentIndex];
                }else{
                    $scope.currentIndex=index-1;
                    $scope.currentArr=$scope.data[$scope.currentIndex];
                }
            }
            localStorage.message=JSON.stringify($scope.data);
        }

        // 获得最大的id值
        function getMaxId() {
            if($scope.data.length==0){
                return 1;
            }
            return  $scope.data[$scope.data.length-1].id+1;
        }

        //获取内容里面的最大的id
        function getMaxId2(arr) {
            if(arr.length==0){
                return 1;
            }else {
                return arr[arr.length - 1].id + 1
            }
        }

        //获得焦点修改失去焦点保存
        $scope.focusList=function (id) {
            $scope.isshow=true;
            $scope.currentIndex=getIndex(id);
            $scope.currentArr=$scope.data[$scope.currentIndex];
        }

        $scope.blurList=function () {
            localStorage.message=JSON.stringify($scope.data);
        }


        //获取当前的index
        function getIndex(id) {
            for(var i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    return  i;
                }
            }
        }

        function getIndex2(arr,id) {
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    return i;
                }
            }
        }


        // 添加内容
        $scope.addCon=function () {
            var index=$scope.currentIndex;
            var obj={};
            obj.id=getMaxId2($scope.data[index].son);
            obj.con="写点什么...";
            obj.time=new Date().getTime();
            $scope.data[index].son.push(obj);
            localStorage.message=JSON.stringify($scope.data);
        }

        // 删除内容
        $scope.delCon=function (id) {
            var index1=$scope.currentIndex;
            var index=getIndex2($scope.data[index1].son,id);
            $scope.data[index1].son.splice(index,1);
            localStorage.message=JSON.stringify($scope.data);
        }

        $scope.blurCon=function () {
            localStorage.message=JSON.stringify($scope.data);
        }


        // 已经完成
        $scope.success=localStorage.success?JSON.parse(localStorage.success):[];
        $scope.done=function (id) {
            var index=$scope.currentIndex;
            var index1=getIndex2($scope.data[index].son,id);
            var obj=$scope.currentArr.son[index1];
            obj.id=getMaxId2($scope.success);
            $scope.data[index].son.splice(index1,1);

            $scope.success.push(obj);
            localStorage.message=JSON.stringify($scope.data);
            localStorage.success=JSON.stringify($scope.success);
        }


        // 已完成里删除
        $scope.delDone=function (id) {
            var index=getIndex2($scope.success,id);
            $scope.success.splice(index,1);
            localStorage.success=JSON.stringify($scope.success);
        }
    }])




