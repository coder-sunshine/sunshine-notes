---
title: 第 5 章 数组
description: C 语言数组基础，涵盖一维数组、二维数组、字符数组及常见使用场景。
---

## 对应教材目录

- 5.1 一维数组的定义和应用
- 5.2 二维数组的定义和应用
- 5.3 字符数组的定义和应用
- 5.4 编程实战

## 本章目标

学完这一章，你应该能做到：

- 理解数组是“一组相同类型数据”的集合。
- 会定义和使用一维数组、二维数组。
- 会用下标访问数组元素。
- 能利用数组处理一批数据。
- 理解字符数组和字符串的关系。
- 能写出简单的字符串处理程序。

## 1. 为什么要学数组

前面学的变量一般一次只存一个值，例如：

```c
int a;
int b;
int c;
```

如果要存 100 个成绩，就不可能定义 100 个单独变量。

数组就是为了解决“一组同类数据”的存储和处理问题。

## 2. 一维数组

### 2.1 定义方式

```c
int a[5];
```

表示定义了一个有 5 个元素的整型数组。

### 2.2 下标从 0 开始

数组 `a[5]` 的合法下标是：

- `a[0]`
- `a[1]`
- `a[2]`
- `a[3]`
- `a[4]`

`a[5]` 是越界访问。

### 2.3 输入和输出

```c
#include <stdio.h>

int main(void)
{
    int a[5];
    int i;

    for (i = 0; i < 5; i++) {
        scanf("%d", &a[i]);
    }

    for (i = 0; i < 5; i++) {
        printf("%d ", a[i]);
    }

    return 0;
}
```

## 3. 一维数组常见用途

### 3.1 求和

```c
sum = 0;
for (i = 0; i < n; i++) {
    sum += a[i];
}
```

### 3.2 找最大值

```c
max = a[0];
for (i = 1; i < n; i++)
{
    if (a[i] > max) {
        max = a[i];
    }
}
```

### 3.3 逆序输出

```c
for (i = n - 1; i >= 0; i--) {
    printf("%d ", a[i]);
}
```

## 4. 二维数组

二维数组可以理解成表格或矩阵。

```c
int a[3][4];
```

表示 3 行 4 列。

输入模板：

```c
for (i = 0; i < 3; i++)
{
    for (j = 0; j < 4; j++)
    {
        scanf("%d", &a[i][j]);
    }
}
```

## 5. 字符数组和字符串

字符数组用于存放字符，也常用于存放字符串。

```c
char s[20];
```

输入一个字符串：

```c
scanf("%19s", s);
```

输出一个字符串：

```c
printf("%s\n", s);
```

### 字符串结束标志

C 字符串末尾有一个特殊字符：

```c
'\0'
```

它表示字符串结束。

例如：

```c
char s[] = "abc";
```

内存里其实是：

```text
'a' 'b' 'c' '\0'
```

## 6. 字符串处理的基础思路

### 6.1 求字符串长度

不使用库函数时，可以一个字符一个字符数，直到遇到 `'\0'`。

```c
int i = 0;
while (s[i] != '\0') {
    i++;
}
```

### 6.2 复制字符串

```c
int i = 0;
while (s1[i] != '\0')
{
    s2[i] = s1[i];
    i++;
}
s2[i] = '\0';
```

## 7. 本章最容易错的点

- 数组下标从 0 开始，不是从 1 开始。
- 下标越界。
- 把 `scanf("%s", s)` 写成 `scanf("%s", &s)`。
- 字符数组长度不够，放不下 `'\0'`。
- 二维数组输入输出时把行列顺序写乱。

## 8. 本章常见模板

### 8.1 输入 n 个数，求和

```c
#include <stdio.h>

int main(void)
{
    int a[100];
    int i, n, sum = 0;

    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    for (i = 0; i < n; i++) {
        sum += a[i];
    }

    printf("%d\n", sum);
    return 0;
}
```

### 8.2 求主对角线元素和

```c
sum = 0;
for (i = 0; i < n; i++) {
    sum += a[i][i];
}
```

### 8.3 求字符串长度

```c
int len = 0;
while (s[len] != '\0') {
    len++;
}
```

## 9. 手写题

### 写结果题

1. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    int a[5] = {1, 2, 3, 4, 5};
    printf("%d\n", a[0] + a[4]);
    return 0;
}
```

答案：

```text
6
```

解析：

数组 `a[5]` 的下标是 `0 ~ 4`：

```text
a[0] = 1
a[4] = 5
```

所以：

```text
a[0] + a[4] = 1 + 5 = 6
```

易错点：

- 长度为 5 的数组，最后一个元素是 `a[4]`，不是 `a[5]`。

2. 写出下面程序的输出结果。

```c
#include <stdio.h>
int main(void)
{
    char s[] = "abc";
    printf("%c %c\n", s[0], s[2]);
    return 0;
}
```

答案：

```text
a c
```

解析：

字符串 `"abc"` 存在字符数组中：

```text
s[0] = 'a'
s[1] = 'b'
s[2] = 'c'
s[3] = '\0'
```

所以 `s[0]` 输出 `a`，`s[2]` 输出 `c`。

易错点：

- 字符串最后还有隐藏的 `'\0'`。
- 下标从 `0` 开始。

### 改错题

3. 找出并改正下面程序中的错误。

```c
#include <stdio.h>
int main(void)
{
    int a[5];
    int i;
    for (i = 1; i <= 5; i++) {
        scanf("%d", &a[i]);
    }
    return 0;
}
```

答案：

错误点：

```c
for (i = 1; i <= 5; i++) {
    scanf("%d", &a[i]);
}
```

数组 `a[5]` 的合法下标是 `0 ~ 4`，这里会漏掉 `a[0]`，并访问越界的 `a[5]`。

完整修正代码：

```c
#include <stdio.h>

int main(void)
{
    int a[5];
    int i;

    for (i = 0; i < 5; i++) {
        scanf("%d", &a[i]);
    }

    return 0;
}
```

易错点：

- 数组遍历常用模板：`for (i = 0; i < n; i++)`。

4. 修改下面程序，使其能正确输入字符串。

```c
#include <stdio.h>
int main(void)
{
    char s[20];
    scanf("%s", &s);
    printf("%s\n", s);
    return 0;
}
```

答案：

```c
#include <stdio.h>

int main(void)
{
    char s[20];

    scanf("%s", s);
    printf("%s\n", s);

    return 0;
}
```

解析：

`s` 是字符数组名，作为 `scanf("%s", s)` 的参数时，已经表示数组首地址，不需要再写 `&s`。

易错点：

- 普通变量输入要取地址，比如 `&n`。
- 字符数组用 `%s` 输入时直接写数组名，比如 `s`。
- `scanf("%s", s)` 遇到空格会停止，如果想读一整行，后面再学 `fgets`。

### 手写程序题

5. 输入 5 个整数，输出它们的和与平均值。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a[5];
    int i, sum = 0;
    double avg;

    for (i = 0; i < 5; i++)
    {
        scanf("%d", &a[i]);
        sum += a[i];
    }

    avg = sum / 5.0;

    printf("sum=%d\n", sum);
    printf("avg=%f\n", avg);

    return 0;
}
```

易错点：

- 平均值用 `sum / 5.0`，避免整数除法。

6. 输入 10 个整数，找出最大值和最小值。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a[10];
    int i, max, min;

    for (i = 0; i < 10; i++) {
        scanf("%d", &a[i]);
    }

    max = min = a[0];

    for (i = 1; i < 10; i++)
    {
        if (a[i] > max) {
            max = a[i];
        }
        if (a[i] < min) {
            min = a[i];
        }
    }

    printf("max=%d min=%d\n", max, min);

    return 0;
}
```

易错点：

- 最大值、最小值最好用 `a[0]` 初始化，不要随便写 `0`。

7. 输入 6 个整数，按逆序输出。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a[6];
    int i;

    for (i = 0; i < 6; i++) {
        scanf("%d", &a[i]);
    }

    for (i = 5; i >= 0; i--) {
        printf("%d ", a[i]);
    }

    return 0;
}
```

易错点：

- 长度为 6 的数组，最后一个下标是 `5`。

8. 将长度为 8 的数组循环右移 1 位。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a[8];
    int i, last;

    for (i = 0; i < 8; i++) {
        scanf("%d", &a[i]);
    }

    last = a[7];
    for (i = 7; i >= 1; i--) {
        a[i] = a[i - 1];
    }
    a[0] = last;

    for (i = 0; i < 8; i++) {
        printf("%d ", a[i]);
    }

    return 0;
}
```

易错点：

- 右移要从后往前移动，否则前面的值会被覆盖。
- 最后一个元素要先保存起来。

9. 输入 10 个整数，统计偶数个数。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a[10];
    int i, count = 0;

    for (i = 0; i < 10; i++)
    {
        scanf("%d", &a[i]);
        if (a[i] % 2 == 0) {
            count++;
        }
    }

    printf("%d\n", count);

    return 0;
}
```

易错点：

- 偶数判断：`a[i] % 2 == 0`。

10. 输入一个 `3 x 3` 矩阵，求主对角线元素和。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a[3][3];
    int i, j, sum = 0;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            scanf("%d", &a[i][j]);
        }
    }

    for (i = 0; i < 3; i++) {
        sum += a[i][i];
    }

    printf("%d\n", sum);

    return 0;
}
```

易错点：

- 主对角线元素是 `a[0][0]`、`a[1][1]`、`a[2][2]`，特点是行下标等于列下标。

11. 输入一个 `2 x 3` 矩阵，输出其转置结果。

答案：

```c
#include <stdio.h>

int main(void)
{
    int a[2][3];
    int i, j;

    for (i = 0; i < 2; i++) {
        for (j = 0; j < 3; j++) {
            scanf("%d", &a[i][j]);
        }
    }

    for (j = 0; j < 3; j++)
    {
        for (i = 0; i < 2; i++) {
            printf("%d ", a[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```

易错点：

- `2 x 3` 矩阵转置后是 `3 x 2`。
- 输出转置时，外层循环原来的列 `j`，内层循环原来的行 `i`。

12. 输入一个字符串，统计元音字母个数。

答案：

```c
#include <stdio.h>

int main(void)
{
    char s[100];
    int i, count = 0;

    scanf("%s", s);

    for (i = 0; s[i] != '\0'; i++) {
        if (s[i] == 'a' || s[i] == 'e' || s[i] == 'i' || s[i] == 'o' || s[i] == 'u' ||
            s[i] == 'A' || s[i] == 'E' || s[i] == 'I' || s[i] == 'O' || s[i] == 'U') {
            count++;
        }
    }

    printf("%d\n", count);

    return 0;
}
```

易错点：

- 字符串遍历到 `'\0'` 结束。
- 如果要同时统计大写元音，也要把 `A/E/I/O/U` 算进去。

13. 不用库函数，求字符串长度。

答案：

```c
#include <stdio.h>

int main(void)
{
    char s[100];
    int len = 0;

    scanf("%s", s);

    while (s[len] != '\0') {
        len++;
    }

    printf("%d\n", len);

    return 0;
}
```

易错点：

- 字符串长度不包含结尾的 `'\0'`。

14. 不用库函数，将字符串 A 复制到字符串 B。

答案：

```c
#include <stdio.h>

int main(void)
{
    char a[100], b[100];
    int i = 0;

    scanf("%s", a);

    while (a[i] != '\0')
    {
        b[i] = a[i];
        i++;
    }
    b[i] = '\0';

    printf("%s\n", b);

    return 0;
}
```

易错点：

- 复制字符串时，最后一定要补上 `'\0'`。

15. 不用库函数，判断两个字符串是否相等。

答案：

```c
#include <stdio.h>

int main(void)
{
    char a[100], b[100];
    int i = 0;
    int same = 1;

    scanf("%s%s", a, b);

    while (a[i] != '\0' || b[i] != '\0')
    {
        if (a[i] != b[i])
        {
            same = 0;
            break;
        }
        i++;
    }

    if (same) {
        printf("same\n");
    }
    else {
        printf("not same\n");
    }

    return 0;
}
```

易错点：

- 不能直接写 `a == b` 比较两个字符串内容。
- 要逐个字符比较。

16. 输入若干学生成绩，输出高于平均分的成绩。

答案：

```c
#include <stdio.h>

int main(void)
{
    int n, i;
    double score[100];
    double sum = 0, avg;

    scanf("%d", &n);

    for (i = 0; i < n; i++)
    {
        scanf("%lf", &score[i]);
        sum += score[i];
    }

    avg = sum / n;

    for (i = 0; i < n; i++) {
        if (score[i] > avg) {
            printf("%f ", score[i]);
        }
    }

    return 0;
}
```

易错点：

- 要先读完所有成绩并算出平均分，再第二次循环输出高于平均分的成绩。

17. 统计一个字符串中数字字符出现的个数。

答案：

```c
#include <stdio.h>

int main(void)
{
    char s[100];
    int i, count = 0;

    scanf("%s", s);

    for (i = 0; s[i] != '\0'; i++) {
        if (s[i] >= '0' && s[i] <= '9') {
            count++;
        }
    }

    printf("%d\n", count);

    return 0;
}
```

易错点：

- 数字字符是 `'0'` 到 `'9'`，不是数字 `0` 到 `9`。

18. 把一个字符串中的小写字母改成大写字母。

答案：

```c
#include <stdio.h>

int main(void)
{
    char s[100];
    int i;

    scanf("%s", s);

    for (i = 0; s[i] != '\0'; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] = s[i] - 'a' + 'A';
        }
    }

    printf("%s\n", s);

    return 0;
}
```

易错点：

- 小写转大写可以用 `s[i] = s[i] - 'a' + 'A'`。
- 只处理小写字母，其他字符不要乱改。

## 10. 自测清单

- 我知道数组下标从 0 开始。
- 我会用循环遍历数组。
- 我会在数组中求和、找最大值、逆序输出。
- 我能读写二维数组。
- 我知道字符数组和字符串的关系。
- 我能不使用库函数写出字符串长度和复制。

## 11. 学习建议

- 第 5 章最重要的是“下标”和“循环”配合。
- 数组题一出错，先检查是不是越界了。
- 字符串题不要怕，本质上就是字符数组加循环。

学完这一章后，你处理的数据就不再只是一个一个的值，而是一整组值了。
