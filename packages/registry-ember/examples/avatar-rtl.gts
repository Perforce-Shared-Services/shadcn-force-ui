// [FORCE-UI] Ember port of examples/base/avatar-rtl.tsx. Fixed rtl dir per
// the ember RTL demo convention.
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/ui/avatar';

<template>
  <div class="flex flex-row flex-wrap items-center gap-6 md:gap-12" dir="rtl">
    <Avatar>
      <AvatarImage
        @alt="@shadcn"
        @src="https://github.com/shadcn.png"
        class="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage @alt="@evilrabbit" @src="https://github.com/evilrabbit.png" />
      <AvatarFallback>ER</AvatarFallback>
      <AvatarBadge class="bg-green-600 dark:bg-green-800" />
    </Avatar>
    <AvatarGroup class="grayscale">
      <Avatar>
        <AvatarImage @alt="@shadcn" @src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          @alt="@maxleiter"
          @src="https://github.com/maxleiter.png"
        />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          @alt="@evilrabbit"
          @src="https://github.com/evilrabbit.png"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  </div>
</template>
