// [FORCE-UI] Ember port of examples/base/avatar-badge-icon.tsx.
import PlusIcon from '~icons/ms/add';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/ui/avatar';

<template>
  <Avatar class="grayscale">
    <AvatarImage @alt="@pranathip" @src="https://github.com/pranathip.png" />
    <AvatarFallback>PP</AvatarFallback>
    <AvatarBadge>
      <PlusIcon />
    </AvatarBadge>
  </Avatar>
</template>
