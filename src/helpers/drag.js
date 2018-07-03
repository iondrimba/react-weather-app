import Hammer from 'hammerjs';

export default class Drag {
  setup(stage) {
    this.mc = new Hammer.Manager(stage, {
      touchAction: 'pan-y'
    });

    this.mc.add(new Hammer.Pan());
  }

  onDragStart(dragRightCallback, dragLeftCallback) {
    this.mc.on('panstart', (e) => {
      if (e.additionalEvent === 'panright') {
        dragRightCallback();
      } else {
        dragLeftCallback();
      }
    });
  }
}
