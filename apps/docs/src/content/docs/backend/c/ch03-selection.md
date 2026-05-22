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

    if (x > 0) {
        printf("positive\n");
    }
    else if (x < 0) {
        printf("negative\n");
    }
    else {
        printf("zero\n");
    }

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

    if (a > b) {
        printf("%d\n", a);
    }
    else {
        printf("%d\n", b);
    }

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

    if (score >= 90) {
        printf("A\n");
    }
    else if (score >= 80) {
        printf("B\n");
    }
    else if (score >= 70) {
        printf("C\n");
    }
    else if (score >= 60) {
        printf("D\n");
    }
    else {
        printf("E\n");
    }

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
    if (a < b && b < 10) {
        printf("yes\n");
    }
    else {
        printf("no\n");
    }
    return 0;
}
```

答案：

```text
yes
```

解析：

`a < b` 是 `3 < 5`，结果为真；`b < 10` 是 `5 < 10`，结果也为真。`&&` 表示并且，两边都为真时整体才为真，所以执行 `printf("yes\n");`。

易错点：

- `&&` 要求左右两边都成立。
- 条件成立执行 `if` 后面的语句，否则执行 `else` 后面的语句。

2. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    int a = 1, b = 0, c = 3;
    if (a && b || c) {
        printf("T\n");
    }
    else {
        printf("F\n");
    }
    return 0;
}
```

答案：

```text
T
```

解析：

表达式：

```c
a && b || c
```

其中：

```text
a = 1
b = 0
c = 3
```

先算 `&&`：

```text
a && b -> 1 && 0 -> 0
```

再算 `||`：

```text
0 || 3 -> 真
```

在 C 语言中，非 0 就是真，所以执行输出 `T`。

易错点：

- `&&` 的优先级高于 `||`。
- 非 0 都是真，不只有 `1` 才是真。

### 改错题

3. 找出并改正下面程序中的错误。

```c
#include <stdio.h>
int main(void)
{
    int x;
    scanf("%d", &x);
    if (x = 0) {
        printf("zero\n");
    }
    else {
        printf("not zero\n");
    }
    return 0;
}
```

答案：

错误点：

```c
if (x = 0) {
    ...
}
```

这里写成了赋值，应该写成判断相等：

```c
if (x == 0) {
    ...
}
```

完整修正代码：

```c
#include <stdio.h>

int main(void)
{
    int x;

    scanf("%d", &x);

    if (x == 0) {
        printf("zero\n");
    }
    else {
        printf("not zero\n");
    }

    return 0;
}
```

易错点：

- `=` 是赋值。
- `==` 才是判断两边是否相等。

4. 修改下面程序，使它能正确判断奇偶性。

```c
#include <stdio.h>
int main(void)
{
    int n;
    scanf("%d", &n);
    if (n % 2 = 0) {
        printf("even\n");
    }
    else {
        printf("odd\n");
    }
    return 0;
}
```

答案：

错误点：

```c
if (n % 2 = 0) {
    ...
}
```

判断余数是否等于 `0`，应该写：

```c
if (n % 2 == 0) {
    ...
}
```

完整修正代码：

```c
#include <stdio.h>

int main(void)
{
    int n;

    scanf("%d", &n);

    if (n % 2 == 0) {
        printf("even\n");
    }
    else {
        printf("odd\n");
    }

    return 0;
}
```

易错点：

- 偶数判断模板：`n % 2 == 0`。
- 不要把判断相等写成赋值。

### 手写程序题

5. 输入一个整数，判断是正数、负数还是 0。

答案：

```c
#include <stdio.h>

int main(void)
{
    int x;

    scanf("%d", &x);

    if (x > 0) {
        printf("positive\n");
    }
    else if (x < 0) {
        printf("negative\n");
    }
    else {
        printf("zero\n");
    }

    return 0;
}
```

易错点：

- `0` 要单独处理，既不是正数也不是负数。

6. 输入两个整数，输出较大值。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a, b;

    scanf("%d%d", &a, &b);

    if (a > b) {
        printf("%d\n", a);
    }
    else {
        printf("%d\n", b);
    }

    return 0;
}
```

易错点：

- 如果两个数相等，输出任意一个都可以，因为较大值就是它本身。

7. 输入三个整数，输出最大值。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a, b, c, max;

    scanf("%d%d%d", &a, &b, &c);

    max = a;
    if (b > max) {
        max = b;
    }
    if (c > max) {
        max = c;
    }

    printf("%d\n", max);

    return 0;
}
```

易错点：

- 先假设第一个数最大，再依次比较，这种写法最稳。

8. 输入一个成绩，输出等级 `A/B/C/D/E`。

答案：

```c
#include <stdio.h>

int main(void)
{
    int score;

    scanf("%d", &score);

    if (score < 0 || score > 100) {
        printf("invalid\n");
    }
    else if (score >= 90) {
        printf("A\n");
    }
    else if (score >= 80) {
        printf("B\n");
    }
    else if (score >= 70) {
        printf("C\n");
    }
    else if (score >= 60) {
        printf("D\n");
    }
    else {
        printf("E\n");
    }

    return 0;
}
```

易错点：

- `else if` 的顺序很重要，要从高分到低分判断。
- 最好先判断成绩是否合法。

9. 输入一年份，判断是否为闰年。

答案：

```c
#include <stdio.h>

int main(void)
{
    int year;

    scanf("%d", &year);

    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        printf("leap year\n");
    }
    else {
        printf("not leap year\n");
    }

    return 0;
}
```

易错点：

- 闰年规则：能被 4 整除且不能被 100 整除，或者能被 400 整除。
- `&&` 和 `||` 混用时建议加括号。

10. 输入一个整数，判断奇偶性。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n;

    scanf("%d", &n);

    if (n % 2 == 0) {
        printf("even\n");
    }
    else {
        printf("odd\n");
    }

    return 0;
}
```

易错点：

- 判断奇偶只看除以 2 的余数。

11. 输入一个月份，输出这个月有多少天。

答案：

```c
#include <stdio.h>

int main(void)
{
    int month;

    scanf("%d", &month);

    switch (month)
    {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        printf("31\n");
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        printf("30\n");
        break;
    case 2:
        printf("28 or 29\n");
        break;
    default:
        printf("invalid\n");
        break;
    }

    return 0;
}
```

易错点：

- 只输入月份时，2 月无法确定是 28 天还是 29 天，因为还需要年份。
- `switch` 里别忘了 `break`。

12. 输入三条边，判断能否构成三角形。

答案：

```c
#include <stdio.h>

int main(void)
{
    double a, b, c;

    scanf("%lf%lf%lf", &a, &b, &c);

    if (a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a) {
        printf("yes\n");
    }
    else {
        printf("no\n");
    }

    return 0;
}
```

易错点：

- 三条边都必须大于 `0`。
- 任意两边之和都要大于第三边。

13. 输入一个字符，判断是否为大写字母。

答案：

```c
#include <stdio.h>

int main(void)
{
    char c;

    scanf("%c", &c);

    if (c >= 'A' && c <= 'Z') {
        printf("yes\n");
    }
    else {
        printf("no\n");
    }

    return 0;
}
```

易错点：

- 字符范围判断要写成 `c >= 'A' && c <= 'Z'`，不能写成 `'A' <= c <= 'Z'`。

14. 输入一个整数，判断它是否是 3 和 5 的公倍数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n;

    scanf("%d", &n);

    if (n % 3 == 0 && n % 5 == 0) {
        printf("yes\n");
    }
    else {
        printf("no\n");
    }

    return 0;
}
```

易错点：

- “3 和 5 的公倍数”表示同时能被 3 和 5 整除，用 `&&`。

15. 使用条件运算符写出求两个整数最小值的程序。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a, b, min;

    scanf("%d%d", &a, &b);

    min = (a < b) ? a : b;
    printf("%d\n", min);

    return 0;
}
```

易错点：

- 条件运算符格式是 `条件 ? 条件成立的值 : 条件不成立的值`。

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
