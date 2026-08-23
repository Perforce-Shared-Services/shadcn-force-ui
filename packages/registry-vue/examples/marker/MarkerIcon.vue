<script setup lang="ts">
import AccountTreeIcon from "@material-symbols/svg-400/rounded/account_tree.svg?component"
import MenuBookIcon from "@material-symbols/svg-400/rounded/menu_book.svg?component"
import SearchIcon from "@material-symbols/svg-400/rounded/search.svg?component"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from '@/ui/marker'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-12 py-12">
    <Marker>
      <MarkerIcon>
        <AccountTreeIcon />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
    <Marker class="flex-col">
      <MarkerIcon>
        <MenuBookIcon />
      </MarkerIcon>
      <MarkerContent>Syncing completed</MarkerContent>
    </Marker>
  </div>
</template>
