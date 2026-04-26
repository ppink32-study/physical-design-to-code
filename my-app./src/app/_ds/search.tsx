"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input/input";
import { Badge } from "@/components/badge/badge";
import styles from "./search.module.css";
import { COMPONENTS, type ComponentEntry } from "./manifest";

type Match = {
  entry: ComponentEntry;
  score: number;
  highlight: { name: [number, number] | null };
};

function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);
}

function scoreEntry(entry: ComponentEntry, q: string): Match | null {
  if (!q) return null;
  const query = q.toLowerCase().trim();
  if (!query) return null;

  const name = entry.name.toLowerCase();
  const slug = entry.slug.toLowerCase();
  const category = entry.category.toLowerCase();
  const description = entry.description.toLowerCase();
  const tags = (entry.tags ?? []).map((t) => t.toLowerCase()).join(" ");

  let score = 0;
  let nameHL: [number, number] | null = null;

  const nameIdx = name.indexOf(query);
  if (nameIdx >= 0) {
    score += nameIdx === 0 ? 100 : 60;
    nameHL = [nameIdx, nameIdx + query.length];
  }
  if (slug.includes(query)) score += slug.startsWith(query) ? 50 : 25;
  if (category.includes(query)) score += 20;
  if (tags.includes(query)) score += 15;
  if (description.includes(query)) score += 10;

  if (score === 0) return null;
  return { entry, score, highlight: { name: nameHL } };
}

function HighlightedName({
  name,
  range,
}: {
  name: string;
  range: [number, number] | null;
}) {
  if (!range) return <>{name}</>;
  const [s, e] = range;
  return (
    <>
      {name.slice(0, s)}
      <mark className={styles.mark}>{name.slice(s, e)}</mark>
      {name.slice(e)}
    </>
  );
}

export function Search() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listId = useId();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mac, setMac] = useState(false);

  useEffect(() => {
    setMac(isMac());
  }, []);

  const matches: Match[] = useMemo(() => {
    const q = query.trim();
    if (!q) {
      return COMPONENTS.map((entry) => ({
        entry,
        score: 0,
        highlight: { name: null },
      }));
    }
    const scored = COMPONENTS.map((c) => scoreEntry(c, q)).filter(
      (m): m is Match => m !== null
    );
    scored.sort(
      (a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name)
    );
    return scored;
  }, [query]);

  const showPopover = open && focused;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!showPopover) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [showPopover]);

  const navigate = useCallback(
    (entry: ComponentEntry) => {
      router.push(`/design/${entry.slug}`);
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    },
    [router]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, Math.max(0, matches.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = matches[activeIndex];
      if (pick) navigate(pick.entry);
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (query) {
        setQuery("");
      } else {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <Input
        ref={inputRef}
        size="large"
        width="100%"
        value={query}
        placeholder="컴포넌트 검색..."
        leadingIcon
        trailingIcon={
          !query ? (
            <span className={styles.shortcut} aria-hidden>
              {mac ? "⌘K" : "Ctrl+K"}
            </span>
          ) : (
            false
          )
        }
        clearable
        onClear={() => {
          setQuery("");
          inputRef.current?.focus();
        }}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setFocused(true);
          setOpen(true);
        }}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={showPopover}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          showPopover && matches[activeIndex]
            ? `${listId}-${matches[activeIndex].entry.slug}`
            : undefined
        }
      />

      {showPopover ? (
        <div className={styles.popover} role="presentation">
          <div className={styles.popoverHeader}>
            {query
              ? `${matches.length}개 결과`
              : `전체 컴포넌트 ${COMPONENTS.length}개`}
          </div>

          {matches.length === 0 ? (
            <div className={styles.empty}>
              &ldquo;{query}&rdquo; 에 해당하는 컴포넌트가 없습니다.
            </div>
          ) : (
            <ul
              id={listId}
              role="listbox"
              className={styles.list}
              aria-label="검색 결과"
            >
              {matches.map((m, i) => {
                const isActive = i === activeIndex;
                return (
                  <li
                    id={`${listId}-${m.entry.slug}`}
                    key={m.entry.slug}
                    role="option"
                    aria-selected={isActive}
                    className={`${styles.item} ${
                      isActive ? styles.itemActive : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      navigate(m.entry);
                    }}
                  >
                    <span className={styles.itemText}>
                      <span className={styles.itemName}>
                        <HighlightedName
                          name={m.entry.name}
                          range={m.highlight.name}
                        />
                      </span>
                      <span className={styles.itemMeta}>
                        {m.entry.description}
                      </span>
                    </span>
                    <Badge
                      variant="line"
                      size="sm"
                      shape="round"
                      color="gray"
                    >
                      {m.entry.category}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}

          <div className={styles.footer}>
            <span>
              <span className={styles.footerKey}>↑</span>
              <span className={styles.footerKey}>↓</span>
              이동
            </span>
            <span>
              <span className={styles.footerKey}>Enter</span>
              선택
            </span>
            <span>
              <span className={styles.footerKey}>Esc</span>
              닫기
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Search;
