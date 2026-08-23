<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group"
import { Label } from "@/ui/label"
import Search from "@material-symbols/svg-400/rounded/search.svg?component"
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
