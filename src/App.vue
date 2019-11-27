<template>
	<div id="app">
		<div id="background">
			<div id="container">
				<el-row :class="{invisible: !$session.exists()}">
					<el-col>
						<usr-comp :user="userInfos"></usr-comp>
					</el-col>
				</el-row>
				<el-row id="main-content" :class="{removeColor: !$session.exists()}">
					<el-col>
						<router-view @logged="onLoggedIn" />
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import UsrComp from "./components/UserComp";

export default {
	components: {
		UsrComp
	},
	data() {
		return {
			userInfos: this.$session.get("user") !== undefined ? this.$session.get("user") : {} 
		};
	},
	methods: {
		onLoggedIn(userInfos) {
			this.userInfos = userInfos;
			this.$session.set("user", userInfos);
			this.$router.push("/projects");
		}
	}
};
</script>

<style lang="scss">
* {
	margin: 0;
	box-sizing: border-box;
	text-align: center;
}

#app {
	font-family: "Roboto", sans-serif;
	font-size: 1.1em;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	vertical-align: middle;
	color: #ffffff;
	background-image: url("./assets/login_background.jpg");
	background-size: cover;
	height: 100vh;
}

#background {
	background-color: rgba($color: #1e1d32, $alpha: 0.7);
	height: 100vh;
	width: 100%;
}

#container {
	width: 80%;
	margin: auto;
}

.invisible {
	display: none;
}

#main-content {
	background-color: #292845;
	height: calc(100vh - 190px);
	border-radius: 10px;
	padding: 30px;
	margin: auto;

	&.removeColor {
		background-color: rgba($color: #000000, $alpha: 0);
	}
}
</style>
