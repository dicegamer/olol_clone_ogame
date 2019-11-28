<template>
	<div id="usr-comp">
		<el-row>
			<el-col :span="6"><img src="../assets/b_logo.png" alt="Logo du site" style="height: 100px;"></el-col>
			<el-col :span="10" style="text-align: left;">
				Nom : {{user.lastname}}
				<br />
				Prénom : {{user.firstname}}
				<br />
				Email : {{user.email}}
				<br />
				Rôle : {{user.role == 1 ? "Ressources Humaines" : "Employé"}}
			</el-col>
			<el-col id="usr-comp-controls" :span="6">
				<el-row>
					<el-button type="danger" icon="el-icon-close" @click="logout">Déconnexion</el-button>
				</el-row>
				<el-row v-if="user.role == 1">
					<el-button type="success" icon="el-icon-plus" @click="meh">Ajouter un projet</el-button>
				</el-row>
				
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		user: Object
	},
	methods: {
		logout() {
			this.$session.destroy();
			this.$router.push("/login");
		},
		meh(){
			
		}
	}
};
</script>


<style lang="scss">
#usr-comp {
	height: 120px;
	background-color: #292845;
	margin-bottom: 30px;
	border-radius: 0 0 10px 10px;
	padding: 10px;
}

#usr-comp-controls{
	margin: 0;
	& .el-row{
		margin-bottom: 10px;
	}
	& .el-button{
		width: 85%;
	}
}

</style>