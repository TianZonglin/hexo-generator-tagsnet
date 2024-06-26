# hexo-generator-tagsnet

[![GitHub package.json version](https://img.shields.io/github/package-json/v/TianZonglin/hexo-generator-tagsnet)](https://www.npmjs.com/package/hexo-generator-tagsnet)
[![npm dev dependency version](https://img.shields.io/npm/dependency-version/hexo-generator-tagsnet/dev/hexo)](https://www.npmjs.com/package/hexo-generator-tagsnet)
[![GitHub issues](https://img.shields.io/github/issues-raw/TianZonglin/hexo-generator-tagsnet)](https://github.com/TianZonglin/hexo-generator-tagsnet/issues)
[![npm](https://img.shields.io/npm/dt/hexo-generator-tagsnet)](https://www.npmjs.com/package/hexo-generator-tagsnet)
[![NPM](https://img.shields.io/npm/l/hexo-generator-tagsnet)](https://github.com/TianZonglin/hexo-generator-tagsnet/blob/main/LICENSE)

插件实现详见文章：

- [思路](https://www.cxmoe.com/article/65a9.html)
- [实现](https://www.cxmoe.com/article/99a8.html)

### 使用

执行 `hexo clean && hexo generate && hexo net && hexo server`，之后访问 `localhost:4000/tagsnet` 即可访问生成的动态页面。
部署 `hexo clean && hexo generate && hexo net && hexo deploy`
 
**注意 hexo net 的位置**


### 安装

使用 `npm install hexo-generator-tagsnet --save` 直接安装。

### 升级

使用 `npm install hexo-generator-tagsnet --update --save` 直接更新。

### 配置

在Hexo根目录 `yaml.config` 追加以下内容，svg参数默认即可。

```
//注意是放到根目录配置文件下
tagsnet:
  builtin: false #默认即可
  title: 文章导航关系网
  quote: 由标签及分类构建关联。// 本页使用<a target="_blank" href="https://www.npmjs.com/package/hexo-generator-tagsnet">hexo-generator-tagsnet</a>插件构建。<a target="_blank" href="https://www.cz5h.com/tagsnet/">[Demo]</a>
  svg:
    svg_big_color: "#ff4081"
    svg_small_color: "#3f51b5"
    svg_line_color: "#b1b1b1"
    svg_line_weight: "0.5"
    svg_text_weight: "12px"
    svg_width: "100%"
    svg_exheight: 20
    svg_bgcolor: "#fff"
    svg_force: "-180"
  valine: #渲染页面内valine加载不出来时使用
    app_id: WbLE88qXXXXXXXlzW-gzGzoHsz
    app_key: ycqjmtXXXXXXXXXX97oRkrdO
```


### 示例

https://www.cxmoe.com/tagsnet

![](https://cdn.jsdelivr.net/gh/TianZonglin/tuchuang/img/20210206005600.png)


### 各主题测试

详见 [test.md](https://github.com/TianZonglin/hexo-generator-tagsnet/blob/main/test.md)

### 更新

1.1.7 修复主题适配bug，Stable版本。
