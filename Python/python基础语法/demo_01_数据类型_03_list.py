# list类型
# 列表是最常用的Python数据类型，它可以作为一个方括号内的逗号分隔值出现。
# 列表的数据项不需要具有相同的类型

list = [ 'abcd', 786 , 2.23, 'hello', 70.2 ]
tinylist = [123, 'world']
 
print (list)            # 输出完整列表
# 使用下标索引来访问列表中的值，同样你也可以使用方括号的形式截取字符
print (list[0])         # 输出列表第一个元素
print (list[1:3])       # 从第二个开始输出到第三个元素
print (list[2:])        # 输出从第三个元素开始的所有元素
print (tinylist * 2)    # 输出两次列表
print (list + tinylist) # 连接列表

input("Enter the any press to exit")