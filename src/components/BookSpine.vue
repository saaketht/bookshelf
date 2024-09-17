<template>
  <div
    class="book-spine"
    :class="{ hovered: isHovered }"
    :style="{
      backgroundColor: book.color,
      width: spineWidth + 'px'
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="!isHovered || !useCoverImage" class="book-info">
      <span class="book-title">{{ book.title }}</span>
      <span class="book-author">{{ book.author }}</span>
      <span class="book-extra">{{ book.pages }} pgs | pub. {{ book.publishedYear }}</span>
    </div>
    <img
      v-if="isHovered && useCoverImage"
      :src="book.coverUrl"
      alt="Book Cover"
      class="book-cover"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, type PropType } from 'vue'
import { type Book } from '@/types/book'

export default defineComponent({
  name: 'BookSpine',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    },
    useCoverImage: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const spineWidth = computed(() => {
      // Base width on number of pages, given min and max
      const min = 30
      const max = 60
      return Math.min(Math.max(min, props.book.pages / 7), max)
    })

    const isHovered = ref(false)

    const handleMouseEnter = () => {
      isHovered.value = true
    }

    const handleMouseLeave = () => {
      isHovered.value = false
    }

    return { spineWidth, isHovered, handleMouseEnter, handleMouseLeave }
  }
})
</script>

<style scoped>
.book-spine {
  height: 250px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
  color: white;
  font-size: 0.7rem;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease;
  margin-right: 10px;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  direction: rtl;
  transform-origin: left center; /* Flip from left edge */
}

/* Smooth hover gradient with improved visibility */
.book-spine::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  opacity: 0;
  transition:
    opacity 0.5s ease,
    transform 0.3s ease;
}

/* Book hover effect: scale with smoother shadow and gradient */
.book-spine:hover {
  box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.4);
}

.book-spine:hover::before {
  opacity: 0.6; /* Make gradient more visible */
  transform: scaleX(1.1); /* Slight expansion for emphasis */
}

/* Hovered state: apply flip effect */
.book-spine.hovered {
  transform: rotateY(-90deg);
}

/* Shift neighboring books when a spine is hovered */
.book-spine.hovered + .book-spine {
  transform: translateX(30px); /* Shift neighboring books */
}

/* Book cover styles */
.book-cover {
  display: none; /* Hidden by default */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: opacity 0.3s ease;
}

/* Display cover on hover */
.book-spine.hovered .book-cover {
  display: block;
  opacity: 1;
}

.book-spine:not(.hovered) {
  transition: transform 0.3s ease; /* Add a slight transition for all books */
}

/* Book info (text details) */
.book-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.5rem 0;
}

/* Title styles */
.book-title {
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 0.5rem;
  /* Improved handling of long titles */
  max-height: 100%;
}

/* Author styles */
.book-author {
  font-style: italic;
  font-weight: normal;
  font-size: 0.8em;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Extra info (pages, year) styles */
.book-extra {
  font-size: 0.7em;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Adjust height for mobile view */
@media (max-width: 600px) {
  .book-spine {
    height: 200px;
  }
}
</style>
