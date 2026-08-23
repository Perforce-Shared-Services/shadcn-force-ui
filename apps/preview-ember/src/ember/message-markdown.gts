// [FORCE-UI] Ember port of examples/base/message-markdown.tsx. Markdown is
// rendered with native HTML elements (no markdown dependency).
import { Bubble, BubbleContent } from '@/ember-ui/bubble';
import { Message, MessageContent } from '@/ember-ui/message';

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message @align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>
            How do I render markdown in a message?
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageContent>
        <Bubble @variant="ghost">
          <BubbleContent>
            <p>Here's how to render markdown in a message:</p>
            <ol>
              <li>Render assistant text through <strong>Markdown</strong>.</li>
              <li>Keep user messages as plain text.</li>
              <li>Use a <code>ghost</code> bubble so the response is unframed.</li>
            </ol>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </div>
</template>
