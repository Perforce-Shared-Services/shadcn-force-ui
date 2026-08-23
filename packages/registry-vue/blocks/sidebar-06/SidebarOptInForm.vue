<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-06
import { Button } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { SidebarInput } from '@/ui/sidebar'
</script>

<template>
  <Card class="gap-2 py-4 shadow-none">
    <CardHeader class="px-4">
      <CardTitle class="text-sm">Subscribe to our newsletter</CardTitle>
      <CardDescription>
        Opt-in to receive updates and news about the sidebar.
      </CardDescription>
    </CardHeader>
    <CardContent class="px-4">
      <form>
        <div class="grid gap-2.5">
          <SidebarInput type="email" placeholder="Email" />
          <Button
            class="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
            size="sm"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
