---
title: 第 6 章 函数
description: C 语言函数基础，讲解函数定义、调用、参数、返回值以及作用域等核心概念。
---

## 对应教材目录

- 6.1 函数的分类和定义
- 6.2 函数的返回值和参数
- 6.3 嵌套调用
- 6.4 变量的作用域
- 6.5 函数的作用域
- 6.6 编程实战

## 本章目标

学完这一章，你应该能做到：

- 理解函数的作用是“封装功能”。
- 能自己定义简单函数。
- 知道形参、实参、返回值的含义。
- 能使用函数解决重复代码问题。
- 理解局部变量和全局变量的区别。
- 初步理解递归和嵌套调用。

## 1. 为什么要学函数

如果一个程序越来越长，所有代码都写在 `main` 函数里，会很乱。

函数的作用就是：

- 把一段独立功能单独封装起来
- 方便重复使用
- 让程序更清晰

## 2. 函数的基本形式

```c
返回类型 函数名(参数列表)
{
    函数体
}
```

例如：

```c
int add(int x, int y)
{
    return x + y;
}
```

## 3. 函数的定义和调用

完整例子：

```c
#include <stdio.h>

int add(int x, int y)
{
    return x + y;
}

int main(void)
{
    int a, b, c;
    scanf("%d%d", &a, &b);
    c = add(a, b);
    printf("%d\n", c);
    return 0;
}
```

这里：

- `add` 是函数名
- `x`、`y` 是形参
- `a`、`b` 是实参
- `return x + y;` 是返回值

## 4. 无参和有参

### 4.1 无参函数

```c
void hello(void)
{
    printf("hello\n");
}
```

### 4.2 有参函数

```c
int square(int x)
{
    return x * x;
}
```

## 5. 有返回值和无返回值

### 5.1 有返回值

```c
int max(int a, int b)
{
    return a > b ? a : b;
}
```

### 5.2 无返回值

```c
void print_line(void)
{
    printf("------\n");
}
```

如果函数只是完成一个动作，不需要把结果交回来，可以使用 `void`。

## 6. 参数传递

C 语言函数参数传递的基础是值传递。

这意味着：函数接收到的是实参值的副本，不是原变量本身。

例如：

```c
#include <stdio.h>

void change(int x)
{
    x = 100;
}

int main(void)
{
    int a = 10;
    change(a);
    printf("%d\n", a);
    return 0;
}
```

输出仍然是：

```text
10
```

因为 `change` 改的是形参 `x`，不是 `main` 里的 `a`。

## 7. 函数声明

如果函数定义写在 `main` 后面，通常要先声明。

```c
#include <stdio.h>

int add(int x, int y);

int main(void)
{
    printf("%d\n", add(2, 3));
    return 0;
}

int add(int x, int y)
{
    return x + y;
}
```

## 8. 局部变量和全局变量

### 8.1 局部变量

在函数内部定义，只在本函数内有效。

### 8.2 全局变量

在所有函数外部定义，作用域更大。

示例：

```c
#include <stdio.h>

int a = 100;

void fun(void)
{
    int a = 10;
    printf("%d\n", a);
}

int main(void)
{
    fun();
    printf("%d\n", a);
    return 0;
}
```

这里 `fun` 中的局部变量 `a` 会暂时屏蔽全局变量 `a`。

## 9. static 局部变量

```c
int f(void)
{
    static int a = 0;
    a++;
    return a;
}
```

`static` 局部变量的特点：

- 只初始化一次
- 函数调用结束后值不会消失

## 10. 递归的入门理解

递归就是函数自己调用自己。

例如求阶乘：

```c
int fact(int n)
{
    if (n == 1)
        return 1;
    return n * fact(n - 1);
}
```

递归一定要有结束条件，否则会无限调用。

## 11. 本章常见模板

### 11.1 求最大值函数

```c
int max(int a, int b)
{
    if (a > b)
        return a;
    else
        return b;
}
```

### 11.2 判断奇偶函数

```c
int is_even(int n)
{
    if (n % 2 == 0)
        return 1;
    else
        return 0;
}
```

### 11.3 数组求和函数

```c
int sum(int a[], int n)
{
    int i, s = 0;
    for (i = 0; i < n; i++)
        s += a[i];
    return s;
}
```

## 12. 本章最容易错的点

- 忘记写函数声明。
- 把形参和实参混淆。
- 以为函数中改了参数，外面的原变量也会变。
- 返回值类型和实际返回内容不匹配。
- 递归没有结束条件。
- 局部变量和全局变量重名时判断不清作用范围。

## 13. 手写题

### 写结果题

1. 写出下面程序的输出结果。

```c
#include <stdio.h>

int f(int x)
{
    x = x + 10;
    return x;
}

int main(void)
{
    int a = 5;
    f(a);
    printf("%d\n", a);
    return 0;
}
```

2. 写出下面程序的输出结果。

```c
#include <stdio.h>

int f(void)
{
    static int a = 0;
    a++;
    return a;
}

int main(void)
{
    printf("%d ", f());
    printf("%d ", f());
    printf("%d\n", f());
    return 0;
}
```

3. 写出下面程序的输出结果。

```c
#include <stdio.h>

int a = 100;

void fun(void)
{
    int a = 10;
    printf("%d\n", a);
}

int main(void)
{
    fun();
    printf("%d\n", a);
    return 0;
}
```

### 手写程序题

4. 写函数 `max(int a, int b)`，返回两个数中的较大值。
5. 写函数 `sum(int n)`，返回 `1 + 2 + ... + n`。
6. 写函数 `is_even(int n)`，判断一个数是否为偶数。
7. 写函数求三个整数中的最大值。
8. 写函数判断一个年份是否为闰年。
9. 写函数求两个整数的最大公约数。
10. 写函数判断一个正整数是否为素数。
11. 在主函数中调用上题函数，输出 1 到 100 之间所有素数。
12. 用递归函数求 `n!`。
13. 用递归函数求斐波那契数列第 `n` 项。
14. 写函数求数组元素之和。
15. 写函数统计字符串长度。
16. 写函数将一个字符串中的小写字母转换为大写字母。

### 改错题

17. 找出并改正下面程序中的错误。

```c
#include <stdio.h>

int add(int x, int y)
{
    printf("%d\n", x + y);
}

int main(void)
{
    int c;
    c = add(2, 3);
    printf("%d\n", c);
    return 0;
}
```

18. 修改下面递归函数，使其能正确计算阶乘。

```c
int fact(int n)
{
    return n * fact(n - 1);
}
```

## 14. 自测清单

- 我知道函数为什么能让程序更清晰。
- 我能自己写一个有参数、有返回值的函数。
- 我能区分形参和实参。
- 我知道什么是局部变量，什么是全局变量。
- 我能解释值传递为什么不会直接改变外部变量。
- 我会写最简单的递归函数。

## 15. 学习建议

- 第 6 章一定要多写，不要只读。
- 每写一个函数，先用一句中文说明“它输入什么，输出什么”。
- 如果一个函数太长，就想一想能不能再拆小一点。
- 递归题先不要贪多，先把阶乘和斐波那契吃透。

学完这一章后，你就具备了把程序组织得更像“一个完整项目”的能力。
