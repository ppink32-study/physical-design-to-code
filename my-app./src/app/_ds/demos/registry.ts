import type { ComponentType } from "react";
import FoundationsDemo from "./foundations-demo";
import ButtonDemo from "./button-demo";
import BadgeDemo from "./badge-demo";
import DividerDemo from "./divider-demo";
import LabelDemo from "./label-demo";
import TitleDemo from "./title-demo";
import InputDemo from "./input-demo";
import CheckboxDemo from "./checkbox-demo";
import RadioDemo from "./radio-demo";
import ToggleDemo from "./toggle-demo";
import SelectDemo from "./select-demo";
import DatePickerDemo from "./datepicker-demo";
import FormDemo from "./form-demo";
import ChipsDemo from "./chips-demo";
import TabDemo from "./tab-demo";
import TableDemo from "./table-demo";
import PaginationDemo from "./pagination-demo";
import EmptyDemo from "./empty-demo";
import ScrollDemo from "./scroll-demo";
import LoaderDemo from "./loader-demo";
import TooltipDemo from "./tooltip-demo";
import PlaybookControlBarDemo from "./playbookcontrolbar-demo";

export const DEMO_REGISTRY: Record<string, ComponentType> = {
  foundations: FoundationsDemo,
  button: ButtonDemo,
  badge: BadgeDemo,
  divider: DividerDemo,
  label: LabelDemo,
  title: TitleDemo,
  input: InputDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  toggle: ToggleDemo,
  select: SelectDemo,
  datepicker: DatePickerDemo,
  form: FormDemo,
  chips: ChipsDemo,
  tab: TabDemo,
  table: TableDemo,
  pagination: PaginationDemo,
  empty: EmptyDemo,
  scroll: ScrollDemo,
  loader: LoaderDemo,
  tooltip: TooltipDemo,
  playbookcontrolbar: PlaybookControlBarDemo,
};
