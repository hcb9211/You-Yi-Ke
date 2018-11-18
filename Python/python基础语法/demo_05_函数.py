#定义函数
def sum(num1 , num2):
	return num1 + num2

#调用函数
result = sum(1,2)

print(result)

#定义递归函数
def recursiveTest(num):
	if num == 1:
		return 1

	return num * recursiveTest(num-1)	

print(recursiveTest(4))


#高级函数：把函数作为参数传入，这样的函数称为高阶函数
def add(x, y, f):
	return f(x) + f(y)

print(add(-5, 6, abs))


#lambda匿名函数
result = list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
print(result)

#lambda x: x * x 实际就等价于以下函数定义 ，但是缺省了名字
def f(x):
	return x * x

input("Enter the any press to exit")