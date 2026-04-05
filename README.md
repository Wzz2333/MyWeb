# My Static Website - GitHub Pages

## 项目说明
这是一个基于 GitHub Pages 部署的现代、美观、响应式静态网站。使用 Tailwind CSS 实现现代化设计，支持深色模式，包含完整的导航栏、Hero 区、关于我、功能亮点、联系方式和 Footer 等区块。

## 本地预览方式
1. 直接在浏览器中打开 `index.html` 文件
2. 或使用本地服务器（如 VS Code 的 Live Server 插件）

## 部署到 GitHub Pages 的完整步骤
1. **创建 GitHub 仓库**
   - 登录 GitHub，点击「New repository」
   - 仓库名建议使用 `<username>.github.io`（如果是个人主页）或任意名称（如果是项目主页）
   - 选择「Public」，点击「Create repository」

2. **推送代码**
   - 初始化 Git 仓库（如果尚未初始化）：`git init`
   - 添加文件：`git add .`
   - 提交：`git commit -m "Initial commit"`
   - 关联远程仓库：`git remote add origin <repository-url>`
   - 推送：`git push -u origin main`

3. **配置 GitHub Pages**
   - 进入仓库「Settings」→「Pages」
   - 在「Source」中选择「main」分支，点击「Save」
   - 等待几分钟，GitHub 会自动部署网站
   - 访问 `https://<username>.github.io`（或 `https://<username>.github.io/<repository-name>`）查看部署结果

4. **自定义域名（可选）**
   - 在「Settings」→「Pages」→「Custom domain」中输入你的域名
   - 按照 GitHub 的提示在你的域名服务商处添加 DNS 记录

## 后续开发提示
1. **修改内容**：直接编辑 `index.html` 文件中的占位文本
2. **添加图片**：将图片放入 `assets/images/` 目录
3. **添加图标**：将图标放入 `assets/icons/` 目录
4. **自定义样式**：在 `css/style.css` 中添加自定义样式
5. **添加功能**：在 `js/main.js` 中添加新功能
6. **添加页面**：创建新的 HTML 文件，参考 `index.html` 的结构

## 技术栈
- HTML5
- Tailwind CSS (Play CDN)
- JavaScript
- GitHub Pages