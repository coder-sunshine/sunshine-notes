---
title: 第 2 章 顺序结构程序设计
description: C 语言顺序结构入门，涵盖程序基本结构、数据类型、运算符以及输入输出基础。
---

## 对应教材目录

- 2.1 C 源程序结构
- 2.2 最简单的 C 程序
- 2.3 整型数据
- 2.4 实型数据
- 2.5 字符型数据
- 2.6 各种类型数据之间的混合运算
- 2.7 C 语言的运算符、表达式和语句
- 2.8 逗号运算符和逗号表达式

## 本章目标

学完这一章，你应该能做到：

- 看懂一个最简单的 C 程序。
- 自己写出 `main` 函数。
- 使用 `int`、`float`、`double`、`char` 定义变量。
- 用 `scanf` 输入数据，用 `printf` 输出结果。
- 理解赋值、四则运算、整数除法和类型转换。
- 写出“输入 -> 计算 -> 输出”的顺序程序。

## 1. 什么是顺序结构

顺序结构就是程序按照从上到下的顺序一条一条执行。

这是最基础的程序执行方式。只要你还没有写 `if`、`for`、`while`，程序基本就是顺序执行。

## 2. C 程序最基本的结构

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, world!\n");
    return 0;
}
```

先记住这几个点：

- `#include <stdio.h>` 表示引入标准输入输出库。
- `main` 是程序入口，程序从这里开始执行。
- `printf` 用于输出。
- `return 0;` 表示程序正常结束。

## 3. 常用基本数据类型

### 3.1 整型

```c
int age = 18;
```

用来存整数，比如年龄、数量、成绩、总和。

### 3.2 实型

```c
float price = 19.9f;
double pi = 3.1415926;
```

用来存小数。初学阶段你可以把 `double` 理解为比 `float` 更精确的小数类型。

### 3.3 字符型

```c
char grade = 'A';
```

字符要用单引号包起来。

注意：

- `'A'` 是一个字符。
- `"A"` 是一个字符串。

## 4. 输入和输出

### 4.1 输出

```c
printf("%d\n", 10);
printf("%f\n", 3.14);
printf("%c\n", 'A');
```

常见格式符：

- `%d`：输出整数
- `%f`：输出小数
- `%c`：输出字符
- `%s`：输出字符串

### 4.2 输入

```c
int a;
scanf("%d", &a);
```

注意：

- `scanf` 输入变量时，变量名前通常要加 `&`。
- 但字符数组输入字符串时，一般不加 `&`。

例如：

```c
int a, b;
scanf("%d%d", &a, &b);
```

## 5. 赋值和运算

### 5.1 赋值

```c
int a;
a = 5;
```

赋值号 `=` 的意思是“把右边的值放进左边的变量”。

### 5.2 四则运算

```c
int a = 10, b = 3;
printf("%d\n", a + b);
printf("%d\n", a - b);
printf("%d\n", a * b);
printf("%d\n", a / b);
printf("%d\n", a % b);
```

其中：

- `/` 是除法
- `%` 是取余

### 5.3 整数除法

```c
int a = 5, b = 2;
printf("%d\n", a / b);
```

结果是 `2`，不是 `2.5`。

因为整数除以整数，结果仍然是整数部分。

### 5.4 混合运算和类型转换

```c
int a = 5;
float b = 2.0;
printf("%f\n", a / b);
```

这时结果是浮点数，因为参与运算的数据类型不同，程序会进行类型转换。

## 6. 表达式、语句和分号

- 表达式：有值的式子，比如 `a + b`
- 语句：能执行的完整操作，比如 `a = a + 1;`
- 分号：一条语句结束的标志

初学阶段你要养成一个习惯：每写完一条语句，检查一下有没有分号。

## 7. 最常见的顺序结构模板

### 7.1 输入两个数，输出它们的和

```c
#include <stdio.h>

int main(void)
{
    int a, b, sum;
    scanf("%d%d", &a, &b);
    sum = a + b;
    printf("%d\n", sum);
    return 0;
}
```

### 7.2 输入长和宽，输出矩形面积

```c
#include <stdio.h>

int main(void)
{
    int length, width, area;
    scanf("%d%d", &length, &width);
    area = length * width;
    printf("%d\n", area);
    return 0;
}
```

### 7.3 输入一个三位数，拆出百位、十位、个位

```c
#include <stdio.h>

int main(void)
{
    int n, a, b, c;
    scanf("%d", &n);
    a = n / 100;
    b = n / 10 % 10;
    c = n % 10;
    printf("%d %d %d\n", a, b, c);
    return 0;
}
```

## 8. 本章最容易错的点

- 把 `=` 写成 `==`，或者反过来。
- `scanf` 忘记给变量加 `&`。
- 误以为 `5 / 2` 的结果是 `2.5`。
- 字符用成双引号，字符串用成单引号。
- 输出格式符和变量类型不对应。
- 一条语句结束后漏掉分号。

## 9. 手写题

### 写结果题

1. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    int a = 10, b = 3;
    printf("%d\n", a / b);
    printf("%d\n", a % b);
    return 0;
}
```

答案：

```text
3
1
```

解析：

`a / b` 是整数除法，`10 / 3` 的结果是 `3`，小数部分会被舍掉。`a % b` 是求余数，`10 % 3` 的结果是 `1`。

易错点：

- 两个整数相除，结果仍然是整数。
- `/` 是商，`%` 是余数。

2. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    char c = 'A';
    printf("%c %d\n", c, c);
    return 0;
}
```

答案：

```text
A 65
```

解析：

`%c` 按字符输出，所以输出 `A`。`%d` 按整数输出，会输出字符 `A` 对应的 ASCII 码值，也就是 `65`。

易错点：

- 字符变量本质上也可以当整数参与输出和计算。
- `%c` 和 `%d` 输出同一个字符变量时，看到的结果会不一样。

3. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    int a;
    a = (3, 5, 7);
    printf("%d\n", a);
    return 0;
}
```

答案：

```text
7
```

解析：

逗号表达式会从左到右依次计算，但整个表达式的值取最后一个表达式的值。

```c
(3, 5, 7)
```

最终值是 `7`，所以 `a = 7`。

易错点：

- 逗号表达式不是把几个数都赋给变量，只会把最后一个表达式的值作为整体结果。

### 改错题

4. 下面程序至少有 4 处错误，自己找出来并改正。

```c
#include <stdio.h>
int main()
{
    int a;
    scanf("%d", a);
    a = 3.5;
    printf("%f\n", a);
}
```

答案：

原程序问题：

- `scanf("%d", a);` 少了取地址符 `&`。
- `a` 定义为 `int`，却想保存 `3.5` 这种小数。
- `printf("%f\n", a);` 中 `%f` 要对应 `double` 或 `float` 类型的实数，不应该对应 `int`。
- `int main()` 最好写成 `int main(void)`，并在最后写 `return 0;`。

一种正确写法：

```c
#include <stdio.h>

int main(void)
{
    double a;

    scanf("%lf", &a);
    a = 3.5;
    printf("%f\n", a);

    return 0;
}
```

易错点：

- `scanf` 给普通变量输入时，一般要写 `&变量名`。
- `double` 输入用 `%lf`，输出用 `%f`。
- 变量类型、输入格式符、输出格式符要对应。

5. 修改下面程序，使它能正确输入半径并输出圆面积。

```c
#include <stdio.h>
int main(void)
{
    int r;
    scanf("%f", &r);
    printf("%d\n", 3.14 * r * r);
    return 0;
}
```

答案：

```c
#include <stdio.h>

int main(void)
{
    double r;
    double area;

    scanf("%lf", &r);
    area = 3.14 * r * r;
    printf("%f\n", area);

    return 0;
}
```

解析：

半径和面积一般可能是小数，所以用 `double` 更合适。`scanf` 输入 `double` 时用 `%lf`，输出 `double` 时用 `%f`。

易错点：

- 原程序把 `r` 定义成 `int`，却用 `%f` 输入，类型不匹配。
- 面积是小数时，不能用 `%d` 输出。

### 手写程序题

6. 输入两个整数，输出它们的和、差、积、商。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a, b;

    scanf("%d%d", &a, &b);

    printf("sum=%d\n", a + b);
    printf("diff=%d\n", a - b);
    printf("mul=%d\n", a * b);

    if (b != 0) {
        printf("div=%d\n", a / b);
    }
    else {
        printf("b cannot be 0\n");
    }

    return 0;
}
```

易错点：

- 除法前要考虑除数不能为 `0`。
- 如果想得到小数商，可以写 `(double)a / b`。

7. 输入圆半径 `r`，输出圆面积和圆周长。

答案：

```c
#include <stdio.h>

int main(void)
{
    double r;
    double area, length;

    scanf("%lf", &r);

    area = 3.14 * r * r;
    length = 2 * 3.14 * r;

    printf("area=%f\n", area);
    printf("length=%f\n", length);

    return 0;
}
```

易错点：

- 圆面积是 `3.14 * r * r`。
- 圆周长是 `2 * 3.14 * r`。

8. 输入三个整数，输出它们的和与平均值。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a, b, c;
    int sum;
    double avg;

    scanf("%d%d%d", &a, &b, &c);

    sum = a + b + c;
    avg = sum / 3.0;

    printf("sum=%d\n", sum);
    printf("avg=%f\n", avg);

    return 0;
}
```

易错点：

- 平均值可能是小数，所以用 `double`。
- `sum / 3.0` 可以避免整数除法。

9. 输入摄氏温度，输出华氏温度。

答案：

```c
#include <stdio.h>

int main(void)
{
    double c, f;

    scanf("%lf", &c);

    f = c * 9 / 5 + 32;
    printf("%f\n", f);

    return 0;
}
```

易错点：

- 摄氏转华氏公式是 `F = C * 9 / 5 + 32`。
- 如果用整数写 `9 / 5`，结果会变成 `1`，所以这里用 `double` 变量参与运算。

10. 输入一个三位数，输出各位数字之和。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n;
    int a, b, c;

    scanf("%d", &n);

    a = n / 100;
    b = n / 10 % 10;
    c = n % 10;

    printf("%d\n", a + b + c);

    return 0;
}
```

易错点：

- 百位：`n / 100`。
- 十位：`n / 10 % 10`。
- 个位：`n % 10`。

11. 输入秒数，换算成“几小时几分钟几秒”。

答案：

```c
#include <stdio.h>

int main(void)
{
    int total;
    int hour, minute, second;

    scanf("%d", &total);

    hour = total / 3600;
    minute = total % 3600 / 60;
    second = total % 60;

    printf("%d小时%d分钟%d秒\n", hour, minute, second);

    return 0;
}
```

易错点：

- 1 小时是 `3600` 秒。
- 分钟要先去掉完整小时：`total % 3600 / 60`。

12. 输入两个整数，交换后输出。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a, b, t;

    scanf("%d%d", &a, &b);

    t = a;
    a = b;
    b = t;

    printf("%d %d\n", a, b);

    return 0;
}
```

易错点：

- 交换两个变量通常需要第三个临时变量 `t`。
- 不能直接写 `a = b; b = a;`，这样原来的 `a` 会丢失。

13. 输入商品单价和数量，输出总价。

答案：

```c
#include <stdio.h>

int main(void)
{
    double price, total;
    int count;

    scanf("%lf%d", &price, &count);

    total = price * count;
    printf("%f\n", total);

    return 0;
}
```

易错点：

- 单价可能是小数，用 `double` 更合适。
- 数量一般是整数，用 `int`。

14. 输入梯形上底、下底和高，输出面积。

答案：

```c
#include <stdio.h>

int main(void)
{
    double a, b, h, area;

    scanf("%lf%lf%lf", &a, &b, &h);

    area = (a + b) * h / 2;
    printf("%f\n", area);

    return 0;
}
```

易错点：

- 梯形面积公式是 `(上底 + 下底) * 高 / 2`。
- 不要漏掉括号，否则运算顺序会错。

15. 输入一个字符，输出它对应的 ASCII 码值。

答案：

```c
#include <stdio.h>

int main(void)
{
    char c;

    scanf("%c", &c);
    printf("%d\n", c);

    return 0;
}
```

易错点：

- `%c` 用来输入字符。
- `%d` 可以输出字符对应的 ASCII 码值。

## 10. 自测清单

学完这章后，你检查自己能不能做到：

- 我能不看资料写出一个最简单的 C 程序。
- 我知道 `printf` 和 `scanf` 分别做什么。
- 我知道 `%d`、`%f`、`%c` 的基本用途。
- 我能解释为什么 `5 / 2` 的结果是 `2`。
- 我能独立写出“输入 -> 计算 -> 输出”的程序。

## 11. 学习建议

- 第 2 章不要急着做复杂题，先把最基础模板抄熟。
- 手写题时，先写变量定义，再写输入，再写计算，再写输出。
- 如果一道题老出错，就把变量每一步的值在纸上列出来。

学完这一章后，再去看第 3 章会非常顺，因为你已经会写最基础的程序骨架了。
