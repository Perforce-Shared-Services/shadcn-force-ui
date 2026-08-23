<script setup lang="ts">
import AccountTreeIcon from "@material-symbols/svg-400/rounded/account_tree.svg?component"
import SearchIcon from "@material-symbols/svg-400/rounded/search.svg?component"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from '@/ui/marker'
import { Spinner } from '@/ui/spinner'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker>
      <MarkerIcon>
        <AccountTreeIcon />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
    <Marker role="status">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent class="shimmer">Thinking...</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerContent>Conversation compacted</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
  </div>
</template>
