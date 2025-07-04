# 个人网站

 是一个个人知识库和文档管理网站，包含前端、GIS、可视化、部署等多个领域的学习笔记和项目文档。

## 目录结构

- `docs/`：主文档目录
  - `api-examples.md`、`index.md`、`markdown-examples.md`：示例与入口文档
  - `notes/`：各类学习笔记
    - `deploy/`：部署相关（docker、linux、nginx等）
    - `frontend/`：前端相关（css、html、javascript、vue等）
    - `gis/`：地理信息系统相关（cesium、leaflet、mapboxgl、openlayers、threejs等）
    - `other/`：其他技术（ai、golang、python、tools等）
    - `visualization/`：可视化相关（animation、d3、echarts等）
    - `README.md`：笔记说明
  - `projects/`：项目相关文档
  - `public/`：公共资源
    - `image/`：图片资源
    - `logo.png`：站点 logo
- `package.json`、`package-lock.json`：项目依赖管理
- `README.md`：项目说明文件

## 使用说明

1. 克隆项目到本地：
   ```bash
   git clone <仓库地址>
   ```
2. 安装依赖（如有）：
   ```bash
   npm install
   ```
3. 按需阅读 `docs/` 目录下的各类文档。

## 常用命令

### 安装依赖

```bash
npm install
```

### 本地启动文档站点

```bash
npm run docs:dev
```

### 构建静态站点

```bash
npm run docs:build
```

### 本地预览构建结果

```bash
npm run docs:preview
```


> 具体命令请根据你的实际 package.json 配置进行调整。

## 适用场景

- 个人知识管理与积累
- 前端、GIS、可视化等技术学习
- 部署与运维笔记整理
- 代码与文档协同管理

## 贡献

欢迎提交 PR 或 issue 共同完善内容。

## License

MIT
