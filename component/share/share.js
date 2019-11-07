'use strict';

Component({
  externalClasses: ['mask-class', 'container-class'],
  properties: {
    actions: {
      type: Array,
    },
    show: {
      type: Boolean,
    },
    cancelWithMask: {
      type: Boolean,
    },
    cancelText: {
      type: String,
    }
  },
  methods: {
    onMaskClick: function onMaskClick() {
      if (this.data.cancelWithMask) {
        this.cancelClick();
      }
    },
    cancelClick: function cancelClick() {
      this.triggerEvent('cancel');
    },
  }
});