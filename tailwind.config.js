// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

const spacingList = {}
for (let i = 0; i < 1000; i++) {
  spacingList[i] = `${i}px`
}
const opacityList = {}
for (let i = 0; i < 100; i++) {
  opacityList[i] = `.${i / 10}`
}
module.exports = {
  content: [
    './packages/client/src/**/*.{js,jsx,ts,tsx}',
    './libs/common/src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      spacing: spacingList,
      opacity: opacityList,
      colors
    }
  }
}
