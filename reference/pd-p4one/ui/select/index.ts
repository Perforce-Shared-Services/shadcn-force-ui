export { SelectComponent as Select, SelectRootDirective } from './select.component';
export {
  SelectTriggerComponent as SelectTrigger,
  SelectValueDirective,
  SELECT_TRIGGER_CLASS,
} from './select-trigger.component';
// The value text is rendered by radix-ng's own component (a content-queried
// dependency of the trigger); `SelectValueDirective` above co-applies the
// data-slot styling on the same `[rdxSelectValue]` element.
export { RdxSelectValueDirective as SelectValue } from '@radix-ng/primitives/select';
export {
  SelectContentDirective as SelectContent,
  SelectGroupDirective as SelectGroup,
  SelectLabelDirective as SelectLabel,
  SelectSeparatorDirective as SelectSeparator,
  SELECT_CONTENT_CLASS,
} from './select-content.component';
export { SelectItemComponent as SelectItem, SELECT_ITEM_CLASS } from './select-item.component';
