import { Marker, MarkerContent, MarkerIcon } from '@/ember-ui/marker';

import BookOpenCheck from '~icons/ms/menu_book';
import GitBranch from '~icons/ms/account_tree';
import Search from '~icons/ms/search';

<template>
  <div class="flex w-full max-w-sm flex-col gap-12 py-12">
    <Marker>
      <MarkerIcon>
        <GitBranch />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
    <Marker @variant="separator">
      <MarkerIcon>
        <Search />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
    <Marker @class="flex-col">
      <MarkerIcon>
        <BookOpenCheck />
      </MarkerIcon>
      <MarkerContent>Syncing completed</MarkerContent>
    </Marker>
  </div>
</template>
