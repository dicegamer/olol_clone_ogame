import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Projects from "../views/Projects.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: Home
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue")
	},
	{
		path: "/login",
		name: "login",
		component: Login
	},
	{
		path: "/projects",
		name: "projects",
		component: Projects
	},
	{
		path: "/game",
		name: "game",
		component: Game
	}
];

const router = new VueRouter({
	routes
});

export default router;
