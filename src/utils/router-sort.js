export default function routerSort(rl) {
  for (let i = 1; i < rl.length; i++) {
    if (rl[i].index < rl[i - 1].index) {
      const guard = rl[i]
      let j = i - 1
      rl[i] = rl[j]
      while (j >= 0 && guard.index < rl[j].index) {
        rl[j + 1] = rl[j]
        j--
      }
      rl[j + 1] = guard
    }
  }
}
