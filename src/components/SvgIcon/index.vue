<template>
  <div class="svg-icon svg-external-icon" v-if="isExt" :style="styleExternalIcon" v-bind="$attrs">
    <use :xlink:href="iconName"></use>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { isExternal } from '../../utils/validate';
export default defineComponent({
  name: 'SvgIcon',
  inheritAttrs: false,
  props: {
    iconClass: {
      type: String,
      require: true,
    }
    ,
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const isExt = computed(() => isExternal(props.iconClass || ''))
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon')
    const styleExternalIcon = computed(() => {
      const mask = `url(${props.iconClass} no-repeat 50% 50%)`
      return {
        mask,
        '-webkit-mask': mask
      }
    })

    return { isExt, iconName, svgClass, styleExternalIcon }
  }
})
</script>


<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>