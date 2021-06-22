<template>
  <div id="app">
    <MasterHeader />
    <main class="main">
      <Container>
        <router-view />
      </Container>
    </main>
  </div>
</template>

<script>
import MasterHeader from '@/components/Main/Header'
import Container from '@/components/Container'
export default {
  name: 'App',
  components: {
    MasterHeader,
    Container
  }
}
</script>
<style lang="postcss" scoped>
#app {
  display: flex;
  justify-content: center;
  height: 100%;

}

.main {
  display: flex;
  margin-bottom: 100px;
  overflow-x: overlay;
  width: 100%;

  @media (--t) {
    height: 100%;
    width: auto;
    margin-bottom: 0px;
  }
}
</style>
