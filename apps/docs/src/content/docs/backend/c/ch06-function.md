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

这里的 `void hello(void)` 里其实有两个 `void`，但它们的意思不一样：

- 前面的 `void`：表示这个函数**没有返回值**。
- 括号里的 `void`：表示这个函数**没有参数**。

也就是说：

```c
void hello(void)
```

可以拆开理解成：

- `hello` 这个函数执行一个动作
- 不需要传入任何数据
- 执行完以后也不返回结果

再看一个对比例子：

```c
int square(int x)
```

这里：

- 前面的 `int` 表示函数执行后会返回一个整数
- 括号里的 `int x` 表示调用这个函数时，要传入一个整型参数 `x`

还有一个你很容易混淆的点：

- `hello(void)`：明确表示“无参数”，这是标准、清晰的写法。
- `hello()`：在 C 语言里更接近“参数没有写明”，初学阶段不要把它当成严格意义上的“无参函数”写法。

所以以后看到：

- `int main(void)`：表示 `main` 没有参数，但会返回一个 `int`
- `void print_line(void)`：表示 `print_line` 没有参数，也没有返回值

**最后看看实际中的效果**

![20260413174004](https://tuchuang.coder-sunshine.top/images/20260413174004.png)

![20260413174030](https://tuchuang.coder-sunshine.top/images/20260413174030.png)

可以从图片中看到，第一个是黄色的警告（这个时候代码是可以运行的），第二个是直接报错了（编译不了）。

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

这里前面的 `void` 是“无返回值”，括号里的 `(void)` 是“无参数”，两个位置的含义不要混在一起。

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
    if (n == 1) {
        return 1;
    }
    return n * fact(n - 1);
}
```

递归一定要有结束条件，否则会无限调用。

## 11. 本章常见模板

### 11.1 求最大值函数

```c
int max(int a, int b)
{
    if (a > b) {
        return a;
    }
    else {
        return b;
    }
}
```

### 11.2 判断奇偶函数

```c
int is_even(int n)
{
    if (n % 2 == 0) {
        return 1;
    }
    else {
        return 0;
    }
}
```

### 11.3 数组求和函数

```c
int sum(int a[], int n)
{
    int i, s = 0;
    for (i = 0; i < n; i++) {
        s += a[i];
    }
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

答案：

```text
5
```

解析：

`f(a)` 调用时，把 `a` 的值 `5` 传给形参 `x`。函数内部修改的是形参 `x`，不会改变 `main` 里的 `a`。而且这里没有接收 `f(a)` 的返回值，所以 `a` 仍然是 `5`。

易错点：

- C 语言函数参数默认是值传递。
- 函数里改形参，不会直接改外面的实参变量。

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

答案：

```text
1 2 3
```

解析：

`static int a = 0;` 只初始化一次，并且每次函数调用结束后，`a` 的值会保留下来。

三次调用过程：

```text
第 1 次：a 从 0 变成 1，返回 1
第 2 次：a 从 1 变成 2，返回 2
第 3 次：a 从 2 变成 3，返回 3
```

易错点：

- 普通局部变量每次进入函数重新创建。
- `static` 局部变量只初始化一次，值会保留。

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

答案：

```text
10
100
```

解析：

全局变量：

```c
int a = 100;
```

函数 `fun` 内部又定义了局部变量：

```c
int a = 10;
```

在 `fun` 内部，局部变量 `a` 会临时“遮住”全局变量 `a`，所以 `fun()` 输出 `10`。回到 `main` 后，访问的是全局变量 `a`，所以输出 `100`。

易错点：

- 局部变量和全局变量同名时，局部变量优先。

### 手写程序题

4. 写函数 `max(int a, int b)`，返回两个数中的较大值。

答案：

```c
int max(int a, int b)
{
    if (a > b) {
        return a;
    }
    return b;
}
```

易错点：

- 函数有返回值时，记得写 `return`。

5. 写函数 `sum(int n)`，返回 `1 + 2 + ... + n`。

答案：

```c
int sum(int n)
{
    int i;
    int s = 0;

    for (i = 1; i <= n; i++) {
        s += i;
    }

    return s;
}
```

易错点：

- 求和初值是 `0`。
- 循环要包含 `n`，条件写 `i <= n`。

6. 写函数 `is_even(int n)`，判断一个数是否为偶数。

答案：

```c
int is_even(int n)
{
    return n % 2 == 0;
}
```

易错点：

- 表达式 `n % 2 == 0` 成立时值为 `1`，不成立时值为 `0`。

7. 写函数求三个整数中的最大值。

答案：

```c
int max3(int a, int b, int c)
{
    int max = a;

    if (b > max) {
        max = b;
    }
    if (c > max) {
        max = c;
    }

    return max;
}
```

易错点：

- 先假设第一个数最大，再逐个比较。

8. 写函数判断一个年份是否为闰年。

答案：

```c
int is_leap_year(int year)
{
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
```

易错点：

- 闰年规则里的 `&&` 和 `||` 建议加括号。

9. 写函数求两个整数的最大公约数。

答案：

```c
int gcd(int a, int b)
{
    int t;

    while (b != 0)
    {
        t = a % b;
        a = b;
        b = t;
    }

    return a;
}
```

易错点：

- 辗转相除法循环结束时，`a` 是最大公约数。

10. 写函数判断一个正整数是否为素数。

答案：

```c
int is_prime(int n)
{
    int i;

    if (n <= 1) {
        return 0;
    }

    for (i = 2; i < n; i++) {
        if (n % i == 0) {
            return 0;
        }
    }

    return 1;
}
```

易错点：

- `1` 不是素数。
- 发现一个因子就可以直接返回 `0`。

11. 在主函数中调用上题函数，输出 1 到 100 之间所有素数。

答案：

```c
#include <stdio.h>

int is_prime(int n)
{
    int i;

    if (n <= 1) {
        return 0;
    }

    for (i = 2; i < n; i++) {
        if (n % i == 0) {
            return 0;
        }
    }

    return 1;
}

int main(void)
{
    int i;

    for (i = 1; i <= 100; i++) {
        if (is_prime(i)) {
            printf("%d ", i);
        }
    }

    return 0;
}
```

易错点：

- 调用函数前要先定义函数，或者在前面写函数声明。

12. 用递归函数求 `n!`。

答案：

```c
long long fact(int n)
{
    if (n == 0 || n == 1) {
        return 1;
    }

    return n * fact(n - 1);
}
```

易错点：

- 递归必须有结束条件。
- 阶乘增长很快，建议用 `long long`。

13. 用递归函数求斐波那契数列第 `n` 项。

答案：

```c
int fib(int n)
{
    if (n == 1 || n == 2) {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
}
```

易错点：

- 这里按第 1 项和第 2 项都为 `1` 来写。
- 递归版本容易重复计算，适合初学理解，不适合很大的 `n`。

14. 写函数求数组元素之和。

答案：

```c
int array_sum(int a[], int n)
{
    int i;
    int sum = 0;

    for (i = 0; i < n; i++) {
        sum += a[i];
    }

    return sum;
}
```

易错点：

- 数组传参时，通常还要额外传数组长度 `n`。

15. 写函数统计字符串长度。

答案：

```c
int my_strlen(char s[])
{
    int len = 0;

    while (s[len] != '\0') {
        len++;
    }

    return len;
}
```

易错点：

- 字符串长度不包括结尾的 `'\0'`。

16. 写函数将一个字符串中的小写字母转换为大写字母。

答案：

```c
void to_upper(char s[])
{
    int i;

    for (i = 0; s[i] != '\0'; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] = s[i] - 'a' + 'A';
        }
    }
}
```

易错点：

- 这个函数直接修改传入的字符数组。
- 字符串常量不能传进来修改，应该传字符数组。

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

答案：

原程序的核心问题是：`add` 被声明为返回 `int`，但函数内部没有 `return`，只是打印了结果。主函数里又写了：

```c
c = add(2, 3);
```

这说明 `add` 应该返回两个数之和。

正确写法：

```c
#include <stdio.h>

int add(int x, int y)
{
    return x + y;
}

int main(void)
{
    int c;

    c = add(2, 3);
    printf("%d\n", c);

    return 0;
}
```

易错点：

- 如果函数要把结果交给调用者，就用 `return`。
- 如果函数只是负责输出，可以写成 `void`，但主函数就不能再 `c = add(...)`。

18. 修改下面递归函数，使其能正确计算阶乘。

```c
int fact(int n)
{
    return n * fact(n - 1);
}
```

答案：

```c
int fact(int n)
{
    if (n == 0 || n == 1) {
        return 1;
    }

    return n * fact(n - 1);
}
```

解析：

原函数没有递归出口，会一直调用下去：

```text
fact(n) -> fact(n-1) -> fact(n-2) -> ...
```

所以必须加结束条件。

易错点：

- 递归函数必须有“什么时候停止”的条件。
- `0!` 和 `1!` 都是 `1`。

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
