import { Component } from "@angular/core"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/angular-ui/select"

@Component({
  selector: "preview-select-scrollable",
  standalone: true,
  imports: [Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectPortal, SelectPositioner],
  template: `
    <div uiSelect>
      <button uiSelectTrigger class="w-full max-w-64">
        <span uiSelectValue placeholder="Select a timezone"></span>
      </button>
      <ng-template uiSelectPortal>
        <div uiSelectPositioner>
          <div uiSelectContent class="max-h-72">
            <div uiSelectGroup>
              <div uiSelectLabel>North America</div>
              <div uiSelectItem value="est">Eastern Standard Time</div>
              <div uiSelectItem value="cst">Central Standard Time</div>
              <div uiSelectItem value="mst">Mountain Standard Time</div>
              <div uiSelectItem value="pst">Pacific Standard Time</div>
              <div uiSelectItem value="akst">Alaska Standard Time</div>
              <div uiSelectItem value="hst">Hawaii Standard Time</div>
            </div>
            <div uiSelectGroup>
              <div uiSelectLabel>Europe &amp; Africa</div>
              <div uiSelectItem value="gmt">Greenwich Mean Time</div>
              <div uiSelectItem value="cet">Central European Time</div>
              <div uiSelectItem value="eet">Eastern European Time</div>
              <div uiSelectItem value="west">Western European Summer Time</div>
              <div uiSelectItem value="cat">Central Africa Time</div>
              <div uiSelectItem value="eat">East Africa Time</div>
            </div>
            <div uiSelectGroup>
              <div uiSelectLabel>Asia</div>
              <div uiSelectItem value="msk">Moscow Time</div>
              <div uiSelectItem value="ist">India Standard Time</div>
              <div uiSelectItem value="cst_china">China Standard Time</div>
              <div uiSelectItem value="jst">Japan Standard Time</div>
              <div uiSelectItem value="kst">Korea Standard Time</div>
              <div uiSelectItem value="ist_indonesia">Indonesia Central Standard Time</div>
            </div>
            <div uiSelectGroup>
              <div uiSelectLabel>Australia &amp; Pacific</div>
              <div uiSelectItem value="awst">Australian Western Standard Time</div>
              <div uiSelectItem value="acst">Australian Central Standard Time</div>
              <div uiSelectItem value="aest">Australian Eastern Standard Time</div>
              <div uiSelectItem value="nzst">New Zealand Standard Time</div>
              <div uiSelectItem value="fjt">Fiji Time</div>
            </div>
            <div uiSelectGroup>
              <div uiSelectLabel>South America</div>
              <div uiSelectItem value="art">Argentina Time</div>
              <div uiSelectItem value="bot">Bolivia Time</div>
              <div uiSelectItem value="brt">Brasilia Time</div>
              <div uiSelectItem value="clt">Chile Standard Time</div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class SelectScrollableComponent {}

export default SelectScrollableComponent
