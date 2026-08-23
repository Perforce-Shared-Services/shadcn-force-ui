// [FORCE-UI] Ember port of examples/base/drawer-nested.tsx. The ember drawer
// has no swipe-direction/handle args (vaul features), so nesting alone is
// demonstrated.
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button } from '@/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/drawer';

export default class DrawerNested extends Component<{ element: HTMLElement }> {
  @tracked innerOpen = false;

  setInner = (open: boolean) => {
    this.innerOpen = open;
  };

  <template>
    <Drawer>
      <DrawerTrigger>
        <Button @variant="secondary">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>
            Open another drawer from the same direction.
          </DrawerDescription>
        </DrawerHeader>
        <div class="flex-1 p-4">
          <div class="bg-muted aspect-video w-full"></div>
        </div>
        <DrawerFooter>
          <Drawer @open={{this.innerOpen}} @onOpenChange={{this.setInner}}>
            <DrawerTrigger>
              <Button @variant="outline">Open Nested Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Nested Drawer</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild={{true}}>
                  <Button>Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <DrawerClose asChild={{true}}>
            <Button @variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </template>
}
