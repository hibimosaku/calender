import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHashHistory } from "vue-router";
import reservationCalendar from "../view/reservationCalendar.vue";
import signIn from "../view/signIn.vue";
import signUp from "../view/signUp.vue";

const routes = [
  {
    path: "/",
    name: "signIn",
    component: signIn,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: signUp,
  },
  {
    path: "/reservationCalendar",
    name: "reservationCalendar",
    component: reservationCalendar,
    //meta を使おう
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//ログインしていないユーザはカレンダーUIに入れないようにしたい

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuthkouny && to.name === "reservationCalendar") {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        next();
      } else {
        next("/");
      }
    });
  } else {
    next();
  }
  // if (user) {
  //   console.log('0')
  //   next()
  // } else if(to.name==='signIn'){
  //   console.log('1')
  //   next()
  // }else{
  //   console.log('2')
  //   setTimeout(() => {
  //     router.push('/');
  //   }, 0);
  // }

});

// })

export default router;
