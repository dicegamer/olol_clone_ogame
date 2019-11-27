<template>
	<div id="login-form">
		<h1>Connexion</h1>
		<el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="0px">
			<el-form-item>
				<el-input
					placeholder="Login"
					v-model="loginForm.login"
					prop="login"
					:rules="[
						{ required: true, message: 'Veuillez entrer votre adresse email', trigger: 'blur' },
						{ type: 'email', message: 'Veuillez entrer votre adresse email', trigger: ['blur', 'change'] }
					]"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="Mot de passe" v-model="loginForm.passwd" show-password></el-input>
			</el-form-item>
			<el-button type="primary" @click="onSubmit">Se connecter</el-button>

			<el-button
				type="text"
				sizz="mini"
				style="margin-left: 0"
				@click="inscriptionFormVisible = !inscriptionFormVisible"
			>S'inscrire</el-button>
		</el-form>

		<el-dialog title="Inscription" :visible.sync="inscriptionFormVisible">
			<el-form :model="inscriptionForm">
				<el-form-item label="Email">
					<el-input v-model="inscriptionForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nom">
					<el-input v-model="inscriptionForm.lastname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Prénom">
					<el-input v-model="inscriptionForm.firstname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Mot de passe">
					<el-input v-model="inscriptionForm.password" autocomplete="off" show-password></el-input>
				</el-form-item>
				<el-form-item label="Confirmation du mot de passe">
					<el-input v-model="passwordConfirm" autocomplete="off" show-password></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="doSignUp">Confirm</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "login",
	data() {
		return {
			loginForm: {
				login: "",
				passwd: ""
			},

			inscriptionForm: {
				email: "",
				firstname: "",
				lastname: "",
				role: 0,
				password: ""
			},

			passwordConfirm: "",

			rules: {
				login: [
					{
						required: true,
						message: "Veuillez entrer votre adresse email",
						trigger: "blur"
					}
				]
			},
			inscriptionFormVisible: false
		};
	},
	beforeCreate: function() {
		if (this.$session.exists()) {
			this.$router.push("/projects");
		}
	},
	methods: {
		onSubmit() {
			// this.$refs.loginForm.validate(valid => {
			// 	if (valid) {
			// 		alert("submit!");
			// 	} else {
			// 		console.log("error submit!!");
			// 		return false;
			// 	}
			// });
			let foundUserByEmail = this.$devVars.users.find(
				user => user.email === this.loginForm.login
			);
			if (
				foundUserByEmail !== undefined &&
				foundUserByEmail.password === this.loginForm.passwd
			) {
				this.$emit("logged", foundUserByEmail);
			} else {
				console.log("User inexistant");
				this.$message.error("Utilisateur inexistant ou mot de passe incorrect");
			}
		},
		doSignUp() {
			console.log(this);
			
			this.$http
				.post(
					"http://wksp.julien-bisson.fr:8080/api/user/add",
					this.inscriptionForm
				)
				.then(function(response) {
					console.log(response);
				});
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