# 九九乘法表原理
# 两组1-9的数分别进行乘积运算，并且后一组的数不得大于前一组的数
for i in range(1,10):
    for j in range(1,10):
    	if i >= j:
        	print("%d*%d=%2d" %(i,j,i*j),end=" ")
            # %d整数输出    %2d整数输出，整数的宽度是2位，若不足两位，左边补空格  end=" " 取消换行
    print("")   # 一组结束进行换行

input("Enter the any press to exit")