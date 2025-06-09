# @sbn/form-kit

一套基於欄位定義與 metadata 驅動的 React 表單邏輯工具包，專注於邏輯與型別安全，並與 UI 呈現層解耦。可應用於多步驟表單、動態欄位渲染、條件驗證等場景。

---

## 特性

- 型別安全的欄位設定（FieldConfig）
- 多步驟流程邏輯控制
- 支援欄位條件顯示、欄位禁用、唯讀
- 預設值自動產生
- 驗證規則支援 Zod
- 可搭配任何 UI 元件庫（如 MUI、Tailwind、Chakra）
- 可單獨使用某些模組（例如只用 useFormController）

---

## 安裝方式

### 方式一：本地安裝（適用於 monorepo）

```bash
pnpm add file:../../packages/form-kit
```

### 方式二：從 GitHub 安裝（推薦用於正式專案）

如果要在其他專案或新電腦上使用這個套件，可以直接執行：

```bash
pnpm add git+https://github.com/sbn920127/form-kit.git
```
