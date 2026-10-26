# 星契秘典 · ASTRAL COVENANT

一个纯前端的抽卡（Gacha）游戏 Demo：暗色星海主题、浮空星盘、翻牌演出、保底机制与本地存档。
**没有后端**，所有数据（卡池、抽卡结果、存档）都在浏览器端生成，游戏进度存在 `localStorage`。

## 运行

```bash
npm install
npm run dev     # 开发，默认 http://localhost:5173
npm run build   # 类型检查 + 生产构建到 dist/
npm run preview # 预览构建产物
```

## 技术栈

- React 19 + TypeScript（`strict`）
- Vite 7
- 纯手写 CSS（无 UI 框架、无 CSS-in-JS），图标与卡面插画全部是内联 SVG

## 玩法

| 项目 | 数值 |
| --- | --- |
| 单抽 / 十连 | 160 / 1,600 星砂 |
| 初始星砂 | 24,000 |
| 每日补给 | +4,800（按本地日期，每天一次） |
| SSR 概率 | 1.6%（含 UP 0.8%） |
| SR 概率 | 12% |
| SSR 硬保底 | 80 抽 |
| SR 保底 | 10 抽内必出 |
| UP 机制 | SSR 有 50% 为当期 UP；歪了下次 SSR 必为 UP |
| 重复转化 | SSR +800 / SR +160 / R +30 星砂 |

卡池共 14 张星契（2 SSR / 5 SR / 7 R），定义在 `src/data/cards.ts`。

## 目录结构

```
src/
  components/   界面组件（召唤页、图鉴、记录、翻牌演出、弹窗）
    Astrolabe   浮空星盘（SVG 表盘 + 旋转刻度）
    StarCard    星契卡面骨架，CardArt 负责星图/符号绘制
    Sigil       14 种主题纹章的内联 SVG
  data/cards.ts 卡池数据（文案、配色、星座坐标、纹章）
  hooks/useGame 游戏状态机 + localStorage 持久化
  lib/gacha.ts  抽卡算法（概率、保底、UP、重复转化）
  lib/storage   存档读写与容错（损坏数据自动回退）
  lib/sound     Web Audio 合成音效（SSR 五音上行），无音频文件
  styles/       base / card / summon / archive / overlay / modals / responsive
```

## 想改数值？

- 概率、保底、消耗、初始星砂：`src/lib/gacha.ts` 顶部常量
- 单卡掉率权重、重复返还：`src/data/cards.ts` 里的 `RARITY_META`
- 新增星契：往 `CARDS` 里加一条即可，图鉴 / 卡池 / 记录会自动跟随

## 说明

这是本地演示版本：不涉及真实货币与付费，没有服务端校验，存档清缓存即丢失。
设置里提供「重置观测数据」。
