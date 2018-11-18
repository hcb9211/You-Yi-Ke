# 赋值运算符 =
a = 10  # 赋值给单个变量
print(a)

a = b = c = 1  # 相同的值赋值给多个变量
print(a , b , c)

a, b, c = 1, 2, "abc"  # 不同的值赋值给不同的变量
print("a=%d , b=%d , c=%s"%(a , b , c))  # 批量格式化输出内容  d% 格式化为整数  s% 格式化为字符串

# 算术运算符： + 两个值的求和运算， - 两个值的差运算， * 两个值的乘积运算，
# / 两个值的商运算或浮点数除法， % 求余，// 整数除法
print(1+9*2-4/2+10%3)   # 17.0

# 逻辑运算符 and-全真为真，有假为假 or-有真为真，全假为假 not-非真为假，非假为真
if (True and False):
	print("True and False return False")  #有假，不会输出

if(True or False):
	print("True and False return True")   #有真，会输出

if(not False):
	print("not False return True ")    #非假为真，会输出

#位运算符 & | ^ << >>
#十进制数2的二进制数为  10
#十进制数3的二进制数为  11
print(2 & 3)    # 位与之后为二进制数 10，所以输出十进制数2
print(2 | 3)    # 位或之后为二进制数 11，所以输出十进制数3
print(2 << 3)   # 十进制数2的二进制数向左三位后为10000，所以输出16

input("Enter the any press to exit")
