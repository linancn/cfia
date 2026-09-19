import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import {
  editionPath,
  findEditionYearByActivityKey,
} from "../../data/forum";
import {
  agendaTrackOrder,
  type AgendaDayKey,
  type AgendaStatus,
  type AgendaText,
  type AgendaTrackKey,
  type ActivityAgendaDetail,
  type ActivitySession,
  type ForumEdition,
  type ForumHighlight,
  type ForumPerson,
  type ForumText,
  type MasterAgendaSlot,
} from "../../data/forum/types";
import styles from "./forum.module.css";

const icons = {
  assembly: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M12 4.5 15.5 7h3.5a1 1 0 0 1 1 1v7.5h-2V9.5h-3L12 11l-3-1.5H6.5v6.5h-2V8a1 1 0 0 1 1-1H9.5L13 4.5h-1Z"
        fill="currentColor"
      />
      <path
        d="M8 18h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  developer: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M8.5 7.5 4.5 12l4 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m15.5 7.5 4 4.5-4 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m13.5 6.5-3 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  forum: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M6 6h12c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H9.4c-.3 0-.6.1-.8.3L6 16.5V7c0-.6.4-1 1-1Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M8 11h9"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 8.5h5.5"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M12 3.5 13.3 9H19l-4.6 3.3L15.6 18 12 14.7 8.4 18l1.2-5.7L5 9h5.7L12 3.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  collaboration: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M12 12.5c1.9 0 3.5-1.6 3.5-3.5S13.9 5.5 12 5.5 8.5 7.1 8.5 9s1.6 3.5 3.5 3.5Z"
        fill="currentColor"
      />
      <path
        d="M7.5 17.5c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 9.5h-2m1 2v-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 9.5h-2m1-2v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  media: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M6 6h8a2 2 0 0 1 2 2v8H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M10.5 14.5v-5l4 2.5-4 2.5Z" fill="#fff" />
      <path
        d="M18 9.5 21 8v8l-3-1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sponsor: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M7.5 10.5h9V18a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7.5Z"
        fill="currentColor"
      />
      <path
        d="M7.5 10.5h9"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 5.5v5"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9.5 5.5H12a2 2 0 0 0-2-2c-1 0-2 .7-2 1.7 0 .9.6 1.6 1.4 1.8Z"
        fill="currentColor"
      />
      <path
        d="M12 5.5h2.5c.8-.2 1.4-.9 1.4-1.8 0-1-.9-1.7-2-1.7a2 2 0 0 0-2 2Z"
        fill="currentColor"
      />
    </svg>
  ),
} as const;

type IconKey = keyof typeof icons;

const coopItems: { title: ReactNode; desc: ReactNode; icon: IconKey }[] = [
  {
    title: <Translate id="forum.coop.hosting.title">参加分论坛</Translate>,
    desc: (
      <Translate id="forum.coop.hosting.desc">
        作为报告人或圆桌嘉宾参与分论坛。
      </Translate>
    ),
    icon: "forum",
  },
  {
    title: <Translate id="forum.coop.specialEvents.title">专题活动</Translate>,
    desc: (
      <Translate id="forum.coop.specialEvents.desc">
        闭门圆桌、标准与指南研讨等定制化交流。
      </Translate>
    ),
    icon: "spark",
  },
  {
    title: <Translate id="forum.coop.sponsorship.title">赞助合作</Translate>,
    desc: (
      <Translate id="forum.coop.sponsorship.desc">
        多层级品牌展示、致辞报告与媒体传播权益。
      </Translate>
    ),
    icon: "sponsor",
  },
  {
    title: <Translate id="forum.coop.media.title">媒体与传播</Translate>,
    desc: (
      <Translate id="forum.coop.media.desc">
        宣传矩阵共建，渠道与资源共享。
      </Translate>
    ),
    icon: "media",
  },
];

const peopleNameCollator = new Intl.Collator("en", { sensitivity: "base" });

const getSurname = (name: string): string => {
  const nameParts = name.trim().split(/\s+/);
  return nameParts[nameParts.length - 1] ?? "";
};

/** 按姓氏字母排序。与年份无关，因此留在组件模块里。 */
const sortPeople = (people: ForumPerson[]): ForumPerson[] =>
  [...people].sort((left, right) => {
    const surnameCompare = peopleNameCollator.compare(
      getSurname(left.nameEn),
      getSurname(right.nameEn)
    );
    if (surnameCompare !== 0) {
      return surnameCompare;
    }
    return peopleNameCollator.compare(left.nameEn, right.nameEn);
  });

type MasterAgendaTimelineRow = {
  key: string;
  day: AgendaDayKey;
  start: string;
  end: string;
  activeSlots: MasterAgendaSlot[];
};

type MasterAgendaCalendarPlacement = {
  slot: MasterAgendaSlot;
  laneIndex: number;
  rowStart: number;
  rowSpan: number;
};

type MasterAgendaCalendarCluster = {
  key: string;
  day: AgendaDayKey;
  startMinutes: number;
  endMinutes: number;
  timeRows: number;
  placements: MasterAgendaCalendarPlacement[];
  laneCount: number;
};

type MasterAgendaCalendarDay = {
  key: string;
  day: AgendaDayKey;
  clusters: MasterAgendaCalendarCluster[];
};

const MASTER_AGENDA_GRID_STEP_MINUTES = 15;
const MASTER_AGENDA_GRID_ROW_HEIGHT_FALLBACK = "1.375rem";

const agendaDayOrder: AgendaDayKey[] = ["day1", "day2"];

const trackLabels: Record<AgendaTrackKey, AgendaText> = {
  main: { zh: "主论坛", en: "Main Forum" },
  subforums: { zh: "分论坛", en: "Sub-forums" },
  special: { zh: "专项活动", en: "Special Events" },
  developer: { zh: "开发者大会", en: "Developer" },
};

function getAgendaText(text: AgendaText | undefined, isZh: boolean): string {
  if (!text) {
    return "";
  }
  return isZh ? text.zh : (text.en ?? text.zh);
}

/** 判断是不是 `{ zh, en }` 双语对。React 元素和数组都不会带 `zh` 字段。 */
function isAgendaText(value: unknown): value is AgendaText {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    typeof (value as AgendaText).zh === "string"
  );
}

/**
 * 取年份数据里的文案。
 *
 * 允许 `{ zh, en }` 双语对（新写法）和现成的 `ReactNode`（历史遗留的
 * `<Translate>` 写法）混用，所以这里两种都收。
 */
function renderForumText(value: ForumText | undefined, isZh: boolean): ReactNode {
  if (value === undefined || value === null) {
    return null;
  }
  return isAgendaText(value) ? getAgendaText(value, isZh) : value;
}

/**
 * 同 `renderForumText`，但只取纯文本。
 *
 * 用在需要字符串的地方（React 的 `key`、图片 `alt`），拿不到文本就退化为空串。
 */
function getForumTextValue(value: ForumText | undefined, isZh: boolean): string {
  if (value === undefined || value === null) {
    return "";
  }
  if (isAgendaText(value)) {
    return getAgendaText(value, isZh);
  }
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return "";
}

function getCompactTimeRangeLabel(timeRange: string | undefined): string {
  if (!timeRange) {
    return "";
  }
  return timeRange.replace(/^Day\s*\d+\s*/i, "").trim();
}

function getDayNumberFromTimeRange(timeRange: string | undefined): number | undefined {
  if (!timeRange) {
    return undefined;
  }
  const match = timeRange.match(/\bDay\s*(\d+)\b/i);
  if (!match) {
    return undefined;
  }
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : undefined;
}

function getDateLabelWithDaySuffix(
  dateLabel: AgendaText | undefined,
  timeRange: string | undefined,
  isZh: boolean
): string {
  const base = getAgendaText(dateLabel, isZh);
  if (!base) {
    return "";
  }

  const dayNumber = getDayNumberFromTimeRange(timeRange);
  if (!dayNumber) {
    return base;
  }

  if (isZh) {
    if (/第\s*\d+\s*天/.test(base)) {
      return base;
    }
    return `${base}（第 ${dayNumber} 天）`;
  }

  if (/\bDay\s*\d+\b/i.test(base)) {
    return base;
  }
  return `${base} (Day ${dayNumber})`;
}

function parseTimeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map((part) => Number(part));
  return hour * 60 + minute;
}

function sortSessions(a: ActivitySession, b: ActivitySession): number {
  const aHasTime = Boolean(a.start && a.end);
  const bHasTime = Boolean(b.start && b.end);

  if (!aHasTime || !bHasTime) {
    if (aHasTime && !bHasTime) {
      return -1;
    }
    if (!aHasTime && bHasTime) {
      return 1;
    }
    return 0;
  }

  return (
    parseTimeToMinutes(a.start as string) - parseTimeToMinutes(b.start as string) ||
    parseTimeToMinutes(a.end as string) - parseTimeToMinutes(b.end as string) ||
    a.id.localeCompare(b.id)
  );
}

function groupSlotsForTimeline(slots: MasterAgendaSlot[]): MasterAgendaTimelineRow[] {
  const trackIndexMap = new Map(agendaTrackOrder.map((track, index) => [track, index]));
  const dayIndexMap = new Map(agendaDayOrder.map((day, index) => [day, index]));
  const slotOrderMap = new Map(slots.map((slot, index) => [slot.id, index]));
  const slotsByDay = new Map<AgendaDayKey, MasterAgendaSlot[]>();

  slots.forEach((slot) => {
    const daySlots = slotsByDay.get(slot.day);
    if (daySlots) {
      daySlots.push(slot);
      return;
    }
    slotsByDay.set(slot.day, [slot]);
  });

  const rows: MasterAgendaTimelineRow[] = [];

  agendaDayOrder.forEach((day) => {
    const daySlots = slotsByDay.get(day);
    if (!daySlots || daySlots.length === 0) {
      return;
    }

    const boundarySet = new Set<string>();
    let crossesNoon = false;

    daySlots.forEach((slot) => {
      boundarySet.add(slot.start);
      boundarySet.add(slot.end);

      if (
        parseTimeToMinutes(slot.start) < 12 * 60 &&
        parseTimeToMinutes(slot.end) > 12 * 60
      ) {
        crossesNoon = true;
      }
    });

    if (crossesNoon) {
      boundarySet.add("12:00");
    }

    const boundaries = Array.from(boundarySet).sort(
      (a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b)
    );

    for (let index = 0; index < boundaries.length - 1; index += 1) {
      const start = boundaries[index];
      const end = boundaries[index + 1];
      const rowStartMinutes = parseTimeToMinutes(start);
      const rowEndMinutes = parseTimeToMinutes(end);

      if (rowStartMinutes >= rowEndMinutes) {
        continue;
      }

      const activeSlots = daySlots
        .filter((slot) => {
          const slotStartMinutes = parseTimeToMinutes(slot.start);
          const slotEndMinutes = parseTimeToMinutes(slot.end);
          return slotStartMinutes < rowEndMinutes && slotEndMinutes > rowStartMinutes;
        })
        .sort((a, b) => {
          return (
            (trackIndexMap.get(a.track) ?? 99) - (trackIndexMap.get(b.track) ?? 99) ||
            (slotOrderMap.get(a.id) ?? 999) - (slotOrderMap.get(b.id) ?? 999) ||
            a.id.localeCompare(b.id)
          );
        });

      if (activeSlots.length === 0) {
        continue;
      }

      rows.push({
        key: `${day}-${start}-${end}`,
        day,
        start,
        end,
        activeSlots,
      });
    }
  });

  return rows.sort((a, b) => {
    return (
      (dayIndexMap.get(a.day) ?? 99) - (dayIndexMap.get(b.day) ?? 99) ||
      parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start) ||
      parseTimeToMinutes(a.end) - parseTimeToMinutes(b.end)
    );
  });
}

function floorToGridStep(minutes: number): number {
  return Math.floor(minutes / MASTER_AGENDA_GRID_STEP_MINUTES) * MASTER_AGENDA_GRID_STEP_MINUTES;
}

function ceilToGridStep(minutes: number): number {
  return Math.ceil(minutes / MASTER_AGENDA_GRID_STEP_MINUTES) * MASTER_AGENDA_GRID_STEP_MINUTES;
}

function formatMinutesToTime(minutes: number): string {
  const hour = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const minute = (minutes % 60).toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

function buildDayCalendarLayouts(slots: MasterAgendaSlot[]): MasterAgendaCalendarDay[] {
  const trackIndexMap = new Map(agendaTrackOrder.map((track, index) => [track, index]));
  const slotOrderMap = new Map(slots.map((slot, index) => [slot.id, index]));
  const slotsByDay = new Map<AgendaDayKey, MasterAgendaSlot[]>();

  slots.forEach((slot) => {
    const daySlots = slotsByDay.get(slot.day);
    if (daySlots) {
      daySlots.push(slot);
      return;
    }
    slotsByDay.set(slot.day, [slot]);
  });

  return agendaDayOrder.flatMap((day) => {
    const daySlots = slotsByDay.get(day);
    if (!daySlots || daySlots.length === 0) {
      return [];
    }

    const sortedSlots = [...daySlots].sort((a, b) => {
      return (
        parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start) ||
        parseTimeToMinutes(a.end) - parseTimeToMinutes(b.end) ||
        (trackIndexMap.get(a.track) ?? 99) - (trackIndexMap.get(b.track) ?? 99) ||
        (slotOrderMap.get(a.id) ?? 999) - (slotOrderMap.get(b.id) ?? 999) ||
        a.id.localeCompare(b.id)
      );
    });

    const clusters: MasterAgendaSlot[][] = [];
    let currentCluster: MasterAgendaSlot[] = [];
    let currentClusterEndMinutes = -1;

    sortedSlots.forEach((slot) => {
      const slotStartMinutes = parseTimeToMinutes(slot.start);
      const slotEndMinutes = parseTimeToMinutes(slot.end);

      if (currentCluster.length === 0) {
        currentCluster = [slot];
        currentClusterEndMinutes = slotEndMinutes;
        return;
      }

      if (slotStartMinutes > currentClusterEndMinutes) {
        clusters.push(currentCluster);
        currentCluster = [slot];
        currentClusterEndMinutes = slotEndMinutes;
        return;
      }

      currentCluster.push(slot);
      currentClusterEndMinutes = Math.max(currentClusterEndMinutes, slotEndMinutes);
    });

    if (currentCluster.length > 0) {
      clusters.push(currentCluster);
    }

    const layoutClusters = clusters.map((clusterSlots, clusterIndex) => {
      const clusterStartMinutes = floorToGridStep(
        Math.min(...clusterSlots.map((slot) => parseTimeToMinutes(slot.start)))
      );
      const clusterEndMinutes = ceilToGridStep(
        Math.max(...clusterSlots.map((slot) => parseTimeToMinutes(slot.end)))
      );
      const laneEndMinutes: number[] = [];
      const placements: MasterAgendaCalendarPlacement[] = [];

      clusterSlots.forEach((slot) => {
        const slotStartMinutes = parseTimeToMinutes(slot.start);
        const slotEndMinutes = parseTimeToMinutes(slot.end);
        let laneIndex = laneEndMinutes.findIndex((endMinutes) => endMinutes <= slotStartMinutes);

        if (laneIndex < 0) {
          laneIndex = laneEndMinutes.length;
          laneEndMinutes.push(slotEndMinutes);
        } else {
          laneEndMinutes[laneIndex] = slotEndMinutes;
        }

        const rowStart = Math.max(
          0,
          Math.floor((slotStartMinutes - clusterStartMinutes) / MASTER_AGENDA_GRID_STEP_MINUTES)
        );
        const rowEnd = Math.max(
          rowStart + 1,
          Math.ceil((slotEndMinutes - clusterStartMinutes) / MASTER_AGENDA_GRID_STEP_MINUTES)
        );

        placements.push({
          slot,
          laneIndex,
          rowStart,
          rowSpan: rowEnd - rowStart,
        });
      });

      return {
        key: `${day}-cluster-${clusterIndex}-${formatMinutesToTime(clusterStartMinutes)}-${formatMinutesToTime(clusterEndMinutes)}`,
        day,
        startMinutes: clusterStartMinutes,
        endMinutes: clusterEndMinutes,
        timeRows: Math.max(
          1,
          Math.ceil(
            (clusterEndMinutes - clusterStartMinutes) / MASTER_AGENDA_GRID_STEP_MINUTES
          )
        ),
        placements,
        laneCount: Math.max(1, laneEndMinutes.length),
      } satisfies MasterAgendaCalendarCluster;
    });

    return [
      {
        key: `calendar-${day}`,
        day,
        clusters: layoutClusters,
      } satisfies MasterAgendaCalendarDay,
    ];
  });
}

type ForumEditionPageProps = {
  edition: ForumEdition;
};

export default function ForumEditionPage({
  edition,
}: ForumEditionPageProps): ReactNode {
  const {
    hero,
    venue,
    registration,
    planning,
    framework,
    highlights = [],
    people = [],
    devConfLogos = [],
    organizerLogos = [],
    supportInstitutionLogos = [],
    agendaGroups = [],
    dayLabels = {},
    timelineDayLabels = {},
    timelineDayShortLabels = {},
    keynoteSpeakerPhotoBySessionId = {},
    masterAgendaSlots = [],
    activityAgendaDetails = [],
  } = edition;

  const peopleSorted = sortPeople(people);
  const devConfLogoByKey = new Map(devConfLogos.map((logo) => [logo.key, logo]));
  const isArchived = edition.phase === "closed";
  const hasAgenda = masterAgendaSlots.length > 0;
  // 这一块只渲染主办席位与支持机构，判断条件要和它渲染的内容一致。
  // （`devConfLogos` 是在议程板块里用的，不算在内，否则会渲染出一个空板块。）
  // 主办单位被提到筹备行里时（见 `ForumPlanning.withHost`），这一块里就不算它了，
  // 否则同一个 logo 会在页面上出现两次。
  const hostInPlanningRow = Boolean(planning?.withHost && organizerLogos[0]);
  // 主办一类的席位。三个席位按数据约定各占固定下标（见 types.ts 的
  // `organizerLogos`），缺的就不渲染，而不是留一张空卡。
  const partnerSlotCount = [
    hostInPlanningRow ? undefined : organizerLogos[0],
    organizerLogos[1],
    organizerLogos[2],
  ].filter(Boolean).length;
  const hasPartnerLogos = partnerSlotCount > 0 || supportInstitutionLogos.length > 0;
  const hasPeople = people.length > 0;
  const hasHighlights = highlights.length > 0;
  // 标了 featured 的整行呈现（「上一届」），其余按网格平铺。
  const featuredHighlights = highlights.filter((item) => item.featured);
  const restHighlights = highlights.filter((item) => !item.featured);

  const { i18n } = useDocusaurusContext();
  // 年份数据里的图片都是相对 static 的路径（`img/...`）。存档页在
  // `/forum/<年份>`，比 `/forum` 深一层，直接用相对路径会解析到
  // `/forum/img/...` 而 404，所以统一过一遍 withBaseUrl。
  const { withBaseUrl } = useBaseUrlUtils();
  const isZh = i18n.currentLocale.startsWith("zh");
  const heroImage = withBaseUrl(hero.image);
  const venueImage = withBaseUrl(venue?.image ?? "");

  /**
   * 历届论坛的一张卡片。标了 `featured` 的那张走整行图文分栏，
   * 它的图片列宽与下方两列网格里的图片严格同宽同左（见 `.cardFeatured`）。
   * 有存档页地址的整块可点，没有的还是普通卡片。
   */
  const renderHighlightCard = (session: ForumHighlight, key: string): ReactNode => {
    const isFeatured = Boolean(session.featured);
    const className = clsx(
      styles.card,
      isFeatured && styles.cardFeatured,
      session.to && styles.cardLink,
    );

    const body = (
      <>
        <div className={styles.cardPhoto}>
          {session.image && (
            <img
              src={withBaseUrl(session.image)}
              alt={getForumTextValue(session.title, isZh)}
              className={styles.cardPhotoImg}
              loading="lazy"
            />
          )}
        </div>
        <div className={styles.cardText}>
          <div className={styles.cardMetaRow}>
            <span className={styles.pill}>{renderForumText(session.date, isZh)}</span>
          </div>
          <div className={clsx(styles.cardTitle, isFeatured && styles.cardTitleFeatured)}>
            {renderForumText(session.title, isZh)}
          </div>
          <div className={styles.cardMeta}>{renderForumText(session.focus, isZh)}</div>
          {session.tags && (
            <div className={styles.badgeRow}>
              {session.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className={styles.badge}>
                  {renderForumText(tag, isZh)}
                </span>
              ))}
            </div>
          )}
        </div>
      </>
    );

    return session.to ? (
      <Link key={key} to={session.to} className={className}>
        {body}
      </Link>
    ) : (
      <div key={key} className={className}>
        {body}
      </div>
    );
  };

  /**
   * 筹备期的硬信息。只放卡片，不带板块标题与说明——这几项 hero 上大致都出现过，
   * 这里只是把它们摆成可扫读的一行。
   *
   * `planning.withHost` 打开时，主办单位作为**第一格**插在最左边，三格等宽，
   * 整行读作「谁办的 — 什么时候 — 在哪里」。logo 取 `organizerLogos[0]`。
   * 内容为空则整段不渲染；会议信息定稿后把 `planning` 去掉即可。
   */
  const renderPlanningBlock = (): ReactNode => {
    if (!planning || isArchived) {
      return null;
    }

    const facts = planning.facts ?? [];
    const hostLogo = hostInPlanningRow ? organizerLogos[0] : undefined;
    if (!hostLogo && facts.length === 0) {
      return null;
    }

    return (
      <section id="planning" className={clsx(styles.section, styles.lightSection)}>
        <div className="container">
          <dl className={styles.planningFacts}>
            {hostLogo && (
              <div className={styles.planningFact}>
                <dt className={styles.planningFactLabel}>
                  <Translate id="forum.section.organizers">主办单位</Translate>
                </dt>
                <dd className={styles.planningFactLogoBox}>
                  <img
                    className={styles.planningFactLogo}
                    src={withBaseUrl(hostLogo.src)}
                    alt={hostLogo.name}
                  />
                </dd>
              </div>
            )}
            {facts.map((item, index) => (
              <div key={index} className={styles.planningFact}>
                <dt className={styles.planningFactLabel}>
                  {renderForumText(item.label, isZh)}
                </dt>
                <dd className={styles.planningFactValue}>
                  {renderForumText(item.value, isZh)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  };

  /**
   * 本届议程框架（BUILD — SHAPE — ACT）。按顺序取三种强调色，
   * 三项各占一卡、标签大字排在最前，是本届页面的视觉重心。
   */
  const renderFrameworkBlock = (): ReactNode => {
    if (!framework || isArchived || framework.items.length === 0) {
      return null;
    }

    return (
      <section id="framework" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionTitle}>
              {isZh ? "议程框架" : "Agenda framework"}
            </p>
            {framework.intro && (
              <p className={styles.sectionHint}>
                {renderForumText(framework.intro, isZh)}
              </p>
            )}
          </div>
          <div className={styles.frameworkGrid}>
            {framework.items.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  styles.frameworkCard,
                  styles[`frameworkTone${index % 3}`],
                )}
              >
                <span className={styles.frameworkLabel}>
                  {renderForumText(item.label, isZh)}
                </span>
                {item.stage && (
                  <span className={styles.frameworkStage}>
                    {renderForumText(item.stage, isZh)}
                  </span>
                )}
                <p className={styles.frameworkValue}>
                  {renderForumText(item.value, isZh)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  /**
   * 存档页的回顾段落，紧贴 hero 下方。
   *
   * 这一块原来还带着「天工论坛 YYYY 已结束」标题、存档说明和三个届次入口卡片。
   * 届次入口与底部的「历届天工论坛」重复，2026-09-19 按剑川意见把标题、说明、
   * 入口卡片一并删除，只留下 `summary` 这段正文（没有填 summary 的届次整块不渲染，
   * 例如 2026）。hero 上的「会议已结束」胶囊继续承担存档提示。
   */
  const renderArchiveSummary = (): ReactNode => {
    if (!isArchived || !edition.summary) {
      return null;
    }

    return (
      <section className={clsx(styles.section, styles.lightSection)}>
        <div className="container">
          <p className={styles.sectionLead}>{renderForumText(edition.summary, isZh)}</p>
        </div>
      </section>
    );
  };

  /** 会场信息。没有会场数据的年份（早期届次）不渲染。 */
  const renderVenueBlock = (): ReactNode => {
    if (!venue) {
      return null;
    }
    return (
      <div className={styles.venueBlock}>
        <div
          className={styles.venueCard}
          style={{ backgroundImage: `url(${venueImage})` }}
        >
          <div className={styles.venueOverlay} />
          <div className={styles.venueContent}>
            <span className={styles.venueTag}>
              <Translate id="forum.venue.tag">会议地点</Translate>
            </span>
            <div className={styles.venueTitle}>
              {renderForumText(venue.name, isZh)}
            </div>
            <div className={styles.venueAddress}>
              {renderForumText(venue.address, isZh)}
              <div className={styles.venueLinks}>
                <a
                  className={styles.venueLink}
                  href={venue.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Translate id="forum.venue.googleMaps">谷歌地图</Translate>
                </a>
                <a
                  className={styles.venueLink}
                  href={venue.baiduMaps}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Translate id="forum.venue.baiduMaps">百度地图</Translate>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /** 会议注册费。已结束的届次不再展示报名信息。 */
  const renderRegistrationBlock = (): ReactNode => {
    if (!registration || isArchived) {
      return null;
    }
    return (
      <div className={styles.ticketBlock}>
        <div className={styles.ticketCard}>
          <div className={styles.ticketHeader}>
            <div className={styles.ticketTitle}>
              <Translate id="forum.ticket.title">会议注册费</Translate>
            </div>
          </div>
          <div className={styles.ticketPriceGrid}>
            <div className={clsx(styles.ticketPriceItem, styles.ticketPriceOnline)}>
              <div className={styles.ticketPriceLabel}>
                <Translate id="forum.ticket.online">线上注册</Translate>
              </div>
              <div className={styles.ticketPriceValue}>
                {registration.online}
                <span className={styles.ticketPriceUnit}>
                  <Translate id="forum.ticket.unit">/ 人</Translate>
                </span>
              </div>
            </div>
            <div className={clsx(styles.ticketPriceItem, styles.ticketPriceOnsite)}>
              <div className={styles.ticketPriceLabel}>
                <Translate id="forum.ticket.onsite">现场注册</Translate>
              </div>
              <div className={styles.ticketPriceValue}>
                {registration.onsite}
                <span className={styles.ticketPriceUnit}>
                  <Translate id="forum.ticket.unit">/ 人</Translate>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.ticketNotes}>
            {registration.notes.map((note, index) => (
              <div
                key={index}
                className={clsx(
                  styles.ticketNoteItem,
                  note.member && styles.ticketNoteMember
                )}
              >
                <span className={styles.ticketNoteBullet} aria-hidden="true">
                  •
                </span>
                <span>{renderForumText(note.text, isZh)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const [expandedActivityKeys, setExpandedActivityKeys] = useState<string[]>([
    "main-forum",
    "developer-conference",
  ]);
  const [highlightedActivityKey, setHighlightedActivityKey] = useState<string | null>(null);
  const activityPanelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const highlightTimeoutRef = useRef<number | null>(null);

  const activityDetailsByKey = Object.fromEntries(
    activityAgendaDetails.map((detail) => [detail.activityKey, detail])
  ) as Record<string, ActivityAgendaDetail>;

  const getActivityDetailByKey = (activityKey: string): ActivityAgendaDetail | undefined => {
    return activityDetailsByKey[activityKey];
  };

  const getDayLabel = (day: AgendaDayKey): string => getAgendaText(dayLabels[day], isZh);
  const getTrackLabel = (track: AgendaTrackKey): string => getAgendaText(trackLabels[track], isZh);

  const getMasterSlotClassName = (status: AgendaStatus): string => {
    if (status === "published") return styles.masterSlotPublished;
    if (status === "updating") return styles.masterSlotUpdating;
    return styles.masterSlotPending;
  };

  const getMasterTrackClassName = (track: AgendaTrackKey): string => {
    if (track === "main") return styles.masterTrackMain;
    if (track === "subforums") return styles.masterTrackSubforums;
    if (track === "special") return styles.masterTrackSpecial;
    return styles.masterTrackDeveloper;
  };

  const renderStatusPill = (_status: AgendaStatus, _className?: string): ReactNode => null;

  const setActivityPanelRef = (activityKey: string, node: HTMLDivElement | null): void => {
    activityPanelRefs.current[activityKey] = node;
  };

  const ensureExpanded = (activityKey: string): void => {
    setExpandedActivityKeys((prev) => {
      if (prev.includes(activityKey)) {
        return prev;
      }
      return [...prev, activityKey];
    });
  };

  const toggleActivityExpanded = (activityKey: string): void => {
    setExpandedActivityKeys((prev) => {
      if (prev.includes(activityKey)) {
        return prev.filter((key) => key !== activityKey);
      }
      return [...prev, activityKey];
    });
  };

  const triggerPanelHighlight = (activityKey: string): void => {
    setHighlightedActivityKey(activityKey);

    if (typeof window !== "undefined") {
      if (highlightTimeoutRef.current !== null) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
      highlightTimeoutRef.current = window.setTimeout(() => {
        setHighlightedActivityKey((current) => (current === activityKey ? null : current));
      }, 1800);
    }
  };

  const openAndScrollToActivity = (
    activityKey: string,
    options?: { smooth?: boolean; updateHash?: boolean }
  ): void => {
    if (!getActivityDetailByKey(activityKey)) {
      return;
    }

    ensureExpanded(activityKey);
    triggerPanelHighlight(activityKey);

    if (typeof window !== "undefined" && options?.updateHash !== false) {
      const hash = `#agenda-${activityKey}`;
      if (window.history?.replaceState) {
        window.history.replaceState(null, "", hash);
      } else {
        window.location.hash = hash;
      }
    }

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        activityPanelRefs.current[activityKey]?.scrollIntoView({
          behavior: options?.smooth === false ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  };

  const renderAgendaSubsectionHeader = (
    title: ReactNode,
    desc?: ReactNode
  ): ReactNode => (
    <div className={styles.agendaSubsectionHeader}>
      <div className={styles.agendaSubsectionTitle}>{title}</div>
      {desc && <div className={styles.agendaSubsectionDesc}>{desc}</div>}
    </div>
  );

  const renderTalkTitle = (talkTitle: ActivitySession["talkTitle"]): ReactNode => {
    if (!talkTitle) {
      return null;
    }

    const zhTitle = talkTitle.zh?.trim();
    const enTitle = talkTitle.en?.trim();
    const hasDistinctEnTitle = Boolean(enTitle && enTitle !== zhTitle);
    const enOnlyTitle = enTitle ?? zhTitle;

    if (!isZh) {
      return enOnlyTitle ? (
        <div className={styles.agendaTalkTitle}>
          <div className={styles.agendaTalkTitleEn}>{enOnlyTitle}</div>
        </div>
      ) : null;
    }

    return (
      <div className={styles.agendaTalkTitle}>
        {zhTitle && <div className={styles.agendaTalkTitleZh}>{zhTitle}</div>}
        {hasDistinctEnTitle && <div className={styles.agendaTalkTitleEn}>{enTitle}</div>}
      </div>
    );
  };

  const renderVenueTag = (
    venue?: AgendaText,
    options?: { className?: string; showLabel?: boolean }
  ): ReactNode => {
    if (!venue) {
      return null;
    }

    const showLabel = options?.showLabel ?? true;

    return (
      <span className={clsx(styles.agendaVenueTag, options?.className)}>
        {showLabel && (
          <span className={styles.agendaVenueTagLabel}>{isZh ? "会场" : "Venue"}</span>
        )}
        <span className={styles.agendaVenueTagValue}>{getAgendaText(venue, isZh)}</span>
      </span>
    );
  };

  const isHostOrModeratorLabel = (label: string): boolean => {
    const normalized = label.trim().toLowerCase();
    return (
      /主持人?|召集人|联合组织者/.test(label) ||
      normalized.startsWith("host") ||
      normalized.startsWith("moderator") ||
      normalized.startsWith("convener") ||
      normalized.startsWith("co-organizer")
    );
  };

  const isModeratorLabel = (label: string): boolean => {
    const normalized = label.trim().toLowerCase();
    return (
      /主持人?/.test(label) ||
      normalized.startsWith("host") ||
      normalized.startsWith("moderator")
    );
  };

  const getSummaryLeadLabel = (label: string, activityKey?: string): string => {
    if (activityKey === "unep-workshop" && isHostOrModeratorLabel(label)) {
      return isZh ? "召集人" : "Convener";
    }

    return label;
  };

  const getSessionDisplayTitle = (activityKey: string, session: ActivitySession): string => {
    if (activityKey === "main-forum" && session.id === "mf-d2-open") {
      return isZh ? "领导致辞" : "Remarks";
    }

    return getAgendaText(session.title, isZh);
  };

  const personPlaceholderPattern =
    /^(持续邀请|敬请期待|待定|待补|更多嘉宾|Audience Q&A|Q&A|TBD|Coming Soon)/i;

  const personLeadLabelPattern =
    /^((?:主持人?|主持|Moderator|Host|Convener|召集人)\s*[：:]\s*)(.+)$/i;

  const parsePersonDisplayParts = (
    value: string
  ): { prefix: string; name: string; tail: string } | null => {
    const text = value.trim();
    if (!text || personPlaceholderPattern.test(text)) {
      return null;
    }

    let prefix = "";
    let remainder = text;
    const labelMatch = text.match(personLeadLabelPattern);
    if (labelMatch) {
      prefix = labelMatch[1];
      remainder = labelMatch[2].trim();
    }

    const separatorIndex = remainder.search(/[｜|，,]/);
    if (separatorIndex >= 0) {
      const name = remainder.slice(0, separatorIndex).trim();
      const tail = remainder.slice(separatorIndex);
      if (name) {
        return { prefix, name, tail };
      }
    }

    const zhWhitespaceMatch = remainder.match(
      /^([\p{Script=Han}][\p{Script=Han}A-Za-z·•]{1,15})\s+(.+)$/u
    );
    if (zhWhitespaceMatch) {
      return {
        prefix,
        name: zhWhitespaceMatch[1],
        tail: ` ${zhWhitespaceMatch[2]}`,
      };
    }

    return remainder ? { prefix, name: remainder, tail: "" } : null;
  };

  const formatPersonTail = (tail: string): string => {
    const normalized = tail.trim();
    if (!normalized) {
      return "";
    }

    if (/^[｜|，,]/.test(normalized)) {
      const content = normalized.replace(/^[｜|，,]\s*/, "").trim();
      if (!content) {
        return "";
      }
      return isZh ? `，${content}` : `, ${content}`;
    }

    return ` ${normalized}`;
  };

  const renderPersonNameWithBold = (value: string): ReactNode => {
    const parts = parsePersonDisplayParts(value);
    if (!parts) {
      return value.trim();
    }

    return (
      <>
        {parts.prefix}
        <strong>{parts.name}</strong>
        {formatPersonTail(parts.tail)}
      </>
    );
  };

  const splitPersonNameAndRole = (
    value: string
  ): { name: string; role: string } | null => {
    const parts = parsePersonDisplayParts(value);
    if (!parts) {
      return null;
    }

    return {
      name: parts.name,
      role: parts.tail.replace(/^[\s｜|，,]+/, "").trim(),
    };
  };

  const renderAgendaBulletItems = (
    text: string,
    className?: string,
    options?: { boldName?: boolean; stackedNameRole?: boolean }
  ): ReactNode => {
    const items = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (items.length === 0) {
      return null;
    }

    const firstLine = items[0].replace(/\s+/g, "");
    if (
      firstLine === "嘉宾：" ||
      firstLine === "嘉宾:" ||
      /^panelists:$/i.test(items[0])
    ) {
      items.shift();
    }

    if (items.length === 0) {
      return null;
    }

    const renderBulletItemContent = (item: string): ReactNode => {
      if (options?.stackedNameRole) {
        const parts = splitPersonNameAndRole(item);
        if (!parts) {
          return item;
        }

        return (
          <span className={styles.agendaPhaseRemarkBulletText}>
            <span className={styles.agendaPhaseRemarkBulletName}>{parts.name}</span>
            {parts.role && (
              <span className={styles.agendaPhaseRemarkBulletRole}>{parts.role}</span>
            )}
          </span>
        );
      }

      if (options?.boldName) {
        return renderPersonNameWithBold(item);
      }

      return item;
    };

    return (
      <ul className={clsx(styles.agendaBulletList, className)}>
        {items.map((item, itemIndex) => (
          <li key={`${item}-${itemIndex}`}>{renderBulletItemContent(item)}</li>
        ))}
      </ul>
    );
  };

  const renderSummaryLeadBlock = (
    summaryLead: AgendaText | undefined,
    options?: { activityKey?: string }
  ): ReactNode => {
    if (!summaryLead) {
      return null;
    }

    const text = getAgendaText(summaryLead, isZh).trim();
    if (!text) {
      return null;
    }
    const labelSuffix = isZh ? "：" : ":";

    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return null;
    }

    if (lines.length === 1) {
      const inlineMatch = lines[0].match(/^([^：:]+)[：:]\s*(.+)$/);
      if (inlineMatch) {
        const [, inlineLabel, inlineValue] = inlineMatch;
        const renderedLabel = getSummaryLeadLabel(inlineLabel, options?.activityKey);
        const highlightName = isHostOrModeratorLabel(renderedLabel);
        if (isModeratorLabel(renderedLabel)) {
          return (
            <div className={clsx(styles.agendaPanelSummary, styles.agendaPanelSummaryLead)}>
              <div className={styles.agendaPanelSummaryLeadHead}>
                <span className={styles.agendaPanelSummaryLeadLabel}>
                  {renderedLabel}
                  {labelSuffix}
                </span>
              </div>
              <ul className={styles.agendaPanelSummaryLeadList}>
                <li className={styles.agendaPanelSummaryLeadItem}>
                  {highlightName ? renderPersonNameWithBold(inlineValue) : inlineValue}
                </li>
              </ul>
            </div>
          );
        }
        return (
          <div
            className={clsx(
              styles.agendaPanelSummary,
              styles.agendaPanelSummaryLead,
              styles.agendaPanelSummaryLeadInline
            )}
          >
            <span className={styles.agendaPanelSummaryLeadLabel}>
              {renderedLabel}
              {labelSuffix}
            </span>
            <span>{highlightName ? renderPersonNameWithBold(inlineValue) : inlineValue}</span>
          </div>
        );
      }
    }

    const [labelLine, ...items] = lines;
    const label = getSummaryLeadLabel(labelLine.replace(/[：:]$/, ""), options?.activityKey);
    const highlightName = isHostOrModeratorLabel(label);

    if (items.length <= 1) {
      if (items[0] && isModeratorLabel(label)) {
        return (
          <div className={clsx(styles.agendaPanelSummary, styles.agendaPanelSummaryLead)}>
            <div className={styles.agendaPanelSummaryLeadHead}>
              <span className={styles.agendaPanelSummaryLeadLabel}>
                {label}
                {labelSuffix}
              </span>
            </div>
            <ul className={styles.agendaPanelSummaryLeadList}>
              <li className={styles.agendaPanelSummaryLeadItem}>
                {highlightName ? renderPersonNameWithBold(items[0]) : items[0]}
              </li>
            </ul>
          </div>
        );
      }
      return (
        <div
          className={clsx(
            styles.agendaPanelSummary,
            styles.agendaPanelSummaryLead,
            styles.agendaPanelSummaryLeadInline
          )}
        >
          <span className={styles.agendaPanelSummaryLeadLabel}>
            {label}
            {labelSuffix}
          </span>
          {items[0] && (
            <span>{highlightName ? renderPersonNameWithBold(items[0]) : items[0]}</span>
          )}
        </div>
      );
    }

    return (
      <div className={clsx(styles.agendaPanelSummary, styles.agendaPanelSummaryLead)}>
        <div className={styles.agendaPanelSummaryLeadHead}>
          <span className={styles.agendaPanelSummaryLeadLabel}>
            {label}
            {labelSuffix}
          </span>
        </div>
        <ul className={styles.agendaPanelSummaryLeadList}>
          {items.map((item) => (
            <li key={item} className={styles.agendaPanelSummaryLeadItem}>
              {highlightName ? renderPersonNameWithBold(item) : item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderDeveloperConferencePhaseList = (sessions: ActivitySession[]): ReactNode => {
    const openingSession = sessions.find((session) => session.id === "dev-opening");
    const coffeeBreakSession = sessions.find((session) => session.id === "dev-break");
    const reportSessions = sessions
      .filter((session) => session.sessionType?.zh === "报告" || session.sessionType?.en === "Talk")
      .sort(sortSessions);
    const sectionOneSessions = reportSessions.filter(
      (session) => Boolean(session.start) && parseTimeToMinutes(session.start as string) < 15 * 60 + 35
    );
    const sectionTwoSessions = reportSessions.filter(
      (session) => Boolean(session.start) && parseTimeToMinutes(session.start as string) >= 15 * 60 + 50
    );
    const stripedSessionIds = new Set<string>();
    const orderedSessionRows = [
      ...(openingSession ? [openingSession] : []),
      ...sectionOneSessions,
      ...sectionTwoSessions,
    ];
    orderedSessionRows.forEach((session, index) => {
      if (index % 2 === 0) {
        stripedSessionIds.add(session.id);
      }
    });

    const getSessionTimeRange = (session: ActivitySession): string => {
      if (!session.start || !session.end) {
        return "";
      }
      return `${session.start}-${session.end}`;
    };

    const getSessionBlockRange = (items: ActivitySession[]): string => {
      if (items.length === 0) {
        return "";
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (!first.start || !last.end) {
        return "";
      }
      return `${first.start}-${last.end}`;
    };

    const renderSessionLogo = (session: ActivitySession): ReactNode => {
      const logo = session.orgLogoKey ? devConfLogoByKey.get(session.orgLogoKey) : undefined;
      const logoFallbackText =
        logo?.name ??
        getAgendaText(session.title, isZh) ??
        (isZh ? "机构" : "Org");

      return (
        <div className={styles.devProgramLogoSlot} aria-hidden="true">
          {logo?.src ? (
            <img
              className={styles.devProgramLogoImage}
              src={withBaseUrl(logo.src)}
              alt={logo.name}
              loading="lazy"
            />
          ) : (
            <span className={styles.devProgramLogoFallback}>{logoFallbackText}</span>
          )}
        </div>
      );
    };

    const renderSessionRow = (
      session: ActivitySession,
      options?: { opening?: boolean; tinted?: boolean }
    ): ReactNode => {
      const talkTitleZh = session.talkTitle?.zh?.trim() ?? "";
      const talkTitleEn = (session.talkTitle?.en ?? session.talkTitle?.zh ?? "").trim();
      const hasTalkTitle = Boolean(talkTitleZh || talkTitleEn);
      const organizationTitle = getAgendaText(session.title, isZh);
      const sessionTitle = hasTalkTitle
        ? (isZh ? (talkTitleZh || talkTitleEn) : (talkTitleEn || talkTitleZh))
        : organizationTitle;
      const showTalkTitleEn = isZh && Boolean(talkTitleEn && talkTitleEn !== (talkTitleZh || ""));
      const speakerText = session.speakers
        ? getAgendaText(session.speakers, isZh)
        : (session.moderator ? getAgendaText(session.moderator, isZh) : "");
      const affiliationText = session.note ? getAgendaText(session.note, isZh) : "";
      const speakerMetaNode = (
        <>
          <div className={styles.devProgramSpeakerName}>{speakerText || "-"}</div>
          {affiliationText && (
            <div className={styles.devProgramSpeakerRole}>{affiliationText}</div>
          )}
        </>
      );

      return (
        <div
          key={session.id}
          className={clsx(
            styles.devProgramGrid,
            styles.devProgramRow,
            options?.tinted && styles.devProgramRowTinted,
            options?.opening && styles.devProgramRowOpening
          )}
        >
          <div className={styles.devProgramTimeCell}>
            {getSessionTimeRange(session)}
          </div>
          <div className={styles.devProgramSessionCell}>
            <div className={styles.devProgramDesktopSession}>
              {options?.opening ? (
                <div className={styles.devProgramOpeningText}>{sessionTitle}</div>
              ) : (
                <div className={styles.devProgramSessionMain}>
                  {renderSessionLogo(session)}
                  <div className={styles.devProgramSessionText}>
                  <div className={styles.devProgramSessionTitle}>{sessionTitle}</div>
                  {showTalkTitleEn && (
                    <div className={styles.devProgramSessionTitleEn}>{talkTitleEn}</div>
                  )}
                </div>
              </div>
            )}
            </div>

            <div className={styles.devProgramMobileSession}>
              {!options?.opening && (
                <div className={styles.devProgramMobileTop}>
                  {renderSessionLogo(session)}
                  <div className={styles.devProgramMobileSpeaker}>
                    {speakerMetaNode}
                  </div>
                </div>
              )}
              <div
                className={clsx(
                  styles.devProgramMobileTitle,
                  options?.opening && styles.devProgramMobileTitleOpening
                )}
              >
                {options?.opening ? (
                  <div className={styles.devProgramOpeningText}>{sessionTitle}</div>
                ) : (
                  <>
                    <div className={styles.devProgramSessionTitle}>{sessionTitle}</div>
                    {showTalkTitleEn && (
                      <div className={styles.devProgramSessionTitleEn}>{talkTitleEn}</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.devProgramSpeakerMetaCell}>
            {speakerMetaNode}
          </div>
        </div>
      );
    };

    const renderSectionRow = (
      timeRange: string,
      label: string,
      options?: { noTime?: boolean }
    ): ReactNode => (
      <div
        key={`${timeRange}-${label}`}
        className={clsx(
          styles.devProgramGrid,
          styles.devProgramRow,
          styles.devProgramSectionRow,
          options?.noTime && styles.devProgramSectionRowNoTime
        )}
      >
        <div
          className={clsx(
            styles.devProgramTimeCell,
            options?.noTime && styles.devProgramTimeCellEmpty
          )}
          aria-hidden={options?.noTime ? "true" : undefined}
        >
          {timeRange}
        </div>
        <div className={styles.devProgramSectionCell}>{label}</div>
      </div>
    );

    return (
      <div className={styles.devProgramTable}>
        <div className={clsx(styles.devProgramGrid, styles.devProgramHeaderRow)}>
          <div className={styles.devProgramHeadCell}>{isZh ? "时间" : "Time"}</div>
          <div className={styles.devProgramHeadCell}>{isZh ? "议程" : "Session"}</div>
          <div className={styles.devProgramHeadCell}>
            {isZh ? "报告人" : "Speaker"}
          </div>
        </div>

        {openingSession &&
          renderSessionRow(openingSession, {
            opening: true,
            tinted: stripedSessionIds.has(openingSession.id),
          })}
        {sectionOneSessions.length > 0 &&
          renderSectionRow(
            getSessionBlockRange(sectionOneSessions),
            isZh ? "上半场" : "First half"
          )}
        {sectionOneSessions.map((session) =>
          renderSessionRow(session, { tinted: stripedSessionIds.has(session.id) })
        )}
        {coffeeBreakSession &&
          renderSectionRow(
            getSessionTimeRange(coffeeBreakSession),
            getAgendaText(coffeeBreakSession.title, isZh)
          )}
        {sectionTwoSessions.length > 0 &&
          renderSectionRow(
            getSessionBlockRange(sectionTwoSessions),
            isZh ? "下半场" : "Second half"
          )}
        {sectionTwoSessions.map((session) =>
          renderSessionRow(session, { tinted: stripedSessionIds.has(session.id) })
        )}
        {renderSectionRow("", isZh ? "总结" : "Closing", { noTime: true })}
      </div>
    );
  };

  const renderMasterAgendaOverview = (): ReactNode => {
    const timelineRows = groupSlotsForTimeline(masterAgendaSlots);
    const calendarDays = buildDayCalendarLayouts(masterAgendaSlots);
    const dayLayoutMap = new Map(calendarDays.map((layout) => [layout.day, layout]));
    const boardStartMinutes = 8 * 60;
    const boardEndMinutes = 19 * 60;
    const prepRegistrationStartMinutes = 14 * 60;
    const day2RegistrationEndMinutes = 9 * 60;
    const boardTimeRows = Math.max(
      1,
      (boardEndMinutes - boardStartMinutes) / MASTER_AGENDA_GRID_STEP_MINUTES
    );
    const boardRowTemplate = `repeat(${boardTimeRows}, var(--forum-agenda-row-height, ${MASTER_AGENDA_GRID_ROW_HEIGHT_FALLBACK}))`;
    const boardRowsStyle: CSSProperties = { gridTemplateRows: boardRowTemplate };
    const boardDayWidthStyle = {
      "--forum-agenda-day1-col": "0.8fr",
      "--forum-agenda-day2-col": "1.2fr",
    } as CSSProperties;
    const boardRowMarks = Array.from(
      { length: boardTimeRows },
      (_, index) => boardStartMinutes + index * MASTER_AGENDA_GRID_STEP_MINUTES
    );

    const renderResponsiveDateLabel = (longLabel: string, shortLabel: string): ReactNode => (
      <>
        <span className={styles.timelineDateLabelLong}>{longLabel}</span>
        <span className={styles.timelineDateLabelShort}>{shortLabel}</span>
      </>
    );
    const getTimelineDayLabel = (day: AgendaDayKey): ReactNode =>
      renderResponsiveDateLabel(getAgendaText(timelineDayLabels[day], isZh), timelineDayShortLabels[day] ?? "");
    const prepRegistrationDayLabel = renderResponsiveDateLabel(
      isZh ? "3 月 24 日" : "Mar 24",
      "3.24"
    );
    const registrationLabel = isZh ? "注册" : "Registration";
    const registrationDeadlinePrep = isZh ? "至21点" : "Until 21:00";
    const registrationDeadlineByDay: Partial<Record<AgendaDayKey, string>> = {
      day1: isZh ? "至21点" : "Until 21:00",
    };
    const prepRegistrationRowStart =
      Math.max(
        0,
        Math.floor(
          (prepRegistrationStartMinutes - boardStartMinutes) / MASTER_AGENDA_GRID_STEP_MINUTES
        )
      ) + 1;
    const prepRegistrationRowSpan = Math.max(
      1,
      boardTimeRows - (prepRegistrationRowStart - 1)
    );
    const day2RegistrationRowSpan = Math.max(
      1,
      Math.ceil(
        (day2RegistrationEndMinutes - boardStartMinutes) / MASTER_AGENDA_GRID_STEP_MINUTES
      )
    );
    const stackedAxisColumn = "var(--forum-agenda-stacked-axis-col, 84px)";
    const prepRegistrationColumn = "var(--forum-agenda-prep-col-size, 112px)";
    const stackedDay1BoardColumns = `${stackedAxisColumn} ${prepRegistrationColumn} minmax(0, 1fr)`;
    const stackedDay2BoardColumns = `${stackedAxisColumn} minmax(0, 1fr)`;
    const stackedDay1BoardStyle: CSSProperties = { gridTemplateColumns: stackedDay1BoardColumns };
    const stackedDay2BoardStyle: CSSProperties = { gridTemplateColumns: stackedDay2BoardColumns };

    const getPeriodLabel = (start: string): string => {
      return parseTimeToMinutes(start) < 12 * 60
        ? (isZh ? "上午" : "Morning")
        : (isZh ? "下午" : "Afternoon");
    };
    const timelineRowsByDay = agendaDayOrder.map((day) => ({
      day,
      rows: timelineRows.filter((row) => row.day === day),
    }));

    const renderBoardAxis = (keyPrefix: string): ReactNode => (
      <div key={`${keyPrefix}-axis`} className={styles.masterCalendarBoardAxis} style={boardRowsStyle}>
        {boardRowMarks.map((minutes, rowIndex) => {
          const isHourRow = minutes % 60 === 0;
          const isLastRow = rowIndex === boardRowMarks.length - 1;
          return (
            <div
              key={`${keyPrefix}-axis-${minutes}`}
              className={clsx(
                styles.masterCalendarBoardAxisCell,
                isHourRow && styles.masterCalendarBoardAxisCellHour
              )}
              style={{ gridRow: `${rowIndex + 1}` }}
            >
              {isHourRow && (
                <span
                  className={clsx(
                    styles.masterCalendarBoardAxisLabel,
                    styles.masterCalendarBoardAxisLabelTop
                  )}
                >
                  {formatMinutesToTime(minutes)}
                </span>
              )}
              {isLastRow && (
                <span
                  className={clsx(
                    styles.masterCalendarBoardAxisLabel,
                    styles.masterCalendarBoardAxisLabelBottom
                  )}
                >
                  {formatMinutesToTime(boardEndMinutes)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );

    const renderPrepRegistrationFrame = (keyPrefix: string): ReactNode => (
      <div
        key={`${keyPrefix}-prep-frame`}
        className={clsx(
          styles.masterCalendarBoardDayFrame,
          styles.masterCalendarBoardDayFramePrep
        )}
      >
        <div className={styles.masterCalendarBoardDayGrid} style={boardRowsStyle}>
          {boardRowMarks.map((minutes, rowIndex) => (
            <div
              key={`${keyPrefix}-prep-row-${minutes}`}
              className={clsx(
                styles.masterCalendarGridRow,
                styles.masterCalendarBoardRow,
                minutes % 60 === 0 && styles.masterCalendarGridRowHour
              )}
              style={{ gridColumn: "1", gridRow: `${rowIndex + 1}` }}
              aria-hidden="true"
            />
          ))}

          <div
            className={styles.masterCalendarPrepEvent}
            style={{
              gridColumn: "1",
              gridRow: `${prepRegistrationRowStart} / span ${prepRegistrationRowSpan}`,
            }}
          >
            <div className={styles.masterCalendarPrepEventText}>
              <span
                className={clsx(
                  styles.masterCalendarPrepEventLabel,
                  styles.masterCalendarPrepEventLabelHorizontal
                )}
              >
                {registrationLabel}
              </span>
              <span className={styles.masterCalendarPrepEventDeadline}>
                {registrationDeadlinePrep}
              </span>
            </div>
          </div>
        </div>
      </div>
    );

    const renderDayBoardFrame = (day: AgendaDayKey, keyPrefix: string): ReactNode => {
      const dayLayout = dayLayoutMap.get(day);
      const showParallelRegistrationLane = day === "day1";
      const showDayRegistration = day === "day2";
      const dayRegistrationDeadline = registrationDeadlineByDay[day];
      const dayGridStyle: CSSProperties = showParallelRegistrationLane
        ? { ...boardRowsStyle, gridTemplateColumns: `${prepRegistrationColumn} minmax(0, 1fr)` }
        : boardRowsStyle;

      return (
        <div key={`${keyPrefix}-col-${day}`} className={styles.masterCalendarBoardDayFrame}>
          <div className={styles.masterCalendarBoardDayGrid} style={dayGridStyle}>
            {boardRowMarks.map((minutes, rowIndex) => (
              <div
                key={`${keyPrefix}-${day}-row-${minutes}`}
                className={clsx(
                  styles.masterCalendarGridRow,
                  styles.masterCalendarBoardRow,
                  minutes % 60 === 0 && styles.masterCalendarGridRowHour
                )}
                style={{
                  gridColumn: showParallelRegistrationLane ? "1 / -1" : "1",
                  gridRow: `${rowIndex + 1}`,
                }}
                aria-hidden="true"
              />
            ))}

            {showParallelRegistrationLane && (
              <div
                className={clsx(
                  styles.masterCalendarPrepEvent,
                  styles.masterCalendarPrepEventDay
                )}
                style={{ gridColumn: "1", gridRow: `1 / span ${boardTimeRows}` }}
              >
                <div className={styles.masterCalendarPrepEventText}>
                  <span
                    className={clsx(
                      styles.masterCalendarPrepEventLabel,
                      styles.masterCalendarPrepEventLabelHorizontal
                    )}
                  >
                    {registrationLabel}
                  </span>
                  <span className={styles.masterCalendarPrepEventDeadline}>
                    {registrationDeadlineByDay.day1}
                  </span>
                </div>
              </div>
            )}

            {showDayRegistration && (
              <div
                className={clsx(
                  styles.masterCalendarPrepEvent,
                  styles.masterCalendarPrepEventDay
                )}
                style={{ gridColumn: "1", gridRow: `1 / span ${day2RegistrationRowSpan}` }}
              >
                <div className={styles.masterCalendarPrepEventText}>
                  <span
                    className={clsx(
                      styles.masterCalendarPrepEventLabel,
                      styles.masterCalendarPrepEventLabelHorizontal
                    )}
                  >
                    {registrationLabel}
                  </span>
                  {dayRegistrationDeadline && (
                    <span className={styles.masterCalendarPrepEventDeadline}>
                      {dayRegistrationDeadline}
                    </span>
                  )}
                </div>
              </div>
            )}

            {dayLayout?.clusters.map((cluster) => {
              const clusterRowStart = Math.max(
                0,
                Math.floor(
                  (cluster.startMinutes - boardStartMinutes) / MASTER_AGENDA_GRID_STEP_MINUTES
                )
              );
              const clusterGridStyle: CSSProperties = {
                gridTemplateRows: `repeat(${cluster.timeRows}, var(--forum-agenda-row-height, ${MASTER_AGENDA_GRID_ROW_HEIGHT_FALLBACK}))`,
                gridTemplateColumns: `repeat(${cluster.laneCount}, minmax(0, 1fr))`,
              };

              return (
                <div
                  key={`${keyPrefix}-${cluster.key}`}
                  className={clsx(
                    styles.masterCalendarClusterLayer,
                    showParallelRegistrationLane && styles.masterCalendarClusterLayerParallel
                  )}
                  style={{
                    gridColumn: showParallelRegistrationLane ? "2" : "1",
                    gridRow: `${clusterRowStart + 1} / span ${cluster.timeRows}`,
                  }}
                >
                  <div className={styles.masterCalendarClusterGrid} style={clusterGridStyle}>
                    {cluster.placements.map((placement) => {
                      return (
                        <div
                          key={`${keyPrefix}-${placement.slot.id}`}
                          className={clsx(
                            styles.masterCalendarEventShell
                          )}
                          style={{
                            gridColumn: `${placement.laneIndex + 1}`,
                            gridRow: `${placement.rowStart + 1} / span ${placement.rowSpan}`,
                          }}
                        >
                          <button
                            type="button"
                            className={clsx(
                              styles.masterTimelineItem,
                              styles.masterCalendarEvent,
                              styles.masterSlotClickable,
                              getMasterTrackClassName(placement.slot.track)
                            )}
                            onClick={() => openAndScrollToActivity(placement.slot.activityKey)}
                          >
                            <div className={styles.masterTimelineItemTop}>
                              {renderVenueTag(getActivityDetailByKey(placement.slot.activityKey)?.venue, {
                                className: styles.masterTimelineVenueTag,
                                showLabel: false,
                              })}
                            </div>
                            <div className={styles.masterTimelineItemTitle}>
                              {getAgendaText(placement.slot.shortTitle, isZh)}
                            </div>
                            <div className={styles.masterTimelineItemFooter}>
                              <span className={styles.masterPeriodTrackTag}>
                                {getTrackLabel(placement.slot.track)}
                              </span>
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div className={clsx(styles.agendaGroup, styles.agendaGroupWide, styles.masterAgenda)}>
        <div className={styles.masterCalendarDesktop} style={boardDayWidthStyle}>
          <div className={styles.masterCalendarBoardHeader}>
            <div className={styles.masterCalendarBoardHeaderAxis}>
              {isZh ? "时间" : "Time"}
            </div>
            <div
              className={clsx(
                styles.masterCalendarBoardHeaderDay,
                styles.masterCalendarBoardHeaderPrep
              )}
            >
              {prepRegistrationDayLabel}
            </div>
            {agendaDayOrder.map((day) => (
              <div key={`header-${day}`} className={styles.masterCalendarBoardHeaderDay}>
                {getTimelineDayLabel(day)}
              </div>
            ))}
          </div>

          <div className={styles.masterCalendarBoardBody}>
            {renderBoardAxis("desktop")}
            {renderPrepRegistrationFrame("desktop")}
            {agendaDayOrder.map((day) => renderDayBoardFrame(day, "desktop"))}
          </div>
        </div>

        <div className={styles.masterCalendarStackedMobile}>
          <div className={styles.masterCalendarStackedBoard}>
            <div className={styles.masterCalendarBoardHeader} style={stackedDay1BoardStyle}>
              <div className={styles.masterCalendarBoardHeaderAxis}>
                {isZh ? "时间" : "Time"}
              </div>
              <div
                className={clsx(
                  styles.masterCalendarBoardHeaderDay,
                  styles.masterCalendarBoardHeaderPrep
                )}
              >
                {prepRegistrationDayLabel}
              </div>
              <div className={styles.masterCalendarBoardHeaderDay}>
                {getTimelineDayLabel("day1")}
              </div>
            </div>
            <div className={styles.masterCalendarBoardBody} style={stackedDay1BoardStyle}>
              {renderBoardAxis("stacked-day1")}
              {renderPrepRegistrationFrame("stacked-day1")}
              {renderDayBoardFrame("day1", "stacked-day1")}
            </div>
          </div>

          <div className={styles.masterCalendarStackedBoard}>
            <div className={styles.masterCalendarBoardHeader} style={stackedDay2BoardStyle}>
              <div className={styles.masterCalendarBoardHeaderAxis}>
                {isZh ? "时间" : "Time"}
              </div>
              <div className={styles.masterCalendarBoardHeaderDay}>
                {getTimelineDayLabel("day2")}
              </div>
            </div>
            <div className={styles.masterCalendarBoardBody} style={stackedDay2BoardStyle}>
              {renderBoardAxis("stacked-day2")}
              {renderDayBoardFrame("day2", "stacked-day2")}
            </div>
          </div>
        </div>

        <div className={styles.masterTimelineMobile}>
          <div className={styles.masterDayTables}>
            {timelineRowsByDay.map(({ day, rows }) => (
              <section key={`day-table-${day}`} className={styles.masterDayTable}>
                <div className={styles.masterDayTableHeader}>
                  <div className={styles.masterDayTableTitle}>{getTimelineDayLabel(day)}</div>
                </div>

                <div className={styles.masterDayTableColumns} aria-hidden="true">
                  <div className={styles.masterDayTableColumnCell}>
                    {isZh ? "时间" : "Time"}
                  </div>
                  <div className={styles.masterDayTableColumnCell}>
                    {isZh ? "日程" : "Agenda"}
                  </div>
                </div>

                <div className={styles.masterDayTableBody}>
                  {rows.map((row) => (
                    <div key={row.key} className={styles.masterDayTableRow}>
                      <div className={styles.masterDayTableTimeCell}>
                        <div className={styles.masterDayTableTimePeriod}>
                          {getPeriodLabel(row.start)}
                        </div>
                        <div className={styles.masterDayTableTimeRange}>
                          {row.start} - {row.end}
                        </div>
                      </div>

                      <div className={styles.masterDayTableAgendaCell}>
                        <div
                          className={clsx(
                            styles.masterTimelineSlots,
                            row.activeSlots.length === 4 && styles.masterTimelineSlotsTwoByTwo
                          )}
                        >
                          {row.activeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              type="button"
                              className={clsx(
                                styles.masterTimelineItem,
                                styles.masterDayTableSlot,
                                styles.masterSlotClickable,
                                getMasterSlotClassName(slot.status)
                              )}
                              onClick={() => openAndScrollToActivity(slot.activityKey)}
                            >
                              <div className={styles.masterTimelineItemTop}>
                                {renderVenueTag(getActivityDetailByKey(slot.activityKey)?.venue, {
                                  className: styles.masterTimelineVenueTag,
                                  showLabel: false,
                                })}
                              </div>
                              <div className={styles.masterTimelineItemTitle}>
                                {getAgendaText(slot.shortTitle, isZh)}
                              </div>
                              <div className={styles.masterTimelineItemFooter}>
                                <span className={styles.masterPeriodTrackTag}>
                                  {getTrackLabel(slot.track)}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderActivityAgendaPanels = (): ReactNode => (
    <>
      {renderAgendaSubsectionHeader(
        <Translate id="forum.detailAgenda.title">活动详细议程</Translate>
      )}
      {agendaGroups.map((group) => {
        const groupItemOrder = new Map(group.items.map((item, index) => [item.key, index]));
        const groupDetails = activityAgendaDetails
          .filter((detail) => detail.groupKey === group.key)
          .sort((a, b) => {
            return (
              (groupItemOrder.get(a.activityKey) ?? 999) - (groupItemOrder.get(b.activityKey) ?? 999)
            );
          });
        const showGroupHeader = groupDetails.length > 1;
        const showGroupCount =
          group.key !== "sub-forums" && group.key !== "special-events";

        if (groupDetails.length === 0) {
          return null;
        }

        return (
          <div
            key={`detail-${group.key}`}
            className={clsx(styles.agendaGroup, group.wide && styles.agendaGroupWide)}
          >
            {showGroupHeader && (
              <div className={styles.agendaGroupHeader}>
                <div>
                  <div className={styles.groupTitle}>{group.title}</div>
                  <div className={styles.groupDesc}>
                    {isZh ? "按活动查看详细环节安排，议程将持续更新。" : "View detailed sessions by activity. The agenda is updated continuously."}
                  </div>
                </div>
                {showGroupCount && (
                  <span className={styles.groupCount}>
                    {groupDetails.length}
                    <Translate id="forum.section.sessions"> 场</Translate>
                  </span>
                )}
              </div>
            )}

            <div className={styles.agendaPanels}>
              {groupDetails.map((detail) => {
                const isExpanded = expandedActivityKeys.includes(detail.activityKey);
                const panelId = `agenda-${detail.activityKey}`;
                const bodyId = `agenda-panel-body-${detail.activityKey}`;
                const titleId = `agenda-panel-title-${detail.activityKey}`;
                const sessionsByDay = agendaDayOrder
                  .map((day) => ({
                    day,
                    sessions: detail.sessions
                      .filter((session) => session.day === day)
                      .sort(sortSessions),
                  }))
                  .filter((section) => section.sessions.length > 0);
                const showSessionDayPill = sessionsByDay.length > 1;
                const compactTimeRange = getCompactTimeRangeLabel(detail.timeRange);
                const panelDateLabel = getDateLabelWithDaySuffix(
                  detail.dateLabel,
                  detail.timeRange,
                  isZh
                );
                const moderatorPrefix = isZh
                  ? "主持："
                  : (detail.activityKey.includes("workshop") ? "Moderator: " : "Host: ");
                const showSummaryOnlyBody =
                  detail.sessions.length === 0 && Boolean(detail.summary);
                const showChinaLcaTheme =
                  detail.activityKey === "china-lca" && Boolean(detail.summary);

                return (
                  <div
                    key={detail.activityKey}
                    id={panelId}
                    ref={(node) => setActivityPanelRef(detail.activityKey, node)}
                    className={clsx(
                      styles.agendaPanel,
                      highlightedActivityKey === detail.activityKey && styles.agendaPanelHighlight
                    )}
                  >
                    <div className={styles.agendaPanelHeader}>
                      <button
                        id={titleId}
                        type="button"
                        className={styles.agendaPanelToggle}
                        aria-expanded={isExpanded}
                        aria-controls={bodyId}
                        onClick={() => toggleActivityExpanded(detail.activityKey)}
                      >
                        <div className={styles.agendaPanelToggleMain}>
                          <div className={styles.agendaPanelToggleHeadline}>
                            <div
                              className={clsx(
                                styles.agendaPanelToggleTitle,
                                !showGroupHeader && styles.agendaPanelToggleTitlePromoted
                              )}
                            >
                              {getAgendaText(detail.title, isZh)}
                            </div>
                          </div>
                          {renderStatusPill(detail.status)}
                        </div>
                        <div className={styles.agendaPanelToggleMeta}>
                          {panelDateLabel && (
                            <span className={styles.agendaPanelMetaTag}>
                              {panelDateLabel}
                            </span>
                          )}
                          {detail.timeRange && (
                            <span className={styles.agendaPanelMetaTag}>
                              {compactTimeRange || detail.timeRange}
                            </span>
                          )}
                          {renderVenueTag(detail.venue, {
                            className: styles.agendaPanelVenueTag,
                            showLabel: false,
                          })}
                        </div>
                        <span
                          className={clsx(
                            styles.agendaPanelChevron,
                            isExpanded && styles.agendaPanelChevronExpanded
                          )}
                          aria-hidden="true"
                        >
                          ▾
                        </span>
                      </button>
                    </div>

                    {isExpanded && (
                      <div
                        id={bodyId}
                        role="region"
                        aria-labelledby={titleId}
                        className={styles.agendaPanelBody}
                      >
                        {detail.activityKey === "developer-conference" &&
                          !detail.sessions.some((session) => Boolean(session.orgLogoKey)) && (
                          <div className={styles.groupLogoWall}>
                            <div className={styles.logoWallHeader}>
                              <span className={styles.logoWallTitle}>
                                <Translate id="forum.agenda.partners">开发者阵容</Translate>
                              </span>
                              <span className={styles.logoWallNote}>
                                {isZh ? "共 10 家机构（按机构名称排序）" : "10 organizations, sorted by name"}
                              </span>
                            </div>
                            <div className={clsx(styles.logoWall, styles.logoWallFive)}>
                              {devConfLogos.map((logo) => (
                                <div key={logo.key} className={styles.logoItem}>
                                  {logo.src ? (
                                    <img src={withBaseUrl(logo.src)} alt={logo.name} />
                                  ) : (
                                    <span className={styles.logoPlaceholder}>{logo.name}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {showSummaryOnlyBody ? (
                          <>
                            {showChinaLcaTheme && detail.summary && (
                              <div
                                className={clsx(
                                  styles.agendaPanelSummary,
                                  styles.agendaPanelSummaryTheme
                                )}
                              >
                                {getAgendaText(detail.summary, isZh)}
                              </div>
                            )}
                            {renderSummaryLeadBlock(detail.summaryLeadTop, {
                              activityKey: detail.activityKey,
                            })}
                            {renderSummaryLeadBlock(detail.summaryLead, {
                              activityKey: detail.activityKey,
                            })}
                            {detail.summary && !showChinaLcaTheme && (
                              <div className={styles.agendaPanelSummary}>
                                {getAgendaText(detail.summary, isZh)}
                              </div>
                            )}
                          </>
                        ) : (
                        <>
                          {showChinaLcaTheme && detail.summary && (
                            <div
                              className={clsx(
                                styles.agendaPanelSummary,
                                styles.agendaPanelSummaryTheme
                              )}
                            >
                              {getAgendaText(detail.summary, isZh)}
                            </div>
                          )}
                          {renderSummaryLeadBlock(detail.summaryLeadTop, {
                            activityKey: detail.activityKey,
                          })}
                          {renderSummaryLeadBlock(detail.summaryLead, {
                            activityKey: detail.activityKey,
                          })}
                        <div className={styles.agenda}>
                          {sessionsByDay.map((section) => {
                            const isPlainOnlySection = section.sessions.every(
                              (session) => !(session.start && session.end)
                            );
                            const forceCardListView =
                              detail.activityKey === "power-workshop" ||
                              detail.activityKey === "electronics" ||
                              detail.activityKey === "battery" ||
                              detail.activityKey === "petrochemical" ||
                              detail.activityKey === "national-factor-database-forum" ||
                              detail.activityKey === "lca-audit" ||
                              detail.activityKey === "china-lca";
                            const emphasizeForumPeople =
                              detail.groupKey === "sub-forums" ||
                              detail.groupKey === "special-events";
                            const isDeveloperLogoCardView =
                              detail.activityKey === "developer-conference";
                            const isMainForumPhaseView =
                              detail.activityKey === "main-forum" && isPlainOnlySection;
                            const powerWorkshopPhases = forceCardListView
                              ? section.sessions.reduce<
                                  Array<{ key: string; title: string; items: ActivitySession[] }>
                                >((phases, session) => {
                                  const phaseTitle = session.sessionType
                                    ? getAgendaText(session.sessionType, isZh)
                                    : (isZh ? "议程" : "Agenda");
                                  const existed = phases.find((phase) => phase.title === phaseTitle);

                                  if (existed) {
                                    existed.items.push(session);
                                  } else {
                                    phases.push({
                                      key: `phase-${session.id}`,
                                      title: phaseTitle,
                                      items: [session],
                                    });
                                  }

                                  return phases;
                                }, [])
                              : [];

                            const mainForumPhases = isMainForumPhaseView
                              ? section.sessions.reduce<
                                  Array<{
                                    key: string;
                                    title: string;
                                    lead?: string;
                                    items: ActivitySession[];
                                  }>
                                >((phases, session) => {
                                  if (session.sessionType) {
                                    const phaseTitle = getAgendaText(session.sessionType, isZh);
                                    const lastPhase = phases[phases.length - 1];

                                    if (lastPhase && lastPhase.title === phaseTitle) {
                                      lastPhase.items.push(session);
                                    } else {
                                      phases.push({
                                        key: `phase-${session.id}`,
                                        title: phaseTitle,
                                        items: [session],
                                      });
                                    }

                                    return phases;
                                  }

                                  phases.push({
                                    key: `phase-${session.id}`,
                                    title: getSessionDisplayTitle(detail.activityKey, session),
                                    lead: session.speakers
                                      ? getAgendaText(session.speakers, isZh)
                                      : (session.note ? getAgendaText(session.note, isZh) : undefined),
                                    items: [],
                                  });

                                  return phases;
                                }, [])
                              : [];

                            return (
                              <div key={`${detail.activityKey}-${section.day}`}>
                                {showSessionDayPill && (
                                  <div className={styles.agendaPanelDayHeader}>
                                    <span className={styles.pill}>{getDayLabel(section.day)}</span>
                                  </div>
                                )}

                                {isDeveloperLogoCardView ? (
                                  renderDeveloperConferencePhaseList(section.sessions)
                                ) : isMainForumPhaseView ? (
                                  <div className={styles.agendaPhaseList}>
                                    {mainForumPhases.map((phase) => {
                                      const isLeaderRemarksPhase =
                                        /领导致辞/.test(phase.title) || /^remarks$/i.test(phase.title);
                                      const isGuestRemarksPhase =
                                        phase.items.length > 0 &&
                                        phase.items.every(
                                          (session) =>
                                            session.sessionType?.zh === "嘉宾致辞" ||
                                            session.sessionType?.en === "Guest Remarks"
                                        );
                                      const guestRemarkBulletText = isGuestRemarksPhase
                                        ? phase.items
                                            .map((session) => {
                                              const sessionTitleText = getAgendaText(session.title, isZh).trim();
                                              const sessionSpeakerText = session.speakers
                                                ? getAgendaText(session.speakers, isZh).trim()
                                                : "";
                                              if (sessionTitleText && sessionSpeakerText) {
                                                return isZh
                                                  ? `${sessionTitleText}，${sessionSpeakerText}`
                                                  : `${sessionTitleText}, ${sessionSpeakerText}`;
                                              }
                                              return sessionTitleText || sessionSpeakerText;
                                            })
                                            .filter(Boolean)
                                            .join("\n")
                                        : "";

                                      return (
                                        <div key={phase.key} className={styles.agendaPhase}>
                                          <div className={styles.agendaPhaseTitle}>{phase.title}</div>

                                          {isLeaderRemarksPhase && phase.lead
                                            ? renderAgendaBulletItems(
                                                phase.lead,
                                                styles.agendaPhaseRemarkBullets
                                              )
                                            : phase.lead && (
                                                <div className={styles.agendaPhaseLead}>{phase.lead}</div>
                                              )}

                                          {isGuestRemarksPhase && guestRemarkBulletText
                                            ? renderAgendaBulletItems(
                                                guestRemarkBulletText,
                                                styles.agendaPhaseRemarkBullets,
                                                { boldName: true, stackedNameRole: true }
                                              )
                                            : phase.items.length > 0 && (
                                                <div
                                                  className={clsx(
                                                    styles.agendaPhaseItems,
                                                    styles.agendaPhaseItemsCards
                                                  )}
                                                >
                                                  {phase.items.map((session) => {
                                                    const isKeynoteSession =
                                                      session.sessionType?.zh === "主旨报告" ||
                                                      session.sessionType?.en === "Keynote";
                                                    const speakerPhotoSrc =
                                                      keynoteSpeakerPhotoBySessionId[session.id]
                                          ? withBaseUrl(keynoteSpeakerPhotoBySessionId[session.id]!)
                                          : undefined;
                                                    const sessionTitleText = getAgendaText(
                                                      session.title,
                                                      isZh
                                                    ).trim();

                                                    return (
                                                      <div
                                                        key={session.id}
                                                        className={clsx(
                                                          styles.agendaItem,
                                                          styles.agendaKeynoteCard,
                                                          session.talkTitle && styles.agendaItemHasTalkTitle
                                                        )}
                                                      >
                                                        <div
                                                          className={styles.agendaKeynoteCardBottom}
                                                          style={
                                                            isKeynoteSession
                                                              ? undefined
                                                              : { gridTemplateColumns: "1fr", minHeight: "auto" }
                                                          }
                                                        >
                                                          {isKeynoteSession && (
                                                            <div
                                                              className={styles.agendaKeynoteCardPhoto}
                                                              aria-hidden="true"
                                                            >
                                                              <div className={styles.agendaSpeakerPhotoSlot}>
                                                                {speakerPhotoSrc ? (
                                                                  <img
                                                                    src={speakerPhotoSrc}
                                                                    alt={getAgendaText(session.title, isZh)}
                                                                    loading="lazy"
                                                                  />
                                                                ) : (
                                                                  <span
                                                                    className={
                                                                      styles.agendaSpeakerPhotoPlaceholder
                                                                    }
                                                                  >
                                                                    {isZh ? "待补" : "TBD"}
                                                                  </span>
                                                                )}
                                                              </div>
                                                            </div>
                                                          )}
                                                          <div className={styles.agendaKeynoteCardMain}>
                                                            <div className={styles.agendaTitle}>
                                                              {sessionTitleText}
                                                            </div>
                                                            {session.note && (
                                                              <div className={styles.agendaNote}>
                                                                {getAgendaText(session.note, isZh)}
                                                              </div>
                                                            )}
                                                            {session.speakers && (
                                                              <div className={styles.agendaNote}>
                                                                {getAgendaText(session.speakers, isZh)}
                                                              </div>
                                                            )}
                                                            {session.moderator && (
                                                              <div className={styles.agendaNote}>
                                                                {moderatorPrefix}
                                                                {renderPersonNameWithBold(
                                                                  getAgendaText(session.moderator, isZh)
                                                                )}
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                        {session.talkTitle && (
                                                          <div className={styles.agendaKeynoteCardTop}>
                                                            {renderTalkTitle(session.talkTitle)}
                                                          </div>
                                                        )}
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : forceCardListView ? (
                                  <div className={styles.agendaPartsCard}>
                                    {powerWorkshopPhases.map((phase) => (
                                      <section key={phase.key} className={styles.agendaPartSection}>
                                        <div className={styles.agendaPartHeading}>{phase.title}</div>
                                        <div className={styles.agendaPartList}>
                                          {phase.items.map((session) => {
                                            const sessionDisplayTitle = getSessionDisplayTitle(
                                              detail.activityKey,
                                              session
                                            ).trim();
                                            const hasSessionTime = Boolean(session.start && session.end);
                                            const sessionTypeText = session.sessionType
                                              ? getAgendaText(session.sessionType, isZh)
                                              : "";
                                            const isPanelSession =
                                              /圆桌/i.test(sessionTypeText) ||
                                              /panel|roundtable/i.test(sessionTypeText);
                                            const hasSpeakerBlock =
                                              Boolean(sessionDisplayTitle) ||
                                              Boolean(session.speakers) ||
                                              Boolean(session.moderator);

                                            return (
                                              <article key={session.id} className={styles.agendaPartItem}>
                                                {hasSessionTime && (
                                                  <div className={styles.sessionTime}>
                                                    {session.start} - {session.end}
                                                  </div>
                                                )}
                                                {session.talkTitle && (
                                                  <div
                                                    className={clsx(
                                                      styles.agendaPartReportTitle,
                                                      isPanelSession &&
                                                        styles.agendaPartReportTitleMultiline
                                                    )}
                                                  >
                                                    {getAgendaText(session.talkTitle, isZh)}
                                                  </div>
                                                )}
                                                {session.note && (
                                                  <div
                                                    className={clsx(
                                                      styles.agendaNote,
                                                      styles.agendaPartIntro
                                                    )}
                                                  >
                                                    {getAgendaText(session.note, isZh)}
                                                  </div>
                                                )}
                                                {hasSpeakerBlock && (
                                                  <div className={styles.agendaPartSpeakerBlock}>
                                                    {sessionDisplayTitle && (
                                                      renderAgendaBulletItems(
                                                        sessionDisplayTitle,
                                                        clsx(
                                                          styles.agendaPartSpeakerTitle,
                                                          emphasizeForumPeople &&
                                                            styles.agendaPartPersonLine
                                                        ),
                                                        { boldName: emphasizeForumPeople }
                                                      )
                                                    )}
                                                    {session.speakers && (
                                                      renderAgendaBulletItems(
                                                        getAgendaText(session.speakers, isZh),
                                                        clsx(
                                                          styles.agendaPartSpeakerMeta,
                                                          emphasizeForumPeople &&
                                                            styles.agendaPartPersonLine,
                                                          styles.agendaPartMultiline,
                                                          isPanelSession &&
                                                            styles.agendaPartPanelSpeakers
                                                        ),
                                                        { boldName: emphasizeForumPeople }
                                                      )
                                                    )}
                                                    {session.moderator && (
                                                      renderAgendaBulletItems(
                                                        `${moderatorPrefix}${getAgendaText(
                                                          session.moderator,
                                                          isZh
                                                        )}`,
                                                        clsx(
                                                          styles.agendaPartSpeakerMeta,
                                                          emphasizeForumPeople &&
                                                            styles.agendaPartPersonLine,
                                                          styles.agendaPartMultiline
                                                        ),
                                                        { boldName: emphasizeForumPeople }
                                                      )
                                                    )}
                                                  </div>
                                                )}
                                              </article>
                                            );
                                          })}
                                        </div>
                                      </section>
                                    ))}
                                  </div>
                                ) : (
                                  <div
                                    className={clsx(
                                      styles.agendaList,
                                      isPlainOnlySection && styles.agendaListPlain
                                    )}
                                  >
                                    {section.sessions.map((session, sessionIndex) => {
                                      const hasSessionTime = Boolean(session.start && session.end);
                                      const usePlainItem = !hasSessionTime;
                                      const prevSession =
                                        sessionIndex > 0 ? section.sessions[sessionIndex - 1] : null;
                                      const sameSessionTypeAsPrevPlain =
                                        usePlainItem &&
                                        Boolean(session.sessionType) &&
                                        Boolean(
                                          prevSession && !(prevSession.start && prevSession.end)
                                        ) &&
                                        Boolean(prevSession?.sessionType) &&
                                        session.sessionType?.zh === prevSession?.sessionType?.zh &&
                                        (session.sessionType?.en ?? "") ===
                                          (prevSession?.sessionType?.en ?? "");
                                      const showSessionTypeTag =
                                        Boolean(session.sessionType) && !sameSessionTypeAsPrevPlain;
                                      const isKeynoteSession =
                                        session.sessionType?.zh === "主旨报告" ||
                                        session.sessionType?.en === "Keynote";
                                      const showSpeakerPhotoSlot =
                                        !hasSessionTime && isKeynoteSession;
                                      const speakerPhotoSrc =
                                        keynoteSpeakerPhotoBySessionId[session.id]
                                          ? withBaseUrl(keynoteSpeakerPhotoBySessionId[session.id]!)
                                          : undefined;
                                      const showSessionMeta =
                                        hasSessionTime ||
                                        showSessionTypeTag ||
                                        Boolean(session.status);

                                      return (
                                        <div
                                          key={session.id}
                                          className={clsx(
                                            styles.agendaItem,
                                            usePlainItem && styles.agendaItemPlain,
                                            showSpeakerPhotoSlot && styles.agendaItemSpeaker,
                                            session.talkTitle && styles.agendaItemHasTalkTitle
                                          )}
                                        >
                                          {showSessionMeta && (
                                            <div className={styles.sessionMetaRow}>
                                              {hasSessionTime && (
                                                <span className={styles.sessionTime}>
                                                  {session.start} - {session.end}
                                                </span>
                                              )}
                                              {showSessionTypeTag && session.sessionType && (
                                                <span className={styles.sessionTypeTag}>
                                                  {getAgendaText(session.sessionType, isZh)}
                                                </span>
                                              )}
                                              {session.status && renderStatusPill(session.status)}
                                            </div>
                                          )}
                                          {renderTalkTitle(session.talkTitle)}
                                          <div className={styles.agendaTitle}>
                                            {getSessionDisplayTitle(detail.activityKey, session)}
                                          </div>
                                          {session.speakers && (
                                            <div className={styles.agendaNote}>
                                              {getAgendaText(session.speakers, isZh)}
                                            </div>
                                          )}
                                          {session.moderator && (
                                            <div className={styles.agendaNote}>
                                              {moderatorPrefix}
                                              {renderPersonNameWithBold(
                                                getAgendaText(session.moderator, isZh)
                                              )}
                                            </div>
                                          )}
                                          {session.note && (
                                            <div className={styles.agendaNote}>
                                              {getAgendaText(session.note, isZh)}
                                            </div>
                                          )}
                                          {showSpeakerPhotoSlot && (
                                            <div className={styles.agendaItemAside} aria-hidden="true">
                                              <div className={styles.agendaSpeakerPhotoSlot}>
                                                {speakerPhotoSrc ? (
                                                  <img
                                                    src={speakerPhotoSrc}
                                                    alt={getAgendaText(session.title, isZh)}
                                                    loading="lazy"
                                                  />
                                                ) : (
                                                  <span
                                                    className={styles.agendaSpeakerPhotoPlaceholder}
                                                  >
                                                    {isZh ? "待补" : "TBD"}
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && highlightTimeoutRef.current !== null) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const rawHash = decodeURIComponent(window.location.hash);
    if (!rawHash.startsWith("#agenda-")) {
      return;
    }

    const activityKey = rawHash.slice("#agenda-".length);
    if (!getActivityDetailByKey(activityKey)) {
      // 届次轮换后，旧链接里的议程锚点在当前届次上已经不存在了
      // （`/forum#agenda-mf-d2-keynote-xu` 当年指向的是 2026）。
      // 哈希不会到达服务端，只能在浏览器里把人送到留有该锚点的存档页。
      const owningYear = findEditionYearByActivityKey(activityKey);
      if (owningYear !== undefined && owningYear !== edition.year) {
        window.location.replace(`${editionPath(owningYear)}${rawHash}`);
      }
      return;
    }

    const timer = window.setTimeout(() => {
      openAndScrollToActivity(activityKey, { smooth: false, updateHash: false });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Layout
      title={getAgendaText(edition.pageTitle, isZh)}
      description={getAgendaText(edition.pageDescription, isZh)}
    >
      <div className={styles.page}>
        <div
          className={styles.hero}
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(8, 12, 24, 0.58), rgba(8, 12, 24, 0.36)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={styles.heroGlow} />
          <div className="container">
            <div className={styles.heroContent}>
              <span className={styles.heroTag}>{renderForumText(hero.title, isZh)}</span>
              <div className={styles.heroTitle}>
                {renderForumText(hero.theme, isZh)}
              </div>
              <div className={styles.heroMetaRow}>
                <span className={styles.heroPill}>
                  {renderForumText(hero.date, isZh)}
                </span>
                {isArchived && (
                  <span className={clsx(styles.heroPill, styles.heroPillArchived)}>
                    {isZh ? "会议已结束" : "Concluded"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <main>
          {/* 存档页先交代这一段回顾，没有 summary 的届次这里什么都不渲染。 */}
          {renderArchiveSummary()}
          {/* 筹备期先把「这是哪一届、什么时候、在哪」交代清楚，放在首屏之后。 */}
          {renderPlanningBlock()}
          {/* 紧接着是本届的议程框架，三个支柱是这一页的视觉重心。 */}
          {renderFrameworkBlock()}
          {hasPartnerLogos && (
            <section className={clsx(styles.section, styles.lightSection)}>
              <div className="container">
                <div
                className={clsx(
                  styles.partnerGroupGrid,
                  partnerSlotCount === 1 && styles.partnerGroupGridSingle,
                )}
              >
                {organizerLogos[1] && (
                  <div
                    className={clsx(
                      styles.card,
                      styles.partnerGroupCard,
                      styles.partnerGroupCoHostCard,
                    )}
                  >
                    <h2 className={styles.partnerGroupLabel}>
                      <Translate id="forum.section.coOrganizers">联合主办单位</Translate>
                    </h2>
                    <div className={styles.partnerGroupBody}>
                      <div className={clsx(styles.logoItem, styles.partnerLogoItem)}>
                        <img
                          src={withBaseUrl(organizerLogos[1].src)}
                          alt={organizerLogos[1].name}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* 主办单位已经提到筹备行里时，这里跳过，避免同一个 logo 出现两次。
                    判断用的 `hostInPlanningRow` 和 `partnerSlotCount` 是同一个来源。 */}
                {!hostInPlanningRow && organizerLogos[0] && (
                  <div
                    className={clsx(
                      styles.card,
                      styles.partnerGroupCard,
                      styles.partnerGroupHostCard,
                    )}
                  >
                    <h2 className={styles.partnerGroupLabel}>
                      <Translate id="forum.section.organizers">主办单位</Translate>
                    </h2>
                    <div className={styles.partnerGroupBody}>
                      <div className={clsx(styles.logoItem, styles.partnerLogoItem)}>
                        <img
                          src={withBaseUrl(organizerLogos[0].src)}
                          alt={organizerLogos[0].name}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {organizerLogos[2] && (
                  <div
                    className={clsx(
                      styles.card,
                      styles.partnerGroupCard,
                      styles.partnerGroupDiamondCard,
                    )}
                  >
                    <h2 className={styles.partnerGroupLabel}>
                      <Translate id="forum.section.diamondSponsor">钻石赞助商</Translate>
                    </h2>
                    <div className={styles.partnerGroupBody}>
                      <div className={clsx(styles.logoItem, styles.partnerLogoItem)}>
                        <img
                          src={withBaseUrl(organizerLogos[2].src)}
                          alt={organizerLogos[2].name}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* 支持机构一个都还没有时（筹备期的届次就是），
                    整张卡不渲染——留着只会是一张空壳加一个「持续更新中」。 */}
                {supportInstitutionLogos.length > 0 && (
                  <div
                    className={clsx(
                      styles.card,
                      styles.partnerGroupCard,
                      styles.partnerGroupCardWide,
                    )}
                  >
                    <h2 className={styles.partnerGroupLabel}>
                      <Translate id="forum.section.supportingOrgs">支持机构</Translate>
                    </h2>
                    <div className={styles.partnerSupportGrid}>
                      {supportInstitutionLogos.map((logo) => {
                        const logoNode = (
                          <div
                            className={clsx(styles.logoItem, styles.partnerLogoItem)}
                            key={logo.key}
                          >
                            <img src={withBaseUrl(logo.src)} alt={logo.name} loading="lazy" />
                          </div>
                        );

                        if (!logo.href) {
                          return logoNode;
                        }

                        return (
                          <a
                            key={logo.key}
                            href={logo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.partnerLogoLink}
                          >
                            {logoNode}
                          </a>
                        );
                      })}
                      {!isArchived && (
                        <div
                          className={clsx(
                            styles.logoItem,
                            styles.partnerLogoItem,
                            styles.logoItemPlaceholder,
                          )}
                        >
                          <div className={styles.logoPlaceholderStack}>
                            <span className={styles.logoPlaceholderMark}>+</span>
                            <span className={styles.logoPlaceholderText}>
                              {isZh ? "持续更新中" : "More coming soon"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                </div>
              </div>
            </section>
          )}
          {(hasAgenda || Boolean(venue) || Boolean(registration)) && (
            <section
              id="current"
              className={clsx(styles.section, styles.lightSection)}
            >
              <div className="container">
                {hasAgenda && (
                  <>
                    <div className={styles.sectionHeader}>
                      <p className={styles.sectionTitle}>
                        <Translate id="forum.section.mainActivities">论坛议程</Translate>
                      </p>
                      <p className={styles.sectionHint}>
                        <Translate id="forum.section.mainActivities.desc">
                          会议议程、各项活动与分论坛信息将持续更新。
                        </Translate>
                      </p>
                    </div>
                    <div className={styles.agendaLayout}>
                      {renderMasterAgendaOverview()}
                      {renderActivityAgendaPanels()}
                    </div>
                  </>
                )}
                {renderVenueBlock()}
                {renderRegistrationBlock()}
              </div>
            </section>
          )}
          {hasPeople && (
            <section className={clsx(styles.section, styles.lightSection)}>
              <div className="container">
                <div className={styles.sectionHeader}>
                  <p className={styles.sectionTitle}>
                    <Translate id="forum.section.people">参会嘉宾</Translate>
                  </p>
                  <p className={styles.sectionHint}>
                    <Translate id="forum.section.people.desc">
                      按姓氏字母排序，随确认参会情况持续更新。
                    </Translate>
                  </p>
                </div>
                <div className={styles.peopleGrid}>
                  {peopleSorted.map((person) => (
                    <div key={person.key} className={styles.personCard}>
                      <div className={styles.personPhoto}>
                        {person.image && (
                          <img
                            src={withBaseUrl(person.image)}
                            alt={isZh ? person.nameZh : person.nameEn}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className={styles.personName}>
                        {isZh ? person.nameZh : person.nameEn}
                      </div>
                      <div className={styles.personTitle}>
                        {isZh ? person.titleZh : person.titleEn}
                      </div>
                    </div>
                  ))}
                  {!isArchived && (
                    <div className={clsx(styles.personCard, styles.personCardPlaceholder)}>
                      <div className={clsx(styles.personPhoto, styles.personPlaceholderPhoto)}>
                        <span className={styles.personPlaceholderMark}>+</span>
                      </div>
                      <div className={styles.personName}>
                        {isZh ? "持续更新中" : "More coming soon"}
                      </div>
                      <div className={styles.personTitle}>
                        {isZh ? "敬请关注" : "More coming soon"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          <section className={clsx(styles.section, styles.mutedSection)}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>
                  <Translate id="forum.section.coCreation">加入议题共创合作</Translate>
                </p>
                <p className={styles.sectionHint}>
                  <Translate id="forum.section.coCreation.desc">
                    共建互联互通的 LCA 与碳足迹生态，欢迎合作。
                  </Translate>
                </p>
              </div>
              <div className={styles.coopGrid}>
                {coopItems.map((item) => (
                  <div key={item.title?.toString()} className={styles.coopCard}>
                    <div className={styles.cardHeader}>
                      <span className={styles.iconBubble}>{icons[item.icon]}</span>
                      <div className={styles.cardTitle}>{item.title}</div>
                    </div>
                    <div className={styles.agendaNote}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {hasHighlights && (
            <section id="highlights" className={styles.section}>
              <div className="container">
                <div className={styles.sectionHeader}>
                  <p className={styles.sectionTitle}>
                    <Translate id="forum.section.highlights">历届天工论坛</Translate>
                  </p>
                  <p className={styles.sectionHint}>
                    <Translate id="forum.section.highlights.desc">
                      历届论坛的主题、时间地点与主要成果，点击可查看对应存档。
                    </Translate>
                  </p>
                </div>
                {/* 重点那张整行呈现，其余届次两列平铺。两者不放同一个网格：
                    跨列的卡片会让网格在末尾留下空轨道。
                    下面固定两列，因为重点卡的图片列宽就是按两列算出来的。 */}
                {featuredHighlights.length > 0 && (
                  <div className={styles.featuredStack}>
                    {featuredHighlights.map((session, index) =>
                      renderHighlightCard(session, `featured-${index}`),
                    )}
                  </div>
                )}
                {restHighlights.length > 0 && (
                  <div className={styles.highlightGrid}>
                    {restHighlights.map((session, index) =>
                      renderHighlightCard(session, `highlight-${index}`),
                    )}
                  </div>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </Layout>
  );
}
