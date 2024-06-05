<template>
  <h1>PRIMO FANBASE DONATION (TEST)</h1>

  <p>{{ url }}</p>

  <div class="login-wrapper">
    <button @click="loginWithGoogle" class="auth-button google">Login with Google</button>
    <button @click="loginWithFacebook" class="auth-button facebook">Login with Facebook</button>
    <button @click="loginWithInstagram" class="auth-button instagram">Login with Instagram</button>
    <button @click="loginWithTiktok" class="auth-button tiktok">Login with Tiktok</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const url = ref('')

const loginWithGoogle = async () => {
  window.location.href = import.meta.env.VITE_GOOGLE_AUTH_ENDPOINT
}

const loginWithFacebook = () => {
  window.location.href = import.meta.env.VITE_FB_AUTH_ENDPOINT
}

const loginWithInstagram = () => {
  window.location.href = import.meta.env.VITE_IG_AUTH_ENDPOINT
}

const loginWithTiktok = () => {
  window.location.href = import.meta.env.VITE_TIKTOK_AUTH_ENDPOINT
}
</script>

<style scoped>
* {
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;

  margin: 0;
  padding: 20px;
}

.login-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-inline: auto;
}

.auth-button {
  margin: 10px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  color: white;
  text-transform: uppercase;
}

.auth-button.google {
  background-color: #db4437;
}

.auth-button.facebook {
  background-color: #3b5998;
}

.auth-button.instagram {
  background-color: #e4405f;
}

.auth-button.tiktok {
  background-color: #010101;
}

.auth-button:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25);
}

.auth-button:active {
  background-color: darken($color, 10%);
}
</style>
