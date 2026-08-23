// [FORCE-UI] Ember port of examples/base/empty-card.tsx.
import ArrowUpRightIcon from '~icons/ms/open_in_new';
import FolderIcon from '~icons/ms/folder';
import { Button } from '@/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/ui/empty';

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia @variant="icon">
        <FolderIcon />
      </EmptyMedia>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>
        You haven't created any projects yet. Get started by creating your
        first project.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div class="flex gap-2">
        <Button><a href="#">Create project</a></Button>
        <Button @variant="outline">Import project</Button>
      </div>
      <Button @variant="link" class="text-muted-foreground">
        Learn more <ArrowUpRightIcon />
      </Button>
    </EmptyContent>
  </Empty>
</template>
