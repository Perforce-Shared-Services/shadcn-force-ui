// [FORCE-UI] Ember port of examples/base/avatar-badge.tsx.
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/ui/avatar';

<template>
  <Avatar>
    <AvatarImage @alt="@shadcn" @src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
    <AvatarBadge class="bg-green-600 dark:bg-green-800" />
  </Avatar>
</template>
