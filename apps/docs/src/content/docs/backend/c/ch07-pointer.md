---
title: 第 7 章 指针
description: C 语言指针入门，系统讲解变量与指针、数组与指针、字符串与指针、函数与指针以及多级指针。
---

## 对应教材目录

- 7.1 变量与指针
- 7.1.1 地址与指针
- 7.1.2 指向变量的指针变量
- 7.1.3 指针变量作函数参数
- 7.2 数组与指针
- 7.2.1 指针与一维数组的联系
- 7.2.2 指针与二维数组的联系
- 7.2.3 指向数组的指针作函数参数
- 7.3 字符串与指针
- 7.3.1 字符指针变量的定义与初始化
- 7.3.2 字符指针作函数参数
- 7.4 函数与指针
- 7.4.1 指向函数的指针
- 7.4.2 返回指针的函数
- 7.5 指针数组和多级指针
- 7.5.1 指针数组
- 7.5.2 多级指针
- 7.5.3 `main` 函数的形参
- 7.6 编程实战
- 7.7 指针小结

## 本章目标

学完这一章，你应该能做到：

- 知道什么是地址，什么是指针。
- 会用 `&` 取地址，会用 `*` 访问地址中的内容。
- 会定义、初始化和使用最基本的指针变量。
- 能用指针作为函数参数，真正修改函数外部变量。
- 理解数组名、字符串和指针之间的联系。
- 能初步看懂函数指针、指针数组和二级指针。
- 能独立完成交换数据、遍历数组、处理字符串等基础题。

## 1. 为什么要学指针

指针是 C 语言最有代表性的内容之一。

前面你已经学过：

- 变量
- 数组
- 字符串
- 函数

到了这一章，你会发现它们其实都和“地址”有关。

学指针的意义主要有三个：

- 让函数可以间接修改外部变量。
- 更灵活地处理数组和字符串。
- 为后面的结构体、链表、动态内存等内容打基础。

一开始不要把指针想得太神秘。

你可以先把它理解成一句话：

**指针就是“专门存地址的变量”。**

## 2. 地址与指针

每个变量在内存中都有自己的存储位置，这个位置就叫地址。

例如：

```c
int a = 10;
```

变量 `a` 不仅有值 `10`，它还有一个地址。

想得到变量地址，可以用取地址运算符 `&`：

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    printf("%p\n", (void *)&a);
    return 0;
}
```

这里的 `%p` 用来输出地址。

你会看到一串十六进制形式的内容，那就是 `a` 的地址。

这里你可能会有一个疑问：

```c
printf("%p\n", &a);
```

和

```c
printf("%p\n", (void *)&a);
```

有什么区别？

先说最直接的结论：

- 这两个写法输出出来通常是同一个地址。
- 地址本身没有变。
- `(void *)` 做的是**类型转换**，不是“改地址”。

你可以这样理解：

- `&a`：表示取出变量 `a` 的地址。
- `&a` 的类型其实是 `int *`，意思是“指向 `int` 的指针”。
- `(void *)&a`：表示先取出 `a` 的地址，再把它转成 `void *` 类型。

这里的 `void *` 可以先把它理解成“通用地址类型”。

也就是说：

- `int *`：强调“这是一个指向整型变量的地址”
- `void *`：强调“这是一个地址”，但先不强调它具体指向什么类型

那为什么我在笔记里写成 `(void *)&a` 呢？

因为 `%p` 是专门用来输出地址的，占位符更规范地对应 `void *` 类型。

所以：

```c
printf("%p\n", (void *)&a);
```

是更标准、更严谨的写法。

但对初学阶段来说，你也可以先把它记成：

- `printf("%p\n", &a);` 也常常能正常输出地址
- `printf("%p\n", (void *)&a);` 只是写得更规范一些

你现在最需要记住的是：

- `&a` 是“取地址”
- `(void *)&a` 还是这个地址，只是把它转换成了 `void *`
- `(void *)` 不是在“改值”，也不是在“改地址”，只是告诉编译器：“把这个地址当成通用地址来看”

### 2.1 什么是指针

如果一个变量专门用来保存地址，那么这个变量就叫指针变量。

例如：

```c
int a = 10;
int *p = &a;
```

这里：

- `a` 是普通整型变量。
- `&a` 表示 `a` 的地址。
- `p` 是一个指向 `int` 的指针变量。

也就是说，`p` 里面存的不是 10，而是 `a` 的地址。

### 2.2 `*` 的两个常见含义

这一章最容易混的就是 `*`。

它在不同位置，含义不一样：

- `int *p;` 里的 `*`：表示 `p` 是一个指针变量。
- `*p` 里的 `*`：表示访问 `p` 所指向地址中的内容。

看例子：

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int *p = &a;

    printf("%d\n", a);
    printf("%d\n", *p);
    return 0;
}
```

输出的两个值都是 `10`。

这是因为：

- `a` 直接访问变量本身
- `*p` 是通过地址间接访问变量本身

### 2.3 通过指针修改变量

指针最重要的作用之一，就是可以通过地址修改变量。

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int *p = &a;

    *p = 99;

    printf("%d\n", a);
    return 0;
}
```

输出结果是：

```text
99
```

因为 `p` 指向 `a`，所以 `*p = 99;` 本质上就是把 `a` 改成了 `99`。

## 3. 指向变量的指针变量

指针变量也有自己的类型。

例如：

- `int *p;` 表示 `p` 指向 `int`
- `char *p;` 表示 `p` 指向 `char`
- `double *p;` 表示 `p` 指向 `double`

类型要对应，不能乱指。

### 3.1 最基本的写法

```c
int a = 5;
int *p = &a;
```

这是最常见的三步：

1. 先有一个普通变量。
2. 再定义一个对应类型的指针变量。
3. 用地址给指针赋值。

### 3.2 指针重新指向别的变量

指针变量可以改变指向对象。

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int b = 20;
    int *p = &a;

    printf("%d\n", *p);

    p = &b;
    printf("%d\n", *p);
    return 0;
}
```

输出为：

```text
10
20
```

说明 `p` 一开始指向 `a`，后来改成指向 `b`。

### 3.3 指针没有初始化时不要使用

下面这种写法是错误的：

```c
int *p;
*p = 10;
```

因为 `p` 这时还没有指向一个合法地址。

初学阶段你可以记住一个规则：

- 先让指针指向一个确定对象，再使用 `*p`

如果一开始还不确定指向哪里，可以先写成：

```c
int *p = NULL;
```

但这里一定要特别注意：

- `NULL` 的意思是“空指针”
- 它表示 `p` 目前**没有指向任何有效对象**
- 所以这时候仍然**不能**直接使用 `*p`

下面这种写法仍然是错误的：

```c
int *p = NULL;
*p = 10;
printf("%d\n", *p);
```

它会在运行时直接报错

所以你可以把 `NULL` 理解成：

- 先给指针一个“明确的空状态”
- 方便后面再判断、再赋真正的地址
- 但不是说写成 `NULL` 以后就能直接通过 `*p` 访问数据

正确写法应该是先让它指向一个合法变量，再使用：

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int *p = NULL;

    p = &a;
    *p = 20;

    printf("%d\n", *p);
    printf("%d\n", a);
    return 0;
}
```

输出为：

```text
20
20
```

因为在 `p = &a;` 之后，`p` 才真正指向了一个合法地址。

## 4. 指针变量作函数参数

前面你学函数时已经知道：普通参数传递是值传递。

也就是说，函数拿到的是副本，不是原变量本身。

所以如果这样写交换函数：

```c
void swap(int a, int b)
{
    int t = a;
    a = b;
    b = t;
}
```

它并不能真正交换主函数中的两个变量。

想真正修改外面的变量，就要把地址传进去。

### 4.1 交换两个变量

```c
#include <stdio.h>

void swap(int *a, int *b)
{
    int t = *a;
    *a = *b;
    *b = t;
}

int main(void)
{
    int x = 3;
    int y = 5;

    swap(&x, &y);

    printf("%d %d\n", x, y);
    return 0;
}
```

输出为：

```text
5 3
```

这里一定要看清两层意思：

- 调用时写 `swap(&x, &y)`，传进去的是地址。
- 函数里写 `*a`、`*b`，改的是地址里的真实内容。

### 4.2 用指针参数让函数“带回多个结果”

有时一个函数不仅要算结果，还想顺便把别的信息也带回来，这时也常用指针参数。

例如：求两个数的较大值和较小值。

```c
#include <stdio.h>

void get_max_min(int a, int b, int *max, int *min)
{
    if (a > b)
    {
        *max = a;
        *min = b;
    }
    else
    {
        *max = b;
        *min = a;
    }
}

int main(void)
{
    int max, min;
    get_max_min(8, 3, &max, &min);
    printf("%d %d\n", max, min);
    return 0;
}
```

## 5. 数组与指针

数组和指针的关系，是这一章最核心的部分。

### 5.1 指针与一维数组的联系

在大多数表达式中，数组名可以看成数组首元素的地址。

例如：

```c
int a[5] = {10, 20, 30, 40, 50};
```

这里数组名 `a`，很多时候就相当于 `&a[0]`。

所以：

- `a[0]` 等价于 `*a`
- `a[1]` 等价于 `*(a + 1)`
- `a[i]` 等价于 `*(a + i)`

看例子：

```c
#include <stdio.h>

int main(void)
{
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;

    printf("%d\n", a[0]);
    printf("%d\n", *p);
    printf("%d\n", *(p + 2));
    printf("%d\n", p[3]);
    return 0;
}
```

输出为：

```text
10
10
30
40
```

### 5.2 用指针遍历一维数组

```c
#include <stdio.h>

int main(void)
{
    int a[5] = {1, 2, 3, 4, 5};
    int *p = a;

    while (p < a + 5)
    {
        printf("%d ", *p);
        p++;
    }
    return 0;
}
```

这里的 `p++` 不是地址只加 1 个字节，而是自动移动到下一个同类型元素。

也就是说：

- `int *` 每次跳到下一个整数位置
- `char *` 每次跳到下一个字符位置

### 5.3 指针与二维数组的联系

二维数组稍微难一点。

例如：

```c
int a[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
```

这里：

- `a` 表示第一行的地址
- `a + 1` 表示第二行的地址

如果写成指针形式，通常是：

```c
int (*p)[3] = a;
```

注意这里的 `p` 不是“指向单个整数”，而是“指向一行有 3 个整数的数组”。

看例子：

```c
#include <stdio.h>

int main(void)
{
    int a[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    int (*p)[3] = a;

    printf("%d\n", a[1][2]);
    printf("%d\n", p[1][2]);
    printf("%d\n", *(*(a + 1) + 2));
    return 0;
}
```

三个输出都是 `6`。

如果你看到这里有点懵，可以先抓住两个最关键的点：

- `a` 在这里可以先理解成“第 0 行的地址”。
- `p` 不是普通的 `int *`，而是“指向一整行的指针”。

先把这个二维数组想成下面这张表：

| 行号 | 列 0 | 列 1 | 列 2 |
| ---- | ---- | ---- | ---- |
| 0    | 1    | 2    | 3    |
| 1    | 4    | 5    | 6    |

也可以理解成：

```text
a
├── a[0] -> [1][2][3]
└── a[1] -> [4][5][6]
```

如果你想把“地址”也一起想进去，可以先人为给两行起两个名字：

- `R0`：第 0 行的地址
- `R1`：第 1 行的地址

那这个二维数组就可以画成：

```text
a == R0

R0 -> [1][2][3]
R1 -> [4][5][6]
```

因为一行里有 3 个 `int`，所以：

- `a` 指向 `R0`
- `a + 1` 不是跳到数字 `2`
- `a + 1` 是直接跳到下一整行，也就是 `R1`

再看这句：

```c
int (*p)[3] = a;
```

它的意思是：

- `p` 是一个指针
- 它指向“一个包含 3 个 `int` 的数组”
- 也就是说，`p` 指向的是“第 0 行”

所以这里的关系可以先记成：

```text
a  -----> 第 0 行
p  -----> 第 0 行
```

如果你暂时只记一句话，就记这句：

**`p` 指向的不是一个整数，而是一整行。**

再补一张更具体的示意图：

```text
a  -----> 第0行 -> [1][2][3]
p  -----> 第0行 -> [1][2][3]

a + 1 -----> 第1行 -> [4][5][6]
p + 1 -----> 第1行 -> [4][5][6]
```

下面先看一个“表达式对照表”，再看逐步拆解会更容易。

| 表达式            | 你可以先理解成             | 最终对应   |
| ----------------- | -------------------------- | ---------- |
| `a`               | 第 0 行的地址              | `&a[0]`    |
| `a + 1`           | 第 1 行的地址              | `&a[1]`    |
| `*(a + 1)`        | 第 1 行                    | `a[1]`     |
| `(*(a + 1) + 2)`  | 第 1 行第 2 个元素的位置   | `&a[1][2]` |
| `*(*(a + 1) + 2)` | 取出那个位置里的值         | `a[1][2]`  |
| `p[1][2]`         | `p` 跳到第 1 行再取第 2 列 | `a[1][2]`  |

下面把三个输出逐个拆开看。

#### 1. `a[1][2]`

```c
a[1][2]
```

意思是：

- `a[1]`：第 1 行，也就是 `{4, 5, 6}`
- `a[1][2]`：第 1 行第 2 列，也就是 `6`

#### 2. `p[1][2]`

```c
p[1][2]
```

这里虽然换成了 `p`，但本质和上面一样：

- `p` 指向第 0 行
- `p[1]`：往后跳 1 行，也就是第 1 行
- `p[1][2]`：第 1 行第 2 列

所以它也是 `6`。

#### 3. `*(*(a + 1) + 2)`

这一句最难，但可以一步一步拆：

第一步：

```c
a
```

表示第 0 行的地址，也就是 `R0`。

第二步：

```c
a + 1
```

表示往后跳 1 行，所以它指向第 1 行，也就是 `R1`。

注意这里跳的不是 1 个整数，而是 1 整行。

第三步：

```c
*(a + 1)
```

表示取出“第 1 行”。

这一层你可以先理解成：

```text
*(a + 1) == a[1]
```

也就是这一整行：

```text
[4][5][6]
```

第四步：

```c
(*(a + 1) + 2)
```

表示在第 1 行里再往后走 2 个元素，也就是走到 `a[1][2]` 的位置。

你可以把这一层理解成：

```text
(*(a + 1) + 2) == &a[1][2]
```

第五步：

```c
*(*(a + 1) + 2)
```

表示把 `a[1][2]` 这个位置里的值取出来，所以结果就是 `6`。

你可以把这个过程简化记成：

- `a + 1`：到第 1 行
- `*(a + 1)`：拿到第 1 行
- `(*(a + 1) + 2)`：到第 1 行第 2 个元素
- `*(*(a + 1) + 2)`：取出这个元素的值

如果你更喜欢看“整条路径”，可以直接记成：

```text
a
-> 第0行地址
-> a + 1
-> 第1行地址
-> *(a + 1)
-> 第1行
-> (*(a + 1) + 2)
-> 第1行第2个元素的位置
-> *(*(a + 1) + 2)
-> 6
```

最后你可以把这三个式子对应起来：

```c
a[1][2]
p[1][2]
*(*(a + 1) + 2)
```

它们三个表达的是同一个位置，所以结果都是：

```text
6
```

如果你想从“类型”角度再记深一点，可以先只记这两个：

- `a` 更接近“指向一行的指针”
- `p` 也是“指向一行的指针”

所以：

- `a + 1` 跳一行
- `p + 1` 也跳一行

而不是像一维数组里那样每次只跳一个单独元素

这一节你最应该记住的一句话是：

**二维数组里，`a` 很多时候表示第 0 行的地址，`a + 1` 跳到下一行，而不是跳到下一个单独的整数。**

### 5.4 指向数组的指针作函数参数

对一维数组来说，下面两种写法常常等价：

```c
int sum(int a[], int n)
```

```c
int sum(int *a, int n)
```

例如：

```c
int sum(int *a, int n)
{
    int i, s = 0;
    for (i = 0; i < n; i++) {
        s += *(a + i);
    }
    return s;
}
```

对于二维数组，列数通常要写清楚：

```c
void print_matrix(int a[][3], int rows)
{
    int i, j;
    for (i = 0; i < rows; i++)
    {
        for (j = 0; j < 3; j++) {
            printf("%d ", a[i][j]);
        }
        printf("\n");
    }
}
```

## 6. 字符串与指针

字符串本质上就是以 `'\0'` 结尾的一串字符。

所以它和指针关系非常紧密。

### 6.1 字符指针变量的定义与初始化

先看两种常见写法：

```c
char str1[] = "hello";
char *str2 = "hello";
```

它们看起来很像，但不是一回事：

- `str1` 是字符数组。
- `str2` 是字符指针，指向字符串常量的首字符。

字符数组中的内容通常可以改：

```c
str1[0] = 'H';
```

但像下面这种写法，初学阶段不要去改：

```c
str2[0] = 'H';
```

因为它指向的是字符串常量，修改它通常是不安全的。

### 6.2 用字符指针遍历字符串

```c
#include <stdio.h>

int main(void)
{
    char str[] = "sunshine";
    char *p = str;

    while (*p != '\0')
    {
        printf("%c ", *p);
        p++;
    }
    return 0;
}
```

输出为：

```text
s u n s h i n e
```

### 6.3 字符指针作函数参数

字符串处理函数经常写成这种形式：

```c
int my_strlen(char *s)
{
    int len = 0;
    while (*s != '\0')
    {
        len++;
        s++;
    }
    return len;
}
```

完整例子：

```c
#include <stdio.h>

int my_strlen(char *s)
{
    int len = 0;
    while (*s != '\0')
    {
        len++;
        s++;
    }
    return len;
}

int main(void)
{
    char str[] = "hello";
    printf("%d\n", my_strlen(str));
    return 0;
}
```

再看一个把字符串改成大写的例子：

```c
#include <stdio.h>

void to_upper(char *s)
{
    while (*s != '\0')
    {
        if (*s >= 'a' && *s <= 'z') {
            *s = *s - 'a' + 'A';
        }
        s++;
    }
}

int main(void)
{
    char str[] = "hello c";
    to_upper(str);
    printf("%s\n", str);
    return 0;
}
```

## 7. 函数与指针

### 7.1 指向函数的指针

函数也有入口地址，所以也可以用指针保存。

例如：

```c
int add(int a, int b)
{
    return a + b;
}

int (*pf)(int, int);
pf = add;
```

这里的 `pf` 就是一个函数指针。

它表示：

- `pf` 指向一个函数
- 这个函数有两个 `int` 参数
- 返回值也是 `int`

完整例子：

```c
#include <stdio.h>

int add(int a, int b)
{
    return a + b;
}

int sub(int a, int b)
{
    return a - b;
}

int main(void)
{
    int (*pf)(int, int);

    pf = add;
    printf("%d\n", pf(8, 3));

    pf = sub;
    printf("%d\n", pf(8, 3));
    return 0;
}
```

### 7.2 返回指针的函数

函数也可以返回一个指针。

例如：返回数组中最大元素的地址。

```c
int *find_max(int a[], int n)
{
    int i;
    int k = 0;

    for (i = 1; i < n; i++)
    {
        if (a[i] > a[k]) {
            k = i;
        }
    }
    return &a[k];
}
```

调用后可以通过返回的指针继续访问那个元素。

```c
#include <stdio.h>

int *find_max(int a[], int n)
{
    int i;
    int k = 0;

    for (i = 1; i < n; i++)
    {
        if (a[i] > a[k]) {
            k = i;
        }
    }
    return &a[k];
}

int main(void)
{
    int a[5] = {3, 8, 2, 9, 6};
    int *p = find_max(a, 5);
    printf("%d\n", *p);
    return 0;
}
```

这里一定要记住一个经典陷阱：

**不要返回局部变量的地址。**

下面这种写法是错误的：

```c
int *wrong(void)
{
    int a = 10;
    return &a;
}
```

因为函数结束后，局部变量 `a` 已经失效了。

## 8. 指针数组和多级指针

### 8.1 指针数组

指针数组就是“数组里的每个元素都是指针”。

例如：

```c
char *names[3] = {"Tom", "Alice", "Bob"};
```

这里：

- `names` 是数组
- `names[0]`、`names[1]`、`names[2]` 都是字符指针

可以这样输出：

```c
#include <stdio.h>

int main(void)
{
    char *names[3] = {"Tom", "Alice", "Bob"};
    int i;

    for (i = 0; i < 3; i++) {
        printf("%s\n", names[i]);
    }

    return 0;
}
```

这个写法特别适合保存多个字符串。

### 8.2 多级指针

如果一个指针变量本身也有地址，那么还可以再定义一个“指向指针的指针”。

例如：

```c
int a = 10;
int *p = &a;
int **pp = &p;
```

这里：

- `p` 指向 `a`
- `pp` 指向 `p`

所以：

- `a` 是值
- `*p` 是值
- `**pp` 也是值

例子：

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int *p = &a;
    int **pp = &p;

    **pp = 30;

    printf("%d\n", a);
    return 0;
}
```

输出为：

```text
30
```

### 8.3 `main` 函数的形参

你以前常写的是：

```c
int main(void)
```

但 `main` 还可以写成：

```c
int main(int argc, char *argv[])
```

这里：

- `argc` 表示命令行参数个数
- `argv` 是一个指针数组，每个元素都是一个字符串

例如：

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
    int i;
    for (i = 0; i < argc; i++) {
        printf("%s\n", argv[i]);
    }
    return 0;
}
```

如果运行程序时后面跟了额外参数，它们都会保存在 `argv` 里。

## 9. 编程实战

下面给你几个比前面更完整一点的例子。

### 9.1 用两个指针逆序数组

```c
#include <stdio.h>

void reverse(int a[], int n)
{
    int *left = a;
    int *right = a + n - 1;

    while (left < right)
    {
        int t = *left;
        *left = *right;
        *right = t;
        left++;
        right--;
    }
}

int main(void)
{
    int a[6] = {1, 2, 3, 4, 5, 6};
    int i;

    reverse(a, 6);

    for (i = 0; i < 6; i++) {
        printf("%d ", a[i]);
    }

    return 0;
}
```

### 9.2 用字符指针统计元音字母个数

```c
#include <stdio.h>

int count_vowel(char *s)
{
    int cnt = 0;

    while (*s != '\0')
    {
        if (*s == 'a' || *s == 'e' || *s == 'i' || *s == 'o' || *s == 'u' ||
            *s == 'A' || *s == 'E' || *s == 'I' || *s == 'O' || *s == 'U') {
            cnt++;
        }
        s++;
    }
    return cnt;
}

int main(void)
{
    char str[] = "Hello Sunshine";
    printf("%d\n", count_vowel(str));
    return 0;
}
```

### 9.3 用函数指针做简单计算器

```c
#include <stdio.h>

int add(int a, int b)
{
    return a + b;
}

int mul(int a, int b)
{
    return a * b;
}

int calc(int x, int y, int (*f)(int, int))
{
    return f(x, y);
}

int main(void)
{
    printf("%d\n", calc(2, 3, add));
    printf("%d\n", calc(2, 3, mul));
    return 0;
}
```

## 10. 指针小结

学到这里，你至少要抓住下面这些主线：

- 指针是“保存地址的变量”。
- `&` 用来取地址，`*` 用来访问地址中的内容。
- 数组名在很多情况下可以看成首元素地址。
- 字符串经常通过字符指针来处理。
- 指针作函数参数时，可以间接修改外部变量。
- 函数指针保存的是函数入口地址。
- 二级指针本质上是“指向指针的指针”。

如果这些主线你已经抓住了，第七章就算过了第一关。

## 11. 本章常见模板

### 11.1 交换两个整数

```c
void swap(int *a, int *b)
{
    int t = *a;
    *a = *b;
    *b = t;
}
```

### 11.2 用指针遍历数组

```c
int *p = a;
while (p < a + n)
{
    printf("%d ", *p);
    p++;
}
```

### 11.3 计算字符串长度

```c
int my_strlen(char *s)
{
    int len = 0;
    while (*s != '\0')
    {
        len++;
        s++;
    }
    return len;
}
```

### 11.4 返回数组最大值地址

```c
int *find_max(int a[], int n)
{
    int i, k = 0;
    for (i = 1; i < n; i++)
    {
        if (a[i] > a[k]) {
            k = i;
        }
    }
    return &a[k];
}
```

### 11.5 用指针逆序数组

```c
void reverse(int a[], int n)
{
    int *left = a;
    int *right = a + n - 1;
    while (left < right)
    {
        int t = *left;
        *left = *right;
        *right = t;
        left++;
        right--;
    }
}
```

## 12. 本章最容易错的点

- 把 `int *p` 里的 `*` 和 `*p` 里的 `*` 混成一个意思。
- 忘记给指针赋地址，就直接使用 `*p`。
- 该传地址时没传地址，例如把 `swap(x, y)` 写成不带 `&`。
- 以为数组名和普通变量完全一样，乱做赋值。
- 二维数组指针写错，把 `int (*p)[3]` 写成 `int *p`。
- 把字符数组和字符指针当成完全一样的东西。
- 试图修改字符串常量。
- 返回局部变量地址。
- 把指针数组和“数组指针”混在一起。

## 13. 手写题

### 写结果题

1. 写出下面程序的输出结果。

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int *p = &a;
    *p = 20;
    printf("%d %d\n", a, *p);
    return 0;
}
```

答案：

```text
20 20
```

解析：

`p` 保存的是变量 `a` 的地址，所以 `*p` 就是通过地址访问 `a` 本身。执行 `*p = 20;` 后，变量 `a` 的值也变成了 `20`。

易错点：

- `p` 是地址。
- `*p` 是这个地址里面存放的值。

2. 写出下面程序的输出结果。

```c
#include <stdio.h>

int main(void)
{
    int a[4] = {1, 2, 3, 4};
    int *p = a;
    printf("%d %d %d\n", *p, *(p + 2), p[3]);
    return 0;
}
```

答案：

```text
1 3 4
```

解析：

`int *p = a;` 让 `p` 指向 `a[0]`。

```text
*p       -> a[0] -> 1
*(p + 2) -> a[2] -> 3
p[3]     -> a[3] -> 4
```

易错点：

- `p[i]` 等价于 `*(p + i)`。
- 数组下标从 `0` 开始。

3. 写出下面程序的输出结果。

```c
#include <stdio.h>

int main(void)
{
    char str[] = "abc";
    char *p = str;
    printf("%c %c %c\n", *p, *(p + 1), *(p + 2));
    return 0;
}
```

答案：

```text
a b c
```

解析：

`p` 指向字符串数组 `str` 的第一个字符：

```text
*p       -> str[0] -> 'a'
*(p + 1) -> str[1] -> 'b'
*(p + 2) -> str[2] -> 'c'
```

易错点：

- 字符串本质上是以 `'\0'` 结尾的字符数组。
- 字符指针可以像数组一样从前往后访问字符。

4. 写出下面程序的输出结果。

```c
#include <stdio.h>

int main(void)
{
    int a = 5;
    int *p = &a;
    int **pp = &p;
    **pp = 8;
    printf("%d %d %d\n", a, *p, **pp);
    return 0;
}
```

答案：

```text
8 8 8
```

解析：

关系如下：

```text
p  指向 a
pp 指向 p
```

所以：

```text
*p   是 a
**pp 也是 a
```

执行 `**pp = 8;` 就是把 `a` 改成 `8`。

易错点：

- 一级指针保存普通变量地址。
- 二级指针保存一级指针变量的地址。

5. 写出下面程序的输出结果。

```c
#include <stdio.h>

int add(int a, int b)
{
    return a + b;
}

int main(void)
{
    int (*pf)(int, int) = add;
    printf("%d\n", pf(2, 3));
    return 0;
}
```

答案：

```text
5
```

解析：

`pf` 是函数指针，指向函数 `add`。

```c
pf(2, 3)
```

等价于：

```c
add(2, 3)
```

所以输出 `2 + 3 = 5`。

易错点：

- `int (*pf)(int, int)` 表示 `pf` 是一个函数指针。
- 函数指针调用时可以写 `pf(...)`。

6. 写出下面程序的输出结果。

```c
#include <stdio.h>

int main(void)
{
    int a[3] = {10, 20, 30};
    int *p = a;
    p++;
    printf("%d\n", *p);
    return 0;
}
```

答案：

```text
20
```

解析：

开始时：

```text
p -> a[0] -> 10
```

执行 `p++;` 后：

```text
p -> a[1] -> 20
```

所以 `*p` 输出 `20`。

易错点：

- 指针 `p++` 不是地址只加 1 个字节，而是移动到下一个同类型元素。

### 手写程序题

7. 定义一个整型变量和一个指向它的指针变量，分别输出该变量的值和地址。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int *p = &a;

    printf("value=%d\n", a);
    printf("address=%p\n", (void *)p);

    return 0;
}
```

易错点：

- `&a` 表示变量 `a` 的地址。
- 用 `%p` 输出地址时，标准写法是把指针转换成 `(void *)`。

8. 写函数 `swap(int *a, int *b)`，交换两个整数的值。

答案：

```c
void swap(int *a, int *b)
{
    int t;

    t = *a;
    *a = *b;
    *b = t;
}
```

调用示例：

```c
int x = 3, y = 5;
swap(&x, &y);
```

易错点：

- 调用时要传地址：`&x`、`&y`。
- 函数里交换的是 `*a` 和 `*b`，不是交换指针变量 `a` 和 `b`。

9. 写函数 `order(int *a, int *b)`，让两个整数按从小到大排列。

答案：

```c
void order(int *a, int *b)
{
    int t;

    if (*a > *b)
    {
        t = *a;
        *a = *b;
        *b = t;
    }
}
```

易错点：

- 比较时要写 `*a > *b`，比较的是两个整数值。

10. 写函数 `sum(int *a, int n)`，用指针求数组元素之和。

答案：

```c
int sum(int *a, int n)
{
    int i;
    int s = 0;

    for (i = 0; i < n; i++) {
        s += *(a + i);
    }

    return s;
}
```

易错点：

- `*(a + i)` 等价于 `a[i]`。
- 数组传参时，函数通常还需要知道数组长度 `n`。

11. 写函数统计数组中正数、负数和 0 的个数，结果通过指针参数带回。

答案：

```c
void count_numbers(int a[], int n, int *positive, int *negative, int *zero)
{
    int i;

    *positive = 0;
    *negative = 0;
    *zero = 0;

    for (i = 0; i < n; i++)
    {
        if (a[i] > 0) {
            (*positive)++;
        }
        else if (a[i] < 0) {
            (*negative)++;
        }
        else {
            (*zero)++;
        }
    }
}
```

易错点：

- `(*positive)++` 的括号不能省。`*positive++` 会先移动指针，含义完全不同。

12. 写函数返回数组中最大元素的地址，并在主函数中输出该元素值。

答案：

```c
int *max_addr(int a[], int n)
{
    int i;
    int *max = &a[0];

    for (i = 1; i < n; i++) {
        if (a[i] > *max) {
            max = &a[i];
        }
    }

    return max;
}
```

调用示例：

```c
int a[5] = {3, 9, 2, 7, 4};
int *p = max_addr(a, 5);
printf("%d\n", *p);
```

易错点：

- 可以返回数组元素地址，因为数组在主函数中仍然存在。
- 不要返回函数内部局部变量的地址。

13. 用指针实现一维数组逆序。

答案：

```c
void reverse(int *a, int n)
{
    int *left = a;
    int *right = a + n - 1;
    int t;

    while (left < right)
    {
        t = *left;
        *left = *right;
        *right = t;

        left++;
        right--;
    }
}
```

易错点：

- 左指针从开头往后走，右指针从末尾往前走。
- 每次交换后两个指针都要移动。

14. 用指针统计数组中奇数元素的个数。

答案：

```c
int count_odd(int *a, int n)
{
    int i;
    int count = 0;

    for (i = 0; i < n; i++) {
        if (*(a + i) % 2 != 0) {
            count++;
        }
    }

    return count;
}
```

易错点：

- 奇数判断：`值 % 2 != 0`。

15. 写函数 `my_strlen(char *s)`，自己实现求字符串长度。

答案：

```c
int my_strlen(char *s)
{
    int len = 0;

    while (*s != '\0')
    {
        len++;
        s++;
    }

    return len;
}
```

易错点：

- 字符串长度不包括结尾的 `'\0'`。
- `s++` 表示指针移动到下一个字符。

16. 写函数 `copy_str(char *to, char *from)`，用指针复制字符串。

答案：

```c
void copy_str(char *to, char *from)
{
    while (*from != '\0')
    {
        *to = *from;
        to++;
        from++;
    }

    *to = '\0';
}
```

易错点：

- 复制完普通字符后，最后一定要补上 `'\0'`。
- 目标数组空间要足够大。

17. 写函数 `cmp_str(char *s1, char *s2)`，比较两个字符串是否相同。

答案：

```c
int cmp_str(char *s1, char *s2)
{
    while (*s1 != '\0' || *s2 != '\0')
    {
        if (*s1 != *s2) {
            return 0;
        }

        s1++;
        s2++;
    }

    return 1;
}
```

易错点：

- 不能用 `s1 == s2` 比较字符串内容，那是在比较地址。
- 要逐个字符比较。

18. 写函数把字符串中的小写字母全部改成大写字母。

答案：

```c
void str_to_upper(char *s)
{
    while (*s != '\0')
    {
        if (*s >= 'a' && *s <= 'z') {
            *s = *s - 'a' + 'A';
        }
        s++;
    }
}
```

易错点：

- 只能修改字符数组里的内容，不能修改字符串常量。

19. 写函数统计一个字符串中元音字母的个数。

答案：

```c
int count_vowel(char *s)
{
    int count = 0;

    while (*s != '\0')
    {
        if (*s == 'a' || *s == 'e' || *s == 'i' || *s == 'o' || *s == 'u' ||
            *s == 'A' || *s == 'E' || *s == 'I' || *s == 'O' || *s == 'U') {
            count++;
        }
        s++;
    }

    return count;
}
```

易错点：

- 如果题目没说只统计小写，最好大小写都考虑。

20. 输入一个字符串，利用字符指针逆序输出。

答案：

```c
#include <stdio.h>

int main(void)
{
    char s[100];
    char *p;

    scanf("%s", s);

    p = s;
    while (*p != '\0') {
        p++;
    }

    p--;
    while (p >= s)
    {
        printf("%c", *p);
        p--;
    }

    printf("\n");
    return 0;
}
```

易错点：

- 先让指针走到 `'\0'`，再退回最后一个有效字符。

21. 写函数输出二维数组所有元素，并把二维数组作为函数参数传入。

答案：

```c
void print_matrix(int a[][3], int row)
{
    int i, j;

    for (i = 0; i < row; i++)
    {
        for (j = 0; j < 3; j++) {
            printf("%d ", a[i][j]);
        }
        printf("\n");
    }
}
```

易错点：

- 二维数组作为函数参数时，第二维必须写出来，比如 `a[][3]`。

22. 写函数求二维数组每一行的和。

答案：

```c
void row_sum(int a[][3], int row, int result[])
{
    int i, j;

    for (i = 0; i < row; i++)
    {
        result[i] = 0;
        for (j = 0; j < 3; j++) {
            result[i] += a[i][j];
        }
    }
}
```

易错点：

- 每一行开始求和前，要先把 `result[i]` 清零。

23. 写函数 `select(int op)`，返回不同的函数指针，用来实现加法或乘法。

答案：

```c
int add(int a, int b)
{
    return a + b;
}

int mul(int a, int b)
{
    return a * b;
}

int (*select(int op))(int, int)
{
    if (op == 1) {
        return add;
    }
    return mul;
}
```

调用示例：

```c
int (*pf)(int, int);
pf = select(1);
printf("%d\n", pf(2, 3));
```

易错点：

- 函数指针声明比较绕，先看 `select(int op)`，它是函数；外层表示它返回一个函数指针。

24. 定义一个指针数组，保存 5 个字符串，并逐行输出。

答案：

```c
#include <stdio.h>

int main(void)
{
    char *names[5] = {"C", "Java", "Python", "Go", "Rust"};
    int i;

    for (i = 0; i < 5; i++) {
        printf("%s\n", names[i]);
    }

    return 0;
}
```

易错点：

- `char *names[5]` 是指针数组，数组里每个元素都是 `char *`。

25. 用二级指针交换两个字符指针变量的值。

答案：

```c
void swap_str(char **p1, char **p2)
{
    char *t;

    t = *p1;
    *p1 = *p2;
    *p2 = t;
}
```

调用示例：

```c
char *a = "hello";
char *b = "world";
swap_str(&a, &b);
```

易错点：

- 要交换指针变量本身，就要传它们的地址，所以形参是 `char **`。

26. 编写 `main(int argc, char *argv[])` 程序，输出所有命令行参数。

答案：

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
    int i;

    for (i = 0; i < argc; i++) {
        printf("argv[%d]=%s\n", i, argv[i]);
    }

    return 0;
}
```

易错点：

- `argc` 是参数个数。
- `argv[0]` 通常是程序名。

27. 输入若干整数，利用指针找出最大值和最小值，并输出它们的地址。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a[100];
    int n, i;
    int *pmax, *pmin;

    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    pmax = pmin = &a[0];

    for (i = 1; i < n; i++)
    {
        if (a[i] > *pmax) {
            pmax = &a[i];
        }
        if (a[i] < *pmin) {
            pmin = &a[i];
        }
    }

    printf("max=%d address=%p\n", *pmax, (void *)pmax);
    printf("min=%d address=%p\n", *pmin, (void *)pmin);

    return 0;
}
```

易错点：

- `pmax` 保存最大元素的地址，`*pmax` 才是最大元素的值。

28. 写函数利用指针实现选择排序或冒泡排序。

答案：下面是冒泡排序写法。

```c
void bubble_sort(int *a, int n)
{
    int i, j, t;

    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - 1 - i; j++) {
            if (*(a + j) > *(a + j + 1)) {
        }
            }
    }
            {
                t = *(a + j);
                *(a + j) = *(a + j + 1);
                *(a + j + 1) = t;
            }
}
```

易错点：

- 内层循环条件是 `j < n - 1 - i`，避免访问 `a[j + 1]` 越界。

### 改错题

29. 找出并改正下面程序中的错误。

```c
#include <stdio.h>

int main(void)
{
    int *p;
    *p = 10;
    printf("%d\n", *p);
    return 0;
}
```

答案：

错误原因：

`p` 是野指针，没有指向任何合法变量，就直接执行 `*p = 10;`，这是危险错误。

正确写法：

```c
#include <stdio.h>

int main(void)
{
    int a;
    int *p = &a;

    *p = 10;
    printf("%d\n", *p);

    return 0;
}
```

易错点：

- 指针使用前必须先指向合法地址。

30. 找出并改正下面程序中的错误。

```c
int *f(void)
{
    int a = 100;
    return &a;
}
```

答案：

错误原因：

函数返回了局部变量 `a` 的地址。函数结束后，局部变量 `a` 的生命周期结束，这个地址就不能再安全使用。

一种正确写法：把变量定义成 `static`。

```c
int *f(void)
{
    static int a = 100;
    return &a;
}
```

更常见的建议：

如果只是想返回一个整数，直接返回值更好：

```c
int f(void)
{
    int a = 100;
    return a;
}
```

易错点：

- 不要返回普通局部变量的地址。

31. 找出并改正下面程序中的错误。

```c
#include <stdio.h>

int main(void)
{
    char *p = "hello";
    p[0] = 'H';
    printf("%s\n", p);
    return 0;
}
```

答案：

错误原因：

`char *p = "hello";` 中，`p` 指向字符串常量。字符串常量通常不能被修改，所以 `p[0] = 'H';` 是错误的。

正确写法：

```c
#include <stdio.h>

int main(void)
{
    char p[] = "hello";

    p[0] = 'H';
    printf("%s\n", p);

    return 0;
}
```

易错点：

- 字符数组可以改内容。
- 指向字符串常量的字符指针不能用来修改字符串常量。

32. 找出并改正下面程序中的错误。

```c
#include <stdio.h>

void swap(int *a, int *b)
{
    int t = *a;
    *a = *b;
    *b = t;
}

int main(void)
{
    int x = 3, y = 5;
    swap(x, y);
    printf("%d %d\n", x, y);
    return 0;
}
```

答案：

错误原因：

`swap` 的形参是 `int *`，调用时应该传变量地址。但原程序写成：

```c
swap(x, y);
```

这是把整数值传过去了，不是地址。

正确写法：

```c
#include <stdio.h>

void swap(int *a, int *b)
{
    int t = *a;
    *a = *b;
    *b = t;
}

int main(void)
{
    int x = 3, y = 5;

    swap(&x, &y);
    printf("%d %d\n", x, y);

    return 0;
}
```

易错点：

- 形参是指针时，实参通常要传地址。
- `swap(&x, &y)` 才能真正修改 `x` 和 `y`。

## 14. 自测清单

- 我知道指针的本质是“保存地址”。
- 我能说清楚 `&` 和 `*` 的作用。
- 我会定义并初始化一个最基本的指针变量。
- 我知道为什么指针参数能改到函数外部变量。
- 我能解释 `a[i]` 和 `*(a + i)` 的关系。
- 我能用字符指针遍历字符串。
- 我能看懂最基础的函数指针和二级指针写法。

## 15. 学习建议

- 第 7 章一定不要只看，必须手敲。
- 每次写指针题，都先问自己三件事：它指向谁、现在存的是什么地址、`*` 取出来的到底是谁的值。
- 只要你一糊涂，就把变量、地址、指针关系画出来。
- 指针和数组题不要跳步骤，先写下标版，再改成指针版。
- 如果一道题同时出现 `*`、数组和函数参数，不要慌，拆开逐个看。

学完这一章后，你对 C 语言的理解会明显上一个台阶，因为很多以前“只是会写”的东西，到这里才算真正看懂底层关系。
