<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 text-center block p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 translate-y-0 scale-95" enter-to="opacity-100 translate-y-0 scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 scale-100" leave-to="opacity-0 translate-y-4 translate-y-0 scale-95">
          <div class="m-auto bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all align-middle max-w-sm w-full p-6">
            <div>
              <div class="mx-auto flex items-center justify-center h-12 w-12">
                <svg v-bind:style="styles" class="spinner spinner--circle" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
              </div>
              <div class="mt-3 text-center mt-5">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> Loading... </DialogTitle>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref, watch } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useAlertStore } from "../store/alertStore";

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot
  },
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles () {
      return {
        width: this.size,
        height: this.size
      }
    }
  },
  setup() {
    const alertStore = useAlertStore();
    let open = ref(alertStore.getLoading);

    watch(() => alertStore.$state.loading, function() {
        console.log(alertStore.getLoading)
        open.value = alertStore.getLoading;
    })

    return {
      open,
    }
  },
}
</script>
<style lang="scss" scoped>
  $offset: 187;
  $duration: 1.4s;
  .spinner {
    animation: circle-rotator $duration linear infinite;
    * {
      line-height: 0;
      box-sizing: border-box;
    }
  }
  @keyframes circle-rotator {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(270deg); }
  }
  .path {
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation:
            circle-dash $duration ease-in-out infinite,
            circle-colors ($duration*4) ease-in-out infinite;
  }
  @keyframes circle-colors {
    0% {
      stroke: #06253F;
    }
    25% {
      stroke: #DAAA00;
    }
    50% {
      stroke: #adaeb3;
    }
    75% {
      stroke: #0b416e;
    }
    100% {
      stroke: #EBBC00;
    }
  }
  @keyframes circle-dash {
    0% {
      stroke-dashoffset: $offset;
    }
    50% {
      stroke-dashoffset: $offset/4;
      transform:rotate(135deg);
    }
    100% {
      stroke-dashoffset: $offset;
      transform:rotate(450deg);
    }
  }
</style>