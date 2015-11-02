title: 写给同事的Vue.js教程
date: 2015-09-12 19:02:34
tags: 
    - 编程
    - Vue.js
---
# Vue.js 简介
官方的介绍
>Vue.js 是一个用于创建 web 交互界面的库。
>
>从技术角度讲，Vue.js 专注于 MVVM 模型的 ViewModel 层。它通过双向数据绑定把 View 层和 Model 层连接了起来。实际的 DOM 封装和输出格式都被抽象为了 Directives 和 Filters。
>
>从哲学角度讲，Vue 希望通过一个尽量简单的 API 来提供响应式的数据绑定和可组合、复用的视图组件。它不是一个大而全的框架——它只是一个简单灵活的视图层。您可以独立使用它快速开发原型、也可以混合别的库做更多的事情。它同时和诸如 Firebase 这一类的 BaaS 服务有着天然的契合度。

<!--more-->

# 为什么使用Vue.js

我们公司现在使用的前端 js 框架只有 JQuery，在我们现在的系统中，除了app端，后台的管理系统大部分只是对数据的增删改查操作，导致代码中大部分都是对 Dom 的操作，这样会使得模型和视图的界限模糊，耦合度大，不易维护。比如这样的代码：

```html
<table id="user">
    <tr>
        <th>用户名</th>
        <th>密码</th>
        <th>手机号</th>
        <th>操作</th>
    </tr>
</table>
```

```javascript
function loadUser() {
    SD.jsonp(url, function(s){
        if (s.success) {
            var str = '';
            var obj = s.items.lst;
            obj.forEach(function(item) {
                //构造一段html
                str += '...';
                //绑定事件
                $('.delete').click(funciton(){...});
                $('.edit').click(funciton(){...});
            });
            $('#user').apend(str);
        }
    });
}
```

而如果用Vue来写的话是这样子的

```html
<table id="user">
    <th>
        <th>用户名</th>
        <th>密码</th>
        <th>手机号</th>
        <th>操作</th>
    </th>
    <tr v-repeat="user in users">
        <td v-text="user.uname"></td>
        <td v-text="user.password"></td>
        <td v-text="user.mobile"></td>
        <td>
            <a v-on="click: edit(user)">编辑</a>
            <a v-on="click: delete(user)">删除</a>
        </td>
    </tr>
</table>
```

```javascript
var vm = new Vue({
    el: '#user',
    data: {
        users:[]
    },
    method: {
        edit: function(user){...},
        delete: function(user){...}
    }
});
function loadUser() {
    SD.jsonp(url,function(s) {
        if (s.success) {
            vm.users = s.item.lst;
        }
    });
}
```
从代码来看，在js代码中，已经不需要直接去操作 Dom，只需要对对象进行操作，当对象数据发生变化时，视图都会在下一帧自动更新。

下面来解释一下代码
[Vue.js-demo](https://github.com/robin22333/vuejs-demo)
Vue.js 使用的感觉我觉得是非常的爽，相比 angular，ember，react 这些流行的前端框架来说轻量而且简洁，语法优雅。
