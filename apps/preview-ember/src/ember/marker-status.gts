import { Spinner } from '@/ember-ui/spinner';
import { Marker, MarkerContent, MarkerIcon } from '@/ember-ui/marker';

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker role="status">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent>Compacting conversation</MarkerContent>
    </Marker>
    <Marker role="status" @variant="separator">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent>Running tests</MarkerContent>
    </Marker>
  </div>
</template>
