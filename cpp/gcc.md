
GNU Compiler Collection

http://gcc.gnu.org/  

g++编译流程  
![g++编译流程](1.png)

**g++基本用法：**  
### 1. g++ -E作预处理
g++ -E仅作预处理，不进行编译、汇编和链接，如果你想查看某一个文件的预处理过程，可以

```
g++ -E main.cxx
```
这样会直接在terminal中显示预处理过程，如果main.cxx中包含include，例如#include<iostream>,只能看到部分预处理结果；这个只显示预处理，不生成文件；如果你想查看详细的预处理，可以重定向到一个文件中，如：
```
g++ -E main.cxx -o main.i
```
这样你可以查看main.i中显示的内容，里面会有类似：
#1 "/usr/lib/gcc/i686-pc-cygwin/4.5.3/include/c++/bits/stringfwd.h"1 3

可以参考官方预处理输出文档：  
http://gcc.gnu.org/onlinedocs/cpp/Preprocessor-Output.html  
或者：  
http://stackoverflow.com/questions/15679756/g-e-option-output

### 2. 编译到汇编语言
g++ -s 编译到汇编语言，不进行汇编和链接,即只激活预处理和编译，生成汇编语言
```
g++ -s main.i -o main.s
```
### 3. 编译、汇编到目标代码
g++ -c 编译、汇编到目标代码，不进行链接,即生成目标文件（.o）
```
g++ -c main.s -o main.o
```
会生成一个main.o的目标文件\

### 4. g++ -o 生成链接文件
```
g++ main.o printf1.o printf2.o -o main
```
(**注意**，如果各个文件有依赖关系，在生成链接文件之前步骤每个文件单独操作都没有问题，但是在链接的时候会考虑依赖关系，所以上面语句把main中的依赖添加上面了)

### 5. /main 执行
这是最后一步了，执行-o后面的文件，如果没有-o，系统会默认生成一个a.out文件（执行./a.out）。

**g++关键参数介绍** 
上文在g++编译过程中已经介绍过-E、-S、-c、-o，再简单介绍-x和-M
```
// 指定其后输入文件的语言
g++ -x c++ main.cxx
// 生成文件关联信息。包含目标文件所依赖的所有源代码。
g++ -M main.cxx 
```