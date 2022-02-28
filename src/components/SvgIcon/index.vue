<template>
  <!-- <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>-->

  <div class="svg-icon svg-external-icon"  v-bind="$attrs">
    <svg aria-hidden="true">
      <use v-if="!isExt" :href="iconName" :fill="color" />
      <use v-else :href="iconClass" :fill="color" />
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { isExternal } from '@/utils/validate';

export default defineComponent({
  name: 'SvgIcon',
  inheritAttrs: false,
  props: {
    iconClass: {
      type: String,
      require: true,
    },
    prefix: {
      type: String,
      default: 'icon',
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333'
    }
  },
  setup(props) {

    const isExt = computed(() => isExternal(props.iconClass || ''))
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon')


    return { isExt, iconName, svgClass }
  },
})
</script>