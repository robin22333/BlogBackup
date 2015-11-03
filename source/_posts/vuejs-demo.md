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

# 为什么选择 Vue.js
MVVM 的前端框架非常的多，比较早的 Ko.js，还在现在比较火的 Angular.js，Ember.js 。我个人比较喜欢用 Vue，当然不是说 Vue 比这些框架好，一项新的技术的出现都是为了解决存在的问题，不谈使用场景的比较一门语言或者框架就是耍流氓，我推崇 Vue 的原因完全是个人喜好，Vue.js 使用起来我的感觉是非常的爽，相比其它框架来说更加轻量而且简洁。我平时自己闲暇鼓捣的都是一些小项目，用其它框架太重，而且限制多，必须按照它的规则来写代码，而 Vue 给我的感觉就是我在用框架，而不是框架在限制我。

# 如何使用Vue.js

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
从代码来看，在 js 代码中，已经不需要直接去操作 Dom，只需要对对象进行操作，当对象数据发生变化时，视图都会在下一帧自动更新。


vm 是一个同步 Model 和 View 的对象，每个 Vue 实例都是一个 ViewModel，vm.$el 是被 Vue 实例管理的 DOM 节点，每个 Vue 实例都关联着一个相应的 DOM 元素。当一个 Vue 实例被创建时，它会递归遍历根元素的所有子结点，同时完成必要的数据绑定。当这个视图被编译之后，它就会自动响应数据的变化。Vue 通过指令来对 Dom 进行各种处理。如示例中的 v-repeat 会基于数组来复制一个元素, v-on 会进行必要的事件绑定， v-text 会让节点中的文本内容与实例中的属性保持一致。


当然从这个例子中并不能看到 MVVM 框架的好处，因为数据比较简单，在实际的环境中，往往列表的字段会很多，根据条件筛选，而这些条件也是要根据 API 接口来获取的，这个时候 js 代码中掺杂了太多对数据的获取，而不是纯粹业务上的逻辑，如果加一条字段，或者多一条数据，维护起来非常困难。这里只做一个简单的例子。更多示例[Vue.js-demo](https://github.com/robin22333/vuejs-demo)


在 Vue 中最核心，也是作者最推崇的就是 Vue 的组件系统，学习请移步[组件系统](http://cn.vuejs.org/guide/components.html)


