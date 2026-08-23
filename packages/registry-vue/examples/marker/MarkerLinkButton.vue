<script setup lang="ts">
import RestartAltIcon from "@material-symbols/svg-400/rounded/restart_alt.svg?component"
import AccountTreeIcon from "@material-symbols/svg-400/rounded/account_tree.svg?component"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from '@/ui/marker'

function revert() {
  // eslint-disable-next-line no-console
  console.log("You clicked the revert button")
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker as="a" href="#links-and-buttons">
      <MarkerIcon>
        <AccountTreeIcon />
      </MarkerIcon>
      <MarkerContent>View the pull request</MarkerContent>
    </Marker>
    <Marker
      as="button"
      type="button"
      class="transition-colors hover:text-foreground"
      @click="revert()"
    >
      <MarkerIcon>
        <RestartAltIcon />
      </MarkerIcon>
      <MarkerContent>Revert this change</MarkerContent>
    </Marker>
  </div>
</template>
