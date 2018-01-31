#ifndef CIRCLE_H
#define CIRCLE_H

class Circle
{
private:
  double r;
  public:
    Circle();//构造函数
    Circle(double R);
    double Area();//求面积函数
};

#endif
// 注意到开头结尾的预编译语句。在头文件里，并不写出函数的具体实现。