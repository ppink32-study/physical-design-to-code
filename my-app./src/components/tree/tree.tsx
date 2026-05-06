"use client";

import { useState, useCallback } from "react";
import { Checkbox } from "@/components/checkbox/checkbox";
import styles from "./tree.module.css";

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
                {/* CSS mask-image 방식으로 currentColor 아이콘 렌더링 */}
                <span
                  className={[
                    styles.arrowIconBase,
                    expanded ? styles.arrowIconDown : styles.arrowIconRight,
                  ].join(" ")}
                />
              </button>
            )}
          </div>
        )}

        <div className={styles.innerContent}>
          {/* 기존 Checkbox 컴포넌트 사용 */}
          {checkbox && (
            <span
              className={styles.checkboxWrap}
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                checked={checked}
                disabled={isDisabled}
                onChange={(c) => onCheckChange?.(c)}
              />
            </span>
          )}

          {/* CSS mask-image 방식 폴더 아이콘 */}
          {leadingIcon && (
            <span className={styles.folderIconWrap}>
              <span className={styles.folderIcon} aria-hidden="true" />
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
