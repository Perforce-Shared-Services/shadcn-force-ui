// [FORCE-UI] Ember port of examples/base/avatar-size.tsx.
import { Avatar, AvatarFallback, AvatarImage } from '@/ember-ui/avatar';

<template>
  <div class="flex flex-wrap items-center gap-2 grayscale">
    <Avatar @size="sm">
      <AvatarImage @alt="@shadcn" @src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage @alt="@shadcn" @src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar @size="lg">
      <AvatarImage @alt="@shadcn" @src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</template>
