import { Marker, MarkerContent, MarkerIcon } from '@/ember-ui/marker';

import FileText from '~icons/ms/description';
import GitBranch from '~icons/ms/account_tree';
import Search from '~icons/ms/search';

<template>
  <div class="flex w-full max-w-sm flex-col gap-3 py-12">
    <Marker @variant="border">
      <MarkerIcon>
        <GitBranch />
      </MarkerIcon>
      <MarkerContent>Switched to release-candidate</MarkerContent>
    </Marker>
    <Marker @variant="border">
      <MarkerIcon>
        <Search />
      </MarkerIcon>
      <MarkerContent>Reviewed 8 related files</MarkerContent>
    </Marker>
    <Marker @variant="border">
      <MarkerIcon>
        <FileText />
      </MarkerIcon>
      <MarkerContent>Opened implementation notes</MarkerContent>
    </Marker>
  </div>
</template>
