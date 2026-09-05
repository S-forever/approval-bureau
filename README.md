# 朋友购物审批局

一个复古热敏小票风格的购物审批工具，支持云端分享和多人审批。

## 功能特点

- 🎨 复古热敏小票 UI 设计
- 🔗 商品链接解析（支持图片拖拽）
- 🎭 戏精购买理由自动生成
- 🔨 暴力盖章动画 + 卡通音效
- ⚖️ 小法庭随机判定机制
- 📤 云端分享，朋友可远程审批
- 💾 本地 + 云端双重数据保存

## 云端配置（分享功能必需）

### 第一步：创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com) 注册免费账号
2. 点击 "New Project" 创建项目
3. 设置项目名称、数据库密码
4. 等待项目创建完成（约 1-2 分钟）

### 第二步：获取配置信息

1. 在项目设置页面，找到 "API" 选项
2. 复制以下两个值：
   - **Project URL**：格式为 `https://xxx.supabase.co`
   - **anon/public key**：格式为 `eyJhbGciOi...` 的长字符串

### 第三步：创建数据表

1. 在 Supabase 项目页面，点击左侧 "SQL Editor"
2. 点击 "New Query"
3. 复制以下 SQL 并执行：

```sql
create table approval_records (
  id uuid default gen_random_uuid() primary key,
  no text,
  name text,
  amount float,
  reason text,
  required_approvals int,
  approvals jsonb default '{}',
  cloud_id text,
  created_at timestamptz default now()
);

alter table approval_records enable row level security;

create policy "Allow all" on approval_records for all using (true) with check (true);
```

4. 点击 "Run" 执行

### 第四步：在应用中配置

1. 打开 `approval-bureau.html`
2. 首次使用会自动显示配置面板
3. 输入刚才获取的 URL 和 Key
4. 点击"保存配置"

配置会保存在浏览器的 localStorage 中，下次使用无需重新配置。

## 使用方法

### 提交申请

1. 粘贴商品链接（可选）或手动填写商品信息
2. 点击"生成戏精理由"自动生成搞笑购买理由
3. 点击"打印申请表"提交

### 分享审批

1. 提交后，点击小票底部的"📤 分享给朋友审批"
2. 复制链接发给朋友
3. 朋友打开链接即可填写审批意见

### 查看审批结果

1. 在"审批记录"标签页查看所有记录
2. 点击记录查看详细审批状态
3. 申请人可随时查看朋友的审批意见

## 审批规则

- 金额 ≤ 50元：1 人审批即可
- 金额 > 50元：需要 2 人审批
- 2 人都同意 → 通过
- 2 人都驳回 → 驳回
- 1 同意 1 驳回 → 触发小法庭，系统随机判定

## 本地使用

直接用浏览器打开 `approval-bureau.html` 即可使用，无需服务器。

## 技术栈

- HTML5 + CSS3 + JavaScript
- Tailwind CSS（CDN）
- Supabase（云端数据库）
- Web Audio API（音效）
- Canvas（金币特效）

## 注意事项

- 分享功能需要配置 Supabase 云端数据库
- 不配置云端也能正常使用，只是无法分享给朋友
- 配置信息仅保存在本地浏览器，清除浏览器数据会丢失配置
- 建议定期备份重要的审批记录
