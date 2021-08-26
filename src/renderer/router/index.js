import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: require("@/components/LandingPage").default,
    },
    {
      path: "/pomodoro",
      name: "pomodoro-page",
      component: require("@/components/PomodoroPage/PomodoroPage").default,
    },
    {
      path: "/beautifulsoup",
      name: "beautifulsoup-page",
      component: require("@/components/BeautifulSoup/BeautifulSoup").default,
    },
  ],
});
