## 描述

简单的可拖动控件

## 使用

```bash
# 安装组件
$ npm install
```

## 参数

> 1. customStyle 自定义样式（style）
> 2. children 子元素
> 3. offSetWidth 移动偏移宽度
> 4. offSetHeight 移动偏移高度
> 5. imageUrl 图片地址

## 使用样例

```javascript
<DragView customStyle={styles.XXX} imageUrl={XXX} offSetHeight={240}>
    {children}
</DragView>
```