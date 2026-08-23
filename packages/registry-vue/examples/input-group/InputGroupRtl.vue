<script setup lang="ts">
import Search from "@material-symbols/svg-400/rounded/search.svg?component"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/ui/input-group'
import { Label } from '@/ui/label'
</script>

<template>
  <div dir="rtl" class="flex w-full max-w-sm flex-col gap-4">
    <Label for="search-rtl">ابحث</Label>
    <InputGroup>
      <InputGroupInput id="search-rtl" placeholder="اكتب للبحث..." dir="rtl" />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
