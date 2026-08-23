<script setup lang="ts">
import { Message, MessageAvatar, MessageContent } from "@/ui/message"
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <Message>
      <MessageAvatar src="" fallback="AI" />
      <MessageContent>
        <div class="space-y-2 text-sm">
          <p>Here's the summary you asked for:</p>
          <ol class="list-decimal space-y-1 pl-5">
            <li>
              Total revenue grew <strong>18%</strong> quarter over quarter.
            </li>
            <li>Churn dropped below <em>2%</em> for the first time.</li>
            <li>
              Top request remains SSO — see ticket
              <code class="rounded bg-muted px-1 py-0.5 text-xs">#142</code>.
            </li>
          </ol>
        </div>
      </MessageContent>
    </Message>
  </div>
</template>
