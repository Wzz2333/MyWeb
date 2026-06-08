# 📝 如何添加新项目

## 快速开始

添加一个新项目只需要 **3 个步骤**，非常简单！

---

## 步骤 1：创建项目文件夹

在 `projects/` 目录下创建一个新文件夹，文件夹名称就是项目的 **slug**（唯一标识符）。

```bash
projects/
├── your-project-slug/        ← 新建这个文件夹
│   └── README.md             ← 项目介绍文件
├── smart-campus-app/
├── ai-chatbot/
└── personal-blog/
```

**命名规则：**
- 使用小写字母
- 用连字符 `-` 分隔单词
- 例如：`my-awesome-project`

---

## 步骤 2：创建项目介绍文件

在项目文件夹中创建 `README.md` 文件，使用 Markdown 格式编写项目介绍。

**推荐结构：**

```markdown
# 项目名称

## 项目简介
简短描述项目的目标和用途。

## 技术栈
- **前端**: 技术1 + 技术2
- **后端**: 技术3
- **数据库**: 技术4

## 功能特性
### 功能1
描述功能...

### 功能2
描述功能...

## 技术亮点
1. **亮点1**: 描述...
2. **亮点2**: 描述...

## 项目截图
（可选）添加项目截图

## 使用说明
如何使用这个项目...

## 后续规划
- [ ] 待完成功能1
- [ ] 待完成功能2

## 项目链接
- GitHub: https://github.com/your-username/project
- 在线演示: https://demo-url.com
```

---

## 步骤 3：更新项目索引

打开 `projects/projects.json`，添加新项目的元信息：

```json
{
    "slug": "your-project-slug",           // 与文件夹名一致
    "title": "项目名称",                    // 显示的项目名称
    "category": "Web应用",                  // 项目分类（会自动生成筛选按钮）
    "date": "2026-06-08",                  // 项目日期
    "tags": ["Vue3", "Node.js", "MySQL"],  // 技术标签
    "summary": "项目简短描述...",           // 列表页显示的摘要
    "cover": "code",                       // 封面图标类型
    "status": "已完成",                     // 项目状态：已完成/开发中/规划中
    "github": "https://github.com/..."     // GitHub 链接（可选）
}
```

**cover 图标类型：**
- `code` - 代码图标（蓝色）
- `book` - 书籍图标（绿色）
- `heart` - 爱心图标（橙色）
- `gear` - 齿轮图标（灰色）
- `rocket` - 火箭图标（黄色）
- `music` - 音乐图标（粉色）
- `folder` - 文件夹图标（紫色，默认）

**status 状态：**
- `已完成` - 绿色徽章 ✓
- `开发中` - 黄色徽章 🔄
- `规划中` - 灰色徽章 ⏰

---

## 完整示例

假设你要添加一个"在线购物商城"项目：

### 1. 创建文件夹
```
projects/online-shopping-mall/README.md
```

### 2. 编写 README.md
```markdown
# 在线购物商城

## 项目简介
一个功能完整的电商平台...

## 技术栈
- **前端**: React + TypeScript
- **后端**: Spring Boot
- **数据库**: PostgreSQL
...
```

### 3. 添加到 projects.json
```json
{
    "slug": "online-shopping-mall",
    "title": "在线购物商城",
    "category": "Web应用",
    "date": "2026-06-08",
    "tags": ["React", "Spring Boot", "PostgreSQL"],
    "summary": "一个功能完整的电商平台，支持商品浏览、购物车、订单管理等功能。",
    "cover": "code",
    "status": "开发中",
    "github": "https://github.com/Wzz2333/online-shopping-mall"
}
```

---

## 新增技术标签

如果你想添加新的技术标签（如 `Docker`、`Kubernetes`），需要：

1. 在 `blog.html` 的 `projectTagColors` 对象中添加颜色配置：
```javascript
'Docker': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
'Kubernetes': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
```

2. 在 `project.html` 的 `tagColors` 对象中也添加同样的配置。

---

## 添加项目截图

如果你想展示项目截图，可以：

1. 在 `sources/images/` 创建 `projects/` 子目录
2. 放入截图文件，如 `online-shopping-mall-1.png`
3. 在 `README.md` 中使用 Markdown 图片语法：
```markdown
![项目截图](../../sources/images/projects/online-shopping-mall-1.png)
```

---

## 验证

完成以上步骤后：

1. 刷新博客页面 `http://localhost:8000/blog.html`
2. 切换到"我的项目"标签
3. 点击新添加的项目卡片
4. 查看项目详情页

---

## 技巧

- **项目分类**会自动从 `projects.json` 中提取，并在筛选栏显示
- **项目统计**会自动计算：总数、已完成、开发中、分类数
- **所有设置**（背景、透明度）会自动同步到项目详情页
- **部署到 GitHub Pages** 后，项目列表会自动更新，无需重新构建

---

## 常见问题

**Q: 项目不显示？**
A: 检查 `projects.json` 格式是否正确（注意逗号、引号）

**Q: 项目详情页 404？**
A: 确认 `slug` 与文件夹名完全一致

**Q: README.md 不显示？**
A: 确认文件名为 `README.md`（大写），路径正确

---

有任何问题，随时查看现有项目的结构作为参考！
