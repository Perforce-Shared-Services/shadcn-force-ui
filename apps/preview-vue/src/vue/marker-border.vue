<script setup lang="ts">
import AccountTreeIcon from "@material-symbols/svg-400/rounded/account_tree.svg?component"
import DescriptionIcon from "@material-symbols/svg-400/rounded/description.svg?component"
import SearchIcon from "@material-symbols/svg-400/rounded/search.svg?component"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from '@/ui/marker'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker variant="border">
      <MarkerIcon>
        <AccountTreeIcon />
      </MarkerIcon>
      <MarkerContent>Switched to release-candidate</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerIcon>
        <DescriptionIcon />
      </MarkerIcon>
      <MarkerContent>Reviewed 8 related files</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Opened implementation notes</MarkerContent>
    </Marker>
  </div>
</template>
