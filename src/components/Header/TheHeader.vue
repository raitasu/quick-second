<script setup>
</script>
<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <div class="logo">
          Quick Deal v2
        </div>
      </RouterLink>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/employees">Employees</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style>

.logo {
  font-size: 18px;
  font-weight: bold;
}

.navbar {
  background-color: #e3f2fd
}

.nav-item:active {
  text-decoration: underline;
}
</style>