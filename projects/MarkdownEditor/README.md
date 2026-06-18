# Tauri + Tiptap Markdown 编辑器开发指南

> 最后更新：2026-06-18 | 实际技术选型与踩坑记录

## 1. 技术栈

| 层 | 技术 | 版本 |
|----|------|------|
| 前端框架 | Vue 3 + TypeScript | 3.5 |
| 构建工具 | Vite | 8.x |
| 编辑器 | Tiptap | 3.27 |
| 后端 | Rust + Tauri 2 | 1.96 / 2.11 |
| 包管理器 | npm | - |
| 开发端口 | 1420 | - |

## 2. 项目结构

```
├── src/                         # Vue 3 前端
│   ├── main.ts                  # 入口
│   ├── App.vue                  # 主布局（侧栏 + 工具栏 + 编辑器 + 底栏）
│   └── components/
│       ├── TiptapEditor.vue     # Tiptap 编辑器封装
│       ├── Sidebar.vue          # 侧边栏（文件列表 + 大纲导航）
│       ├── SearchPanel.vue      # 查找替换浮动面板
│       ├── TableGrid.vue        # 表格插入网格选择器
│       ├── TableBubble.vue      # 表格浮动操作栏
│       └── ContextMenu.vue      # 右键菜单
├── src-tauri/                   # Rust 后端
│   ├── src/main.rs              # 程序入口
│   ├── src/lib.rs               # 命令定义 + Settings 管理
│   ├── Cargo.toml               # Rust 依赖
│   ├── tauri.conf.json          # Tauri 窗口/构建配置
│   ├── capabilities/default.json # 权限配置
│   └── .cargo/config.toml       # MinGW 链接器配置（Windows GNU）
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 3. Rust 后端命令

### 注册的命令

| 命令 | 参数 | 返回 | 说明 |
|------|------|------|------|
| `read_file` | `path: String` | `String` | 读取文本文件 |
| `write_file` | `path, content` | `()` | 写入文本文件 |
| `load_settings` | - | `Settings` | 加载配置 |
| `save_settings` | `settings` | `()` | 保存配置 |
| `file_exists` | `path` | `bool` | 检查文件是否存在 |

### Settings 结构体

```rust
struct Settings {
    theme: String,              // "dark" | "light"
    font_size: u32,             // 默认 16
    last_opened_path: Option<String>,
    window_width: Option<u32>,
    window_height: Option<u32>,
    window_x: Option<i32>,
    window_y: Option<i32>,
    sidebar_visible: bool,      // 默认 true
    sidebar_width: u32,         // 默认 240
    recent_files: Vec<String>,  // 最多 10 个
}
```

**存储位置**：`app.path().app_config_dir()` / `settings.json`。Windows 上为 `%APPDATA%/com.tauri.dev/`。

### Cargo 依赖

```toml
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tauri = { version = "2.11" }
tauri-plugin-dialog = "2"    # 原生文件对话框
tauri-plugin-log = "2"       # 日志
```

## 4. Tiptap 扩展

### 已安装

| 包 | 用途 |
|----|------|
| `@tiptap/vue-3` | Vue 3 绑定 |
| `@tiptap/starter-kit` | 基础扩展集（标题/段落/粗体/斜体/代码/引用/列表/分割线等） |
| `@tiptap/markdown` | Markdown ↔ JSON 双向转换 |
| `@tiptap/extension-underline` | 下划线 |
| `@tiptap/extension-task-list` | 任务列表 |
| `@tiptap/extension-task-item` | 任务项（嵌套） |
| `@tiptap/extension-highlight` | 文本高亮 |
| `@tiptap/extension-text-style` | 文字样式基类 |
| `@tiptap/extension-table` | 表格（含列宽拖拽） |
| `@tiptap/extension-table-row/cell/header` | 表格行/单元格/表头 |

### 关键 API

```ts
// 获取 Markdown
editor.getMarkdown()

// 加载 Markdown
editor.commands.setContent(md, { contentType: 'markdown' })

// 获取 HTML（用于预览）
editor.getHTML()
```

### 已知问题

- `@tiptap/extension-text-align` 与表格扩展冲突，会导致编辑器完全无法输入。**不要安装**。
- `@tiptap/extension-link` 与 StarterKit 重复，StarterKit 已内置，**无需自行注册**。
- Tauri webview 不支持 `window.prompt()`，链接输入需用自定义弹窗。

## 5. 已实现功能

### 文件操作
- 打开 `.md` / `.markdown` 文件（原生对话框）
- 保存 / 另存为
- 新建文件
- 自动保存（2 秒防抖，仅已有路径的文件）

### 编辑体验
- 所见即所得编辑（Tiptap）
- 工具栏：标题 H1-H3、字号选择、粗体/斜体/下划线/删除线/高亮、链接、行内代码/代码块、引用、分割线、无序/有序/任务列表
- 撤销/重做
- 字符级字体大小控制
- 表格：网格选择器插入 + 浮动操作栏（插入/删除行列、表头、对齐、合并拆分、列宽拖拽）
- 查找替换面板（Ctrl+F）

### 侧边栏
- 文件列表：当前文件 + 最近 10 个文件
- 大纲导航：自动提取标题，点击跳转
- 滚动同步：编辑区滚动时自动高亮当前标题
- 宽度可拖拽调整
- 可折叠（Ctrl+B），记住状态

### 配置记忆
- 主题切换（暗色/亮色）
- 窗口尺寸和位置记忆
- 上次打开文件恢复
- 侧边栏宽度和可见性
- 最近文件列表

### 辅助功能
- 底部状态栏：词数 / 字数 / 阅读时长 / 段落数
- 未保存指示（标题栏蓝色圆点）
- 右键菜单：复制/剪切/粘贴/全选
- 高亮可编辑区域（暗色：卡片浮起效果，亮色：白色纸张效果）

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl+N | 新建 |
| Ctrl+O | 打开 |
| Ctrl+S | 保存 |
| Ctrl+Shift+S | 另存为 |
| Ctrl+F | 查找替换 |
| Ctrl+B | 切换侧边栏 |
| Ctrl+Z / Ctrl+Y | 撤销/重做 |

## 6. 布局结构

```
┌──┬───────────────────────┐
│侧│ 工具栏（单行，自动换行） │
│边│───────────────────────│
│栏│                       │
│  │   编辑区（居中800px）   │
│  │   高亮背景 + 阴影      │
│  │                       │
│  ├───────────────────────│
│  │ 状态栏：就绪 | 词 字 m 段│
└──┴───────────────────────┘
```

- 侧边栏：默认 240px，可拖拽 160-500px
- 编辑区：`max-width: 800px; margin: 0 auto`
- 工具栏：`flex-wrap` 允许换行
- 底栏：24px 高度，显示状态 + 统计信息

## 7. CSS 主题变量

```css
[data-theme='dark'] {
  --bg: #1a1a1a;              /* 页面背景 */
  --bg-content: #1f1f1f;      /* 编辑区背景 */
  --bg-toolbar: #252525;      /* 工具栏 */
  --sidebar-bg: #212121;      /* 侧边栏 */
  --border: #333;             /* 边框 */
  --text: #d4d4d4;            /* 正文 */
  --text-muted: #777;         /* 次要文字 */
  --accent: #4f8cff;          /* 强调色 */
}

[data-theme='light'] {
  --bg: #f2f2f2;
  --bg-content: #ffffff;
  --bg-toolbar: #fff;
  --sidebar-bg: #f0f0f0;
  --border: #e0e0e0;
  --text: #333;
  --text-muted: #999;
  --accent: #2563eb;
}
```

## 8. 环境配置注意事项

### Windows GNU 工具链

项目使用 `x86_64-pc-windows-gnu` 工具链，需要 MinGW-w64 binutils。通过 winget 安装：

```bash
winget install BrechtSanders.WinLibs.POSIX.UCRT
```

然后在 `src-tauri/.cargo/config.toml` 中配置：

```toml
[target.x86_64-pc-windows-gnu]
linker = "x86_64-w64-mingw32-gcc"
```

### Tauri 配置要点

```json
// tauri.conf.json
{
  "build": {
    "devUrl": "http://localhost:1420",    // 与 vite.config.ts 端口一致
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build"
  },
  "app": {
    "windows": [{
      "title": "Markdown Editor",
      "width": 800, "height": 600
    }]
  }
}
```

### Vite 配置

```ts
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  server: { port: 1420, strictPort: true },
})
```

## 9. 开发命令

```bash
# 开发模式
npm run tauri:dev

# 仅前端构建
npm run build

# 仅后端构建
cd src-tauri && cargo build

# 打包
npm run tauri:build
```

## 10. 未实现 / 待优化

- 行号（CSS 在 ProseMirror 中不稳定，需插件实现）
- 图片拖拽插入
- 导出 HTML/PDF
- 文件拖拽打开（Tauri v2 的 file-drop 事件在当前环境不稳定）
- 专注模式 / 打字机模式
- Git 版本控制
- 全文搜索
