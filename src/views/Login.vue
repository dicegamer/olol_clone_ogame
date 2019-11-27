<template>
	<div id="login-form">
		<h1>Connexion</h1>
		<el-form ref="form" :model="form" label-width="0px">
			<el-form-item>
				<el-input placeholder="Login" v-model="form.login"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="Mot de passe" v-model="form.passwd" show-password></el-input>
			</el-form-item>
			<el-button type="primary" @click="onSubmit">Se connecter</el-button>

			<el-button type="text" sizz="mini" style="margin-left: 0">S'inscrire</el-button>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "login",
	data() {
		return {
			form: {
				login: "",
				passwd: ""
			}
		};
	},
	beforeCreate: function() {
		if (this.$session.exists()) {
			this.$router.push("/projects");
		}
	},
	methods: {
		onSubmit() {
			let foundUserByEmail = this.$devVars.users.find(user => user.email === this.form.login);
			if(foundUserByEmail !== undefined && foundUserByEmail.password === this.form.passwd){
				this.$emit('logged', foundUserByEmail)
			}
			else {
				console.log("User inexistant");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.el-button {
	width: 100%;
}

input::placeholder {
	color: #292845;
}

h1 {
	margin-bottom: 20px;
}

#login-form {
	background-color: #292845;
	padding: 20px 20px 5px;
	margin: 30vh 35% 0;
	border-radius: 10px;
}
</style>