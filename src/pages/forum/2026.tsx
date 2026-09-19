import type { ReactNode } from "react";

import ForumEditionPage from "@site/src/components/forum/ForumEditionPage";
import { requireEdition } from "@site/src/data/forum";

/** 天工论坛 2026 会议存档。 */
export default function Forum2026(): ReactNode {
  return <ForumEditionPage edition={requireEdition(2026)} />;
}
