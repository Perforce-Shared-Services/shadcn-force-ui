import { Spinner } from '@/ember-ui/spinner';
import { Marker, MarkerContent, MarkerIcon } from '@/ember-ui/marker';

import GitBranch from '~icons/ms/account_tree';
import Search from '~icons/ms/search';

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker>
      <MarkerIcon>
        <GitBranch />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
    <Marker role="status">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent @class="shimmer">Thinking...</MarkerContent>
    </Marker>
    <Marker @variant="separator">
      <MarkerContent>Conversation compacted</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <Search />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
  </div>
</template>
