import type { ReactNode } from "react";

import ForumEditionPage from "@site/src/components/forum/ForumEditionPage";
import { getCurrentEdition } from "@site/src/data/forum";

/**
 * `/forum` —— 天工论坛当前届次。
 *
 * 这个地址保持不变（历届都是入口），渲染哪一年由
 * `src/data/forum/index.ts` 的 `currentEditionYear` 决定。
 * 历史届次在 `/forum/<年份>`。
 */
export default function ForumCurrent(): ReactNode {
  return <ForumEditionPage edition={getCurrentEdition()} />;
}
