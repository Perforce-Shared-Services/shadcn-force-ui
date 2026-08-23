import { Checkbox } from "@/angular-ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/angular-ui/table"
import { Component, signal } from "@angular/core"

interface Person {
  id: string
  name: string
  email: string
  role: string
}

const tableData: Person[] = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@example.com", role: "Admin" },
  {
    id: "2",
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@example.com",
    role: "User",
  },
  { id: "3", name: "Priya Patel", email: "priya.patel@example.com", role: "User" },
  { id: "4", name: "David Kim", email: "david.kim@example.com", role: "Editor" },
]

@Component({
  selector: "preview-checkbox-table",
  standalone: true,
  imports: [Checkbox, Table, TableHeader, TableBody, TableRow, TableHead, TableCell],
  template: `
    <div uiTableContainer class="max-w-md">
      <table uiTable>
        <thead uiTableHeader>
          <tr uiTableRow>
            <th uiTableHead class="w-10">
              <button
                uiCheckbox
                aria-label="Select all"
                [checked]="allSelected()"
                (checkedChange)="toggleAll($event)"
              ></button>
            </th>
            <th uiTableHead>Name</th>
            <th uiTableHead>Email</th>
            <th uiTableHead>Role</th>
          </tr>
        </thead>
        <tbody uiTableBody>
          @for (person of data; track person.id) {
            <tr uiTableRow>
              <td uiTableCell class="w-10">
                <button
                  uiCheckbox
                  [attr.aria-label]="'Select ' + person.name"
                  [checked]="selected().has(person.id)"
                  (checkedChange)="toggleRow(person.id, $event)"
                ></button>
              </td>
              <td uiTableCell>{{ person.name }}</td>
              <td uiTableCell>{{ person.email }}</td>
              <td uiTableCell>{{ person.role }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class CheckboxTableComponent {
  readonly data = tableData
  readonly selected = signal(new Set(["1"]))

  readonly allSelected = () => this.selected().size === this.data.length

  toggleRow(id: string, checked: boolean | "indeterminate"): void {
    this.selected.update((set) => {
      const next = new Set(set)
      if (checked === true) next.add(id)
      else next.delete(id)
      return next
    })
  }

  toggleAll(checked: boolean | "indeterminate"): void {
    this.selected.set(
      checked === true ? new Set(this.data.map((p) => p.id)) : new Set(),
    )
  }
}

export default CheckboxTableComponent
