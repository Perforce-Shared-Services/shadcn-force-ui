<script setup lang="ts">
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import Logout from "@material-symbols/svg-400/rounded/logout.svg?component"
import User from "@material-symbols/svg-400/rounded/person.svg?component"
import Settings from "@material-symbols/svg-400/rounded/settings.svg?component"
</script>

<template>
  <DropdownMenu dir="rtl">
    <DropdownMenuTrigger as-child>
      <Button variant="outline">افتح القائمة</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent dir="rtl" class="w-48">
      <DropdownMenuLabel>حسابي</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User />
          <span>الملف الشخصي</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          <span>الإعدادات</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Logout />
        <span>تسجيل الخروج</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
