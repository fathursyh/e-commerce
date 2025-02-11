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
          :class="{'border-error focus:outline-error': errorMessages.email.length > 0}"
          placeholder="Your Email"
          required
          autocomplete="on"
          @change="errorMessages.email=''"
        />
        <p class="text-sm text-error mt-2">{{ errorMessages.email }}</p>
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
          :class="{'focus:outline-error border-error': errorMessages.password.length > 0}"
          placeholder="Your Password"
          required
          @change="errorMessages.password=''"
        />
        <p class="text-sm text-error mt-2">{{ errorMessages.password }}</p>
      </div>
      <button ref="submitButton" type="submit" class="btn btn-primary w-full mt-4">
        Login
      </button>
      <p class="text-sm mt-2 text-center">You have no account? <a href="/register" class="text-blue-500 hover:underline font-medium" data-astro-prefetch>Register.</a></p>
      <div v-if="isSuccess">
        <slot />
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from "vue";
  import { actions, isInputError } from "astro:actions";
  const isSuccess = ref(false);
  const submitButton = ref();
  const input = reactive({
    email: "",
    password: "",
  });
  
  const errorMessages = reactive({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    submitButton.value.disabled = true;
    const { error } = await actions.auth.loginUser(input);
    if(error) {
      submitButton.value.disabled = false;
      errorMessages.email = error.message;
      errorMessages.password = error.message;
    } else {
      isSuccess.value = true;
      setTimeout(() => {
        window.location.replace("/");
      }, 600);
    }
    if (isInputError(error)) {
      submitButton.value.disabled = false;
      if (error.fields.email) {
        errorMessages.email = error.fields.email.join(" ");
      }
      if (error.fields.password) {
        errorMessages.password = error.fields.password.join(" ");
      }
    }
  };
  </script>
  