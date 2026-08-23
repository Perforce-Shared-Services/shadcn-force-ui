// [FORCE-UI] Ember port of examples/base/bubble-markdown.tsx. The React demo
// renders a Markdown component; Glimmer templates are HTML, so the markdown
// subset is expressed with native elements instead (no new deps).
import { Bubble, BubbleContent } from '@/ui/bubble';

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Bubble @align="end" @variant="muted">
      <BubbleContent>
        <p>Hello! Are you actually <strong>thinking</strong>?</p>
      </BubbleContent>
    </Bubble>
    <Bubble @variant="ghost">
      <BubbleContent>
        <p>
          Ghost bubbles work for assistant text, <strong>markdown</strong>,
          and other content that should not be framed.
        </p>
        <p>
          This is perfect for assistant messages that should not have a frame
          and can take the full width of the container. You can also render
          <code>code</code> in it.
        </p>
        <p>
          Ghost bubbles are full width and can take the full width of the
          container.
        </p>
      </BubbleContent>
    </Bubble>
  </div>
</template>
