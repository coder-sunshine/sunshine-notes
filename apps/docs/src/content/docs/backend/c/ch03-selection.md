---
title: 第 3 章 选择结构程序设计
description: C 语言选择结构入门，系统讲解关系运算、逻辑运算、if 与 switch 的基础用法。
---

## 对应教材目录

- 3.1 关系运算符和关系表达式
- 3.2 逻辑运算符和逻辑表达式
- 3.3 if 语句
- 3.4 switch 语句
- 3.5 条件运算符和条件表达式
- 3.6 编程实战

## 本章目标

学完这一章，你应该能做到：

- 理解“条件成立”和“条件不成立”。
- 会写 `if`、`if-else`、`if-else if`。
- 会用 `switch` 处理离散分支。
- 会用关系运算符和逻辑运算符组织判断条件。
- 能独立完成简单的分类判断题。

## 1. 什么是选择结构

选择结构的本质是：根据条件决定程序往哪条路走。

顺序结构像直走。
选择结构像走到岔路口，判断之后再决定往左还是往右。

## 2. 关系运算符

常见关系运算符：

- `>`：大于
- `<`：小于
- `>=`：大于等于
- `<=`：小于等于
- `==`：等于
- `!=`：不等于

例如：

```c
if (a > b)
{
    printf("a is bigger\n");
}
```

注意：`==` 才是判断是否相等，`=` 是赋值。

## 3. 逻辑运算符

常见逻辑运算符：

- `&&`：并且
- `||`：或者
- `!`：非

例如：

```c
if (score >= 60 && score <= 100)
{
    printf("pass\n");
}
```

## 4. if 语句

### 4.1 最基本的 if

```c
if (x > 0)
{
    printf("positive\n");
}
```

### 4.2 if-else

```c
if (x % 2 == 0)
{
    printf("even\n");
}
else
{
    printf("odd\n");
}
```

### 4.3 多分支 if-else if

```c
if (score >= 90)
{
    printf("A\n");
}
else if (score >= 80)
{
    printf("B\n");
}
else if (score >= 70)
{
    printf("C\n");
}
else
{
    printf("D\n");
}
```

## 5. switch 语句

`switch` 适合判断一个变量等于某几个固定值中的哪一个。

```c
switch (day)
{
    case 1:
        printf("Monday\n");
        break;
    case 2:
        printf("Tuesday\n");
        break;
    default:
        printf("Other\n");
        break;
}
```

记住两个重点：

- `case` 后面一般写常量。
- 每个分支后通常要加 `break`。

## 6. 条件运算符

形式：

```c
条件 ? 表达式1 : 表达式2
```

例如：

```c
max = a > b ? a : b;
```

它适合写简单二选一，不适合写特别复杂的逻辑。

## 7. 本章最常见模板

### 7.1 判断正负零

```c
#include <stdio.h>

int main(void)
{
    int x;
    scanf("%d", &x);

    if (x > 0)
        printf("positive\n");
    else if (x < 0)
        printf("negative\n");
    else
        printf("zero\n");

    return 0;
}
```

### 7.2 求两个数最大值

```c
#include <stdio.h>

int main(void)
{
    int a, b;
    scanf("%d%d", &a, &b);

    if (a > b)
        printf("%d\n", a);
    else
        printf("%d\n", b);

    return 0;
}
```

### 7.3 成绩分级

```c
#include <stdio.h>

int main(void)
{
    int score;
    scanf("%d", &score);

    if (score >= 90)
        printf("A\n");
    else if (score >= 80)
        printf("B\n");
    else if (score >= 70)
        printf("C\n");
    else if (score >= 60)
        printf("D\n");
    else
        printf("E\n");

    return 0;
}
```

## 8. 本章最容易错的点

- `if (x = 0)` 写成赋值。
- 复杂条件不加括号，自己都看不清。
- `switch` 漏掉 `break`。
- 写区间判断时顺序不合理。
- 多条语句不加大括号。

## 9. 手写题

### 写结果题

1. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    int a = 3, b = 5;
    if (a < b && b < 10)
        printf("yes\n");
    else
        printf("no\n");
    return 0;
}
```

2. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    int a = 1, b = 0, c = 3;
    if (a && b || c)
        printf("T\n");
    else
        printf("F\n");
    return 0;
}
```

### 改错题

3. 找出并改正下面程序中的错误。

```c
#include <stdio.h>
int main(void)
{
    int x;
    scanf("%d", &x);
    if (x = 0)
        printf("zero\n");
    else
        printf("not zero\n");
    return 0;
}
```

4. 修改下面程序，使它能正确判断奇偶性。

```c
#include <stdio.h>
int main(void)
{
    int n;
    scanf("%d", &n);
    if (n % 2 = 0)
        printf("even\n");
    else
        printf("odd\n");
    return 0;
}
```

### 手写程序题

5. 输入一个整数，判断是正数、负数还是 0。
6. 输入两个整数，输出较大值。
7. 输入三个整数，输出最大值。
8. 输入一个成绩，输出等级 `A/B/C/D/E`。
9. 输入一年份，判断是否为闰年。
10. 输入一个整数，判断奇偶性。
11. 输入一个月份，输出这个月有多少天。
12. 输入三条边，判断能否构成三角形。
13. 输入一个字符，判断是否为大写字母。
14. 输入一个整数，判断它是否是 3 和 5 的公倍数。
15. 使用条件运算符写出求两个整数最小值的程序。

## 10. 自测清单

- 我能区分 `=` 和 `==`。
- 我知道什么时候该用 `if`，什么时候可以用 `switch`。
- 我会写区间判断。
- 我能独立完成“成绩分级”和“闰年判断”。
- 我能解释 `&&` 和 `||` 的含义。

## 11. 学习建议

- 做判断题时，先用中文把逻辑说清楚，再翻译成代码。
- 先从单条件开始，再写多条件组合。
- 写 `if-else if` 时，优先处理范围更高、更特殊的情况。

学完这一章后，你的程序就不再只是“会算”，而是开始“会判断”了。
