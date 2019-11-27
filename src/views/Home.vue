<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "home",
	components: {
		HelloWorld
	},
	beforeCreate: function() {
		if (!this.$session.exists()) {
			this.$router.push("/login");
		}
	},
	methods: {
		logout: function() {
			this.$session.destroy();
			this.$router.push("/");
		}
	}
};
</script>
