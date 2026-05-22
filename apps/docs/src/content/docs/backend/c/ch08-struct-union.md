---
title: 第 8 章 结构体与共用体
description: C 语言结构体、结构体数组、结构体指针、链表、共用体、枚举类型和 typedef 入门。
---

## 对应教材目录

- 8.1 结构体概述
- 8.1.1 结构体类型的定义
- 8.1.2 结构体变量的定义
- 8.1.3 结构体变量的引用
- 8.1.4 结构体变量的赋值和初始化
- 8.2 结构体数组
- 8.3 指向结构体的指针
- 8.3.1 指向结构体的指针变量的定义
- 8.3.2 利用结构体指针变量引用成员
- 8.3.3 用结构体类型作函数参数
- 8.4 用结构体处理链表
- 8.4.1 链表概述
- 8.4.2 链表的建立与输出
- 8.4.3 链表的插入
- 8.4.4 链表的删除
- 8.4.5 链表的综合操作
- 8.5 共用体
- 8.5.1 共用体类型及变量的定义
- 8.5.2 共用体变量的引用
- 8.6 枚举类型
- 8.7 用 `typedef` 定义类型别名

## 本章目标

学完这一章，你应该能做到：

- 知道结构体的作用是“把多个相关数据打包在一起”。
- 会定义结构体类型、结构体变量，并访问结构体成员。
- 会给结构体变量赋值、初始化，也能使用结构体数组。
- 会定义结构体指针，并用 `->` 访问成员。
- 能把结构体作为函数参数传入，知道“传值”和“传地址”的区别。
- 初步理解链表结点、结点连接、插入和删除的基本思想。
- 知道共用体、枚举类型和 `typedef` 的基本用法。

## 1. 为什么要学结构体与共用体

前面你学过的变量，大多一次只保存一个值。

例如：

```c
int num;
char name[20];
float score;
```

如果这三个值本来就属于同一个学生，那么把它们分散写开，管理起来就很不方便。

这时就需要结构体。

你可以先把结构体理解成：

**把多个相关变量打包成一个整体。**

比如一个学生，通常会有：

- 学号
- 姓名
- 成绩

这三个信息放在一起，才更像一个完整对象。

而共用体、枚举类型、`typedef`，则是在“组织数据”这条路上继续往前走。

## 2. 结构体概述

### 2.1 结构体类型的定义

定义结构体类型的基本写法：

```c
struct Student
{
    int num;
    char name[20];
    float score;
};
```

这里要注意三件事：

- `struct Student` 是结构体类型名。
- 花括号里面写的是成员。
- 最后那个分号不能漏。

这段代码只是“定义了一种结构”，还没有真正创建变量。

你可以把它理解成：

- 这是一个模板
- 说明“学生”这种数据由哪些部分组成

### 2.2 结构体变量的定义

有了结构体类型后，才能定义结构体变量：

```c
struct Student stu1;
```

也可以一边定义类型，一边定义变量：

```c
struct Student
{
    int num;
    char name[20];
    float score;
} stu1, stu2;
```

但初学阶段更建议你分开写，因为更清楚。

### 2.3 结构体变量的引用

访问结构体成员时，用点运算符 `.`：

```c
stu1.num = 1001;
stu1.score = 95.5;
```

如果成员是字符数组，也可以这样初始化：

```c
strcpy(stu1.name, "Alice");
```

完整例子：

```c
#include <stdio.h>
#include <string.h>

struct Student
{
    int num;
    char name[20];
    float score;
};

int main(void)
{
    struct Student stu1;

    stu1.num = 1001;
    strcpy(stu1.name, "Alice");
    stu1.score = 95.5f;

    printf("%d %s %.1f\n", stu1.num, stu1.name, stu1.score);
    return 0;
}
```

### 2.4 结构体变量的赋值和初始化

结构体变量可以直接初始化：

```c
struct Student stu = {1001, "Alice", 95.5f};
```

也可以一个成员一个成员赋值。

另外，两个同类型结构体变量之间，通常可以直接整体赋值：

```c
struct Student s1 = {1001, "Alice", 95.5f};
struct Student s2;

s2 = s1;
```

这样 `s2` 就会得到 `s1` 的全部成员值。

完整例子：

```c
#include <stdio.h>

struct Date
{
    int year;
    int month;
    int day;
};

int main(void)
{
    struct Date d1 = {2026, 4, 20};
    struct Date d2;

    d2 = d1;

    printf("%d-%d-%d\n", d2.year, d2.month, d2.day);
    return 0;
}
```

## 3. 结构体数组

如果要保存很多同类对象，就会用到结构体数组。

例如保存 3 个学生的信息：

```c
struct Student stu[3];
```

结构体数组和普通数组的思想一样：

- 每个元素都是同一种结构体
- 可以用下标访问每个元素

示例：

```c
#include <stdio.h>

struct Student
{
    int num;
    char name[20];
    float score;
};

int main(void)
{
    struct Student stu[3] = {
        {1001, "Alice", 95.5f},
        {1002, "Bob", 88.0f},
        {1003, "Cindy", 91.5f}
    };
    int i;

    for (i = 0; i < 3; i++) {
        printf("%d %s %.1f\n", stu[i].num, stu[i].name, stu[i].score);
    }

    return 0;
}
```

再看一个更常见的题：求结构体数组中的最高分。

```c
#include <stdio.h>

struct Student
{
    int num;
    char name[20];
    float score;
};

int main(void)
{
    struct Student stu[4] = {
        {1001, "Alice", 95.5f},
        {1002, "Bob", 88.0f},
        {1003, "Cindy", 91.5f},
        {1004, "David", 97.0f}
    };
    int i, k = 0;

    for (i = 1; i < 4; i++)
    {
        if (stu[i].score > stu[k].score) {
            k = i;
        }
    }

    printf("%d %s %.1f\n", stu[k].num, stu[k].name, stu[k].score);
    return 0;
}
```

## 4. 指向结构体的指针

### 4.1 指向结构体的指针变量的定义

结构体变量当然也有地址，所以也可以定义结构体指针。

例如：

```c
struct Student stu;
struct Student *p = &stu;
```

这里：

- `stu` 是结构体变量
- `p` 是指向结构体变量 `stu` 的指针

### 4.2 利用结构体指针变量引用成员

通过结构体指针访问成员，有两种写法：

```c
(*p).num
```

和

```c
p->num
```

第二种更常用，也更清楚。

完整例子：

```c
#include <stdio.h>
#include <string.h>

struct Student
{
    int num;
    char name[20];
    float score;
};

int main(void)
{
    struct Student stu;
    struct Student *p = &stu;

    p->num = 1001;
    strcpy(p->name, "Alice");
    p->score = 95.5f;

    printf("%d %s %.1f\n", p->num, p->name, p->score);
    printf("%d %s %.1f\n", (*p).num, (*p).name, (*p).score);
    return 0;
}
```

这两个 `printf` 输出的内容是一样的。

### 4.3 用结构体类型作函数参数

结构体可以作为函数参数传递。

先看“按值传递”的写法：

```c
void print_student(struct Student stu)
{
    printf("%d %s %.1f\n", stu.num, stu.name, stu.score);
}
```

这里函数拿到的是结构体副本。

如果想在函数里真正修改外部结构体，通常要传地址：

```c
void set_score(struct Student *stu, float score)
{
    stu->score = score;
}
```

完整例子：

```c
#include <stdio.h>
#include <string.h>

struct Student
{
    int num;
    char name[20];
    float score;
};

void print_student(struct Student stu)
{
    printf("%d %s %.1f\n", stu.num, stu.name, stu.score);
}

void set_score(struct Student *stu, float score)
{
    stu->score = score;
}

int main(void)
{
    struct Student stu = {1001, "Alice", 80.0f};

    print_student(stu);
    set_score(&stu, 95.0f);
    print_student(stu);
    return 0;
}
```

## 5. 用结构体处理链表

这一部分是第八章最难的地方之一。

你先不用急着一口气全部吃透，先抓住链表的核心思想：

- 每个结点里有数据
- 每个结点里还有“下一个结点的地址”
- 这些结点就像一节一节火车车厢，被连起来

### 5.1 链表概述

链表结点最常见的定义方式：

```c
struct Node
{
    int data;
    struct Node *next;
};
```

这里：

- `data` 用来放数据
- `next` 用来指向下一个结点

如果 `next == NULL`，说明已经到链表末尾。

### 5.2 链表的建立与输出

先看一个最简单的例子：手动建立 3 个结点。

```c
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

void print_list(struct Node *head)
{
    while (head != NULL)
    {
        printf("%d ", head->data);
        head = head->next;
    }
    printf("\n");
}

int main(void)
{
    struct Node *p1 = malloc(sizeof(struct Node));
    struct Node *p2 = malloc(sizeof(struct Node));
    struct Node *p3 = malloc(sizeof(struct Node));

    p1->data = 10;
    p2->data = 20;
    p3->data = 30;

    p1->next = p2;
    p2->next = p3;
    p3->next = NULL;

    print_list(p1);

    free(p1);
    free(p2);
    free(p3);
    return 0;
}
```

这段代码里，`malloc` 可以先理解成：

**向系统申请一个新的结点空间。**

### 5.3 链表的插入

插入的核心，不是“搬动所有数据”，而是“改指针方向”。

例如：在某个结点后面插入新结点：

```c
void insert_after(struct Node *pos, struct Node *new_node)
{
    new_node->next = pos->next;
    pos->next = new_node;
}
```

完整例子：

```c
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

void print_list(struct Node *head)
{
    while (head != NULL)
    {
        printf("%d ", head->data);
        head = head->next;
    }
    printf("\n");
}

void insert_after(struct Node *pos, struct Node *new_node)
{
    new_node->next = pos->next;
    pos->next = new_node;
}

int main(void)
{
    struct Node *p1 = malloc(sizeof(struct Node));
    struct Node *p2 = malloc(sizeof(struct Node));
    struct Node *p3 = malloc(sizeof(struct Node));

    p1->data = 10;
    p2->data = 30;
    p3->data = 20;

    p1->next = p2;
    p2->next = NULL;

    insert_after(p1, p3);
    print_list(p1);

    free(p1);
    free(p2);
    free(p3);
    return 0;
}
```

输出为：

```text
10 20 30
```

### 5.4 链表的删除

删除结点的核心也是改指针。

例如：删除值为 `target` 的第一个结点。

```c
struct Node *delete_value(struct Node *head, int target)
{
    struct Node *pre = NULL;
    struct Node *cur = head;

    while (cur != NULL && cur->data != target)
    {
        pre = cur;
        cur = cur->next;
    }

    if (cur == NULL) {
        return head;
    }

    if (pre == NULL) {
        head = cur->next;
    }
    else {
        pre->next = cur->next;
    }

    free(cur);
    return head;
}
```

这段代码先找目标结点，再把前一个结点和后一个结点重新连起来。

### 5.5 链表的综合操作

这一节你先把思路记住就够了。

链表最常见的综合操作有：

- 创建链表
- 输出链表
- 查找结点
- 插入结点
- 删除结点
- 释放链表

下面是一个释放链表的常见写法：

```c
void free_list(struct Node *head)
{
    struct Node *p;

    while (head != NULL)
    {
        p = head;
        head = head->next;
        free(p);
    }
}
```

如果你先把“结点”和“next 指针”这两个概念吃透，后面的链表题就会顺很多。

## 6. 共用体

### 6.1 共用体类型及变量的定义

共用体也叫联合体，关键字是 `union`。

基本写法：

```c
union Data
{
    int i;
    char c;
    float f;
};
```

定义变量：

```c
union Data x;
```

你可以先把共用体和结构体做个最核心的区别：

- 结构体：每个成员都有自己独立的存储空间
- 共用体：所有成员共用同一块存储空间

也就是说，共用体在同一时刻通常只能“重点使用一个成员”。

### 6.2 共用体变量的引用

访问共用体成员时，也用点运算符 `.`：

```c
x.i = 10;
printf("%d\n", x.i);
```

完整例子：

```c
#include <stdio.h>

union Data
{
    int i;
    float f;
    char c;
};

int main(void)
{
    union Data x;

    x.i = 65;
    printf("%d\n", x.i);

    x.c = 'A';
    printf("%c\n", x.c);

    return 0;
}
```

这里要记住：

- 后面给哪个成员赋值，就优先把它看成当前有效内容
- 不要把共用体想成“几个成员都能同时独立保存不同值”

## 7. 枚举类型

枚举类型适合表示一组有限、固定的取值。

例如一周七天：

```c
enum Weekday
{
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT,
    SUN
};
```

定义变量：

```c
enum Weekday day;
day = WED;
```

默认情况下：

- `MON` 是 0
- `TUE` 是 1
- `WED` 是 2

也可以自己指定：

```c
enum Level
{
    LOW = 1,
    MID = 3,
    HIGH = 5
};
```

示例：

```c
#include <stdio.h>

enum Weekday
{
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT,
    SUN
};

int main(void)
{
    enum Weekday day = WED;
    printf("%d\n", day);
    return 0;
}
```

## 8. 用 `typedef` 定义类型别名

`typedef` 的作用是：给一个类型起一个更方便的名字。

例如：

```c
typedef int Integer;
```

以后就可以写：

```c
Integer a, b;
```

在结构体里，`typedef` 也特别常见：

```c
typedef struct Student
{
    int num;
    char name[20];
    float score;
} Student;
```

这样以后定义变量时就可以直接写：

```c
Student stu;
```

不用每次都写 `struct Student`。

完整例子：

```c
#include <stdio.h>

typedef struct Student
{
    int num;
    char name[20];
    float score;
} Student;

int main(void)
{
    Student stu = {1001, "Alice", 95.5f};
    printf("%d %s %.1f\n", stu.num, stu.name, stu.score);
    return 0;
}
```

## 9. 本章常见模板

### 9.1 定义学生结构体

```c
struct Student
{
    int num;
    char name[20];
    float score;
};
```

### 9.2 遍历结构体数组

```c
int i;
for (i = 0; i < n; i++) {
    printf("%d %s %.1f\n", stu[i].num, stu[i].name, stu[i].score);
}
```

### 9.3 结构体指针访问成员

```c
struct Student *p = &stu;
printf("%d\n", p->num);
```

### 9.4 链表结点模板

```c
struct Node
{
    int data;
    struct Node *next;
};
```

### 9.5 释放链表

```c
void free_list(struct Node *head)
{
    struct Node *p;
    while (head != NULL)
    {
        p = head;
        head = head->next;
        free(p);
    }
}
```

### 9.6 结构体类型别名

```c
typedef struct Student
{
    int num;
    char name[20];
    float score;
} Student;
```

## 10. 本章最容易错的点

- 定义完结构体类型后，忘记最后的分号。
- 把“结构体类型定义”和“结构体变量定义”混成一件事。
- 访问普通结构体变量成员时误写成 `->`。
- 访问结构体指针成员时误写成 `.`。
- 写 `(*p).num` 时漏掉括号，写成 `*p.num`。
- 把结构体数组和普通数组的访问规则搞混。
- 链表插入、删除时没有把 `next` 指针接好。
- 申请了链表结点空间却忘记 `free`。
- 把共用体误以为结构体，认为所有成员能同时独立保存值。
- 枚举常量当成字符串来理解。

## 11. 手写题

### 写结果题

1. 写出下面程序的输出结果。

```c
#include <stdio.h>

struct Student
{
    int num;
    float score;
};

int main(void)
{
    struct Student stu = {1001, 95.5f};
    printf("%d %.1f\n", stu.num, stu.score);
    return 0;
}
```

答案：

```text
1001 95.5
```

解析：

`stu.num` 是 `1001`，`stu.score` 是 `95.5f`。格式 `%.1f` 表示保留 1 位小数。

易错点：

- 普通结构体变量访问成员用 `.`。

2. 写出下面程序的输出结果。

```c
#include <stdio.h>

struct Date
{
    int year;
    int month;
    int day;
};

int main(void)
{
    struct Date d1 = {2026, 4, 20};
    struct Date d2;
    d2 = d1;
    printf("%d-%d-%d\n", d2.year, d2.month, d2.day);
    return 0;
}
```

答案：

```text
2026-4-20
```

解析：

结构体变量可以整体赋值：

```c
d2 = d1;
```

赋值后，`d2` 的每个成员都和 `d1` 对应成员相同。

易错点：

- 同类型结构体变量之间可以整体赋值。

3. 写出下面程序的输出结果。

```c
#include <stdio.h>

struct Student
{
    int num;
    float score;
};

int main(void)
{
    struct Student stu = {1001, 90.0f};
    struct Student *p = &stu;
    p->score = 95.0f;
    printf("%.1f\n", stu.score);
    return 0;
}
```

答案：

```text
95.0
```

解析：

`p` 指向 `stu`，所以：

```c
p->score = 95.0f;
```

等价于：

```c
(*p).score = 95.0f;
```

它会直接修改 `stu.score`。

易错点：

- 结构体指针访问成员用 `->`。

4. 写出下面程序的输出结果。

```c
#include <stdio.h>

enum Weekday
{
    MON,
    TUE,
    WED
};

int main(void)
{
    enum Weekday day = TUE;
    printf("%d\n", day);
    return 0;
}
```

答案：

```text
1
```

解析：

枚举常量默认从 `0` 开始依次递增：

```text
MON = 0
TUE = 1
WED = 2
```

所以 `TUE` 的值是 `1`。

易错点：

- 枚举常量默认是整数，不是字符串。

5. 写出下面程序的输出结果。

```c
#include <stdio.h>

typedef int Integer;

int main(void)
{
    Integer a = 10;
    Integer b = 20;
    printf("%d\n", a + b);
    return 0;
}
```

答案：

```text
30
```

解析：

`typedef int Integer;` 表示给 `int` 起了一个别名 `Integer`。所以：

```c
Integer a = 10;
Integer b = 20;
```

等价于：

```c
int a = 10;
int b = 20;
```

输出 `10 + 20 = 30`。

易错点：

- `typedef` 只是起别名，不是创造一种完全不同的运算规则。

6. 写出下面程序的输出结果。

```c
#include <stdio.h>

union Data
{
    int i;
    char c;
};

int main(void)
{
    union Data x;
    x.c = 'A';
    printf("%c\n", x.c);
    return 0;
}
```

答案：

```text
A
```

解析：

给共用体成员 `x.c` 赋值为 `'A'`，紧接着输出 `x.c`，所以输出 `A`。

易错点：

- 共用体所有成员共用同一块内存，同一时间通常只安全使用最后赋值的那个成员。

### 手写程序题

7. 定义一个结构体 `Student`，包含学号、姓名、成绩三个成员。

答案：

```c
struct Student
{
    int num;
    char name[20];
    double score;
};
```

易错点：

- 结构体定义最后的 `}` 后面要写分号。

8. 定义一个结构体变量，给它赋值并输出。

答案：

```c
#include <stdio.h>

struct Student
{
    int num;
    char name[20];
    double score;
};

int main(void)
{
    struct Student stu = {1001, "Tom", 90.5};

    printf("%d %s %.1f\n", stu.num, stu.name, stu.score);
    return 0;
}
```

易错点：

- 普通结构体变量访问成员用 `.`。

9. 定义一个结构体 `Date`，保存年月日，并输出一个日期。

答案：

```c
#include <stdio.h>

struct Date
{
    int year;
    int month;
    int day;
};

int main(void)
{
    struct Date d = {2026, 5, 22};

    printf("%d-%d-%d\n", d.year, d.month, d.day);
    return 0;
}
```

易错点：

- 初始化顺序要和成员定义顺序一致。

10. 定义两个同类型结构体变量，练习整体赋值。

答案：

```c
struct Date d1 = {2026, 5, 22};
struct Date d2;

d2 = d1;
```

易错点：

- 只有同类型结构体变量之间才能这样整体赋值。

11. 定义一个包含 5 个学生信息的结构体数组，并输出全部内容。

答案：

```c
#include <stdio.h>

struct Student
{
    int num;
    char name[20];
    double score;
};

int main(void)
{
    struct Student stu[5] = {
        {1001, "Tom", 90},
        {1002, "Jack", 85},
        {1003, "Lucy", 92},
        {1004, "Lily", 88},
        {1005, "Bob", 76}};
    int i;

    for (i = 0; i < 5; i++) {
        printf("%d %s %.1f\n", stu[i].num, stu[i].name, stu[i].score);
    }

    return 0;
}
```

易错点：

- 结构体数组元素访问成员：`stu[i].成员名`。

12. 在结构体数组中找出成绩最高的学生。

答案：

```c
int max_index = 0;
int i;

for (i = 1; i < 5; i++) {
    if (stu[i].score > stu[max_index].score) {
        max_index = i;
    }
}

printf("%d %s %.1f\n", stu[max_index].num, stu[max_index].name, stu[max_index].score);
```

易错点：

- 可以保存“最高分学生的下标”，不要只保存最高分，否则后面不好输出整个学生信息。

13. 在结构体数组中计算所有学生的平均成绩。

答案：

```c
double sum = 0;
double avg;
int i;

for (i = 0; i < 5; i++) {
    sum += stu[i].score;
}

avg = sum / 5;
printf("%.2f\n", avg);
```

易错点：

- 平均分建议用 `double`。

14. 写函数输出一个学生的信息，参数为结构体变量。

答案：

```c
void print_student(struct Student stu)
{
    printf("%d %s %.1f\n", stu.num, stu.name, stu.score);
}
```

易错点：

- 传结构体变量会复制一份数据，函数里改它不会影响外面的原变量。

15. 写函数修改一个学生的成绩，参数为结构体指针。

答案：

```c
void change_score(struct Student *p, double score)
{
    p->score = score;
}
```

易错点：

- 参数是结构体指针时，访问成员用 `->`。
- 传地址后，函数里可以修改外面的结构体变量。

16. 写函数交换两个结构体变量中的成绩。

答案：

```c
void swap_score(struct Student *a, struct Student *b)
{
    double t;

    t = a->score;
    a->score = b->score;
    b->score = t;
}
```

易错点：

- 如果要修改两个结构体变量本身的成员，建议传结构体指针。

17. 定义结构体指针，并分别用 `(*p).成员` 和 `p->成员` 输出内容。

答案：

```c
struct Student stu = {1001, "Tom", 90.5};
struct Student *p = &stu;

printf("%d %s %.1f\n", (*p).num, (*p).name, (*p).score);
printf("%d %s %.1f\n", p->num, p->name, p->score);
```

易错点：

- `(*p).num` 的括号不能省。
- `p->num` 是更常用的写法。

18. 定义一个表示长方形的结构体，包含长和宽，写函数求面积。

答案：

```c
struct Rect
{
    double length;
    double width;
};

double area(struct Rect r)
{
    return r.length * r.width;
}
```

易错点：

- 长和宽可能是小数，用 `double` 更灵活。

19. 定义一个表示复数的结构体，包含实部和虚部，写函数输出它。

答案：

```c
struct Complex
{
    double real;
    double imag;
};

void print_complex(struct Complex c)
{
    printf("%.2f + %.2fi\n", c.real, c.imag);
}
```

易错点：

- 复数的实部和虚部是两个相关数据，适合用结构体打包。

20. 定义一个链表结点结构体，包含数据域和指针域。

答案：

```c
struct Node
{
    int data;
    struct Node *next;
};
```

易错点：

- 链表结点里必须有一个指向同类型结点的指针。

21. 手动建立一个 3 个结点的链表，并输出所有结点数据。

答案：

```c
#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

int main(void)
{
    struct Node a = {1, NULL};
    struct Node b = {2, NULL};
    struct Node c = {3, NULL};
    struct Node *p;

    a.next = &b;
    b.next = &c;

    p = &a;
    while (p != NULL)
    {
        printf("%d ", p->data);
        p = p->next;
    }

    return 0;
}
```

易错点：

- 链表靠 `next` 把一个结点接到下一个结点。
- 遍历时条件是 `p != NULL`。

22. 写函数统计链表中结点个数。

答案：

```c
int count_nodes(struct Node *head)
{
    int count = 0;

    while (head != NULL)
    {
        count++;
        head = head->next;
    }

    return count;
}
```

易错点：

- 每经过一个结点，计数加 1，并移动到下一个结点。

23. 在链表头部插入一个新结点。

答案：

```c
struct Node *insert_head(struct Node *head, struct Node *new_node)
{
    new_node->next = head;
    return new_node;
}
```

易错点：

- 头插后，新结点会变成新的头结点，所以要返回 `new_node`。

24. 在链表中间某个结点后插入新结点。

答案：

```c
void insert_after(struct Node *pos, struct Node *new_node)
{
    new_node->next = pos->next;
    pos->next = new_node;
}
```

易错点：

- 一定要先让新结点指向原来的后继结点，再让前一个结点指向新结点。
- 两句顺序反了，容易把后面的链表弄丢。

25. 删除链表中值为 `x` 的第一个结点。

答案：

```c
struct Node *delete_first(struct Node *head, int x)
{
    struct Node *p = head;
    struct Node *prev = NULL;

    while (p != NULL && p->data != x)
    {
        prev = p;
        p = p->next;
    }

    if (p == NULL) {
        return head;
    }

    if (prev == NULL) {
        head = p->next;
    }
    else {
        prev->next = p->next;
    }

    free(p);
    return head;
}
```

易错点：

- 删除头结点时要单独处理，因为头指针会变化。
- 动态申请的结点删除后要 `free`。

26. 写函数释放整个链表。

答案：

```c
void free_list(struct Node *head)
{
    struct Node *p;

    while (head != NULL)
    {
        p = head;
        head = head->next;
        free(p);
    }
}
```

易错点：

- 要先保存当前结点，再移动 `head`，最后释放当前结点。

27. 定义一个共用体，包含 `int`、`char`、`float` 三种成员，并练习赋值输出。

答案：

```c
#include <stdio.h>

union Data
{
    int i;
    char c;
    float f;
};

int main(void)
{
    union Data d;

    d.i = 100;
    printf("%d\n", d.i);

    d.c = 'A';
    printf("%c\n", d.c);

    d.f = 3.14f;
    printf("%.2f\n", d.f);

    return 0;
}
```

易错点：

- 共用体成员共用同一块内存，后赋值的成员会影响之前成员的内容。

28. 定义一个枚举类型表示星期，并输出某一天对应的整数值。

答案：

```c
#include <stdio.h>

enum Weekday
{
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT,
    SUN
};

int main(void)
{
    enum Weekday day = FRI;

    printf("%d\n", day);
    return 0;
}
```

易错点：

- 默认 `MON = 0`，所以 `FRI = 4`。

29. 用枚举类型表示成绩等级，例如 `A`、`B`、`C`、`D`。

答案：

```c
enum Grade
{
    A,
    B,
    C,
    D
};
```

易错点：

- 枚举常量是标识符，不是字符。这里的 `A` 不是 `'A'`。

30. 用 `typedef` 给结构体类型起别名，并定义变量。

答案：

```c
typedef struct Student
{
    int num;
    char name[20];
    double score;
} Student;

Student stu = {1001, "Tom", 90.5};
```

易错点：

- 起别名后可以直接写 `Student stu;`，不用每次都写 `struct Student stu;`。

31. 用 `typedef` 给指针类型起别名。

答案：

```c
typedef int *IntPtr;

IntPtr p1, p2;
```

解析：

这里 `p1` 和 `p2` 都是 `int *`。

易错点：

- 如果不用 `typedef`，写 `int *p1, p2;` 时只有 `p1` 是指针，`p2` 是普通 `int`。

### 改错题

32. 找出并改正下面程序中的错误。

```c
struct Student
{
    int num;
    float score;
}
```

答案：

错误原因：

结构体类型定义结尾缺少分号。

正确写法：

```c
struct Student
{
    int num;
    float score;
};
```

易错点：

- `struct` 定义结束的 `}` 后面必须写 `;`。

33. 找出并改正下面程序中的错误。

```c
struct Student
{
    int num;
    float score;
};

int main(void)
{
    struct Student stu;
    struct Student *p = &stu;
    p.num = 1001;
    return 0;
}
```

答案：

错误原因：

`p` 是结构体指针，访问成员不能写：

```c
p.num = 1001;
```

正确写法：

```c
p->num = 1001;
```

完整修正：

```c
int main(void)
{
    struct Student stu;
    struct Student *p = &stu;

    p->num = 1001;

    return 0;
}
```

易错点：

- 普通结构体变量用 `.`。
- 结构体指针用 `->`。

34. 找出并改正下面程序中的错误。

```c
struct Student
{
    int num;
    float score;
};

int main(void)
{
    struct Student stu;
    struct Student *p = &stu;
    printf("%d\n", *p.num);
    return 0;
}
```

答案：

错误原因：

```c
*p.num
```

会先把 `.` 和 `num` 结合，等价于：

```c
*(p.num)
```

但 `p` 是指针，不是结构体变量，所以错误。

正确写法一：

```c
printf("%d\n", (*p).num);
```

正确写法二：

```c
printf("%d\n", p->num);
```

完整修正：

```c
#include <stdio.h>

struct Student
{
    int num;
    float score;
};

int main(void)
{
    struct Student stu = {1001, 90.0f};
    struct Student *p = &stu;

    printf("%d\n", p->num);

    return 0;
}
```

易错点：

- `(*p).num` 里的括号很重要。
- 更推荐初学者写 `p->num`。

35. 找出并改正下面程序中的错误。

```c
union Data
{
    int i;
    char c;
};

int main(void)
{
    union Data x;
    x.i = 100;
    x.c = 'A';
    printf("%d %c\n", x.i, x.c);
    return 0;
}
```

答案：

问题说明：

这段代码语法上可能能编译，但逻辑上有问题：共用体 `union` 的所有成员共用同一块内存。先给 `x.i` 赋值，再给 `x.c` 赋值，后一次赋值会覆盖同一块内存的一部分或全部，因此再输出 `x.i` 的结果不可靠。

如果想同时保存 `i` 和 `c`，应该用结构体：

```c
#include <stdio.h>

struct Data
{
    int i;
    char c;
};

int main(void)
{
    struct Data x;

    x.i = 100;
    x.c = 'A';

    printf("%d %c\n", x.i, x.c);
    return 0;
}
```

如果只是练习共用体，就应该只输出最后赋值的成员：

```c
union Data x;
x.c = 'A';
printf("%c\n", x.c);
```

易错点：

- 结构体的成员各自有独立存储空间。
- 共用体的成员共用同一块存储空间，不能同时独立保存多个成员值。

## 12. 自测清单

- 我知道结构体是把多个相关数据打包成一个整体。
- 我会定义结构体类型，也会定义结构体变量。
- 我会用 `.` 访问普通结构体变量成员。
- 我会用 `->` 访问结构体指针成员。
- 我知道结构体作函数参数时，什么时候传变量，什么时候传地址。
- 我知道链表结点最关键的成员是数据域和 `next` 指针。
- 我知道共用体和结构体最大的区别。
- 我知道 `enum` 和 `typedef` 最基本的用途。

## 13. 学习建议

- 第 8 章最重要的，不是一下子会写所有链表题，而是先建立“数据是怎么组织起来的”这个感觉。
- 结构体题一定要多写输出语句，不要只定义不看结果。
- 一看到 `.`、`->`、`(*p).成员`，就先想清楚当前手里拿的是“变量”还是“指针”。
- 链表题先画图，再写代码，尤其是插入和删除。
- 共用体、枚举、`typedef` 先掌握最基本用法，不要一开始钻太深。

学完这一章后，你就不再只是“处理单个数据”，而是开始学会把一整类相关数据组织起来了。这一步对后面的链表、文件、项目练习都很重要。
