# munin
> 必通团队 react + redux 项目组织方案

## 文件组织

项目组织参考[react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)，同时尽可能的保持简洁。
整个项目的文件组织如下：
```
tree -a -L 3 -I node_modules -I .git --dirsfirst
.
├── src
│   ├── components
│   │   ├── Skeleton # layout
│   │   └── Spinner # common component
│   │       ├── index.js
│   │       ├── Spinner.jsx
│   │       ├── Spinner.spec.js # test file
│   │       └── Spinner.scss
│   ├── core # helper && util
│   ├── flow # common action\reducer\constant
│   ├── pages
│   │   ├── routes
│   │   │   ├── Focus
│   │   │   └── entry.js # 入口文件，文件名必须为 entry.js
│   │   └─ tpl.html #模板文件
│   ├── store
│   │   ├── configureStore.js
│   │   └── reducers.js # makeRootReducer injectReducer
│   └── styles # common styles
├── build # 构建目录
├── tools
│   ├── webpack.config.dev.js
│   └── webpack.config.prod.js
├── test
│   └── karma.conf.js
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── README.md
├── abc.json # cloud build
├── abc.sh
└── package.json
```

components 目录下存放公共组件，包括页面布局类，公共的container，可服用的全局组件（这一类必须有测试）。每个组件包含的静态资源在其下的 assets 目录下。
core 目录下面包括可复用的 util，以及与业务有关的 helper。
flow 目录下全局共用的 action reducer constant。不按类别分拆。
styles 目录下全局共用样式，项目开启 css module，该文件下入口文件包含在 `:global {}`
pages 目录下对应各个页面，如 mobile/Focus 页面
├── FocusView.jsx # 为区分起见，以View结束
├── FocusView.scss
├── components # 该页面下的组件，一般会比较多，因此单独一个目录，建议将组件拆分的更小一些。每个组件包含的静态资源在其下的 assets 目录下。
├── flow # redux 相关的，因为各个文件相关性较强，改过一个另一个很可能马上就要修改，因为放在一起维护，根据情况可能会加上 reselect 文件。flow 意思是 数据流相关的文件。
│   ├── constants.js
│   ├── focusActions.js
│   └── focusReducer.js
└── index.js
另外，模板文件只有一份，即使是多页面也只有一份，多页面中每个页面的 title 和 spm 埋点会不同，暂未做处理。如果页面极为特殊，如包装第三方登录，以后可做特别处理。

tools 构建文件分为两个的原因是：线上构建之后会走云构建，webpack.config.prod.js 将是不必要的。
test 目录只有一个 karma.conf.js 文件，测试文件不再该目录下
.eslintrc 基于 airbnb 的配置建议在编辑器中打开，实时反馈修改意见。
abc.json 云构建的配置
abc.sh 云构建脚本，完成 builder 之后不必要


## 项目起步

### 开发
使用`npm install`安装项目依赖后，输入下面命令启动项目开发：
```
npm run start
```
该命令启动的服务默认是 8080 端口。代理到日常环境。依开发情况可以修改`tools/webpack.config.dev.js`中配置。

### 构建
发布时构建命令：
```
npm run build
```
默认生成的文件在 build 目录下，构建生成 html 文件同时生成一份资源映射文件： `assets.json`。


### 发 CDN
发 CDN，走 Assets（需要申请 git 项目组可以发布），配置发布方式为覆盖模式，构建选择云构建。覆盖模式发布可以尽可能的利用缓存，推荐选择这种方式。

日常发布，就是推送代码到仓库分支 `daily/版本号`
```
  git push origin master:daily/$DEPLOY_VERSION
```
日常 CDN 地址：
`https://g-assets.daily.taobao.net/项目组/项目组/`

静态 html 也一并发布到 CDN 上，需要配置转发规则，同时注意 CDN 缓存问题。
也可以根据资源映射文件，后端渲染 html 页面。CDN 上的资源映射文件名为 `assets-${version}.json`，文件内容如下：
```json
{
  "页面路径":{
    "js": "//cdnpath/pagepath/filename-hash.bundle.js",
    "css": "//cdnpath/pagepath/filename.hash.css"
  },
  "vendor":{
    "js": "//g-assets.daily.taobao.net/项目组/项目名/vendor.57f15da5.bundle.js"
  }
}
```
资源文件都是绝对路径存放。某一页面路径，对应当前页面的 js 和 css。公共资源单独存放。图片资源虽然也发布到 CDN 上，不需关心。

因为线上 CDN 同一版本号不会多次发布，所以后端渲染时，可依据版本号，直接返回缓存的 html 文件。

### 发线上
cdn 没有预发环境
```
  git tag publish/$DEPLOY_VERSION
  git push origin publish/$DEPLOY_VERSION
```
线上CDN地址：
`https://g.alicdn.com/项目组/项目名/`

## 测试

测试使用 `mocha` 组合，karma 做单元测试管理
命令 `npm run test` 启动测试，打印测试结果和测试覆盖率。修改测试文件或被测试文件，测试结果实时更新。

测试文件的组织依然按照就近管理，与组件文件相同位置。文件命名遵循 `*-spec.js`
