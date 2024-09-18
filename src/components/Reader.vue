<template>
  <div class="reader-container">
    <p class="Book-title"> Book Title</p>
    <div class="book">
      <div class="page left-page">
        <!-- Left page content -->
        <p>{{ currentPageContent.left }}</p>
        <button class="navigation-button-backward" @click="prevPage" :disabled="currentPage === 1">
          &#9664; <!-- Unicode left arrow -->
        </button>
      </div>
      <div class="page right-page">
        <!-- Right page content -->
        <p>{{ currentPageContent.right }}</p>
        <button class="navigation-button-forward" @click="nextPage" :disabled="currentPage === totalPages">
          &#9654; <!-- Unicode right arrow -->
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Reader',
  setup() {
    const router = useRouter();

    const goToBookShelf = () => {
      router.push({ name: 'home' });
    };

    const bookContent = ref([
      'Chapter 1: Introduction\n' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n' +
      'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec id elit non mi porta gravida at eget metus. Cras ultricies ligula sed magna dictum porta.',

      'Chapter 2: Historical Background\n' +
      'In this chapter, we delve into the historical context that has shaped the current understanding of the subject. From early discoveries to modern advancements, we explore key events and figures that have contributed to the field.\n' +
      'The evolution of the field is marked by significant milestones, including breakthroughs in technology and methodology. Historical perspectives provide valuable insights into the development and future directions of the research area. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec id elit non mi porta gravida at eget metus. Nulla porttitor accumsan tincidunt.',

      'Chapter 3: Methodology\n' +
      'This chapter outlines the methodologies employed in the research. It includes detailed descriptions of experimental designs, data collection techniques, and analytical methods used to ensure accuracy and reliability.\n' +
      'Methodologies are critical in research as they determine the validity of the findings. This section provides transparency and allows for the replication of results. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. Cras mattis consectetur purus sit amet fermentum.\n' +
      'Additionally, the chapter discusses the rationale behind the chosen methods and any challenges encountered during the process. It also includes considerations for future improvements and refinements.',
    ]);

    const currentPage = ref(1); // Current page (1-based index)
    const totalPages = Math.ceil(bookContent.value.length / 2); // Total number of pages (2 pages per view)

    const currentPageContent = ref({
      left: bookContent.value[0] || '',
      right: bookContent.value[1] || ''
    });

    const updatePageContent = () => {
      const leftIndex = (currentPage.value - 1) * 2;
      const rightIndex = leftIndex + 1;
      currentPageContent.value = {
        left: bookContent.value[leftIndex] || '',
        right: bookContent.value[rightIndex] || ''
      };
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        updatePageContent();
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages) {
        currentPage.value++;
        updatePageContent();
      }
    };

    return {
      goToBookShelf,
      currentPageContent,
      currentPage,
      totalPages,
      prevPage,
      nextPage
    };
  }
});
</script>

<style scoped>
.reader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background:linear-gradient(135deg, #000000, #2c3e50); /* Darker background for contrast */
  padding: 20px;
  position: relative; /* Needed for absolute positioning of buttons */
}

.book {
  display: flex;
  max-width: 90vw; /* Adjusted to make the book more prominent */
  height: 80vh; /* Adjusted for better proportion */
  background:linear-gradient(135deg, #000000, #2c3e50);  /* Darker gradient with texture effect */
  border-radius: 15px; /* More rounded corners */
  overflow: hidden;
  color: #f0f0f0; /* Lighter text for better readability */
  font-family: 'Georgia', serif;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7); /* Shadow for depth */
}

.page {
  flex: 1;
  padding: 30px; /* Increased padding for better spacing */
  overflow-y: auto;
  text-align: justify;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.05); /* Slightly transparent background for a subtle texture */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Light border for separation */
  border-radius: 10px; /* Rounded corners for pages */
}

.left-page {
  border-right: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border between pages */
  padding-right: 50px;
}

.right-page {
  padding-left: 50px;
}

.page p {
  margin: 0;
  font-size: 1.2rem; /* Slightly larger font size for better readability */
  line-height: 1.7;
}

.navigation-button-backward,
.navigation-button-forward {
  position: absolute;
  bottom: 150px;
  background: none; /* Remove background */
  color: white;
  border: none; /* Remove border */
  border-radius: 50%; /* Make the button round */
  padding: 0; /* Remove padding */
  font-size: 2rem; /* Larger arrow icons */
  cursor: pointer;
  transition: color 0.3s, transform 0.2s; /* Adjusted transition for color and transform */
  box-shadow: none; /* Remove shadow */
}

.navigation-button-backward:hover,
.navigation-button-forward:hover {
  color: #aaa; /* Change arrow color on hover */
  transform: scale(1.1); /* Slight scale effect on hover */
}

.navigation-button-backward:disabled,
.navigation-button-forward:disabled {
  color: #555; /* Dim color for disabled state */
  cursor: not-allowed;
}

.navigation-button-backward {

}

.navigation-button-forward {
  right: 130px;
}
.Book-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

</style>
