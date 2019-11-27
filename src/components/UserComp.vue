<template>
	<div id="usr-comp">
		<el-row>
			<el-col :span="18">
				Nom : {{user.nom}}
				<br />
				Prénom : {{user.prenom}}
				<br />
				Email : {{user.email}}
				<br />
				Rôle : {{user.is_rh ? "Ressources Humaines" : "Employé"}}
			</el-col>
			<el-col id="usr-comp-controls" :span="6">
				<el-row>
					<el-button type="danger" icon="el-icon-close" @click="logout">Déconnexion</el-button>
				</el-row>
				<el-row v-if="user.is_rh">
					<el-button type="warning" icon="el-icon-s-marketing" @click="meh">Portail RH</el-button>
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
		width: 50%;
	}
}

</style>