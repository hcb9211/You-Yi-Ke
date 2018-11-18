# 通过input()接收输入值
score = input("请输入成绩:")
# 将输入值转换为int类型
score = int(score)

# if...elif...else... 判断不同的条件控制流程中的输出
# 注意：按文档顺序进行判断，当有条件满足之后，则后面不会再进行判断，所以要注意条件的设置，下列的数值判断位置发生变化后结果会有问题
if score > 90:
	print('A')
elif score > 80:
	print('B')
elif score > 70:
	print('C')
elif score > 60:
	print('D')
else :
	print("不及格")


input("Enter the any press to exit")