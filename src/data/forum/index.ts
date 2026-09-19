import { edition2023 } from "./2023";
import { edition2025 } from "./2025";
import { edition2026 } from "./2026";
import { edition2027 } from "./2027";
import type { ForumEdition, ForumEditionLink } from "./types";

/**
 * 天工论坛的届次登记处。
 *
 * 每年只需要做两件事：
 * 1. 在 `src/data/forum/<年份>.tsx` 写当年内容；
 * 2. 在下面 `editions` 里登记，并把 `currentEditionYear` 改到当年。
 *
 * 页面路由由 `src/pages/forum/` 下的文件显式声明，不在这里做动态路由
 * （Docusaurus 的 pages 插件只支持静态路径）。
 */

/** 当前届次。`/forum` 渲染的就是这一年。 */
export const currentEditionYear = 2027;

/** 全部届次，新的在前。 */
const editions: ForumEdition[] = [edition2027, edition2026, edition2025, edition2023];

/** 当前届次沿用 `/forum`，历史届次走 `/forum/<年份>`。 */
export function editionPath(year: number): string {
  return year === currentEditionYear ? "/forum" : `/forum/${year}`;
}

export function getEdition(year: number): ForumEdition | undefined {
  return editions.find((edition) => edition.year === year);
}

/** 取某一届，取不到直接抛错——页面文件用它，避免登记漏了却静默渲染空页。 */
export function requireEdition(year: number): ForumEdition {
  const edition = getEdition(year);
  if (!edition) {
    throw new Error(`天工论坛 ${year} 尚未在 src/data/forum/index.ts 登记`);
  }
  return edition;
}

/** 当前届次。 */
export function getCurrentEdition(): ForumEdition {
  return requireEdition(currentEditionYear);
}

/**
 * 找出包含某个活动 key 的届次。
 *
 * 用于旧深链转发：`/forum#agenda-xxx` 这类锚点当年指向的是那一届的议程，
 * 届次轮换后主页面已经没有这个锚点了，需要把人送到对应的存档页。
 * 哈希片段不会到达服务端，重定向只能在浏览器里做。
 */
export function findEditionYearByActivityKey(
  activityKey: string,
): number | undefined {
  return editions.find((edition) =>
    (edition.activityAgendaDetails ?? []).some(
      (detail) => detail.activityKey === activityKey,
    ),
  )?.year;
}

/** 其它届次的入口，当前届次排最前，其余按年份倒序。 */
export function getOtherForumEditions(year: number): ForumEditionLink[] {
  return editions
    .filter((edition) => edition.year !== year)
    .map((edition) => ({
      year: edition.year,
      to: editionPath(edition.year),
      label: `天工论坛 ${edition.year}`,
    }))
    .sort((a, b) => {
      if (a.year === currentEditionYear) return -1;
      if (b.year === currentEditionYear) return 1;
      return b.year - a.year;
    });
}

/** 已登记的届次年份，新的在前。 */
export function getEditionYears(): number[] {
  return editions.map((edition) => edition.year);
}

export { editions as forumEditions };
export type { ForumEdition, ForumEditionLink };
