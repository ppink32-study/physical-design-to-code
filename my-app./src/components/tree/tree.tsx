"use client";

import { useState, useCallback } from "react";
import styles from "./tree.module.css";

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.79834 6.41559C8.48249 6.09923 8.48219 5.58625 8.79834 5.27008C9.11467 4.95376 9.6285 4.95376 9.94482 5.27008L16.1011 11.4273C16.4174 11.7436 16.4174 12.2565 16.1011 12.5728L9.94482 18.73C9.6285 19.0464 9.11466 19.0464 8.79834 18.73C8.48202 18.4137 8.48202 17.8999 8.79834 17.5836L14.3823 12.0005L8.79834 6.41559Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17.5845 8.7984C17.9008 8.48255 18.4138 8.48225 18.73 8.7984C19.0463 9.11473 19.0463 9.62856 18.73 9.94489L12.5728 16.1011C12.2564 16.4175 11.7436 16.4175 11.4272 16.1011L5.27002 9.94489C4.95369 9.62856 4.95369 9.11473 5.27002 8.7984C5.58634 8.48208 6.10018 8.48208 6.4165 8.7984L11.9995 14.3824L17.5845 8.7984Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7104 3.30027C11.4855 3.30042 12.2214 3.64484 12.7172 4.2407L14.4399 6.31101H18.9802C20.5376 6.31101 21.7486 7.66581 21.5739 9.21336L20.7595 18.3825C20.6101 19.7018 19.4944 20.6986 18.1667 20.6989H5.84292C4.51509 20.6988 3.39848 19.7019 3.24917 18.3825L2.43569 9.21336C2.35712 8.5174 2.56016 7.86139 2.94741 7.3491C2.91066 7.27125 2.88554 7.18645 2.87515 7.09617L2.77358 6.2075C2.59586 4.65835 3.80704 3.30027 5.36636 3.30027H10.7104ZM5.02847 7.93016C4.43792 7.93044 3.97878 8.44485 4.04507 9.03172L4.85952 18.1999C4.91609 18.7003 5.33927 19.0787 5.84292 19.0788H18.1667C18.6702 19.0785 19.0935 18.7002 19.1501 18.1999L19.9636 9.03172C20.0299 8.44466 19.571 7.93016 18.9802 7.93016H5.02847ZM5.36636 4.91941C4.77489 4.91941 4.31555 5.43532 4.38296 6.02293L4.42397 6.38328C4.61772 6.33738 4.81975 6.31105 5.02847 6.31101H12.3325L11.4721 5.27684C11.2841 5.05089 11.0043 4.91956 10.7104 4.91941H5.36636Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────

export type NodeLevel = 1 | 2 | 3 | 4 | 5;
export type NodeState = "default" | "hover" | "focus" | "selected" | "disabled";

// ─── TreeNodeRow ──────────────────────────────────────────────────────────────

export interface TreeNodeRowProps {
  label: string;
  count?: number;
  level?: NodeLevel;
  state?: NodeState;
  showArrow?: boolean;
  expanded?: boolean;
  checkbox?: boolean;
  leadingIcon?: boolean;
  checked?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  onCheckChange?: (checked: boolean) => void;
  className?: string;
}

export function TreeNodeRow({
  label,
  count,
  level = 1,
  state = "default",
  showArrow = false,
  expanded = false,
  checkbox = false,
  leadingIcon = false,
  checked = false,
  onToggle,
  onClick,
  onCheckChange,
  className,
}: TreeNodeRowProps) {
  const isDisabled = state === "disabled";
  const isLeaf = level === 5;

  return (
    <div
      className={[styles.node, styles[`level${level}`], className]
        .filter(Boolean)
        .join(" ")}
      data-state={state}
      onClick={isDisabled ? undefined : onClick}
      role="treeitem"
      aria-selected={state === "selected"}
      aria-disabled={isDisabled}
      aria-expanded={!isLeaf && showArrow ? expanded : undefined}
    >
      <div className={styles.content}>
        {/* Arrow placeholder – level 1~4 only */}
        {!isLeaf && (
          <div className={styles.arrowArea}>
            {showArrow && (
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDisabled) onToggle?.();
                }}
                tabIndex={-1}
                aria-hidden="true"
              >
                <span className={styles.arrowIcon}>
                  {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </span>
              </button>
            )}
          </div>
        )}

        <div className={styles.innerContent}>
          {checkbox && (
            <span className={styles.checkboxWrap}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={checked}
                disabled={isDisabled}
                onChange={(e) => onCheckChange?.(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                aria-hidden="true"
                tabIndex={-1}
                readOnly={!onCheckChange}
              />
              <span className={styles.checkboxBox} aria-hidden="true" />
            </span>
          )}

          {leadingIcon && (
            <span className={styles.folderIconWrap}>
              <FolderIcon />
            </span>
          )}

          <span className={styles.label}>{label}</span>

          {count !== undefined && (
            <span className={styles.count}>({count})</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tree ─────────────────────────────────────────────────────────────────────

export interface TreeItem {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
  children?: TreeItem[];
}

export interface TreeProps {
  items: TreeItem[];
  leadingIcon?: boolean;
  selectable?: boolean;
  selectedId?: string;
  defaultExpandedIds?: string[];
  onSelect?: (id: string) => void;
  className?: string;
}

function collectNodes(
  items: TreeItem[],
  level: NodeLevel,
  expandedIds: Set<string>,
  selectedId: string | undefined,
  leadingIcon: boolean,
  selectable: boolean,
  checkedIds: Set<string>,
  handlers: {
    toggle: (id: string) => void;
    select: (id: string) => void;
    check: (id: string, checked: boolean) => void;
  },
): React.ReactNode[] {
  return items.flatMap((item) => {
    const hasChildren = !!item.children?.length;
    const isExpanded = expandedIds.has(item.id);
    const clamped = Math.min(level, 5) as NodeLevel;

    const nodeState: NodeState = item.disabled
      ? "disabled"
      : selectedId === item.id
        ? "selected"
        : isExpanded
          ? "focus"
          : "default";

    const row = (
      <TreeNodeRow
        key={item.id}
        label={item.label}
        count={item.count}
        level={clamped}
        state={nodeState}
        showArrow={hasChildren}
        expanded={isExpanded}
        checkbox={selectable}
        leadingIcon={leadingIcon || selectable}
        checked={checkedIds.has(item.id)}
        onToggle={() => handlers.toggle(item.id)}
        onClick={() => {
          if (!item.disabled) {
            handlers.select(item.id);
            if (hasChildren) handlers.toggle(item.id);
          }
        }}
        onCheckChange={(c) => handlers.check(item.id, c)}
      />
    );

    const childRows =
      hasChildren && isExpanded
        ? collectNodes(
            item.children!,
            (Math.min(level + 1, 5)) as NodeLevel,
            expandedIds,
            selectedId,
            leadingIcon,
            selectable,
            checkedIds,
            handlers,
          )
        : [];

    return [row, ...childRows];
  });
}

export function Tree({
  items,
  leadingIcon = false,
  selectable = false,
  selectedId: controlledSelectedId,
  defaultExpandedIds = [],
  onSelect,
  className,
}: TreeProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultExpandedIds),
  );
  const [internalSelectedId, setInternalSelectedId] = useState<
    string | undefined
  >();
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const resolvedSelectedId = controlledSelectedId ?? internalSelectedId;

  const toggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const select = useCallback(
    (id: string) => {
      setInternalSelectedId(id);
      onSelect?.(id);
    },
    [onSelect],
  );

  const check = useCallback((id: string, isChecked: boolean) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (isChecked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const handlers = { toggle, select, check };

  return (
    <div
      className={[styles.tree, className].filter(Boolean).join(" ")}
      role="tree"
    >
      {collectNodes(
        items,
        1,
        expandedIds,
        resolvedSelectedId,
        leadingIcon,
        selectable,
        checkedIds,
        handlers,
      )}
    </div>
  );
}

export default Tree;
