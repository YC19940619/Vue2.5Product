<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    console.log('          _____                    _____                    _____                    _____          \n' +
      '         /\\    \\                  /\\    \\                  /\\    \\                  /\\    \\         \n' +
      '        /::\\____\\                /::\\    \\                /::\\    \\                /::\\    \\        \n' +
      '       /:::/    /                \\:::\\    \\              /::::\\    \\              /::::\\    \\       \n' +
      '      /:::/    /                  \\:::\\    \\            /::::::\\    \\            /::::::\\    \\      \n' +
      '     /:::/    /                    \\:::\\    \\          /:::/\\:::\\    \\          /:::/\\:::\\    \\     \n' +
      '    /:::/____/                      \\:::\\    \\        /:::/__\\:::\\    \\        /:::/__\\:::\\    \\    \n' +
      '   /::::\\    \\                      /::::\\    \\      /::::\\   \\:::\\    \\      /::::\\   \\:::\\    \\   \n' +
      '  /::::::\\    \\   _____    ____    /::::::\\    \\    /::::::\\   \\:::\\    \\    /::::::\\   \\:::\\    \\  \n' +
      ' /:::/\\:::\\    \\ /\\    \\  /\\   \\  /:::/\\:::\\    \\  /:::/\\:::\\   \\:::\\____\\  /:::/\\:::\\   \\:::\\    \\ \n' +
      '/:::/  \\:::\\    /::\\____\\/::\\   \\/:::/  \\:::\\____\\/:::/  \\:::\\   \\:::|    |/:::/__\\:::\\   \\:::\\____\\\n' +
      '\\::/    \\:::\\  /:::/    /\\:::\\  /:::/    \\::/    /\\::/   |::::\\  /:::|____|\\:::\\   \\:::\\   \\::/    /\n' +
      ' \\/____/ \\:::\\/:::/    /  \\:::\\/:::/    / \\/____/  \\/____|:::::\\/:::/    /  \\:::\\   \\:::\\   \\/____/ \n' +
      '          \\::::::/    /    \\::::::/    /                 |:::::::::/    /    \\:::\\   \\:::\\    \\     \n' +
      '           \\::::/    /      \\::::/____/                  |::|\\::::/    /      \\:::\\   \\:::\\____\\    \n' +
      '           /:::/    /        \\:::\\    \\                  |::| \\::/____/        \\:::\\   \\::/    /    \n' +
      '          /:::/    /          \\:::\\    \\                 |::|   |               \\:::\\   \\/____/     \n' +
      '         /:::/    /            \\:::\\    \\                |::|   |                \\:::\\    \\         \n' +
      '        /:::/    /              \\:::\\____\\               \\::|   |                 \\:::\\____\\        \n' +
      '        \\::/    /                \\::/    /                \\:|   |                  \\::/    /        \n' +
      '         \\/____/                  \\/____/                  \\|___|                   \\/____/     ')
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
