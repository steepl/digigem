<template lang="pug">
.layout
  Logo
  Search
  Sidebar
  nuxt.content
</template>

<script>
import Logo from '../components/Logo'
import Search from '../components/Search'
import Sidebar from '../components/Sidebar'
import pkg from '../package'

export default {
  components: {
    Logo,
    Search,
    Sidebar,
  },
  head () {
    return {
      meta: [
        { hid: 'og:title', property: 'og:title', content: pkg.name },
        { hid: 'og:description', property: 'og:description', content: pkg.description },
        { hid: 'og:image', property: 'og:image', content: this.prodBaseUrl},
        { hid: 'og:url', property: 'og:url', content: this.prodBaseUrl },
      ],
    }
  },
  data() {
    return {
      prodBaseUrl: 'https://gem.digibende',
      showNotice: false,
    }
  },
}
</script>


<style lang="scss">

body {
  margin: 2rem;
  background: #272927;
}

html {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  // color: #22292F;
}

a {
  color: #FC6E00;
  text-decoration: none;
  overflow-wrap: break-word;

  &:hover {
    color: #409aff;
  }
}

.nuxt-link-active {
  color: white;
  text-decoration: underline;
}

h1, h2, p, ol, i, small {
  color: white;
}

h1 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.layout {
  display: grid;
  grid-template-columns: fit-content(200px) auto;
  grid-gap: 3rem;
  grid-template-areas:
    'logo search'
    'sidebar content';
  max-width: 80vw;
  margin: 0 auto;
}

.logo {
  grid-area: logo;
}

.search {
  grid-area: search;
}

.nav {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

.cards {
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem,auto));
  grid-gap: 1rem;
}

// Fade in title and cards and rows
.fade-title {
  &-enter {
    opacity: 0;

    &-to {
      opacity: 1;
    }

    &-active {
       transition: opacity .1s ease-in-out;
    }
  }
}

.fade-card {
  &-enter {
    opacity: 0;

    &-to {
      opacity: 1;
    }

    &-active {
       transition: opacity .1s ease-in-out;
    }
  }
}


@media (max-width: 600px) {
  .layout {
    display: grid;
    grid-template-columns: auto;
    grid-gap: 1rem;
    margin-top: 1rem;
    grid-template-areas:
      'logo'
      'sidebar'
      'search'
      'content';
  }
  hr {
    display: none;
  }
}

.highlighted {
  text-decoration: none;
  background-color: #FC6E00;
  color: #212121;
  padding: 0 5px;
  border-radius: .1rem;

  &:hover {
    background-color: #409aff;
    color: white;
  }
}

.cookie {
  position: fixed;
  margin: 1rem;
  bottom: 0;
  left: 0;
  background-color: #272927;
  padding: 0 1rem;
  border-radius: .3rem;
  box-shadow:inset 0px 0px 0px 2px #FC6E00;
  z-index: 999;

  p {
    font-size: 12px;
    margin-left: 1.2rem;

    &::before {
      content: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgZmlsbD0iIzA4ZTVmZiI+PGcgaWQ9InN1cmZhY2UxIiBmaWxsPSIjMDhlNWZmIj48cGF0aCBzdHlsZT0iICIgZD0iTSAxNC41IDAgQyAxMC41MzEyNSAwIDcuMTYwMTU2IDIuMzk4NDM4IDUuNzE4NzUgNS43ODEyNSBDIDIuMzU5Mzc1IDcuMjQ2MDk0IDAgMTAuNjA5Mzc1IDAgMTQuNSBDIDAgMTkuNzM0Mzc1IDQuMjY1NjI1IDI0IDkuNSAyNCBDIDEzLjM5MDYyNSAyNCAxNi43NTM5MDYgMjEuNjQwNjI1IDE4LjIxODc1IDE4LjI4MTI1IEMgMjEuNjAxNTYzIDE2LjgzOTg0NCAyNCAxMy40Njg3NSAyNCA5LjUgQyAyNCA0LjI2MTcxOSAxOS43MzgyODEgMCAxNC41IDAgWiBNIDE0LjUgMiBDIDE4LjY2MDE1NiAyIDIyIDUuMzM5ODQ0IDIyIDkuNSBDIDIyIDEyLjA0Njg3NSAyMC43Njk1MzEgMTQuMjM4MjgxIDE4LjkwNjI1IDE1LjU5Mzc1IEMgMTguOTQ5MjE5IDE1LjIzNDM3NSAxOSAxNC44NzEwOTQgMTkgMTQuNSBDIDE5IDExLjU3MDMxMyAxNy42NTYyNSA4Ljk2NDg0NCAxNS41NjI1IDcuMjE4NzUgQyAxNS44MjgxMjUgNi44Nzg5MDYgMTYgNi40NjA5MzggMTYgNiBDIDE2IDQuODk0NTMxIDE1LjEwNTQ2OSA0IDE0IDQgQyAxMy4xMTMyODEgNCAxMi4zNTU0NjkgNC41NzQyMTkgMTIuMDkzNzUgNS4zNzUgQyAxMS4yNjU2MjUgNS4xMzY3MTkgMTAuNDAyMzQ0IDUgOS41IDUgQyA5LjEyODkwNiA1IDguNzY1NjI1IDUuMDUwNzgxIDguNDA2MjUgNS4wOTM3NSBDIDkuNzYxNzE5IDMuMjMwNDY5IDExLjk1MzEyNSAyIDE0LjUgMiBaIE0gMTkgNSBDIDE4LjQ0OTIxOSA1IDE4IDUuNDQ5MjE5IDE4IDYgQyAxOCA2LjU1MDc4MSAxOC40NDkyMTkgNyAxOSA3IEMgMTkuNTUwNzgxIDcgMjAgNi41NTA3ODEgMjAgNiBDIDIwIDUuNDQ5MjE5IDE5LjU1MDc4MSA1IDE5IDUgWiBNIDkuNSA3IEMgMTMuNjUyMzQ0IDcgMTcgMTAuMzQ3NjU2IDE3IDE0LjUgQyAxNyAxNS4zNTkzNzUgMTYuODU5Mzc1IDE2LjE5OTIxOSAxNi41OTM3NSAxNi45Njg3NSBDIDE2LjU4MjAzMSAxNyAxNi41NzAzMTMgMTcuMDMxMjUgMTYuNTYyNSAxNy4wNjI1IEMgMTUuNTIzNDM4IDE5Ljk1NzAzMSAxMi43NTc4MTMgMjIgOS41IDIyIEMgNS4zNDc2NTYgMjIgMiAxOC42NTIzNDQgMiAxNC41IEMgMiAxMS4zMzU5MzggMy45MjU3ODEgOC42MzY3MTkgNi42ODc1IDcuNTMxMjUgQyA2Ljc1IDcuNTE1NjI1IDYuODE2NDA2IDcuNDk2MDk0IDYuODc1IDcuNDY4NzUgQyA3LjY4NzUgNy4xNjc5NjkgOC41ODIwMzEgNyA5LjUgNyBaIE0gMTkuNSA4IEMgMTguNjcxODc1IDggMTggOC42NzE4NzUgMTggOS41IEMgMTggMTAuMzI4MTI1IDE4LjY3MTg3NSAxMSAxOS41IDExIEMgMjAuMzI4MTI1IDExIDIxIDEwLjMyODEyNSAyMSA5LjUgQyAyMSA4LjY3MTg3NSAyMC4zMjgxMjUgOCAxOS41IDggWiBNIDcgMTAgQyA1Ljg5NDUzMSAxMCA1IDEwLjg5NDUzMSA1IDEyIEMgNSAxMy4xMDU0NjkgNS44OTQ1MzEgMTQgNyAxNCBDIDguMTA1NDY5IDE0IDkgMTMuMTA1NDY5IDkgMTIgQyA5IDEwLjg5NDUzMSA4LjEwNTQ2OSAxMCA3IDEwIFogTSAxMiAxMCBDIDExLjQ0OTIxOSAxMCAxMSAxMC40NDkyMTkgMTEgMTEgQyAxMSAxMS41NTA3ODEgMTEuNDQ5MjE5IDEyIDEyIDEyIEMgMTIuNTUwNzgxIDEyIDEzIDExLjU1MDc4MSAxMyAxMSBDIDEzIDEwLjQ0OTIxOSAxMi41NTA3ODEgMTAgMTIgMTAgWiBNIDEzLjUgMTMgQyAxMi42NzE4NzUgMTMgMTIgMTMuNjcxODc1IDEyIDE0LjUgQyAxMiAxNS4zMjgxMjUgMTIuNjcxODc1IDE2IDEzLjUgMTYgQyAxNC4zMjgxMjUgMTYgMTUgMTUuMzI4MTI1IDE1IDE0LjUgQyAxNSAxMy42NzE4NzUgMTQuMzI4MTI1IDEzIDEzLjUgMTMgWiBNIDYgMTYgQyA1LjQ0OTIxOSAxNiA1IDE2LjQ0OTIxOSA1IDE3IEMgNSAxNy41NTA3ODEgNS40NDkyMTkgMTggNiAxOCBDIDYuNTUwNzgxIDE4IDcgMTcuNTUwNzgxIDcgMTcgQyA3IDE2LjQ0OTIxOSA2LjU1MDc4MSAxNiA2IDE2IFogTSAxMCAxOCBDIDkuNDQ5MjE5IDE4IDkgMTguNDQ5MjE5IDkgMTkgQyA5IDE5LjU1MDc4MSA5LjQ0OTIxOSAyMCAxMCAyMCBDIDEwLjU1MDc4MSAyMCAxMSAxOS41NTA3ODEgMTEgMTkgQyAxMSAxOC40NDkyMTkgMTAuNTUwNzgxIDE4IDEwIDE4IFogIiBmaWxsPSIjMDhlNWZmIi8+PC9nPjwvc3ZnPgo=');
      width: 18px;
      height: 18px;
      display: block;
      margin-left: -1.5rem;
      margin-bottom: -1.1rem;
    }
  }

  button {
    border: none;
    margin-left: .8rem;
    cursor: pointer;
  }
}


// #272927 dark bg
// #2b2c2c ligher cards
// #ff3e35 or #FC6E00 links
</style>


<style lang="scss">
::-webkit {
  &-scrollbar{
    width: 8px;
    height: 8px;

    &-thumb{
      background: #FC6E00;
      border-radius: 10px;
    }

    &-track{
      background:#272927;
    }
  }
  &-resizer,
  &-scrollbar-corner {
    background: #272927;
  }
}

</style>
