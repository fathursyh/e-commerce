<template>
    <form
      class="px-14 py-12 rounded-lg shadow-md w-1/3 bg-base-100"
      novalidate
      @submit.prevent="handleLogin"
    >
      <h2 class="text-xl font-bold mb-4 text-center">Login</h2>
  
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-500 mb-1" for="email"
          >Email</label
        >
        <input
          id="email"
          v-model="input.email"
          name="email"
          type="email"
          class="input input-bordered w-full"
          :class="{'border-red-500 focus:outline-red-500': errorMessages.email.length > 0}"
          placeholder="Your Email"
          required
          autocomplete="off"
          @change="errorMessages.email=''"
        />
        <p class="text-sm text-red-600 mt-2">{{ errorMessages.email }}</p>
      </div>
  
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-500 mb-1" for="password"
          >Password</label
        >
        <input
          id="password"
          v-model="input.password"
          name="password"
          type="password"
          class="input input-bordered w-full"
          :class="{'focus:outline-red-500 border-red-500': errorMessages.password.length > 0}"
          placeholder="Your Password"
          required
          @change="errorMessages.password=''"
        />
        <p class="text-sm text-red-600 mt-2">{{ errorMessages.password }}</p>
      </div>
      <button type="submit" class="btn btn-primary w-full mt-4">Login</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { reactive } from "vue";
  import { actions, isInputError } from "astro:actions";
  
  const input = reactive({
    email: "",
    password: "",
  });
  
  const errorMessages = reactive({
    email: "",
    password: "",
  });
  
  const handleLogin = async () => {
    const { error } = await actions.auth.loginUser(input);
    if (isInputError(error)) {
      if (error.fields.email) {
        errorMessages.email = error.fields.email.join(" ");
      }
      if (error.fields.password) {
        errorMessages.password = error.fields.password.join(" ");
      }
    }
  };
  </script>
  