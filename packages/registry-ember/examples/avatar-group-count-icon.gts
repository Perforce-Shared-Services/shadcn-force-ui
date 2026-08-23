// [FORCE-UI] Ember port of examples/base/avatar-group-count-icon.tsx.
import PlusIcon from '~icons/ms/add';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/ui/avatar';

<template>
  <AvatarGroup class="grayscale">
    <Avatar>
      <AvatarImage @alt="@shadcn" @src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage @alt="@maxleiter" @src="https://github.com/maxleiter.png" />
      <AvatarFallback>LR</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage @alt="@evilrabbit" @src="https://github.com/evilrabbit.png" />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
    <AvatarGroupCount>
      <PlusIcon />
    </AvatarGroupCount>
  </AvatarGroup>
</template>
