<template>
  <form
    class="px-14 py-12 rounded-lg shadow-md w-1/3 bg-base-100"
    novalidate
    @submit.prevent="handleRegister"
  >
    <h2 class="text-xl font-bold mb-4 text-center">Register</h2>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-500 mb-1" for="name"
        >Name</label
      >
      <input
        id="name"
        v-model="input.name"
        name="name"
        type="text"
        class="input input-bordered w-full"
        :class="{
          'border-error focus:outline-error': errorMessages.name.length > 0,
        }"
        placeholder="Your Name"
        required
        @change="errorMessages.name = ''"
      />
      <p class="text-sm text-error mt-2">{{ errorMessages.name }}</p>
    </div>

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
        :class="{
          'border-error focus:outline-error':
            errorMessages.email.length > 0,
        }"
        placeholder="Your Email"
        required
        @change="errorMessages.email = ''"
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
        :class="{
          'focus:outline-error border-error':
            errorMessages.password.length > 0,
        }"
        placeholder="Your Password"
        required
        @change="errorMessages.password = ''"
      />
      <p class="text-sm text-error mt-2">{{ errorMessages.password }}</p>
    </div>
    <div class="mb-4">
      <label
        class="block text-sm font-medium text-gray-500 mb-1"
        for="confirmPassword"
        >Confirm Password</label
      >
      <input
        id="confirmPassword"
        v-model="input.confirmPassword"
        name="confirmPassword"
        type="password"
        class="input input-bordered w-full"
        :class="{
          'focus:outline-error border-error':
            errorMessages.confirmPassword.length > 0,
        }"
        placeholder="Your Password"
        required
        @change="errorMessages.confirmPassword = ''"
      />
      <p class="text-sm text-error mt-2">
        {{ errorMessages.confirmPassword }}
      </p>
    </div>
    <button ref="submitButton" type="submit" class="btn btn-primary w-full mt-4">Register</button>
    <p class="text-sm mt-2 text-center">Already have an account? <a href="/login" class="text-blue-500 hover:underline font-medium" data-astro-prefetch>Login.</a></p>
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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const errorMessages = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    submitButton.value.disabled = true;
    const { error } = await actions.auth.createUser(input);
    if (error) {
      submitButton.value.disabled = false;
    } else {
      isSuccess.value = true;
      setTimeout(() => {
        window.location.replace("/login");
      }, 600);
    }
    if (isInputError(error)) {
      submitButton.value.disabled = false;
      // Handle input errors.
      if (error.fields.name) {
        errorMessages.name = error.fields.name.join(" ");
      }
      if (error.fields.email) {
        errorMessages.email = error.fields.email.join(" ");
      }
      if (error.fields.password) {
        errorMessages.password = error.fields.password.join(" ");
      }
      if (error.fields.confirmPassword) {
        errorMessages.confirmPassword = error.fields.confirmPassword.join(" ");
      }
    }
  };
</script>
