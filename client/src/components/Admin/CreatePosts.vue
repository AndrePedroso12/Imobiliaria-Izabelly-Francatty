<template>
  <div>Create Posts</div>

  <div class="min-h-screen bg-zinc-100 dark:bg-zinc-800">
    <div class="py-10">
      <h2 class="text-center text-3xl font-bold text-zinc-800 dark:text-white">
        Create a New Post
      </h2>
      <div
        class="mt-8 max-w-md mx-auto bg-white dark:bg-zinc-700 shadow-lg rounded-lg overflow-hidden"
      >
        <div class="py-4 px-8">
          <div class="mb-4">
            <label for="title" class="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2"
              >Title</label
            >
            <input
              type="text"
              id="title"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Post Title"
            />
          </div>
          <div class="mb-4">
            <label
              for="content"
              class="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2"
              >Content</label
            >
            <textarea
              id="content"
              rows="4"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Post Content"
            ></textarea>
          </div>
          <div class="mb-4">
            <label
              for="category"
              class="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2"
              >Category</label
            >
            <select
              id="category"
              class="shadow border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Technology</option>
              <option>Design</option>
              <option>Travel</option>
              <option>Food</option>
              <option>Lifestyle</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2"
              >Featured Image</label
            >
            <input
              type="file"
              class="w-full text-zinc-700 dark:text-zinc-300 file:border file:border-zinc-300 file:px-4 file:py-2 file:rounded file:text-sm file:bg-white file:text-zinc-700 hover:file:bg-zinc-50 dark:file:bg-zinc-600 dark:file:border-zinc-500 dark:file:text-zinc-200"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped></style>
