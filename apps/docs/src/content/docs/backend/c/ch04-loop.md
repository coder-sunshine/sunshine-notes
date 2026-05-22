---
title: 第 4 章 循环结构程序设计
description: C 语言循环结构入门，重点掌握 while、do-while、for、goto 以及 break 和 continue 的使用。
---

## 对应教材目录

- 4.1 while 语句
- 4.2 do-while 语句
- 4.3 for 语句
- 4.4 goto 语句
- 4.5 循环嵌套
- 4.6 break 语句
- 4.7 continue 语句
- 4.8 编程实战

## 本章目标

学完这一章，你应该能做到：

- 理解循环的本质是“重复执行”。
- 会写 `while`、`do-while`、`for`。
- 会分析循环变量的变化过程。
- 知道 `goto` 的基本写法和使用场景。
- 会写简单的循环嵌套。
- 会使用 `break` 和 `continue`。
- 能独立解决求和、阶乘、素数、图形输出等题目。

## 1. 什么是循环

循环就是让一段代码重复执行多次。

循环最重要的是三件事：

- 初值
- 条件
- 变化

如果这三件事没有想清楚，循环题一般都会出错。

## 2. while 语句

先判断条件，再决定执不执行。

```c
while (条件)
{
    语句;
}
```

示例：输出 1 到 5。

```c
#include <stdio.h>

int main(void)
{
    int i = 1;
    while (i <= 5)
    {
        printf("%d ", i);
        i++;
    }
    return 0;
}
```

## 3. do-while 语句

先执行一次，再判断条件。

```c
do
{
    语句;
} while (条件);
```

它的特点是至少执行一次。

## 4. for 语句

当循环次数比较明确时，`for` 最好用。

```c
for (初值; 条件; 变化)
{
    语句;
}
```

示例：求 1 到 100 的和。

```c
#include <stdio.h>

int main(void)
{
    int i, sum = 0;
    for (i = 1; i <= 100; i++)
    {
        sum += i;
    }
    printf("%d\n", sum);
    return 0;
}
```

## 5. goto 语句

`goto` 的作用是让程序直接跳转到某个指定位置继续执行。

基本写法：

```c
goto 标签名;

标签名:
    语句;
```

先看一个最简单的例子：

```c
#include <stdio.h>

int main(void)
{
    int i = 1;

start:
    if (i > 5) {
        goto end;
    }

    printf("%d ", i);
    i++;
    goto start;

end:
    return 0;
}
```

这个程序也能输出 `1 2 3 4 5`，但它其实是在“手动跳来跳去”模拟循环。

所以要记住：

- `goto` 能用，但一般不推荐乱用。
- 如果能用 `while`、`for`、`break`、`continue` 解决，就优先不用 `goto`。
- `goto` 用多了，程序流程会很乱，不容易看懂，也不容易排错。

在循环里，`goto` 偶尔会用于“直接跳出多层循环”。

例如：

```c
#include <stdio.h>

int main(void)
{
    int i, j;

    for (i = 1; i <= 3; i++)
    {
        for (j = 1; j <= 3; j++)
        {
            if (i == 2 && j == 2) {
                goto finish;
            }
            printf("(%d, %d)\n", i, j);
        }
    }

finish:
    printf("循环结束\n");
    return 0;
}
```

当 `i == 2 && j == 2` 时，程序会直接跳到 `finish:`，外层和内层循环都会一起结束。

## 6. break 和 continue

### break

立即结束整个循环。

### continue

跳过本次循环后面的语句，直接进入下一轮。

示例：

```c
for (i = 1; i <= 5; i++)
{
    if (i == 3) {
        continue;
    }
    printf("%d ", i);
}
```

输出为：

```text
1 2 4 5
```

## 7. 循环嵌套

循环里再套循环，常用于：

- 九九乘法表
- 图形输出
- 二维数组遍历

示例：输出一个 3 行 4 列的星号矩形。

```c
#include <stdio.h>

int main(void)
{
    int i, j;
    for (i = 1; i <= 3; i++)
    {
        for (j = 1; j <= 4; j++)
        {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}
```

## 8. 本章常见模板

### 7.1 累加模板

```c
sum = 0;
for (i = 1; i <= n; i++)
{
    sum += i;
}
```

### 7.2 连乘模板

```c
fact = 1;
for (i = 1; i <= n; i++)
{
    fact *= i;
}
```

### 7.3 统计模板

```c
count = 0;
for (i = 1; i <= n; i++)
{
    if (条件成立) {
        count++;
    }
}
```

### 7.4 找最大值模板

```c
max = 第一个值;
for (后续每个值)
{
    if (当前值 > max) {
        max = 当前值;
    }
}
```

## 9. 本章最容易错的点

- 少循环一次或多循环一次。
- 忘记更新循环变量，导致死循环。
- 把 `goto` 当成普通循环工具，结果流程越来越乱。
- 把 `break` 和 `continue` 用反。
- 循环嵌套时弄混内层和外层变量。
- 在处理数字拆位时，没有注意循环什么时候结束。

## 10. 手写题

### 写结果题

1. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    int i;
    for (i = 1; i <= 5; i++)
    {
        if (i == 3) {
            continue;
        }
        printf("%d ", i);
    }
    return 0;
}
```

答案：

```text
1 2 4 5
```

解析：

循环中当 `i == 3` 时执行 `continue`，会跳过本次循环后面的 `printf`，直接进入下一轮循环。所以 `3` 不会输出。

易错点：

- `continue` 是跳过本轮循环剩下的语句，不是结束整个循环。

2. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    int i;
    for (i = 1; i <= 5; i++)
    {
        if (i == 3) {
            break;
        }
        printf("%d ", i);
    }
    return 0;
}
```

答案：

```text
1 2
```

解析：

循环中当 `i == 3` 时执行 `break`，整个循环直接结束，所以只输出 `1 2`。

易错点：

- `break` 是结束整个循环。
- `continue` 是跳过本轮，继续下一轮。

### 手写程序题

3. 用 `while` 求 `1 + 2 + ... + 100`。

答案：

```c
#include <stdio.h>

int main(void)
{
    int i = 1;
    int sum = 0;

    while (i <= 100)
    {
        sum += i;
        i++;
    }

    printf("%d\n", sum);
    return 0;
}
```

易错点：

- `sum` 初值要是 `0`。
- 循环里要写 `i++`，否则会死循环。

4. 用 `for` 输出 `1` 到 `100` 中所有奇数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int i;

    for (i = 1; i <= 100; i++) {
        if (i % 2 != 0) {
            printf("%d ", i);
        }
    }

    return 0;
}
```

易错点：

- 奇数判断：`i % 2 != 0`。

5. 输入一个正整数 `n`，求 `n!`。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n, i;
    long long fact = 1;

    scanf("%d", &n);

    for (i = 1; i <= n; i++) {
        fact *= i;
    }

    printf("%lld\n", fact);
    return 0;
}
```

易错点：

- 阶乘是乘法累积，所以初值要写 `1`，不能写 `0`。
- 阶乘增长很快，普通 `int` 容易溢出。

6. 输入一个正整数，求它有几位数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n;
    int count = 0;

    scanf("%d", &n);

    if (n == 0) {
        count = 1;
    }
    else
    {
        while (n != 0)
        {
            count++;
            n /= 10;
        }
    }

    printf("%d\n", count);
    return 0;
}
```

易错点：

- 每执行一次 `n /= 10`，就去掉一位。
- 如果允许输入 `0`，要单独处理，因为 `0` 是 1 位数。

7. 输入一个整数，逆序输出它的每一位。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n;

    scanf("%d", &n);

    if (n == 0) {
        printf("0");
    }

    while (n != 0)
    {
        printf("%d", n % 10);
        n /= 10;
    }

    printf("\n");
    return 0;
}
```

易错点：

- 取个位用 `n % 10`。
- 去掉个位用 `n / 10`。

8. 判断一个正整数是否为素数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n, i;
    int is_prime = 1;

    scanf("%d", &n);

    if (n <= 1) {
        is_prime = 0;
    }
    else
    {
        for (i = 2; i < n; i++) {
            if (n % i == 0) {
                is_prime = 0;
            }
        }
    }

    if (is_prime) {
        printf("prime\n");
    }
    else {
        printf("not prime\n");
    }

    return 0;
}
```

易错点：

- `1` 不是素数。
- 判断素数从 `2` 开始试除，不要从 `1` 开始。

9. 输出 `100` 到 `999` 之间所有水仙花数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n, a, b, c;

    for (n = 100; n <= 999; n++)
    {
        a = n / 100;
        b = n / 10 % 10;
        c = n % 10;

        if (a * a * a + b * b * b + c * c * c == n) {
            printf("%d ", n);
        }
    }

    return 0;
}
```

易错点：

- 三位水仙花数：每一位数字的立方和等于原数。

10. 输出九九乘法表。

答案：

```c
#include <stdio.h>

int main(void)
{
    int i, j;

    for (i = 1; i <= 9; i++)
    {
        for (j = 1; j <= i; j++) {
            printf("%d*%d=%d\t", j, i, i * j);
        }
        printf("\n");
    }

    return 0;
}
```

易错点：

- 外层控制行，内层控制列。
- 每一行结束后要输出换行。

11. 输出下列图形：

```text
*
**
***
****
*****
```

答案：

```c
#include <stdio.h>

int main(void)
{
    int i, j;

    for (i = 1; i <= 5; i++)
    {
        for (j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\n");
    }

    return 0;
}
```

易错点：

- 第 `i` 行输出 `i` 个星号。
- 内层循环结束后再换行。

12. 输入 `n`，求 `1 + 1/2 + 1/3 + ... + 1/n`。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n, i;
    double sum = 0;

    scanf("%d", &n);

    for (i = 1; i <= n; i++) {
        sum += 1.0 / i;
    }

    printf("%f\n", sum);
    return 0;
}
```

易错点：

- 要写 `1.0 / i`，不要写 `1 / i`。`1 / i` 是整数除法，很多项会变成 `0`。

13. 求两个整数的最大公约数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a, b, t;

    scanf("%d%d", &a, &b);

    while (b != 0)
    {
        t = a % b;
        a = b;
        b = t;
    }

    printf("%d\n", a);
    return 0;
}
```

易错点：

- 这是辗转相除法。
- 循环条件是 `b != 0`，最后 `a` 是最大公约数。

14. 输入若干个成绩，直到输入负数为止，统计及格人数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int score;
    int count = 0;

    scanf("%d", &score);
    while (score >= 0)
    {
        if (score >= 60) {
            count++;
        }

        scanf("%d", &score);
    }

    printf("%d\n", count);
    return 0;
}
```

易错点：

- 负数只是结束标志，不应该被统计。
- 循环里最后要再次输入，否则会死循环。

15. 输出 1 到 100 中所有能被 3 整除但不能被 5 整除的数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int i;

    for (i = 1; i <= 100; i++) {
        if (i % 3 == 0 && i % 5 != 0) {
            printf("%d ", i);
        }
    }

    return 0;
}
```

易错点：

- “能被 3 整除”是 `i % 3 == 0`。
- “不能被 5 整除”是 `i % 5 != 0`。
- 两个条件同时满足，用 `&&`。

### 提升题

16. 输出一个等腰三角形。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n, i, j;

    scanf("%d", &n);

    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= n - i; j++) {
            printf(" ");
        }

        for (j = 1; j <= 2 * i - 1; j++) {
            printf("*");
        }

        printf("\n");
    }

    return 0;
}
```

易错点：

- 第 `i` 行前面有 `n - i` 个空格。
- 第 `i` 行有 `2 * i - 1` 个星号。

17. 求斐波那契数列前 `n` 项。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n, i;
    long long a = 1, b = 1, c;

    scanf("%d", &n);

    for (i = 1; i <= n; i++)
    {
        if (i == 1 || i == 2) {
            printf("1 ");
        }
        else
        {
            c = a + b;
            printf("%lld ", c);
            a = b;
            b = c;
        }
    }

    return 0;
}
```

易错点：

- 前两项通常是 `1, 1`。
- 每轮算出新项后，要更新前两项。

18. 统计一个整数中数字 `0` 出现的次数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n;
    int count = 0;

    scanf("%d", &n);

    if (n == 0) {
        count = 1;
    }
    else
    {
        if (n < 0) {
            n = -n;
        }

        while (n != 0)
        {
            if (n % 10 == 0) {
                count++;
            }
            n /= 10;
        }
    }

    printf("%d\n", count);
    return 0;
}
```

易错点：

- 输入 `0` 时，数字 `0` 出现 1 次。
- 如果允许负数，可以先把它转成正数处理。

## 11. 自测清单

- 我能说清楚 `while`、`do-while`、`for` 的区别。
- 我会写求和、求阶乘、统计个数这几类基础循环题。
- 我能独立分析循环变量如何变化。
- 我知道 `goto` 能跳转到标签，但平时不会乱用。
- 我会使用 `break` 和 `continue`。
- 我能写简单的循环嵌套程序。

## 12. 学习建议

- 循环题不要急着写代码，先把“从哪开始，到哪结束，每次怎么变”写在纸上。
- 如果输出不对，就把每次循环里变量的值都列出来。
- 第 4 章是后面数组、函数、指针的基础，一定要练熟。

学完这一章后，你就能解决大量“重复处理”的问题了。
