---
title: React & Vue 杂谈
date: 2021-09-11 16:52:01
description: 简单聊聊现代前端框架，以及 React 和 Vue 的对比
tags:
  - React
  - Vue
---

由于工作需要写了几年的 React，又由于工作需要最近几个月在写 Vue，所以对这俩框架都有一定程度上的了解和一些理解，本文就从框架用户（即前端开发者，下同）的角度简单聊聊现代前端框架以及对 React 和 Vue 的异同点，不涉及源码和底层实现的分析。

## 现代前端框架

首先看一下 React 和 Vue 是什么。简单来说，他们俩都是用于构建 UI 的 JavaScript 框架，一般用来开发 Web 应用，当然他们也可以用来开发手机 App 和桌面端应用（本文不做讨论）。说到 JavaScript 框架就不得不提 jQuery 这个神一般的框架。我们先做个对比，为了便于区分，我们引入一个概念，将 React、Vue 和 Angular 等框架称之为**现代前端框架**，jQuery 及其他类似框架称之为 **jQuery 式框架**。

以一个简单的 Count 组件为例，每点击一下按钮数字会 +1，jQuery 代码如下：

```html
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
  </head>
  <body>
    <p id="count">1</p>
    <button id="btn">+</button>
    <script>
      $('#btn').click(function () {
        $('#count').html(Number($('#count').html()) + 1)
      })
    </script>
  </body>
</html>
```

React 代码如下：

```jsx
import { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(1)
  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>+</button>
    </div>
  )
}
```

Vue 代码与 React 类似，不再重复。

上面的代码虽然简单，但完整包含了 Web 应用最主要的三个元素：DOM、状态和事件。其中 jQuery 和 React 最大的区别在于状态和 DOM，在 jQuery 中应用状态（即 count）保存在 DOM 中，React 中则为 JavaScript 变量；状态更新时，jQuery 需要手动更新 DOM，而 React 只需要更新状态，框架自动将状态同步到 DOM。

很明显，现代前端框架与 jQuery 式框架最大的区别是声明式与命令式。在现代前端框架中我们通过声明式的写法，将状态与 DOM 做好映射即可，框架会自动将状态同步到 DOM 中。对于展示型的页面或简单的 Web 应用，两种方式对于我们的开发和代码维护其实区别不大，但是现在前端承载的内容越来越多，Web 应用越来越复杂，命令式的写法就不太能满足我们的需求了，写出来的代码也难以维护，而声明式的写法可以让我们专注于业务逻辑，而无需关心 DOM 的更新。

React 和 Vue 等现代前端框架其实都是在做同一件事：解决状态与 UI 同步的问题。想象一下在处理复杂业务逻辑的同时还要处理 DOM 的更新简直就是噩梦。

## React 的三大原则

上文提到一个 Web 应用最主要的三个元素是 DOM、状态和事件，由于 React 做了 DOM 部分的工作，因此对用户而言，需要关心的主要是状态部分，框架提供的 API 也主要是状态相关的。为了更好的管理和更新状态，React 生态中有三个比较重要的原则：**单向数据流**、**单一数据源**和**不可变数据结构**。

### 单向数据流

数据流是指状态的流向，在 React 中数据流向比较简单清晰，即根据状态生成 DOM，然后通过 DOM 上绑定的事件来触发事件函数来更新状态，所有流程都是单向的：

<!-- <picture>
  <source srcSet="/static/react-vs-vue/react_01_dark.png" media="(prefers-color-scheme: dark)" />
  <img src="/static/react-vs-vue/react_01_light.png" alt="" />
</picture> -->

### 单一数据源

这个原则来源于 Redux，即在整个应用中的全局状态只保存在一个 store 中，这样便于调试和维护。其实也可以扩展一下，在单纯的 React 组件中也适用，即任何状态只保存一份（特殊情况除外），并且可以通过其他状态计算出来的状态就不单独保存。

举两个例子，一是 A 组件有个子组件 B，A 通过 props 将自己的 state 传给 B，在 B 组件中如非特殊情况，不要将 prop 复制一份保存在自己的 state 中，而是直接使用 prop 值，否则可能会导致状态不同步；二是展示一个 Todo List 时，有个功能是仅展示未完成的 Todo，这时不要将全部列表和未完成列表各保存一份，而是通过计算在全部列表中过滤出未完成的列表。

### 不可变数据

不可变数据，有时候也称之为状态只读。在 React 中所有状态的更新都是通过 `setState` 来完成，而不是直接修改状态本身，比如 state 为 `state: { count: 0, list: [] }`，更新 count 时需要执行 `setState({ count: 1 })`，而不是直接修改 `state.count = 1` 这样。

这样做的好处一是可以容易追踪状态的变更，使代码更清晰且易维护；二是由于每次更新都会生成新的 state 对象，就可以避免 JavaScript 对象引用的问题，进而避免各种奇奇怪怪的 Bug。

## Vue 与 React 的异同

在写 React 的时候会觉得上面的三大原则没什么特别的，一切不就本该如此嘛！等写了 Vue 后才发现一些不同，虽然 React 和 Vue 本质上都是做同一件事。下面一条一条来看。

### 双向数据绑定

前面提到 React 是单向数据流，在写表单是需要给 `<input />` 绑定值，并手动监听事件来更新 state：

```jsx
import { useState } from 'react'

const App = () => {
  const [input, setInput] = useState('')

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <form>
      <input value={input} onChange={handleInputChange} />
    </form>
  )
}
```

而在 Vue 中则简单很多：

```html
<template>
  <form>
    <input v-model="input" />
  </form>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const input = ref('')

      return {
        input,
      }
    },
  })
</script>
```

由于 Vue 提供了 `v-model` 这个 API，我们就可以省略写事件的步骤，在表单内容较多时，可以节省不少时间和代码量。不过 `v-model` 本质上是个语法糖而已，你也完全可以像 React 那样手动绑定值、手动监听事件，对于一些特殊场景或者需要在更新表单值的同时做一些其他处理时，手动写还是很有必要的。

### 单一数据源

不论是 React 还是 Vue，单一数据源都是一个比较重要的原则。不过 Vue 提供了 `computed` API 可以大大方便我们的开发，还是以上文中的 Todo List 为例，已完成列表的过滤工作可以交给 `computed` 去做，并且 Vue 会对其做缓存，以减少不必要的计算进而提升性能。

### 可变数据

与 React 的不可变数据不同，Vue 中的状态是可变数据，这可能是 React 与 Vue 最大的区别了吧。React 通过 setState 来更新状态，Vue 则是直接修改状态，然后他在内容来监听状态的变化。Vue 的这种做法有几个好处：

- 简单，新手易上手；
- 数据监听粒度较细，再加上模版的编译时优化，有较好的性能；
- 代码简单不繁琐，代码量少；

从个人角度而言，我认为以上几个好处并不是痛点，可有可无，但它带来的问题却是大麻烦：

- 不符合直觉，因为在 JavaScript 中给变量赋值并不会引起其他反应，对于新手而已，虽然上手简单了，但也影响了对 JavaScript 本身的学习和理解；
- 不能完美实现数据监听，在 Vue 2 中使用 `Object.defineProperty` 来实现的数据监听限制较多，比如无法监听 property 的添加和删除、部分情况的数组变更无法监听，以及亡羊补牢式的 API `$set` 提高了用户的学习成本；Vue 3 中使用 `Proxy` 实现的数据监听需要用户时刻不要忘记写 `.value`，虽然可以通过一些编辑器插件来自动补全，但它本就不应该存在，同时在 template 里面又不需要写 `.value` 导致心智模型不一致；
- 由于 JavaScript 的对象引用逻辑，可变数据可能会导致一些奇奇怪怪又难以调试的 Bug，比如状态里的某些值引用了外部的一个对象，Vue 会直接修改这个对象本身，可能会导致其他引用该对象的地方出现问题；
